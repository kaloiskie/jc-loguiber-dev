import { redactPrivateReadme } from './readme-redaction.mjs'

const GITHUB_API = 'https://api.github.com'
const CACHE_TTL_MS = 15 * 60 * 1000
const MAX_PAGES = 5
const MAX_README_BYTES = 2 * 1024 * 1024
const README_CONCURRENCY = 6

const SELECTED_REPOSITORIES = new Set([
  'kaloiskie/jc-loguiber-dev',
  'kaloiskie/toktok-nabunturan-fare',
  'incredible-gaming-inc/stl-loyalty-program',
  'kaloiskie/northman-sqs-gateway',
  'incredible-gaming-inc/northman-web-be',
  'incredible-gaming-inc/northman-web-fe',
  'incredible-gaming-inc/northman-web-sdk',
  'incredible-gaming-inc/northman-vehicle-pwa',
  'kaloiskie/suki-rewards',
  'incredible-gaming-inc/nexusagent-apk',
])

let cache = null
const publicReadmeCache = new Map()
const privateReadmePreviewCache = new Map()
const readmeSummaryCache = new Map()

function getTokens() {
  return [
    process.env.GITHUB_TOKEN ?? process.env.VITE_GITHUB_TOKEN,
    process.env.GITHUB_TOKEN_NGC ?? process.env.VITE_GITHUB_TOKEN_NGC,
  ].filter(Boolean)
}

function getRepositoryKey(repository) {
  return `${repository.owner.login}/${repository.name}`.toLowerCase()
}

async function fetchRepositoryPage(token, page) {
  const query = new URLSearchParams({
    sort: 'pushed',
    per_page: '100',
    page: String(page),
    visibility: 'all',
    affiliation: 'owner,collaborator,organization_member',
  })
  const response = await fetch(`${GITHUB_API}/user/repos?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    throw new Error(`GitHub repository request failed with status ${response.status}`)
  }

  const repositories = await response.json()
  if (!Array.isArray(repositories)) throw new Error('GitHub returned an invalid repository response')
  return repositories
}

async function fetchRepositoriesForToken(token) {
  const repositories = []

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const pageRepositories = await fetchRepositoryPage(token, page)
    repositories.push(...pageRepositories)
    if (pageRepositories.length < 100) break
  }

  return repositories
}

async function fetchContributionPage(token, cursor) {
  const query = `
    query PortfolioContributions($cursor: String) {
      viewer {
        login
        repositoriesContributedTo(
          first: 100
          after: $cursor
          contributionTypes: [COMMIT]
          includeUserRepositories: true
        ) {
          nodes { databaseId }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  `
  const response = await fetch(`${GITHUB_API}/graphql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { cursor } }),
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    throw new Error(`GitHub contribution request failed with status ${response.status}`)
  }

  const payload = await response.json()
  if (payload.errors?.length || !payload.data?.viewer) {
    throw new Error('GitHub returned an invalid contribution response')
  }

  return payload.data.viewer
}

async function fetchContributionProfile(token) {
  const repositoryIds = new Set()
  let cursor = null
  let login = ''

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const viewer = await fetchContributionPage(token, cursor)
    login = viewer.login
    for (const repository of viewer.repositoriesContributedTo.nodes) {
      repositoryIds.add(repository.databaseId)
    }

    const pageInfo = viewer.repositoriesContributedTo.pageInfo
    if (!pageInfo.hasNextPage) break
    cursor = pageInfo.endCursor
  }

  return { login, repositoryIds }
}

async function fetchQualifiedRepositories(token) {
  const [repositories, contributionProfile] = await Promise.all([
    fetchRepositoriesForToken(token),
    fetchContributionProfile(token),
  ])
  const accountLogin = contributionProfile.login.toLowerCase()

  return {
    accountLogin,
    repositories: repositories.filter(repository => (
      repository.owner.login.toLowerCase() === accountLogin
        || contributionProfile.repositoryIds.has(repository.id)
    )),
  }
}

