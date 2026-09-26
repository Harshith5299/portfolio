"""Shared structured logging for api/ functions.

Files starting with "_" are not deployed as endpoints by Vercel, so this is
importable by every function. Each call prints one JSON line to stdout/stderr,
which Vercel shows (and lets you filter) in the project's runtime logs.
"""
import json
import sys
import time


def log(level: str, msg: str, **fields) -> None:
    entry = {"level": level, "msg": msg, "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), **fields}
    stream = sys.stderr if level == "error" else sys.stdout
    print(json.dumps(entry, default=str), file=stream, flush=True)


def request_fields(handler) -> dict:
    return {
        "method": handler.command,
        "path": handler.path,
        "ua": handler.headers.get("User-Agent", "")[:200],
    }
