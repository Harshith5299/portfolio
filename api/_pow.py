"""Invisible proof-of-work bot check for /api/ask.

Before a question can reach Claude, the browser must fetch a signed
challenge (GET /api/ask) and find a counter whose SHA-256 over
"<token>:<counter>" starts with POW_BITS zero bits. A human's browser does
this in the background in about a second; a script spamming the endpoint has
to pay that CPU cost for every model call, and requests without a valid proof
only get free extractive answers. Tokens are HMAC-signed, bound to the
client, expire after TOKEN_TTL seconds and are single-use per warm instance.
"""
import hashlib
import hmac
import os
import secrets
import time

POW_BITS = int(os.environ.get("ASK_POW_BITS", "16"))
TOKEN_TTL = 300

_used: dict[str, float] = {}


def _secret() -> bytes:
    explicit = os.environ.get("ASK_CHALLENGE_SECRET")
    if explicit:
        return explicit.encode()
    # Derived from whichever model key is configured, so no extra setup is needed.
    key = os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("AI_GATEWAY_API_KEY") or ""
    return hashlib.sha256(b"ask-pow:" + key.encode()).digest()


def _sign(payload: str) -> str:
    return hmac.new(_secret(), payload.encode(), hashlib.sha256).hexdigest()[:32]


def issue(client_id: str) -> dict:
    payload = f"{int(time.time())}.{secrets.token_hex(8)}"
    return {"token": f"{payload}.{_sign(payload + '|' + client_id)}", "bits": POW_BITS}


def _leading_zero_bits(digest: bytes) -> int:
    bits = 0
    for byte in digest:
        if byte == 0:
            bits += 8
            continue
        return bits + 8 - byte.bit_length()
    return bits


def verify(proof, client_id: str) -> bool:
    """True if proof = {"token", "counter"} is a fresh, unused, correctly solved challenge."""
    if not isinstance(proof, dict):
        return False
    token, counter = str(proof.get("token", "")), str(proof.get("counter", ""))
    parts = token.split(".")
    if len(parts) != 3 or not counter.isdigit() or len(counter) > 12:
        return False
    ts, nonce, sig = parts
    if not ts.isdigit() or not hmac.compare_digest(sig, _sign(f"{ts}.{nonce}|{client_id}")):
        return False
    now = time.time()
    if not 0 <= now - int(ts) <= TOKEN_TTL or token in _used:
        return False
    digest = hashlib.sha256(f"{token}:{counter}".encode()).digest()
    if _leading_zero_bits(digest) < POW_BITS:
        return False
    for t in [t for t, expiry in _used.items() if expiry < now]:
        del _used[t]
    _used[token] = now + TOKEN_TTL
    return True
