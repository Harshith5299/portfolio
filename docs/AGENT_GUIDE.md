# Agent Guide — harshithportfolio.com

This document is written for AI coding agents. It covers the intent behind this portfolio, how to work in the codebase without breaking things, how to add new content correctly, and how to use the repo as reliable context for ongoing work.

Read **`CLAUDE.md`** at the repo root first — it has the quick-reference cheat-sheet. This guide goes deeper on intent, compatibility rules, and the preview system. For history, testing, SonarCloud and tooling, see **`docs/agent-handbook/`**.

---

## Intent and Audience

This portfolio is Harshith Chittajallu's (Buddy's) professional showcase for **software engineering recruiters and automated bots** (ATS scrapers, LinkedIn crawlers, search engines).

The primary success metric is **first impression quality**: a recruiter who lands on `harshithportfolio.com` should immediately see relevant projects, understand the technology depth, and find contact information within one scroll.

Secondary metric: **SEO and link previews**. The `index.html` carries full OG tags, Twitter cards, and a JSON-LD `Person` schema. Do not remove or weaken these.

### What "complete" looks like for a project card

A card is complete when:
- It has a descriptive, recruiter-readable `description` (one to two sentences, no jargon soup).
- Its `tags[]` list matches technologies a recruiter would search for.
- It has either a `liveUrl` (hosted demo) or a `previewId` (embedded interactive preview).
- Its `builtBy` badge is honest (see the badge convention in `CLAUDE.md`).

A project with only a title, description, and tags but no preview and no live URL should have `status: 'coming-soon'` to set expectations.

---

## Project preview system

### When to add a preview

Add a `previewId` when:
- The project has no deployed `liveUrl` yet.
- There is something worth showing — sample data, an architecture diagram, an animated UI mock.

Do not add a preview just to fill space. A minimal shimmer is worse than no preview.

### How to add a new preview

1. Create `frontend/src/components/previews/MyProjectPreview.tsx` and `MyProjectPreview.css`.
2. The component **must have a default export** (required by `React.lazy`).
3. Register it in `frontend/src/components/ProjectPreview.tsx` under `PREVIEW_MAP`:

```ts
'my-project': lazy(() => import('./previews/MyProjectPreview')),
```

4. Set `previewId: 'my-project'` on the `Project` object in `projects.ts`.

### Preview component rules

- **No external network calls.** Previews are embedded inside cards; they must render entirely from inline data or CSS animation. No `fetch`, no image URLs pointing to external hosts.
- **No global state side-effects.** Each preview is isolated.
- **Self-contained CSS.** Scope all class names to the component (e.g. prefix with `myp__`). Do not rely on `index.css` variables beyond CSS custom properties (`var(--bg-card)`, `var(--text)`, `var(--accent)`, `var(--border)`).
- **Keep it small.** The preview chunk should be under 5 kB gzipped. Avoid importing large libraries.
- **Animate sparingly.** One `useEffect` interval is fine. Don't trigger re-renders more than once per second.
- **Accessible.** Decorative SVG and animation elements should carry `aria-hidden`. The card title is the accessible name — the preview is embellishment.

### Preview sizing

The preview container (`.project-card__preview`) is `168px` tall. Design for that height. Content that overflows is clipped.

---

## Adding a project to the portfolio

### Step 1 — Add the entry in `projects.ts`

```ts
{
  title: 'My Project',
  description: 'One or two plain-English sentences a recruiter will understand.',
  tags: ['Python', 'FastAPI', 'React'],      // use recruiter-searchable terms
  status: 'live',                             // live | in-dev | coming-soon
  gradient: 'linear-gradient(135deg, #hex1 0%, #hex2 100%)',
  icon: '🚀',
  builtBy: 'solo',                            // solo | agent-assisted | collaborative | omit
  liveUrl: 'https://...',                     // if deployed
  repoUrl: 'https://github.com/Harshith5299/...',
  previewId: 'my-project',                   // if using embedded preview instead of liveUrl
}
```

Put new projects **near the top** of the array so they appear first in the grid.

### Step 2 — Choose gradient and icon

- Gradient: use the project's brand colours, or a dark colour scheme that reads well against the badge overlays. End with a dark tone (e.g. `#0d1f38`) so white text stays legible.
- Icon: one emoji that signals the domain at a glance.

### Step 3 — Verify CI passes

Run locally before opening a PR:

```bash
cd frontend
npm ci
npm run lint   # ESLint — must pass with zero errors
npm run build  # TypeScript + Vite — must emit no errors
```

SonarCloud Automatic Analysis also runs on every PR. The two gates that fail PRs:
- **Duplication > 3%** on new code. Avoid copy-pasting JSX blocks across components; extract shared markup into `shared.ts` data or helper components.
- **Coverage** — no coverage requirement is configured, but do not break the quality gate by adding unreachable dead code.

