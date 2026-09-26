from http.server import BaseHTTPRequestHandler
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from _log import log, request_fields  # noqa: E402

MAX_BODY = 8 * 1024
ALLOWED_LEVELS = {"info", "warn", "error"}


class handler(BaseHTTPRequestHandler):
    """Receives browser-side warnings/errors and prints them into Vercel logs."""

    def do_POST(self):
        length = min(int(self.headers.get("Content-Length", 0) or 0), MAX_BODY)
        try:
            entry = json.loads(self.rfile.read(length) or b"{}")
            if not isinstance(entry, dict):
                raise ValueError("expected object")
        except ValueError:
            self._respond(400)
            return

        level = entry.pop("level", "info")
        level = level if level in ALLOWED_LEVELS else "info"
        msg = str(entry.pop("msg", ""))[:500]
        fields = {k: str(v)[:2000] for k, v in entry.items()}
        fields.update(source="client", ua=request_fields(self)["ua"])
        log(level, msg, **fields)
        self._respond(204)

    def _respond(self, status: int):
        self.send_response(status)
        self.end_headers()

    def log_message(self, *_):
        pass
