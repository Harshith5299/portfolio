# 05 · Writing code SonarCloud accepts

SonarCloud (SonarQube Cloud) analyses every PR through its GitHub App ("SonarCloud Code Analysis" check), using **Automatic Analysis**. The only config is `.sonarcloud.properties` (it excludes `frontend/src/data/**` from duplication detection, because content arrays look identical to Sonar's token matcher). There is intentionally no sonar workflow in `.github/workflows/`.

The quality gate fails a PR on new **security** issues (any severity counts against the security rating), **duplication over 3%** on new code, or unreviewed security hotspots. Maintainability issues don't fail the gate but should be fixed anyway. They are cheap, and a clean dashboard is part of what the portfolio shows.

## Findings this repo has already hit (don't repeat them)

These were all real findings on PRs #16–#22.

| Rule (as SonarCloud words it) | Where it happened | Write this instead |
|---|---|---|
| **Reflected XSS via unsanitized user input** (Blocker, security) | `api/ask.py` `_respond()` wrote JSON that could echo user-influenced text | Serialise with `_safe_json`: `json.dumps(..., ensure_ascii=True)` then escape `<`, `>`, `&` as `<`, `>`, `&`. Always send `Content-Type: application/json` and `X-Content-Type-Options: nosniff`. Never write raw input into a response. |
| Hard-coded credential / secret | A literal fake API key in `tests/test_ask.py` | `secrets.token_hex(8)` at runtime, or read from env |
| Add a nested comment explaining why this method is empty | `def log_message(self, *_): pass` in API handlers | Put a comment in the body: `# Silence per-request stderr; we log via _log.` |
| Remove this redundant Exception class; it derives from another which is already caught | `except (ValueError, UnicodeDecodeError)` in `ask.py` | Catch only the parent (`ValueError`), with a comment saying it covers the subclass |
| Remove this unnecessary `list()` call | `list(...)` around something already iterable in `_pow.py` | Iterate directly |
| **Do not use Array index in keys** | `AskApp.tsx` lists | Use a stable id (`turn.id`, `s.id`, the string itself if unique, or a character offset like `key={at}`) |
| **Mark the props of the component as read-only** | `AskApp.tsx`, `ProjectCard.tsx` | `function Card({ project }: Readonly<{ project: Project }>)` or `Readonly<CardProps>` |
| Extract this nested ternary operation into an independent statement | `AskApp.tsx` | Compute a variable first, or use a small lookup object / `if` chain |
| Nested template literal | `ProjectCard.tsx` className | Build the pieces in variables or with `[...].filter(Boolean).join(' ')` |
| Text does not meet the minimal contrast requirement | `AskApp.css`, `AskRagPreview.css` | WCAG AA: 4.5:1 for normal text (3:1 for large). Lighten muted greys on the dark background rather than lowering opacity |
| CI supply-chain hardening | New E2E job in `ci.yml` | `npm ci --ignore-scripts` where install scripts aren't needed, `persist-credentials: false` on `actions/checkout`, minimal `permissions:`, actions pinned to a commit SHA |

## Habits that keep the gate green

- **No copy-paste.** Extract shared JSX into a component (as `ProjectCard.tsx` did) and shared styles into `index.css` utilities. Duplication is measured on new code, so a copied block in one PR can fail the gate on its own.
- **Validate at the boundary.** Every API handler caps body size, checks types and lengths, strips control characters, and rate-limits.
- **Secrets only from `os.environ`**, never in code, tests, docs or commit messages.
- **Accessibility counts.** Contrast, `aria-hidden` on decorative SVG, `aria-label` on icon-only buttons, and links opening in a new tab carry `rel="noopener noreferrer"` (E2E checks this last one).
- **Catch narrowly in Python.** A broad `except Exception` needs a comment saying why (see `_rag.answer`: "any SDK or network failure falls back to extractive").
- **Prefer `Readonly<>` props, stable keys, no nested ternaries** in every new React component, even when ESLint doesn't complain. ESLint and Sonar have different rule sets.

## Reading SonarCloud results from an agent session

`sonarcloud.io` is **not reachable** from Claude cloud containers (the egress proxy blocks it). What does work:

1. `pull_request_read` with `method: get_check_runs` on the PR to find the "SonarCloud Code Analysis" check run id.
2. `get_check_run` with that id. Its `output.summary` gives the gate result and counts: new issues, security hotspots, coverage, duplication. It does **not** list individual issues.
3. If the gate fails and the summary doesn't make the cause obvious, **fix the likeliest cause once**, then ask Buddy to open the issues link (`https://sonarcloud.io/project/issues?id=Harshith5299_portfolio&pullRequest=<N>&issueStatuses=OPEN,CONFIRMED&sinceLeakPeriod=true`) and paste the rule, file and line. In #18, two blind fixes were wasted before asking.
4. Fix every listed issue in one validated push, not just the blocker.

Coverage on new code shows 0.0% because no coverage report is uploaded; the gate doesn't require coverage. Don't add dead code to game it.
