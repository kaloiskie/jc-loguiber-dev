import { Router } from 'express'
import { getRepositories, getRepositoryReadmePreview } from '../services/github-repositories.mjs'

export const githubRouter = Router()

githubRouter.get('/repositories', async (_request, response) => {
  try {
    const repositories = await getRepositories()
    response.set('Cache-Control', 'public, max-age=300, stale-if-error=3600')
    response.json({ repositories })
  } catch (error) {
    console.error('GitHub repository catalog failed:', error instanceof Error ? error.message : 'unknown error')
    response.status(502).json({ error: 'GitHub repository catalog is temporarily unavailable' })
  }
})

githubRouter.get('/repositories/:owner/:repository/readme', async (request, response) => {
  const { owner, repository } = request.params
  const validName = /^[a-zA-Z0-9_.-]{1,100}$/
  if (!validName.test(owner) || !validName.test(repository)) {
    response.status(400).json({ error: 'Invalid repository identifier' })
    return
  }

  try {
    const preview = await getRepositoryReadmePreview(owner, repository)
    if (preview === null) {
      response.status(404).json({ error: 'Repository README not found' })
      return
    }

    response.set({
      'Cache-Control': 'public, max-age=300, stale-if-error=3600',
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Readme-Preview': preview.private ? 'redacted-private' : 'public',
    })
    response.send(preview.markdown)
  } catch (error) {
    console.error('Repository README request failed:', error instanceof Error ? error.message : 'unknown error')
    response.status(502).json({ error: 'Repository README is temporarily unavailable' })
  }
})
