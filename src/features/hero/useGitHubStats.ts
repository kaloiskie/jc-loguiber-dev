import { useState, useEffect } from 'react'

interface CacheEntry {
  repos: number
  commits: number
  timestamp: number
}

const CACHE_KEY = 'gh_stats'
const CACHE_TTL = 3600000
const CAREER_START = new Date('2022-01-01')
const GITHUB_USERNAME = 'kaloiskie'

function getCached(): CacheEntry | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() - entry.timestamp > CACHE_TTL) return null
    return entry
  } catch {
    return null
  }
}

function setCache(repos: number, commits: number) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ repos, commits, timestamp: Date.now() }))
  } catch { /* quota exceeded */ }
}

function calcYearsExp(): string {
  const now = new Date()
  const ms = now.getTime() - CAREER_START.getTime()
  const years = ms / (365.25 * 24 * 60 * 60 * 1000)
  const whole = Math.floor(years)
  if (whole < 1) return '<1'
  return `${whole}+`
}

function formatCount(n: number): string {
  if (n >= 1000) {
    const k = Math.round(n / 100) / 10
    return `${k}k+`
  }
  return `${n}+`
}

export function useGitHubStats() {
  const cached = getCached()
  const yearsExp = calcYearsExp()

  const [repos, setRepos] = useState<number | null>(cached?.repos ?? null)
  const [commits, setCommits] = useState<number | null>(cached?.commits ?? null)
  const [loading, setLoading] = useState(!cached)

  useEffect(() => {
    if (cached) return

    let cancelled = false
    const token = import.meta.env.VITE_GITHUB_TOKEN

    async function fetchStats() {
      try {
        const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const [userRes, commitRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
          token
            ? fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}&per_page=1`, {
                headers: { ...headers, Accept: 'application/vnd.github.cloak-preview+json' },
              })
            : Promise.resolve(null),
        ])

        let fetchedRepos = 0
        let fetchedCommits = 0

        if (!cancelled && userRes.ok) {
          const userData = await userRes.json()
          fetchedRepos = userData.public_repos ?? 0
          setRepos(fetchedRepos)
        }

        if (!cancelled && commitRes && commitRes.ok) {
          const commitData = await commitRes.json()
          fetchedCommits = commitData.total_count ?? 0
          setCommits(fetchedCommits)
        }

        if (!cancelled) {
          setCache(fetchedRepos || 20, fetchedCommits || 0)
        }
      } catch {
        /* use fallbacks */
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchStats()
    return () => { cancelled = true }
  }, [])

  return {
    yearsExp,
    reposDisplay: repos !== null ? formatCount(repos) : null,
    commitsDisplay: commits !== null ? formatCount(commits) : null,
    loading,
  }
}
