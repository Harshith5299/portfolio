"""Retrieval + generation for the "Ask My Portfolio" assistant.

Retrieval is dependency-free BM25 over api/_knowledge.py. Generation calls
Claude through the Anthropic SDK, either directly (ANTHROPIC_API_KEY) or via
Vercel AI Gateway's Anthropic-compatible endpoint (AI_GATEWAY_API_KEY). With
neither key (or if the call fails) the assistant answers extractively from the retrieved
passages, so the demo always responds.
"""
import math
import os
import re
import time

from _knowledge import PASSAGES

TOP_K = 4
MIN_SCORE = 0.5
BM25_K1 = 1.4
BM25_B = 0.75
TITLE_WEIGHT = 2  # title tokens count this many times

DEFAULT_MODEL = "claude-opus-5"
GATEWAY_URL = "https://ai-gateway.vercel.sh"
GATEWAY_DEFAULT_MODEL = "anthropic/claude-opus-5"

STOPWORDS = frozenset(
    "a an and are as at be but by can did do does for from has have he her him his how i in is it its "
    "me my of on or she so tell that the their them there they this to was what when where which who "
    "why will with you your about any has had been were than then into over also".split()
)

# Recruiter phrasing -> vocabulary used in the passages.
SYNONYMS = {
    "ai": ["llm", "langgraph", "agentic", "rag"],
    "genai": ["llm", "rag", "agentic"],
    "llms": ["llm"],
    "agents": ["agentic", "langgraph", "adk"],
    "agent": ["agentic", "langgraph", "adk"],
    "cloud": ["aws"],
    "job": ["engineer", "role"],
    "work": ["engineer", "experience"],
    "worked": ["engineer", "experience"],
    "first": ["junior", "2017"],
    "earliest": ["junior", "2017"],
    "current": ["senior", "present", "recently"],
    "now": ["senior", "present", "recently"],
    "experience": ["engineer", "years"],
    "contact": ["reach", "linkedin"],
    "hire": ["opportunities", "contact"],
    "frontend": ["react", "typescript"],
    "backend": ["fastapi", "python", "microservices"],
    "banking": ["bank", "financial"],
    "security": ["cybersecurity"],
    "data": ["pyspark", "etl", "pipelines"],
}

SYSTEM_PROMPT = (
    "You are the assistant on Harshith Chittajallu's portfolio website, answering recruiters and hiring managers. "
    "Answer only from the numbered passages supplied with each question. Cite passages inline as [1], [2] after "
    "the sentences they support. If the passages don't answer the question, say you don't have that information "
    "and suggest using the contact form. Never invent employers, dates, numbers or skills. Refer to Harshith in "
    "the third person. Keep answers to 2-4 sentences of plain prose, no markdown headings or bullet lists."
)


def tokenize(text: str) -> list[str]:
    return [t for t in re.findall(r"[a-z0-9]+", text.lower()) if t not in STOPWORDS]


def _expand(tokens: list[str]) -> list[str]:
    out = list(tokens)
    for t in tokens:
        out.extend(SYNONYMS.get(t, []))
    return out


def _doc_tokens(p: dict) -> list[str]:
    return tokenize(p["title"]) * TITLE_WEIGHT + tokenize(p["text"])


_DOCS = [_doc_tokens(p) for p in PASSAGES]
_AVGDL = sum(len(d) for d in _DOCS) / len(_DOCS)
_DF: dict[str, int] = {}
for _d in _DOCS:
    for _t in set(_d):
        _DF[_t] = _DF.get(_t, 0) + 1


def _idf(term: str) -> float:
    df = _DF.get(term, 0)
    return math.log(1 + (len(_DOCS) - df + 0.5) / (df + 0.5))


def retrieve(question: str, k: int = TOP_K) -> list[dict]:
    """Return the top-k passages for the question, each with its BM25 score."""
    terms = _expand(tokenize(question))
    scored = []
    for passage, doc in zip(PASSAGES, _DOCS):
        score = 0.0
        for term in set(terms):
            tf = doc.count(term)
            if not tf:
                continue
            norm = tf + BM25_K1 * (1 - BM25_B + BM25_B * len(doc) / _AVGDL)
            score += _idf(term) * tf * (BM25_K1 + 1) / norm
        if score >= MIN_SCORE:
            scored.append({**passage, "score": round(score, 2)})
    scored.sort(key=lambda p: p["score"], reverse=True)
    return scored[:k]


