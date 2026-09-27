# 07 · Learning guide: how this all works, explained

For Buddy, and for any agent asked to teach rather than build. Each topic explains the idea, points at the real code in this repo, and ends with a small exercise to try yourself. Agents: when Buddy is learning, explain and review. Don't do the exercises for him unless he asks.

---

## 1. A single-page app built by Vite

**Idea.** React components describe the UI as functions of data. Vite bundles the TypeScript and CSS into a few static files (`frontend/dist/`) that any web server can serve. There's no server rendering, so the browser does the work.

**In this repo.** `index.html` loads `src/main.tsx`, which renders `App.tsx`, which stacks the sections. Content comes from typed arrays (`src/data/projects.ts`), so adding a project is a data change, not a layout change. `vite.config.ts` declares a second page (`ask.html`), so one build produces two pages.

**Code splitting.** Previews are loaded with `React.lazy(() => import(...))` in `ProjectPreview.tsx`, so each becomes its own small file downloaded only when needed.

**Try it.** Run `npm run build` and look at `dist/assets/`: find the separate chunk for each preview. Then add a fake project to `projects.ts` locally and watch it appear in `npm run dev` without touching any component.

---

## 2. Serverless functions

**Idea.** Instead of running a server all the time, Vercel starts a small Python process when a request arrives ("cold start"), may keep it warm for a while, and scales out to more copies under load. You pay per use.

**In this repo.** Each `api/*.py` exposes `class handler(BaseHTTPRequestHandler)`. Files beginning with `_` are shared modules, not endpoints.

**Consequence worth understanding.** In-memory state (rate-limit dicts, daily caps) lives only in one warm copy. A new copy starts at zero, and two copies don't share counts. That's why the caps are described as "per warm instance" and why a shared store like Redis would be the next step.

**Try it.** Read `api/health.py` (the smallest endpoint), then write a `tests/test_health.py` that starts the handler on a local `HTTPServer` the way `tests/test_ask.py` → `EndpointTests` does, and asserts a 200.

---

## 3. RAG: retrieval-augmented generation

**Idea.** A language model knows nothing about you. RAG first **retrieves** the most relevant snippets from your own documents, then asks the model to **generate** an answer using only those snippets, with citations. That grounds the answer and makes it checkable.

**Retrieval here is BM25** (`api/_rag.py`), a classic search-engine scoring formula:
- Split text into words ("tokens"), drop stopwords (`the`, `how`, `him`), and reduce words to a stem (`reached` → `reach`).
- A passage scores higher when it contains the question's words often (term frequency, saturated by `k1 = 1.4`), when those words are rare across all passages (inverse document frequency), and it's normalised for passage length (`b = 0.75`).
- Title words count double (`TITLE_WEIGHT`). Recruiter phrasing is expanded with `SYNONYMS` ("AI" → llm, langgraph, agentic, rag).

**Generation.** The top 4 passages are numbered and sent to Claude Haiku with a system prompt: answer only from these, cite as [n]. If there's no key, no match, a failed bot check, a hit cap or an error, the code builds an extractive answer by picking sentences from the passages. The page always responds, and says why.

