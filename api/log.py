from http.server import BaseHTTPRequestHandler
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from _log import log, request_fields  # noqa: E402

MAX_BODY = 8 * 1024
MAX_FIELDS = 20
MAX_KEY = 64
MAX_VALUE = 2000
MAX_MSG = 500
ALLOWED_LEVELS = ("info", "warn", "error")


class handler(BaseHTTPRequestHandler):
    """Receives browser-side warnings/errors and prints them into Vercel logs.

    Public and unauthenticated: one small JSON object per request, never echoed back.
    """

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", ""))
        except ValueError:
            self._respond(411)
            return
        if length <= 0:
            self._respond(400)
            return
        if length > MAX_BODY:
            self._respond(413)
            return

        try:
            entry = json.loads(self.rfile.read(length))
        except (ValueError, UnicodeDecodeError):
            self._respond(400)
            return
        if not isinstance(entry, dict) or len(entry) > MAX_FIELDS:
            self._respond(400)
            return

        level = entry.pop("level", "info")
        level = level if level in ALLOWED_LEVELS else "info"
        msg = str(entry.pop("msg", ""))[:MAX_MSG]
        fields = {k[:MAX_KEY]: str(v)[:MAX_VALUE] for k, v in entry.items()}
        # Server-set fields win over anything the client claims.
        fields.update(source="client", ua=request_fields(self)["ua"])
        log(level, msg, **fields)
        self._respond(204)

    def _respond(self, status: int):
        self.send_response(status)
        self.send_header("Content-Length", "0")
        self.end_headers()

    def log_message(self, *_):
        pass
