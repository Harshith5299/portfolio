# 03 · Adding content without breaking anything

The quick field reference is in `CLAUDE.md`; preview component rules are in `docs/AGENT_GUIDE.md`. This file is about **where else a change has to go**, because several facts are stored in more than one place.

## The sync map

| When you change… | Also update… | Why |
|---|---|---|
| A role in `EXPERIENCE` (`Experience.tsx`) | The matching `exp-*` passage in `api/_knowledge.py`; the hero company badges in `Hero.tsx` if the employer is new; "years" text if it changes | `/ask` must never contradict the site |
| Years of experience (8+) | Hero stats, About, `index.html` meta description and OG/Twitter text, `_knowledge.py` `about-summary` | Recruiters and link previews read these |
| `SKILL_GROUPS` (`Skills.tsx`) | Skills passages in `_knowledge.py` | Same |
| About text | `about-*` passages in `_knowledge.py` | Same |
| A project in `projects.ts` | Its project passage in `_knowledge.py`; the order (first three = hero Featured Work) | Same, plus the hero |
| LinkedIn / GitHub / email | `Hero.tsx`, `Contact.tsx` (`CONTACT_LINKS`), `Footer.tsx`, `index.html` JSON-LD `sameAs`, `about-ways-of-working` passage in `_knowledge.py` (it holds the LinkedIn URL) | Four UI places plus the corpus |
| Section order or a new section | `App.tsx`, `Navbar.tsx` `NAV_LINKS`, `SECTION_IDS` in `frontend/e2e/fixtures.ts` | E2E asserts the order |

Quick check before you push: `grep -rn "<old fact>" frontend api` should come back empty.

## Recipes

### Add a project

1. Add an entry to `PROJECTS` in `frontend/src/data/projects.ts` (fields in `CLAUDE.md`). Keep "Ask My Portfolio" first.
2. Give it a `liveUrl` or a `previewId`; otherwise use `status: 'coming-soon'`. Label `builtBy` honestly.
3. Add a passage to `api/_knowledge.py` describing only what the card says, and a `tests/test_ask.py` case that a natural question retrieves it.
4. Tests: `content.spec.ts` already checks every card renders and previews load. If the project adds new behaviour (a new link type, a new page), add a spec.

### Add a preview

Follow `docs/AGENT_GUIDE.md` → "How to add a new preview". Key constraints: default export, registered in `PREVIEW_MAP`, no network calls, component-prefixed CSS, 168 px tall, `aria-hidden` on decoration, no index-based React keys.

### Add or edit a role

Edit `EXPERIENCE` in `Experience.tsx`. Use only facts Buddy confirmed (see memory `career-facts-source`): resume beats LinkedIn, no invented metrics, no guessed titles. Update the `_knowledge.py` passage in the same PR.

### Add a course or certification

Edit `LEARNING_ITEMS` in `learning.ts`. If Buddy is hand-coding it (`builtBy: 'solo'`), any linked repo is his to write. Teach, don't implement.

### Add a new section

1. `ComponentName.tsx` + `ComponentName.css` in `components/`, imported in `App.tsx` in the right order.
2. A `NAV_LINKS` entry in `Navbar.tsx`.
3. Add the id to `SECTION_IDS` in `frontend/e2e/fixtures.ts`, which gives you visibility and nav tests for free, plus a spec for anything interactive.
4. Reuse `section-label`, `section-title`, `card-tags` and friends from `index.css` instead of copying styles (SonarCloud duplication).
5. If recruiters should be able to ask about it, add passages to `_knowledge.py`.

### Add a new API endpoint

1. `api/name.py` with `class handler(BaseHTTPRequestHandler)`. Helpers go in `api/_something.py`, since underscore files aren't deployed as endpoints.
2. Copy the hardening pattern from `contact.py` / `ask.py`: require `Content-Length`, cap body size, validate every field, rate-limit per client, return JSON with `Content-Type: application/json` and `X-Content-Type-Options: nosniff`, and never echo raw input (see `_safe_json`).
3. Secrets come from `os.environ`, never from code. Document new variables in `CLAUDE.md` and [01-architecture.md](01-architecture.md), and tell Buddy exactly where to set them in Vercel (Production and Preview), then to redeploy.
4. Unit tests in `tests/` with any third-party API faked (see [04-testing.md](04-testing.md)), and an E2E test with the endpoint mocked via `page.route`.

## SEO checklist for content changes

`frontend/index.html` holds the title, meta description, OG/Twitter tags and JSON-LD `Person` (`name`, `jobTitle`, `url`, `sameAs`). If a change alters who Buddy is on paper (a new role, a new headline skill), update these too. `content.spec.ts` validates that the JSON-LD parses.