**A real bug you can learn from (#21).** "how to reach him" became just `["reach"]` after stopwords, and the passage said "reached". Without stemming, zero overlap meant zero score. That's why real search engines normalise word forms.

**Try it.** In a Python shell inside `api/`: `import _rag; [ (p['id'], round(p['score'],2)) for p in _rag.retrieve("has he built agents?") ]`. Then remove `"agents"` from `SYNONYMS` and compare the ranking. Write down why it changed.

---

## 4. Proof of work: making bots pay

**Idea.** Before an expensive action, the client must find a number that makes a hash start with N zero bits. Finding it takes about 2^N tries (roughly a second in a browser for N = 16), and checking it takes one hash. It's cheap for a visitor, costly at scale for a spammer.

**In this repo.** `GET /api/ask` returns a token signed with HMAC and bound to the client's IP (`_pow.issue`). `src/ask/pow.ts` searches for a counter with `crypto.subtle.digest('SHA-256', ...)`. `_pow.verify` checks the signature, expiry (5 minutes), the zero bits, and that the token hasn't been used before.

**The honest limit.** A determined AI agent with a real browser can solve it too. The real protection for Buddy's budget is the **daily cap**; the puzzle just makes abuse slower and costlier. Security usually works in layers like this.

**Try it.** In `tests/`, write a test that sets `_pow.POW_BITS = 4`, solves a challenge by brute force in Python and verifies it, then flips one character of the token and asserts verification fails. Compare with `ProofOfWorkTests`.

---

## 5. Defending a public form

**In this repo** (`api/contact.py`): body-size cap → JSON parse → field validation (lengths, email shape) → **honeypot** (a hidden `website` field humans never see, so a filled one means bot) → **minimum fill time** (under 3 seconds means a script) → **rate limit** (5 per IP per hour) → send through Resend → report success only if Resend accepted it.

**Lesson.** Never tell the user "sent" before the provider confirms it. The old form did, and silently lost every message.

**Try it.** List what the form still can't stop (hint: real humans sending junk, and bots rotating IPs) and propose one defence for each with its trade-off.

---

## 6. Output escaping and XSS

**Idea.** Cross-site scripting happens when text an attacker influenced gets interpreted as HTML or script. Defence: treat all data as text, send the right `Content-Type`, and escape characters that are special in HTML.

**In this repo.** `ask.py` → `_safe_json` escapes `<`, `>` and `&` as JSON unicode escapes, sends `application/json` with `nosniff`, and React renders answers as text. SonarCloud flagged the earlier version as a blocker (see [05-sonarcloud.md](05-sonarcloud.md)).

**Try it.** Run `python3 -c "import sys; sys.path.insert(0,'api'); from ask import _safe_json; print(_safe_json({'a':'<script>'}))"` and explain why the output is still valid JSON that parses back to `<script>`.

---

## 7. The testing pyramid, and why E2E saved this site

**Idea.** Many fast unit tests at the bottom, fewer slower end-to-end tests at the top. Unit tests prove logic; E2E tests prove a user can actually do the thing.

**In this repo.** 16 Python unit tests (`tests/test_ask.py`) and about 45 Playwright test runs (`frontend/e2e/`, each spec run at desktop and phone size). The E2E layer is what would have caught the invisible-sections bug; see [04-testing.md](04-testing.md).

**Try it.** Temporarily break the reveal CSS (delete the `.reveal.revealed, .revealed .reveal` rule in `src/index.css`), run `npm run test:e2e`, and read which tests fail and what the printed browser logs say. Then revert.

---

## 8. CI/CD and quality gates

**Idea.** Continuous integration runs checks on every push so problems surface before merge; continuous deployment ships `main` automatically once it's green.

**In this repo.** `.github/workflows/ci.yml` (lint, build, API tests, E2E) → SonarCloud and Trivy apps → Vercel preview per branch → merge → `deploy-prod.yml` → production. Actions are pinned to commit SHAs so a compromised tag can't change what runs.

**Try it.** Open any merged PR's "Checks" tab and match each check to the file or app that produced it.

---

## 9. SEO and structured data

**Idea.** Search engines and link previews (LinkedIn, Slack) read `<meta>` tags and JSON-LD, not your React UI.

**In this repo.** `frontend/index.html` has the description, Open Graph/Twitter tags and a JSON-LD `Person` block. An E2E test parses the JSON-LD so a typo can't silently break it.

**Try it.** Paste the site URL into a link-preview checker (for example LinkedIn's Post Inspector) and compare what it shows with the tags in `index.html`. Note the missing `og-image.png`.

---

## 10. Working with AI coding agents

**What this project demonstrates.** The portfolio itself is built by agents (`builtBy: 'agent-assisted'`), with guardrails a human set: tests that must pass, a quality gate, a rule to screenshot before claiming done, a handbook (this folder) and shared memory so each new agent starts informed. The labelling is honest: learning projects are `solo` and agents only teach there.

**Try it.** Pick a small change (for example a new skill), write the prompt you'd give an agent, and list which handbook rules it should follow. Then compare its PR against [04-testing.md](04-testing.md) → "Definition of done".
