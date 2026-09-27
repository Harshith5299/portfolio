# Agent Handbook: start here

This folder is the long-form memory of how harshithportfolio.com was built, why it looks the way it does, and the rules every agent working on it follows. It is written for two readers:

- **A future AI agent** picking up work in this repo, who needs the context that isn't obvious from the code.
- **Buddy (Harshith)**, who wants to understand how the pieces fit together, from an educational point of view.

`CLAUDE.md` at the repo root is the quick cheat-sheet. `docs/AGENT_GUIDE.md` covers the preview system and content conventions. This handbook goes deeper on history, testing, quality gates, tools and concepts.

## If you are an agent: do this first

1. Read this README fully, then the file for your task (table below).
2. **Save the "Rules to store in memory" section below to your project memory**, if you have a memory tool or directory (in Claude projects this is the shared team memory; see [06-connectors-and-tools.md](06-connectors-and-tools.md)). Before writing, read the memory index and update an existing entry instead of duplicating it. Keep one fact per memory file, and add a pointer line to the index such as `- Agent handbook: docs/agent-handbook/README.md (rules, history, testing, SonarCloud, tools)`.
3. When you finish a task that changes how things work (a new feature, a new env var, a new CI job, a lesson learned the hard way), update the matching handbook file in the same PR. A stale handbook is worse than none.

## Rules to store in memory

These are the rules that past agents learned, sometimes painfully. Save each one (or a condensed version) to memory.

1. **Green checks don't mean the page works.** A CSS bug once left every section below the hero invisible (opacity 0) for weeks while lint, build, SonarCloud and Trivy were all green. Before calling UI work done: run `npm run test:e2e`, then screenshot the Vercel preview at desktop (1400×900) and mobile (412 wide) and look at the screenshots.
2. **Every new feature ships with tests in the same PR.** UI features get a Playwright test in `frontend/e2e/`; API changes get a `unittest` in `tests/`. No test, not done. See [04-testing.md](04-testing.md).
3. **Write code SonarCloud accepts on the first push.** No array-index React keys, `Readonly<>` props, no nested ternaries, no empty methods without a comment, no hard-coded secrets (even in tests), escape anything echoed back from user input, meet WCAG text contrast, keep duplication under 3%. See [05-sonarcloud.md](05-sonarcloud.md).
4. **You can't open sonarcloud.io or harshithportfolio.com from a cloud container.** Read SonarCloud's summary through the GitHub check run (`get_check_run`); if the gate fails and the summary doesn't name the issue, ask Buddy to paste the rule and file from the SonarCloud issues page. Don't push blind fixes more than once.
5. **Career facts come from Buddy's resume, not LinkedIn.** Current role: Application Developer at GE Vernova since July 2026 (production support on an internal agentic AI platform on AWS Bedrock AgentCore). 8+ years total. Don't add `resume.pdf` until Buddy provides a final one.
6. **Content lives in more than one place; keep it in sync.** Experience, Skills, About and Projects facts are duplicated in `api/_knowledge.py` (the `/ask` corpus) and partly in `index.html` (SEO text, JSON-LD). Social links live in four files. See [03-adding-content.md](03-adding-content.md).
7. **The first three entries in `projects.ts` are the hero's "Featured Work".** The Ask My Portfolio card must stay first and above the fold (an E2E test checks it).
8. **Buddy merges, or says "merge it".** Open PRs, drive them green, then wait. Pushing to `main` deploys to production automatically.
9. **Learning projects are Buddy's to write.** Items marked `builtBy: 'solo'` are for his own practice: teach and review, don't write the implementation unless he says "write it for me".
10. **Model spend is capped on purpose.** `/ask` uses Claude Haiku 4.5 through the Vercel AI Gateway with daily caps and a proof-of-work bot check. Don't switch to a bigger model or raise caps without Buddy's say-so.

## Files in this handbook

| File | Read it when |
|---|---|
| [01-architecture.md](01-architecture.md) | You need the big picture: how the React site, the Python functions, Vercel, CI and third-party services connect |
| [02-history.md](02-history.md) | You want to know what has been built, in which PR, and what went wrong along the way |
| [03-adding-content.md](03-adding-content.md) | You are adding a project, role, skill, course, section or preview |
| [04-testing.md](04-testing.md) | You are writing or running tests (always, for any feature) |
| [05-sonarcloud.md](05-sonarcloud.md) | You are writing code that SonarCloud will analyse (always) |
| [06-connectors-and-tools.md](06-connectors-and-tools.md) | You need GitHub, Vercel, a browser, memory, or a connector, or something is blocked |
| [07-learning-guide.md](07-learning-guide.md) | Buddy asks "how does this work?", or you are teaching rather than building |

Last updated: 2026-09-27, after PR #22.
