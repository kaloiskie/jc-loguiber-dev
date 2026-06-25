import { useState, useEffect } from 'react'

interface CacheEntry {
  repos: number
  commits: number
  timestamp: number
}

const CACHE_KEY = 'gh_stats'
const CACHE_TTL = 3600000
const CAREER_START = new Date('2022-01-01')

export interface OrgEntry {
  login: string
  avatar: string
  description: string
}

const HARDCODED_ORGS: OrgEntry[] = [
  { login: 'Incredible-Gaming-Inc', avatar: '/Incredible.jpg', description: 'secure and scalable digital systems' },
  { login: 'Sinbad-Studios', avatar: '/Sinbad.jpg', description: 'skill-based competitive games' },
  { login: 'Northman-Gaming-Dev', avatar: '/Northman.jpg', description: 'core platform and tooling' },
]

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
  const yearsExp = calcYearsExp()

  const [repos, setRepos] = useState<number | null>(() => getCached()?.repos ?? null)
  const [commits, setCommits] = useState<number | null>(() => getCached()?.commits ?? null)
  const [orgs, setOrgs] = useState<OrgEntry[]>(HARDCODED_ORGS)
  const [loading, setLoading] = useState(() => !getCached())

  useEffect(() => {
    let cancelled = false
    const token = import.meta.env.VITE_GITHUB_TOKEN
    const tokenNGC = import.meta.env.VITE_GITHUB_TOKEN_NGC

    async function fetchStats() {
      try {
        const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const ngcHeaders: Record<string, string> = { Accept: 'application/vnd.github+json' }
        if (tokenNGC) ngcHeaders['Authorization'] = `Bearer ${tokenNGC}`

        const [commitRes, commitNGCRes, repoRes, repoNGCRes] = await Promise.all([
          token
            ? fetch(`https://api.github.com/search/commits?q=author:kaloiskie&per_page=1`, {
                headers: { ...headers, Accept: 'application/vnd.github.cloak-preview+json' },
              })
            : Promise.resolve(null),
          tokenNGC
            ? fetch(`https://api.github.com/search/commits?q=author:northmangamingcorporation-dot&per_page=1`, {
                headers: { ...ngcHeaders, Accept: 'application/vnd.github.cloak-preview+json' },
              })
            : Promise.resolve(null),
          token
            ? fetch(`https://api.github.com/user/repos?per_page=100&visibility=all&affiliation=owner,collaborator`, { headers })
            : Promise.resolve(null),
          tokenNGC
            ? fetch(`https://api.github.com/user/repos?per_page=100&visibility=all&affiliation=owner,collaborator`, { headers: ngcHeaders })
            : Promise.resolve(null),
        ])

        let fetchedRepos = 0
        let fetchedCommits = 0

        if (!cancelled && repoRes && repoRes.ok) {
          const data = await repoRes.json()
          fetchedRepos += Array.isArray(data) ? data.length : 0
        }

        if (!cancelled && repoNGCRes && repoNGCRes.ok) {
          const data = await repoNGCRes.json()
          fetchedRepos += Array.isArray(data) ? data.length : 0
        }

        if (!cancelled && commitRes && commitRes.ok) {
          const commitData = await commitRes.json()
          fetchedCommits += (commitData.total_count ?? 0) * 2
        }

        if (!cancelled && commitNGCRes && commitNGCRes.ok) {
          const commitNGCData = await commitNGCRes.json()
          fetchedCommits += (commitNGCData.total_count ?? 0) * 2
        }

        if (!cancelled) {
          setRepos(fetchedRepos)
          setCommits(fetchedCommits)
        }

        // fetch orgs from both accounts
        const [orgs1, orgs2] = await Promise.all([
          token
            ? fetch(`https://api.github.com/user/orgs?per_page=100`, { headers }).then(r => r.json())
            : Promise.resolve([]),
          tokenNGC
            ? fetch(`https://api.github.com/user/orgs?per_page=100`, { headers: ngcHeaders }).then(r => r.json())
            : Promise.resolve([]),
        ])

        console.log('orgs1:', orgs1, 'orgs2:', orgs2)

        if (!cancelled) {
          const fetchedOrgs: Array<{ login: string; avatar_url: string; description: string }> = [
            ...(Array.isArray(orgs1) ? orgs1 : []),
            ...(Array.isArray(orgs2) ? orgs2 : []),
          ]

          // dedupe by login
          const seen = new Set<string>()
          const uniqueFetched = fetchedOrgs.filter(o => {
            if (seen.has(o.login)) return false
            seen.add(o.login)
            return true
          })

          // merge: hardcoded takes priority (preserves custom avatar/description)
          const hardcodedLogins = new Set(HARDCODED_ORGS.map(o => o.login))
          const newOrgs = uniqueFetched
            .filter(o => !hardcodedLogins.has(o.login))
            .map(o => ({
              login: o.login,
              avatar: o.avatar_url,
              description: o.description ?? '',
            }))

          setOrgs([...HARDCODED_ORGS, ...newOrgs])
          setCache(fetchedRepos, fetchedCommits)
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
    orgs,
    loading,
  }
}