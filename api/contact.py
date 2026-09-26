from http.server import BaseHTTPRequestHandler
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from _log import log, request_fields  # noqa: E402


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)

        try:
            data = json.loads(body)
            name = str(data.get("name", "")).strip()
            email = str(data.get("email", "")).strip()
            message = str(data.get("message", "")).strip()

            if not (name and email and message):
                log("warn", "contact validation failed", **request_fields(self))
                self._respond(400, {"ok": False, "error": "All fields are required."})
                return

            # TODO: wire up email sending (e.g. SendGrid, Resend) when ready.
            # For now, log and return success so the form works end-to-end.
            log("info", "contact received", name=name, email=email, preview=message[:80], **request_fields(self))

            self._respond(200, {"ok": True, "message": "Message received!"})

        except (json.JSONDecodeError, Exception) as exc:
            log("error", "contact failed", error=str(exc), **request_fields(self))
            self._respond(500, {"ok": False, "error": str(exc)})

    def do_OPTIONS(self):
        self._respond(200, {})

    def _respond(self, status: int, body: dict):
        payload = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, *_):
        pass
