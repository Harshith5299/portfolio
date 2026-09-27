from http.server import BaseHTTPRequestHandler
from html import escape
import json
import os
import re
import sys
import urllib.error
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from _log import log, request_fields  # noqa: E402

# Email delivery goes through Resend (https://resend.com). Configure in Vercel:
#   RESEND_API_KEY      required; without it the form returns 503 instead of
#                       pretending to succeed
#   CONTACT_TO_EMAIL    inbox that receives messages (default below)
#   CONTACT_FROM_EMAIL  sender; must be on a domain verified in Resend. The
#                       default onboarding@resend.dev sender only delivers to
#                       the email address the Resend account was created with.
RESEND_URL = "https://api.resend.com/emails"
DEFAULT_TO = "harshithchittajallu5299@gmail.com"
DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>"

MAX_BODY_BYTES = 20_000
MAX_NAME = 100
MAX_EMAIL = 254
MAX_MESSAGE = 5_000
EMAIL_RE = re.compile(r"^[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+$")


def validate(data: dict) -> tuple[str, str, str, str | None]:
    """Return (name, email, message, error); error is a user-facing message or None."""
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()
    if not (name and email and message):
        return name, email, message, "All fields are required."
    if len(name) > MAX_NAME or len(email) > MAX_EMAIL or len(message) > MAX_MESSAGE:
        return name, email, message, "One of the fields is too long."
    if not EMAIL_RE.match(email):
        return name, email, message, "Please enter a valid email address."
    return name, email, message, None


def send_email(name: str, email: str, message: str) -> None:
    """Send the contact message via Resend. Raises on any delivery failure."""
    api_key = os.environ["RESEND_API_KEY"]
    subject_name = " ".join(name.split())  # no newlines in the subject
    payload = {
        "from": os.environ.get("CONTACT_FROM_EMAIL", DEFAULT_FROM),
        "to": [os.environ.get("CONTACT_TO_EMAIL", DEFAULT_TO)],
        "reply_to": email,
        "subject": f"Portfolio contact from {subject_name}",
        "text": f"From: {name} <{email}>\n\n{message}",
        "html": (
            f"<p><strong>From:</strong> {escape(name)} &lt;{escape(email)}&gt;</p>"
            f"<p style=\"white-space:pre-wrap\">{escape(message)}</p>"
        ),
    }
    req = urllib.request.Request(
        RESEND_URL,
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "harshithportfolio-contact/1.0",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        if resp.status >= 300:
            raise RuntimeError(f"Resend returned {resp.status}")


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            if length > MAX_BODY_BYTES:
                self._respond(413, {"ok": False, "error": "Message is too long."})
                return
            data = json.loads(self.rfile.read(length))
            if not isinstance(data, dict):
                raise ValueError("body must be a JSON object")
        except ValueError:  # includes json.JSONDecodeError
            log("warn", "contact bad request", **request_fields(self))
            self._respond(400, {"ok": False, "error": "Invalid request."})
            return

        name, email, message, error = validate(data)
        if error:
            log("warn", "contact validation failed", error=error, **request_fields(self))
            self._respond(400, {"ok": False, "error": error})
            return

        if not os.environ.get("RESEND_API_KEY"):
            log("error", "contact email not configured", name=name, email=email, preview=message[:80], **request_fields(self))
            self._respond(503, {"ok": False, "error": "Email delivery is not configured."})
            return

        try:
            send_email(name, email, message)
        except Exception as exc:
            detail = exc.read().decode(errors="replace")[:300] if isinstance(exc, urllib.error.HTTPError) else ""
            log("error", "contact send failed", error=str(exc), detail=detail, email=email, **request_fields(self))
            self._respond(502, {"ok": False, "error": "Could not send your message."})
            return

        log("info", "contact sent", name=name, email=email, **request_fields(self))
        self._respond(200, {"ok": True, "message": "Message sent!"})

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
