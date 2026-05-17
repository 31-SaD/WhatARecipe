---
name: conventional-commit
description: Create git commits using Conventional Commits. Use when the user asks to commit, stage and commit, or write a commit message for the current changes.
---

Create git commits that follow [Conventional Commits](https://www.conventionalcommits.org/) and match this repository's style.

## Steps

1. Inspect the working tree before committing (run in parallel):
   - `git status` — untracked and modified files
   - `git diff` — unstaged changes
   - `git diff --cached` — staged changes (if any)
   - `git log --oneline -10` — recent message style in this repo
2. Determine the **type** and optional **scope** from the change (see Types below). Prefer one logical change per commit.
3. Draft the message:
   - **Subject**: `<type>[optional scope]: <description>` — imperative mood, lowercase after the colon, no trailing period, ~72 chars max
   - **Body** (optional): explain *why*, not a file list; wrap at ~72 chars
4. Show the proposed message to the user when the change is large, ambiguous, or spans multiple types. Otherwise proceed if the user already asked to commit.
5. Stage only files that belong to this commit. Never stage secrets (`.env`, credentials, keys).
6. Commit using a HEREDOC for the message. Run `git status` after to confirm success.
7. If a pre-commit hook fails, fix the issue and create a **new** commit — do not amend unless all amend rules in the project/user git safety protocol are met.

## Types

| Type | When to use |
|------|-------------|
| `feat` | New user-facing behavior or API capability |
| `fix` | Bug fix |
| `docs` | Documentation only (`docs/`, README, AGENTS.md) |
| `test` | Adding or updating tests only |
| `refactor` | Code change that is not a fix or feature (e.g. rename, extract) |
| `style` | Formatting, whitespace; no logic change |
| `perf` | Performance improvement |
| `build` | Build tool, dependencies, Maven/npm config |
| `ci` | CI/CD workflows and scripts |
| `chore` | Maintenance: tooling, skills, `.gitignore`, repo hygiene |

**Scope** (optional): area affected, e.g. `api`, `app`, `docs`, `deps`. Use when it clarifies the subject; omit when unnecessary.

## Rules

- Only create commits when the user explicitly asks — never commit proactively.
- Never update git config, skip hooks, force-push to `main`/`master`, or push unless asked.
- Subject line describes the **intent** (why), not a dump of filenames.
- Breaking changes: add `!` after type/scope (`feat(api)!: ...`) and a `BREAKING CHANGE:` footer.
- Match existing repo tone — recent commits use short `chore:` subjects for docs and repo setup:
- Do not add flag '--trailer' flag with 'Co-authored-by' information

```
chore: add tdd.md documentation
chore: update AGENTS.md with backend frameworks
```

### Good vs bad subjects

✅ `feat(api): add create-recipe endpoint`  
✅ `fix(app): prevent double submit on recipe form`  
✅ `docs: document hexagonal layer boundaries`  
✅ `chore: add conventional-commit skill`  

❌ `updated files`  
❌ `feat: stuff`  
❌ `Fixed bug.`  
❌ `chore: update RecipeService.java, RecipeController.java, and tests`  

## Commit command

Pass the full message via HEREDOC:

```bash
git add <paths>
git commit -m "$(cat <<'EOF'
<type>[scope]: <subject>

<optional body>

EOF
)"
```

## Splitting changes

If `git status` shows unrelated changes (e.g. feature + docs + chore), suggest separate commits with distinct types instead of one mixed commit.
