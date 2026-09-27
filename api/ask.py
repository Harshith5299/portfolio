from http.server import BaseHTTPRequestHandler
import json
import os
import re
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from _log import log, request_fields  # noqa: E402
from _rag import answer  # noqa: E402
import _pow  # noqa: E402

MAX_BODY = 4 * 1024
MAX_QUESTION = 300
CONTROL_CHARS = re.compile(r"[\x00-\x1f\x7f]")
RATE_LIMIT = 8  # requests per window per client, per warm instance (best effort)
RATE_WINDOW = 60.0

_hits: dict[str, list[float]] = {}


def _rate_limited(client_id: str) -> bool:
    now = time.monotonic()
    recent = [t for t in _hits.get(client_id, []) if now - t < RATE_WINDOW]
    limited = len(recent) >= RATE_LIMIT
    if not limited:
        recent.append(now)
    _hits[client_id] = recent
    if len(_hits) > 5000:
        _hits.clear()
    return limited


class handler(BaseHTTPRequestHandler):
    """Ask My Portfolio: retrieval-augmented Q&A over the portfolio's own content."""

    def do_GET(self):
        """Issue a proof-of-work challenge the browser solves before asking."""
        self._respond(200, _pow.issue(self._client_id()))

    def _client_id(self) -> str:
        return (self.headers.get("X-Forwarded-For", "") or self.client_address[0]).split(",")[0].strip()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", ""))
        except ValueError:
            self._respond(411, {"error": "Content-Length required."})
            return
        if length <= 0 or length > MAX_BODY:
            self._respond(413 if length > 0 else 400, {"error": "Bad request size."})
            return

        try:
            data = json.loads(self.rfile.read(length))
        except (ValueError, UnicodeDecodeError):
            data = None
        if not isinstance(data, dict):
            data = {}
        question = str(data.get("question", "")).strip()
        if not question:
            self._respond(400, {"error": "Ask a question."})
            return
        question = CONTROL_CHARS.sub(" ", question[:MAX_QUESTION])

        client_id = self._client_id()
        if _rate_limited(client_id):
            self._respond(429, {"error": "Too many questions. Try again in a minute."})
            return

        verified = _pow.verify(data.get("proof"), client_id)
        result = answer(question, log=log, client_id=client_id, allow_model=verified)
        log(
            "info",
            "ask answered",
            question_len=len(question),
            mode=result["mode"],
            verified=verified,
            sources=[s["id"] for s in result["sources"]],
            total_ms=result["timings"]["total_ms"],
            **request_fields(self),
        )
        self._respond(200, result)

    def do_OPTIONS(self):
        self._respond(204, None)

    def _respond(self, status: int, body):
        payload = json.dumps(body).encode() if body is not None else b""
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, *_):
        pass
