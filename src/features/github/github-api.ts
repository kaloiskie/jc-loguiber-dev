export const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  Go: '#00add8',
  Rust: '#dea584',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Java: '#b07219',
  Kotlin: '#a97bff',
  'C++': '#f34b7d',
}
export interface Repo {
  id: number
  name: string
  owner: { login: string }
  private: boolean
  description: string | null
  html_url: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  pushed_at: string
  relationship: 'owned' | 'organization'
  selected: boolean
  readme_title: string | null
  readme_description: string | null
  readme_available: boolean
}

export function fetchReadmePreview(
  owner: string,
  repo: string,
  signal?: AbortSignal,
) {
  const path = `/api/github/repositories/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`
  return fetch(`${path}?preview=redacted-v2`, {
    headers: { Accept: 'text/markdown' },
    signal,
  })
}

export async function fetchRepositoryCatalog(signal?: AbortSignal): Promise<Repo[] | null> {
  try {
    const response = await fetch('/api/github/repositories', {
      headers: { Accept: 'application/json' },
      signal,
    })
    if (!response.ok) return null

    const payload: unknown = await response.json()
    if (!isRepositoryPayload(payload)) return null
    return payload.repositories
  } catch {
    return null
  }
}

function isRepositoryPayload(value: unknown): value is { repositories: Repo[] } {
  if (typeof value !== 'object' || value === null || !('repositories' in value)) return false
  if (!Array.isArray(value.repositories)) return false

  return value.repositories.every((repo: unknown) => {
    if (typeof repo !== 'object' || repo === null) return false

    return 'id' in repo
      && typeof repo.id === 'number'
      && 'name' in repo
      && typeof repo.name === 'string'
      && 'owner' in repo
      && typeof repo.owner === 'object'
      && repo.owner !== null
      && 'login' in repo.owner
      && typeof repo.owner.login === 'string'
      && 'pushed_at' in repo
      && typeof repo.pushed_at === 'string'
      && 'relationship' in repo
      && (repo.relationship === 'owned' || repo.relationship === 'organization')
      && 'selected' in repo
      && typeof repo.selected === 'boolean'
  })
}
