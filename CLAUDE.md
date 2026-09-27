# Portfolio — Agent Guide

Personal portfolio site for Harshith Chittajallu. Audience: software engineering recruiters and bots. URL: harshithportfolio.com.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite, plain CSS |
| Backend | Python Vercel Serverless Functions (`api/`) |
| Deploy | Vercel (GitHub → auto-deploy on push to `main`) |
| CI | GitHub Actions: `ci.yml` (lint + build + Playwright E2E), `deploy-prod.yml`, `trivy.yml`; SonarCloud Automatic Analysis (config in `.sonarcloud.properties`) |
| Analytics | Vercel Web Analytics + custom `/api/log` beacon |

## Repo layout

```
frontend/           React SPA (Vite)
  index.html        SEO: title, meta description, OG tags, JSON-LD Person schema
  public/
    favicon.svg     HC initials favicon
    resume.pdf      ← ADD THIS: Buddy's CV (not yet in repo)
    og-image.png    ← ADD THIS: 1200×630 OG preview image (not yet in repo)
  src/
    components/     One .tsx + .css file per section
      previews/     Lazy-loaded project preview components (code-split per project)
    data/
      projects.ts   PROJECTS array — edit here to add/update portfolio projects
      learning.ts   LEARNING_ITEMS array — edit here to add courses/certs
    assets/         profile.jpg
    hooks/          useScrollReveal
api/                Python Vercel functions
  contact.py        Contact form handler (sends via Resend)
  log.py            Client-side error beacon (hardened, rate-limited)
docs/               Agent-readable documentation
  AGENT_GUIDE.md    Comprehensive guide for AI agents working in this repo
```

## Sections (render order)

1. **Hero** — name, typewriter roles, CTA buttons (View Projects, Get In Touch, Resume, GitHub, LinkedIn)
2. **About** — bio and highlights
3. **Skills** — skill groups grid
4. **Projects** — portfolio projects from `src/data/projects.ts`
5. **Learning** — courses/certs from `src/data/learning.ts`
6. **Experience** — career timeline (inline data in `Experience.tsx`)
7. **Contact** — form + links
8. **Footer**

Nav links mirror this order. Adding a new section: create `ComponentName.tsx` + `ComponentName.css`, import in `App.tsx`, add a `NAV_LINKS` entry in `Navbar.tsx`.

## Content editing cheat-sheet

**Add a portfolio project** → edit `src/data/projects.ts`, push to `PROJECTS`.
Fields: `title`, `description`, `tags[]`, `status` (`live|in-dev|coming-soon`), `gradient`, `icon`, `builtBy` (`solo|agent-assisted|collaborative`), optional `liveUrl`, `repoUrl`, `previewId`.

`previewId` links to a lazily-loaded preview component in `src/components/previews/`. Set it when the project has no live URL but you want an interactive visual inside the card. See **`docs/AGENT_GUIDE.md`** for how to add a new preview.

**Add a course / cert** → edit `src/data/learning.ts`, push to `LEARNING_ITEMS`.
Fields: `title`, `platform`, `type` (`course|certification|project`), `status` (`planned|in-progress|completed`), `description`, `tags[]`, optional `builtBy`, `repoUrl`, `certUrl`.

**Update experience** → edit the `EXPERIENCE` array in `src/components/Experience.tsx`.

**Update skills** → edit `SKILL_GROUPS` in `src/components/Skills.tsx`.

**Update social links / LinkedIn URL** → they appear in: `Hero.tsx` (CTAs), `Contact.tsx` (`CONTACT_LINKS`), `Footer.tsx`, and `index.html` (JSON-LD `sameAs`). Keep all four in sync.

## `builtBy` badge convention

Shows on project and learning cards. Honest labelling helps recruiters see what's hand-coded vs AI-assisted.

- `solo` — Buddy wrote it by hand, for learning
- `agent-assisted` — built with AI coding agents (this portfolio, main showcase projects)
- `collaborative` — mix of hand-coded and agent-assisted
- omit — unknown / not relevant

## Agent conventions

**This portfolio site** is intentionally built by AI coding agents. Agents write production code, open PRs, fix CI, and drive features end-to-end. Full autonomy here.

**Learning & coursework projects** (the `LEARNING_ITEMS` with `builtBy: 'solo'` or no `builtBy`, plus any separate repos Buddy links from them) are hand-coded by Buddy for skill development. When an agent is asked to help with one of these, the correct posture is:

- **Teach and review** — explain what the code should do, point out bugs, suggest approaches.
- **Do not write the implementation** unless Buddy explicitly says "write it for me."
- Code review, explanations, test ideas, and architecture guidance are all fair game; generating the solution is not.

This distinction is intentional and important: the `builtBy: 'solo'` label on a learning item is a signal to all agents that they should step back from writing code there.

## Verifying UI changes (required)

Lint and build passing does **not** mean the page works: a CSS bug once left every section below the hero invisible while all checks were green. Before calling any UI change done:

1. Run `npm run test:e2e` (Playwright, `frontend/e2e/`). It checks every section is actually visible after scrolling, nav links, the contact form (mocked API), images, links, mobile overflow and SEO tags, and fails on any browser console error. Each test prints its browser logs.
2. Open the PR's Vercel preview (link in the `vercel[bot]` comment) and screenshot it at desktop and mobile widths. Look at the screenshots.
3. When you add a section or feature, add a test for it in `frontend/e2e/`.

To run the suite against a deployed URL instead of a local build: `BASE_URL=https://… npm run test:e2e`.

## Deploy

Push to `main` → `deploy-prod.yml` triggers automatically (installs `uv` for Python, Node 24, `npm ci`, `npm run build`, Vercel deploy). No manual steps.

## Missing assets (action needed by Buddy)

1. `frontend/public/resume.pdf` — add your CV here. The Hero Resume button is hidden until this file exists (checked at build time in `vite.config.ts`).
2. `frontend/public/og-image.png` — 1200×630 px image for OG/Twitter previews; referenced in `index.html`.
3. LinkedIn URL is `linkedin.com/in/harshith-ch` — confirmed correct.
4. Enable Vercel Analytics in the Vercel dashboard (Project → Analytics → Enable).
5. Contact form email: set `RESEND_API_KEY` in Vercel (Production + Preview). Optional `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (sender on a Resend-verified domain; the default `onboarding@resend.dev` only delivers to the Resend account owner's address). Without the key, `/api/contact` returns 503 and the form tells visitors to email directly.

## Commands

```bash
cd frontend
npm ci          # install
npm run dev     # dev server (http://localhost:5173)
npm run build   # production build → dist/
npm run lint    # ESLint
npm run test:e2e  # Playwright E2E (first time: npx playwright install chromium)
```