function stripMarkdown(text) {
  return text
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]{1,3}/g, '')
    .replace(/^>+\s*/, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

function summarizeReadme(markdown) {
  const lines = markdown.split('\n').map(line => line.trim())
  let title
  let index = 0

  for (; index < lines.length; index += 1) {
    if (/^#\s+/.test(lines[index])) {
      title = stripMarkdown(lines[index].replace(/^#\s+/, '')) || undefined
      index += 1
      break
    }
  }

  let description
  for (; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line || /^#{1,6}\s+/.test(line) || /^<[^>]+>$/.test(line)) continue
    if (/^!?\[/.test(line) || /^[-*_]{3,}$/.test(line) || /^\|.*\|$/.test(line)) continue

    const text = stripMarkdown(line)
    if (text.length > 10) {
      description = text.length > 180 ? `${text.slice(0, 177)}...` : text
      break
    }
  }

  return { title, description }
}

async function fetchReadmeMarkdown(repository) {
  for (const token of getTokens()) {
    const response = await fetch(
      `${GITHUB_API}/repos/${encodeURIComponent(repository.owner.login)}/${encodeURIComponent(repository.name)}/readme`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.raw+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        signal: AbortSignal.timeout(10_000),
      },
    )

    if (response.status === 404) continue
    if (!response.ok) throw new Error(`GitHub README request failed with status ${response.status}`)

    const contentLength = Number.parseInt(response.headers.get('content-length') ?? '0', 10)
    if (contentLength > MAX_README_BYTES) throw new Error('GitHub README exceeds the size limit')

    const markdown = await response.text()
    if (Buffer.byteLength(markdown, 'utf8') > MAX_README_BYTES) {
      throw new Error('GitHub README exceeds the size limit')
    }

    return markdown
  }

  return null
}

async function getReadmeSummary(repository) {
  const cacheKey = getRepositoryKey(repository)
  const cached = readmeSummaryCache.get(cacheKey)
  if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS) return cached.summary

  try {
    const markdown = await fetchReadmeMarkdown(repository)
    const summary = markdown
      ? { ...summarizeReadme(markdown), available: true }
      : { available: false }
    readmeSummaryCache.set(cacheKey, { createdAt: Date.now(), summary })

    if (markdown && !repository.private) {
      publicReadmeCache.set(cacheKey, { createdAt: Date.now(), markdown })
    }

    return summary
  } catch (error) {
    console.warn(`README summary failed for ${cacheKey}:`, error instanceof Error ? error.message : 'unknown error')
    return { available: false }
  }
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await mapper(items[index])
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

async function toRepository(repository, ownedAccounts) {
  const summary = await getReadmeSummary(repository)
  const repositoryKey = getRepositoryKey(repository)

  return {
    id: repository.id,
    name: repository.name,
    owner: { login: repository.owner.login },
    private: repository.private,
    description: repository.description,
    html_url: repository.private ? null : repository.html_url,
    stargazers_count: repository.stargazers_count,
    forks_count: repository.forks_count,
    language: repository.language,
    topics: Array.isArray(repository.topics) ? repository.topics : [],
    pushed_at: repository.pushed_at,
    relationship: ownedAccounts.has(repository.owner.login.toLowerCase()) ? 'owned' : 'organization',
    selected: SELECTED_REPOSITORIES.has(repositoryKey),
    readme_title: summary.title ?? null,
    readme_description: summary.description ?? null,
    readme_available: summary.available,
  }
}

async function refreshRepositories() {
  const tokens = getTokens()
  if (tokens.length === 0) throw new Error('GitHub server tokens are not configured')

  const results = await Promise.allSettled(tokens.map(fetchQualifiedRepositories))
  const successful = results.filter(result => result.status === 'fulfilled')
  if (successful.length === 0) throw new Error('All GitHub repository requests failed')

  const ownedAccounts = new Set(successful.map(result => result.value.accountLogin))
  const repositories = successful.flatMap(result => result.value.repositories)
  const uniqueRepositories = [...new Map(
    repositories.map(repository => [repository.id, repository]),
  ).values()]
    .sort((first, second) => Date.parse(second.pushed_at) - Date.parse(first.pushed_at))

  return mapWithConcurrency(
    uniqueRepositories,
    README_CONCURRENCY,
    repository => toRepository(repository, ownedAccounts),
  )
}

export async function getRepositories() {
  if (cache && Date.now() - cache.createdAt < CACHE_TTL_MS) return cache.repositories

  try {
    const repositories = await refreshRepositories()
    cache = { createdAt: Date.now(), repositories }
    return repositories
  } catch (error) {
    if (cache) return cache.repositories
    throw error
  }
}

export async function getRepositoryReadmePreview(owner, repositoryName) {
  const repositories = await getRepositories()
  const repository = repositories.find(candidate => (
    candidate.owner.login.toLowerCase() === owner.toLowerCase()
      && candidate.name.toLowerCase() === repositoryName.toLowerCase()
  ))
  if (!repository) return null

  const cacheKey = getRepositoryKey(repository)
  const readmeCache = repository.private ? privateReadmePreviewCache : publicReadmeCache
  const cached = readmeCache.get(cacheKey)
  if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS) {
    return { markdown: cached.markdown, private: repository.private }
  }

  const markdown = await fetchReadmeMarkdown(repository)
  if (!markdown) return null

  const preview = repository.private ? redactPrivateReadme(markdown) : markdown
  readmeCache.set(cacheKey, { createdAt: Date.now(), markdown: preview })
  return { markdown: preview, private: repository.private }
}
