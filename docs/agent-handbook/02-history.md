# 02 · History: what has been built, and what we learned

A record of the work so far, newest last, with the lesson each piece taught. Use `git log` and the PRs for exact diffs; this file keeps the *why*.

## Before September 2026: foundation

- Migrated from a self-hosted Hetzner/Jenkins setup to **Vercel + GitHub Actions** (`JenkinsFile` and `backend/` remain as unused leftovers).
- **#7, #8:** Node 24 actions; install `uv` before `vercel build` (Vercel's Python build needs it).
- **#9:** Trivy and SonarCloud scanning. SonarCloud later moved to Automatic Analysis, so there is no sonar workflow; don't add one back.
- **#11:** Vercel Web Analytics plus the `/api/log` error beacon.
- **#12:** SEO (meta, OG tags, JSON-LD `Person`), Learning section, `builtBy` badges, `CLAUDE.md`, first SonarCloud fixes.
- Project previews for real repos (Event Syncer, Spring Bank) and `docs/AGENT_GUIDE.md`; hero redesign with company badges and featured cards.

## 2026-09-27: the "Portfolio UI & Content Upgrades" project

Buddy started a Claude project to make the site competitive for AI developer roles. Work ran in parallel threads.

### #16 · Fix blank sections, add Playwright E2E, real experience

- **Bug:** every section below the hero rendered at opacity 0. A scroll-reveal CSS selector stopped matching during the September redesign, so the reveal animation never fired. Buddy thought those sections had simply never been built.
- **Why nobody noticed:** CI only ran lint and build. Nothing looked at the rendered page. Every check was green on a page that was mostly blank.
- **Fix and guard:** fixed the CSS, then added a Playwright suite (desktop + Pixel 7) that scrolls to each section and asserts it is visible, checks nav, contact form, images, links, mobile overflow and SEO, and fails on any browser console error. With the CSS fix reverted, 12 tests fail, so the suite really catches the bug. Added the "screenshot the preview" rule to `CLAUDE.md`.
- **Found by the new tests on first run:** the Resume button linked to a missing `resume.pdf`. It is now hidden until the file exists (`__HAS_RESUME__` in `vite.config.ts`).
- **Content:** replaced placeholder employers and invented metrics ("60% less review") with Buddy's real timeline. Where LinkedIn and the resume disagree, the resume wins (AT&T, not AMD; Value Labs 2017–2018 is real). GE Vernova is current since July 2026, 8+ years total.
- **SonarCloud:** flagged the new CI job's install step; fixed with `npm ci --ignore-scripts` for E2E and `persist-credentials: false` on checkout.
- **Lesson:** a check suite that can't see the page can't catch visual bugs. Test what a visitor experiences.

### #17 · Contact form email via Resend

- The form used to say "sent" while dropping every message (a TODO in `contact.py`). It now sends through Resend and shows "Message sent" only after Resend accepts the email; otherwise the visitor sees an error and Buddy's address.
- **Gotcha 1:** Buddy looked for the key in Vercel. The key comes from resend.com; Vercel only stores it. Vercel's "AI Gateway" key is unrelated.
- **Gotcha 2:** a preview built before the env var was added never sees it. Redeploy after changing env vars.
- **Gotcha 3:** Resend's default sender `onboarding@resend.dev` only delivers to the Resend account owner's address.

### #18 · Ask My Portfolio (`/ask`), the live Gen AI demo

- Five of eight project cards were "in development" with nothing to click. This added a real, deployed RAG assistant: BM25 retrieval over `api/_knowledge.py`, Claude writes a cited answer, and it falls back to quoting passages when no model is available.
- **Key:** Buddy's Vercel only offered an AI Gateway key, so `_rag.py` supports both `AI_GATEWAY_API_KEY` (gateway, Anthropic-compatible endpoint) and `ANTHROPIC_API_KEY`.
- **Budget:** Buddy asked whether bots could drain his credits. Buddy chose Haiku + caps: Claude Haiku 4.5, 400 max tokens, 200 model calls/day and 20 per visitor per day, per warm instance. Then an invisible **proof-of-work bot check** (`_pow.py` / `pow.ts`) was added because Buddy asked for bot verification.
- **Threat model:** Buddy asked to assume an Opus-level attacker. No bot check stops an agent driving a real browser; the **hard daily cap** is what bounds spend, and the attacker pays more in its own tokens than it costs Buddy. A simulated attack of 2,610 requests over 7 strategies against a local copy reached the model only in the "solves every puzzle from 500 IPs" case, and stopped at the cap of 200.
- **SonarCloud blocker:** "Reflected XSS via unsanitized user input in `handler._respond()`" (`api/ask.py`). Two blind fixes failed because the agent couldn't see the report; Buddy pasted the issue list and it was fixed in one push. See [05-sonarcloud.md](05-sonarcloud.md) for the full list.
- **Lesson:** when a gate fails and you can't read why, ask for the report after the first failed guess. Don't keep guessing.

### #19 · Official GE Vernova title

- "Application Developer" (an agent had guessed a descriptive title in #16). Don't invent job titles; ask.

### #20 · Contact form spam protection

- Hidden honeypot field `website`, a 3-second minimum fill time (`elapsedMs`), and 5 messages per IP per hour. Blocked submissions are dropped quietly. The limit is per warm instance, so it's best-effort.

### #21 · `/ask` misses and "Retrieval only" transparency

- "how to reach him" returned nothing: `how/to/him` are stopwords, and "reach" didn't match "reached" in the contact passage. Fixed with light suffix stemming and recruiter synonyms, and a unit test.
- Buddy saw "Retrieval only" on gibberish and thought the key was broken. No-match questions never call the model. The page now shows the reason next to the label.
- **Lesson:** when a feature has several silent fallbacks, show *which* one fired. It saves a debugging round trip with the user.

### #22 · Featured Work above the fold

- The hero's "A sample of what I'm building" row showed three placeholder cards. It now renders `PROJECTS.slice(0, 3)` using the shared `ProjectCard` (compact variant), so the live RAG demo is visible and clickable on first load. The card markup was extracted from `Projects.tsx` into `ProjectCard.tsx`, which also avoids SonarCloud duplication.
- An E2E test asserts the Ask My Portfolio card is first and above the fold at 1400×900.
- SonarCloud nits fixed: `Readonly<>` props, nested template literal.

## Open items (as of 2026-09-27)

- `resume.pdf`: Buddy's resume has typos and isn't final. Don't add it until he sends a final PDF.
- `og-image.png` (1200×630) is still missing.
- Nobody has confirmed a "Generated by" answer on production `/ask` yet. Ask Buddy to try "Has he worked in banking?" if in doubt.
- Buddy's LinkedIn still says AMD instead of AT&T and doesn't list GE Vernova.
- Old PR #4 (mobile-first + PWA for the old starter page) was recommended for closing.
- Rate limits and caps are per instance; Upstash Redis is the upgrade path if abuse appears.
