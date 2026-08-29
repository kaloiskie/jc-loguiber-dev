export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
export const GITHUB_TOKEN_NGC = import.meta.env.VITE_GITHUB_TOKEN_NGC

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
  'C++': '#f34b7d',
}

export interface Repo {
  id: number
  name: string
  owner: { login: string }
  private: boolean
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  pushed_at: string
}

export interface Stats {
  totalCommits: number
  totalPRs: number
  totalIssues: number
}

export interface ReadmeMeta {
  title?: string
  description?: string
}

export async function ghFetch(path: string, token = GITHUB_TOKEN) {
  if (!token) return null

  try {
    const response = await fetch(`https://api.github.com${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    })

    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

export function ghFetchReadmeRaw(
  owner: string,
  repo: string,
  token?: string,
  signal?: AbortSignal,
) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.raw',
  }

  if (token) headers.Authorization = `Bearer ${token}`

  return fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers,
    signal,
  })
}

export function parseReadme(markdown: string): ReadmeMeta {
  const lines = markdown.split('\n').map((line) => line.trim())
  let title: string | undefined
  let index = 0

  for (; index < lines.length; index += 1) {
    if (/^#\s+/.test(lines[index])) {
      title = stripMarkdown(lines[index].replace(/^#\s+/, ''))
      index += 1
      break
    }
  }

  let description: string | undefined
  for (; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line || /^#{1,6}\s+/.test(line) || /^<[^>]+>$/.test(line)) continue
    if (/^\[?!\[/.test(line) || /^[-*_]{3,}$/.test(line) || /^\|.*\|$/.test(line)) continue
    if (/^>+\s*/.test(line) && line.replace(/^>+\s*/, '').length === 0) continue

    const text = stripMarkdown(line)
    if (text.length > 10) {
      description = text.length > 160 ? `${text.slice(0, 157)}…` : text
      break
    }
  }

  return { title, description }
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]{1,3}/g, '')
    .replace(/^>+\s*/, '')
    .trim()
}