def _context_block(passages: list[dict]) -> str:
    return "\n\n".join(
        f"[{i}] {p['title']} ({p['section']})\n{p['text']}" for i, p in enumerate(passages, 1)
    )


def _sentences(text: str) -> list[str]:
    return [x for x in re.split(r"(?<=[.!?])\s+", text) if x]


def extractive_answer(question: str, passages: list[dict]) -> str:
    """Pick the best-matching sentence from each of the top passages, with citations."""
    if not passages:
        return (
            "I don't have anything on that in Harshith's portfolio. "
            "Try asking about his experience, AI work, skills or projects, or use the contact form."
        )
    terms = set(_expand(tokenize(question)))
    picks = []
    for i, p in enumerate(passages[:2], 1):
        best = max(_sentences(p["text"]), key=lambda x: len(terms & set(tokenize(x))))
        picks.append(f"{best} [{i}]")
    return " ".join(picks)


def _backend() -> str | None:
    """Which Claude route is configured: direct Anthropic API, Vercel AI Gateway, or none."""
    if os.environ.get("ANTHROPIC_API_KEY"):
        return "anthropic"
    if os.environ.get("AI_GATEWAY_API_KEY"):
        return "gateway"
    return None


def _create(client, backend: str, **params):
    if backend == "anthropic":
        # Direct API: low effort plus server-side refusal fallbacks.
        return client.beta.messages.create(
            **params,
            output_config={"effort": "low"},
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",
        )
    # AI Gateway speaks the core Messages API; beta-only fields are left off.
    return client.messages.create(**params)


def generate(question: str, passages: list[dict], backend: str) -> tuple[str, str]:
    """Return (answer, model). Raises on API failure so the caller can fall back."""
    import anthropic  # imported lazily so retrieval mode works without the SDK

    if backend == "gateway":
        model = os.environ.get("ASK_MODEL", GATEWAY_DEFAULT_MODEL)
        client = anthropic.Anthropic(
            api_key=os.environ["AI_GATEWAY_API_KEY"],
            base_url=os.environ.get("AI_GATEWAY_BASE_URL", GATEWAY_URL),
            timeout=25.0,
            max_retries=1,
        )
    else:
        model = os.environ.get("ASK_MODEL", DEFAULT_MODEL)
        client = anthropic.Anthropic(timeout=25.0, max_retries=1)

    response = _create(
        client,
        backend,
        model=model,
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": f"Passages:\n\n{_context_block(passages)}\n\nQuestion: {question}",
            }
        ],
    )
    if response.stop_reason == "refusal":
        raise RuntimeError("model declined the request")
    text = "".join(b.text for b in response.content if b.type == "text").strip()
    if not text:
        raise RuntimeError("empty model response")
    return text, response.model


def answer(question: str, log=None) -> dict:
    t0 = time.perf_counter()
    passages = retrieve(question)
    retrieve_ms = round((time.perf_counter() - t0) * 1000, 1)

    mode, model, text = "retrieval", None, None
    backend = _backend()
    if passages and backend:
        try:
            text, model = generate(question, passages, backend)
            mode = "generated"
        except Exception as exc:  # any SDK or network failure falls back to extractive
            if log:
                log("error", "ask generation failed", error=str(exc)[:300])
    if text is None:
        text = extractive_answer(question, passages)

    return {
        "answer": text,
        "mode": mode,
        "model": model,
        "sources": [
            {"n": i, "id": p["id"], "title": p["title"], "section": p["section"], "score": p["score"], "text": p["text"]}
            for i, p in enumerate(passages, 1)
        ],
        "timings": {
            "retrieve_ms": retrieve_ms,
            "total_ms": round((time.perf_counter() - t0) * 1000, 1),
        },
    }
