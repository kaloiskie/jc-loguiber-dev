# Push on Main

When the user asks to push, commit all changes and push to `main`. Always follow this workflow:

1. Stage all changes: `git add -A`
2. Commit: `git commit -m "<message>"`
3. Ensure on main: `git branch -M main`
4. Push: `git push origin main`

Never push to any branch other than `main`. Always use concise, imperative commit messages.
