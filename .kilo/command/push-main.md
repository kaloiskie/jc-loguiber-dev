# Push to Main

Always push the current branch changes to `main` on the remote `origin`.

## Steps

1. Check current status: `git status`
2. Stage all changes: `git add -A`
3. Commit with a concise, descriptive message: `git commit -m "<message>"`
4. Ensure branch is `main`: `git branch -M main` (if needed)
5. Push: `git push origin main`

## Notes

- Always commit before pushing
- Use descriptive commit messages in imperative mood
- Never force push or amend pushed commits
- If remote rejects, pull first then rebase: `git pull --rebase origin main`
