# 04 · Testing: every feature ships with its tests

## The rule

**A feature isn't done until it has a test that would fail without it, in the same PR.** UI behaviour gets a Playwright test in `frontend/e2e/`. Python behaviour gets a `unittest` in `tests/`. A bug fix gets a test that reproduces the bug first.

Why this rule exists: in September 2026 the whole site below the hero was invisible while every check was green, because nothing tested what a visitor sees (see [02-history.md](02-history.md) → #16).

## The three layers

| Layer | Tool | Where | Runs in CI as | What it proves |
|---|---|---|---|---|
| Static | ESLint + TypeScript (`tsc -b`) | `frontend/` | Lint & Build | Code compiles and follows lint rules |
| Unit / API | Python `unittest` | `tests/` | API tests | Retrieval, generation, caps, bot check, endpoint validation, escaping |
| End-to-end | Playwright (Chromium, desktop 1400×900 + Pixel 7) | `frontend/e2e/` | E2E (Playwright) | The real built page renders, scrolls, navigates, submits, links resolve, SEO is valid, no console errors |

Plus a human-style check that no automated test replaces: **screenshot the Vercel preview** (desktop and mobile) and look at it.

## Running tests

```bash
# Frontend: lint, typecheck, build
cd frontend && npm ci && npm run lint && npm run build

# E2E against a local production build (vite preview on :4173)
npm run test:e2e
# In a Claude cloud container Chromium is preinstalled; if Playwright can't find it:
PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:e2e   # never run `playwright install` there

# E2E against a deployed preview instead
BASE_URL=https://portfolio-git-<branch>-harshiths-projects-3b2f34b2.vercel.app npm run test:e2e

# Python API tests (from repo root)
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python -m unittest discover tests -v
```

On a CI failure, the "playwright-report" artifact on the Actions run has traces and screenshots, and each test prints its browser logs to the job output.

## Writing Playwright tests

Always import from `./fixtures`, not `@playwright/test`:

```ts
import { test, expect, scrollToSection } from './fixtures';
```

The fixture automatically:
- records console messages, page errors, failed requests and HTTP ≥ 400 responses, prints them after every test and attaches them to the report;
- **fails the test on any console error or uncaught exception**, so don't silence errors, fix them;
- stubs `/api/log` and Vercel analytics when running locally (they don't exist under `vite preview`).

Patterns that already exist and should be copied:

| Need | Example |
|---|---|
| Section visible after scrolling | `sections.spec.ts` (loops over `SECTION_IDS`) |
| Mock an API and assert the request body | `contact.spec.ts`: `page.route('**/api/contact', route => { body = route.request().postDataJSON(); return route.fulfill({ status: 200, json: { ok: true } }); })` |
| Error and rate-limit states | `contact.spec.ts` (`status: 500`, `status: 429`) |
| A second page (`/ask`) with a mocked challenge and answer | `ask.spec.ts` |
| Above-the-fold layout | `content.spec.ts` → "hero features the top three project cards…" (compares `boundingBox()` to the viewport; skip on mobile with `testInfo.project.name`) |
| Mobile-only behaviour | `navigation.spec.ts` (`isMobile` fixture) |
| Every same-origin file link exists | `content.spec.ts` |

Guidelines:
- Select by role and visible text (`getByRole('button', { name: 'Send Message' })`) so tests read like a visitor and survive CSS refactors.
- Never hit real third-party services (Resend, Claude) from E2E. Mock with `page.route`.
- Assert visibility with `toBeVisible()` after `scrollToSection`, because reveal animations depend on scrolling.
- Don't add `waitForTimeout` beyond the one in `scrollToSection`; prefer `expect(...).toBeVisible()`, which retries.
- New section → add its id to `SECTION_IDS` in `fixtures.ts`.

## Writing Python tests

`tests/test_ask.py` shows the house style:

- `sys.path` points at `api/`, so modules import directly (`import _rag`).
- **Fake external APIs with a local HTTP server**: `FakeClaude` is a `BaseHTTPRequestHandler` on a random port that returns a canned Messages API response. Tests point the code at it with the `ANTHROPIC_BASE_URL` or `AI_GATEWAY_BASE_URL` env var and remove the vars afterwards. The generation path runs offline and deterministically.
- **No hard-coded secrets, even fake ones.** Use `secrets.token_hex(8)`; SonarCloud flagged a literal test key in #18.
- Endpoint tests start the real `handler` on a local `HTTPServer` and make real requests with `urllib`.
- Reset module state between tests (`_rag._usage`, rate-limit dicts) in `setUp`.

Known gap: `api/contact.py` has no Python unit tests yet (it was verified against a mocked Resend by hand, and E2E mocks the endpoint). When you next touch it, add `tests/test_contact.py` covering validation, honeypot, fill time, rate limit, missing key (503) and a fake Resend success and failure.

## Definition of done for any PR

1. `npm run lint` and `npm run build` are clean.
2. `npm run test:e2e` passes locally (desktop + mobile), and `python -m unittest discover tests` passes if `api/` changed.
3. New behaviour has new tests.
4. The Vercel preview has been screenshotted at desktop and mobile and looked at.
5. CI is green on GitHub: Lint & Build, API tests, E2E, Trivy, and the SonarCloud quality gate.
