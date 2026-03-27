# Skill: /ship

Commit and push all staged/unstaged changes to GitHub under the user's own git identity.

## Usage
```
/ship                      — auto-generate commit message from diff
/ship "your message here"  — use a specific commit message
```

---

## Instructions

### 1. Parse args
If an argument is provided after `/ship`, use it as the commit message verbatim.
If no argument, generate a concise commit message from the diff (see step 3).

### 2. Show current status
Run `git status` to show what will be committed. Summarize the changes to the user.

### 3. Generate commit message (if not provided)
Run `git diff HEAD` (or `git diff` + `git diff --cached` if needed) to understand the changes.

Synthesize the commit message from **two sources**:
1. **The diff** — what files/code actually changed
2. **Current session context** — what the user asked for, what problem was being solved, any decisions made, errors fixed, or features built during this conversation

Use the session context to capture the *intent* behind the changes — the "why" that a raw diff can't show. The diff tells you what; the conversation tells you why.

Write a short, imperative commit message (≤72 chars). If the session context adds meaningful signal, include a body (1–3 lines) after a blank line explaining the motivation or approach.

Format:
```
<imperative subject line ≤72 chars>

<optional body: what problem this solves or what was decided — only if non-obvious from the subject>
```

Examples:
- `add cursor-vs-claude video scaffold` (simple, diff is self-explanatory)
- `fix CaptionOverlay timing offset\n\ntimeOffsetMs was being applied twice — once in overlay, once in segment` (session revealed the bug cause)

### 4. Stage all changes
```bash
git add -A
```

### 5. Commit — CRITICAL: use user's identity, no co-author
Commit with the user's configured git identity. Do NOT add any `Co-Authored-By` trailer.
The author must be the user's own GitHub account.

```bash
GIT_AUTHOR_NAME="Kaleb-Nim" \
GIT_AUTHOR_EMAIL="kaleb.nim@gmail.com" \
GIT_COMMITTER_NAME="Kaleb-Nim" \
GIT_COMMITTER_EMAIL="kaleb.nim@gmail.com" \
git commit -m "<commit message here>"
```

Do NOT append `Co-Authored-By: Claude` or any AI attribution to the commit message.

### 6. Push
```bash
git push
```

If the branch has no upstream yet, run:
```bash
git push -u origin HEAD
```

### 7. Confirm
Show the user the commit hash and a link hint to the repo on GitHub.
