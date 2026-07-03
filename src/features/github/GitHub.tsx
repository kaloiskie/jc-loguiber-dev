import { useState, useEffect, useCallback } from 'react'
import { FaStar, FaCodeFork, FaCircle, FaXmark } from 'react-icons/fa6'

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const GITHUB_TOKEN_NGC = import.meta.env.VITE_GITHUB_TOKEN_NGC

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Java: '#b07219',
  'C++': '#f34b7d',
}

function ghFetch(path: string, token = GITHUB_TOKEN) {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  }).then(r => r.json())
}

function ghFetchReadme(owner: string, repo: string, token: string) {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.html',
    },
  })
}

interface Repo {
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

interface Stats {
  totalCommits: number
  totalPRs: number
  totalIssues: number
}

function ReadmeModal({ owner, repo, token, onClose }: {
  owner: string
  repo: string
  token: string
  onClose: () => void
}) {
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    ghFetchReadme(owner, repo, token)
      .then(async (res) => {
        if (!res.ok) {
          setError(true)
          return
        }
        setHtml(await res.text())
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [owner, repo, token, onClose])

  return (
    <div className="readme-overlay" onClick={onClose}>
      <div className="readme-modal" onClick={(e) => e.stopPropagation()}>
        <div className="readme-header">
          <a
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="readme-repo-link"
          >
            {owner}/{repo} ↗
          </a>
          <button className="readme-close" onClick={onClose} aria-label="Close">
            <FaXmark size={18} />
          </button>
        </div>

        <div className="readme-body">
          {loading && (
            <p className="readme-status">Loading README…</p>
          )}
          {error && !loading && (
            <p className="readme-status">No README found for this repository.</p>
          )}
          {html && (
            <div
              className="readme-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function GitHub() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [langMap, setLangMap] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [readmeRepo, setReadmeRepo] = useState<{ owner: string; repo: string; token: string } | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const [personalRepos, ngcRepos] = await Promise.all([
            ghFetch(`/user/repos?sort=pushed&per_page=100&visibility=all&affiliation=owner,collaborator`, GITHUB_TOKEN),
            ghFetch(`/user/repos?sort=pushed&per_page=100&visibility=all&affiliation=owner,collaborator`, GITHUB_TOKEN_NGC),
            ])

            if (!Array.isArray(personalRepos)) {
            console.error('GitHub repos fetch failed:', personalRepos)
            return
            }

            const seen = new Set<number>()
            const allRepos = [
            ...(Array.isArray(personalRepos) ? personalRepos : []),
            ...(Array.isArray(ngcRepos) ? ngcRepos : []),
            ]
            .filter(repo => {
                if (seen.has(repo.id)) return false
                seen.add(repo.id)
                return true
            })
            .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())

            const topRepos = allRepos
            setRepos(topRepos as Repo[])

            const langTotals: Record<string, number> = {}
            await Promise.all(
            allRepos.map(async repo => {
                const token = repo.owner.login === 'kaloiskie' ? GITHUB_TOKEN : GITHUB_TOKEN_NGC
                const langs = await ghFetch(`/repos/${repo.owner.login}/${repo.name}/languages`, token)
                if (typeof langs !== 'object' || Array.isArray(langs) || langs === null) return
                for (const [lang, bytes] of Object.entries(langs as Record<string, number>)) {
                langTotals[lang] = (langTotals[lang] ?? 0) + bytes
                }
            })
            )
            setLangMap(langTotals)

            const [commits1, prs1, issues1, commits2, prs2, issues2] = await Promise.all([
            ghFetch(`/search/commits?q=author:kaloiskie&per_page=1`, GITHUB_TOKEN),
            ghFetch(`/search/issues?q=author:kaloiskie+type:pr&per_page=1`, GITHUB_TOKEN),
            ghFetch(`/search/issues?q=author:kaloiskie+type:issue&per_page=1`, GITHUB_TOKEN),
            ghFetch(`/search/commits?q=author:northmangamingcorporation-dot&per_page=1`, GITHUB_TOKEN_NGC),
            ghFetch(`/search/issues?q=author:northmangamingcorporation-dot+type:pr&per_page=1`, GITHUB_TOKEN_NGC),
            ghFetch(`/search/issues?q=author:northmangamingcorporation-dot+type:issue&per_page=1`, GITHUB_TOKEN_NGC),
            ])
            setStats({
            totalCommits: (commits1.total_count ?? 0) + (commits2.total_count ?? 0) * 2,
            totalPRs: (prs1.total_count ?? 0) + (prs2.total_count ?? 0) * 2,
            totalIssues: (issues1.total_count ?? 0) + (issues2.total_count ?? 0) * 2,
            })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const openReadme = useCallback((owner: string, repo: string) => {
    const token = owner === 'kaloiskie' ? GITHUB_TOKEN : GITHUB_TOKEN_NGC
    setReadmeRepo({ owner, repo, token })
  }, [])

  const closeReadme = useCallback(() => {
    setReadmeRepo(null)
  }, [])

  const totalLangBytes = Object.values(langMap).reduce((a, b) => a + b, 0)
  const topLangs = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  return (
    <section id="github" className="section-container py-20">
      <h2 className="font-display text-2xl font-semibold text-text mb-1">GitHub</h2>
      <p className="text-text-dim text-sm mb-10">Open source activity & repositories</p>

      {loading ? (
        <p className="text-text-dim text-sm">Loading…</p>
      ) : (
        <div className="space-y-10">

          {stats && (
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Commits', value: stats.totalCommits.toLocaleString() },
                { label: 'Pull Requests', value: stats.totalPRs.toLocaleString() },
                { label: 'Issues', value: stats.totalIssues.toLocaleString() },
              ].map(s => (
                <div
                  key={s.label}
                  className="bg-bg-overlay border border-border rounded-md p-4 text-center"
                >
                  <p className="font-display text-xl font-semibold text-accent">{s.value}</p>
                  <p className="text-text-dim text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {topLangs.length > 0 && (
            <div>
              <p className="text-text-muted text-xs font-medium mb-3 uppercase tracking-widest">
                Languages
              </p>
              <div className="flex h-2 rounded-full overflow-hidden mb-4">
                {topLangs.map(([lang, bytes]) => (
                  <div
                    key={lang}
                    style={{
                      width: `${(bytes / totalLangBytes) * 100}%`,
                      backgroundColor: LANG_COLORS[lang] ?? '#888',
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {topLangs.map(([lang, bytes]) => (
                  <div key={lang} className="flex items-center gap-1.5 text-xs text-text-dim">
                    <FaCircle size={8} style={{ color: LANG_COLORS[lang] ?? '#888' }} />
                    <span>{lang}</span>
                    <span className="text-text-muted">
                      {((bytes / totalLangBytes) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-text-muted text-xs font-medium mb-3 uppercase tracking-widest">
              Repositories
            </p>
            <div className="repo-grid">
              {(showAll ? repos : repos.slice(0, 9)).map(repo => (
                <button
                  key={repo.id}
                  onClick={() => openReadme(repo.owner.login, repo.name)}
                  className="repo-card"
                >
                  <div className="repo-card-header">
                    <span className="repo-card-title">{repo.name}</span>
                    {repo.private && <span className="repo-card-badge">private</span>}
                  </div>

                  {repo.description && (
                    <p className="repo-card-desc">{repo.description}</p>
                  )}

                  <div className="repo-card-footer">
                    {repo.language && (
                      <span className="repo-card-stat">
                        <FaCircle size={7} style={{ color: LANG_COLORS[repo.language] ?? '#888' }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="repo-card-stat">
                      <FaCodeFork size={11} /> {repo.forks_count}
                    </span>
                    <span className="repo-card-stat">
                      <FaStar size={11} /> {repo.stargazers_count}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {!showAll && repos.length > 9 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="repo-show-more"
                >
                  Show More
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {readmeRepo && (
        <ReadmeModal
          owner={readmeRepo.owner}
          repo={readmeRepo.repo}
          token={readmeRepo.token}
          onClose={closeReadme}
        />
      )}
    </section>
  )
}