---

## How to use this repo as agent context / memory

### What lives where

| Source | What it holds |
|---|---|
| `CLAUDE.md` | Quick-reference for every agent: stack, layout, editing cheat-sheet |
| `docs/AGENT_GUIDE.md` | This file: intent, compatibility rules, preview system, CI rules |
| `frontend/src/data/projects.ts` | Ground truth for what projects are shown and how |
| `frontend/src/data/learning.ts` | Ground truth for learning/certifications shown |
| `frontend/src/components/Experience.tsx` | Inline career timeline |
| `frontend/src/components/Skills.tsx` | Inline skill groups |
| `/tmp/claude/memory/team/silo/` | Shared agent memory: project decisions, conventions, CI history |

### Loading context efficiently

When starting a task in this repo, an agent should read in this order:

1. `CLAUDE.md` — orientation
2. `docs/AGENT_GUIDE.md` — intent and rules (this file)
3. The specific file to be changed (e.g. `projects.ts`, a component)
4. Agent memory at `/tmp/claude/memory/team/silo/` — check for relevant decisions

Do not read the whole `src/` tree speculatively. Read only what the task requires.

### Writing good agent memory

The shared memory directory is at `/tmp/claude/memory/team/silo/`. Rules for what to persist:

- **Save**: decisions made about architecture, naming, or approach that a future agent would otherwise have to rediscover.
- **Save**: CI rules that aren't obvious from the code (e.g. the SonarCloud duplication threshold, the Node version requirement).
- **Save**: content decisions (e.g. "Buddy wants only public repos featured by default").
- **Don't save**: file paths, component names, or data that is derivable from `git ls-files` or a `grep`.
- **Don't save**: temporary task state or work-in-progress notes.

---

## CI and quality gates

### GitHub Actions workflows

| Workflow | Trigger | What it checks |
|---|---|---|
| `ci.yml` | Push / PR | ESLint + Vite build, Python API tests, Playwright E2E. Must pass for merge. |
| `deploy-prod.yml` | Push to `main` | Installs Node 24 + uv, builds, deploys to Vercel. |
| `trivy.yml` | PR / `main` / weekly | Filesystem, dependency, secret and misconfiguration scan. |

SonarCloud Automatic Analysis runs on every push to `main` and every PR via the SonarCloud GitHub App (not a workflow). Do not add a `sonarcloud.yml` — it was intentionally removed.

### Duplication rule (SonarCloud)

The gate fails if new code introduces >3% duplication. This matters for React components:
- Do not copy JSX card patterns across components. Factor them into shared utilities.
- `src/data/shared.ts` holds shared types and badge maps to avoid repeating them.
- `src/index.css` holds shared utility classes (`card-tags`, `card-tag`, `card-actions`, `section-label`, `section-title`, etc.).

### Preview chunks and bundle size

Each file in `src/components/previews/` becomes a separate Vite chunk. Keep each chunk small (< 5 kB gzipped). The main bundle (`index.js`) should stay under 300 kB gzipped — check the Vite build output.

---

## Branch and PR conventions

- Development always happens on a feature branch. Push to `main` only through a merged PR.
- Branch naming: `claude/topic-slug` for agent-opened branches.
- PR descriptions must begin with the attribution header (see the system-level instructions for the exact format — it includes the project thread link).
- Buddy merges PRs. Wait for "merge it" before merging. Do not auto-merge.
- SonarCloud issues listed in a PR comment are informational; fix them if they are true defects, skip if they are false positives or out-of-scope for the PR.

---

## Learning projects — agent posture

Projects in `src/data/learning.ts` tagged `builtBy: 'solo'` (or with no `builtBy`) are hand-coded by Buddy for personal skill development. When asked to help with these:

- **Teach and review** — explain what the code should do, point out bugs, suggest approaches.
- **Do not write the implementation** unless Buddy explicitly asks.

The `builtBy: 'solo'` label is a signal from Buddy to every agent that they should step back from writing code there. This applies to any linked external repo that Buddy identifies as a learning project.

---

## Extending the portfolio — compatibility checklist

When adding a new section, feature, or data source, check:

- [ ] New section component follows the pattern: `ComponentName.tsx` + `ComponentName.css`, imported in `App.tsx`, nav link added in `Navbar.tsx`.
- [ ] CSS classes are scoped to the component (no leaking global names).
- [ ] Shared patterns (tags, badges, card layouts) reuse existing CSS classes in `index.css`.
- [ ] No new external runtime dependencies are added without Buddy's approval.
- [ ] SEO-relevant data (page title, meta description, JSON-LD) is updated if the content changes significantly.
- [ ] `npm run lint` and `npm run build` pass with zero errors before the PR is opened.
- [ ] The `builtBy` badge is set honestly on any new project or learning item.
- [ ] If the new feature needs Vercel configuration, `vercel.json` is updated.
