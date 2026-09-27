"""Tests for the Ask My Portfolio RAG endpoint. Run: python3 -m unittest discover tests"""
import json
import os
import secrets
import sys
import threading
import unittest
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.request import Request, urlopen

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "api"))
import _rag  # noqa: E402
from ask import handler as AskHandler  # noqa: E402

# Random per run: only needs to be non-empty so the generation path is taken.
FAKE_KEY = secrets.token_hex(8)


class FakeClaude(BaseHTTPRequestHandler):
    """Stands in for the Messages API so the generation path runs offline."""

    last_body = None

    def do_POST(self):
        FakeClaude.last_body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        payload = json.dumps({
            "id": "msg_test", "type": "message", "role": "assistant", "model": "claude-opus-5",
            "content": [{"type": "text", "text": "He built LangGraph decisioning tools [1]."}],
            "stop_reason": "end_turn", "stop_sequence": None,
            "usage": {"input_tokens": 10, "output_tokens": 5},
        }).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, *_):
        pass


def serve(handler_cls):
    server = HTTPServer(("127.0.0.1", 0), handler_cls)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


class RetrievalTests(unittest.TestCase):
    def test_ranks_relevant_passage_first(self):
        self.assertEqual(_rag.retrieve("What AI and agent experience does he have?")[0]["id"], "skills-ai")
        self.assertEqual(_rag.retrieve("What did he do at his first job?")[0]["id"], "exp-junior")

    def test_unknown_topic_returns_nothing(self):
        self.assertEqual(_rag.retrieve("Does he know Rust?"), [])

    def test_extractive_answer_cites_sources(self):
        os.environ.pop("ANTHROPIC_API_KEY", None)
        result = _rag.answer("How can I contact him?")
        self.assertEqual(result["mode"], "retrieval")
        self.assertIn("linkedin.com/in/harshith-ch", result["answer"])
        self.assertIn("[1]", result["answer"])


class GenerationTests(unittest.TestCase):
    def test_generates_with_claude_when_key_set(self):
        fake = serve(FakeClaude)
        os.environ.update(ANTHROPIC_API_KEY=FAKE_KEY, ANTHROPIC_BASE_URL=f"http://127.0.0.1:{fake.server_port}")
        try:
            result = _rag.answer("What AI experience does he have?")
        finally:
            os.environ.pop("ANTHROPIC_API_KEY")
            os.environ.pop("ANTHROPIC_BASE_URL")
            fake.shutdown()
        self.assertEqual(result["mode"], "generated")
        self.assertEqual(result["answer"], "He built LangGraph decisioning tools [1].")
        body = FakeClaude.last_body
        self.assertEqual(body["fallbacks"], "default")
        self.assertIn("[1] AI and agentic systems skills", body["messages"][0]["content"])

    def test_falls_back_when_api_unreachable(self):
        os.environ.update(ANTHROPIC_API_KEY=FAKE_KEY, ANTHROPIC_BASE_URL="http://127.0.0.1:9")
        try:
            result = _rag.answer("What AI experience does he have?")
        finally:
            os.environ.pop("ANTHROPIC_API_KEY")
            os.environ.pop("ANTHROPIC_BASE_URL")
        self.assertEqual(result["mode"], "retrieval")
        self.assertTrue(result["sources"])


class EndpointTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = serve(AskHandler)
        cls.url = f"http://127.0.0.1:{cls.server.server_port}/api/ask"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()

    def post(self, body: bytes, ip: str):
        req = Request(self.url, data=body, headers={"Content-Type": "application/json", "X-Forwarded-For": ip})
        try:
            with urlopen(req) as resp:
                return resp.status, json.loads(resp.read())
        except Exception as exc:  # HTTPError carries status + body
            return exc.code, json.loads(exc.read() or b"null")

    def test_answers_question(self):
        status, body = self.post(json.dumps({"question": "Tell me about Spring Bank"}).encode(), "10.0.0.1")
        self.assertEqual(status, 200)
        self.assertEqual(body["sources"][0]["id"], "proj-spring-bank")

    def test_rejects_empty_question(self):
        status, _ = self.post(b'{"question": "  "}', "10.0.0.2")
        self.assertEqual(status, 400)

    def test_rate_limits_per_client(self):
        codes = [self.post(b'{"question": "skills"}', "10.0.0.3")[0] for _ in range(10)]
        self.assertEqual(codes.count(429), 2)


if __name__ == "__main__":
    unittest.main()
