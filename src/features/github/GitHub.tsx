import { useState, useEffect } from 'react'
import { FaStar, FaCodeFork, FaCircle } from 'react-icons/fa6'

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

export default function GitHub() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [langMap, setLangMap] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

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

          <div className="grid md:grid-cols-2 gap-4">
            {repos.map(repo => (
              <a
                key={repo.id}
                    href={repo.private ? undefined : repo.html_url}
                    target={repo.private ? undefined : '_blank'}
                    rel={repo.private ? undefined : 'noopener noreferrer'}
                    onClick={repo.private ? (e) => e.preventDefault() : undefined}
                    className={`group bg-bg-overlay border border-border rounded-md p-4 transition-colors duration-200 flex flex-col gap-2 ${repo.private ? 'cursor-default' : 'hover:border-accent/40'}`}
                    >
                    <div className="flex items-start justify-between gap-2">
                       <div className="flex items-center gap-2 min-w-0">
                        <p className={`text-sm font-medium truncate transition-colors duration-200 ${repo.private ? 'text-text-dim' : 'text-text group-hover:text-accent'}`}>
                            {repo.name}
                        </p>
                        {repo.private && (
                            <span className="shrink-0 text-[10px] bg-border text-text-dim px-1.5 py-0.5 rounded-sm">
                            private
                            </span>
                        )}
                        </div>
                  <div className="flex items-center gap-3 shrink-0 text-text-dim text-xs">
                    <span className="flex items-center gap-1">
                      <FaStar size={11} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCodeFork size={11} /> {repo.forks_count}
                    </span>
                  </div>
                </div>

                {repo.description && (
                  <p className="text-xs text-text-dim line-clamp-2">{repo.description}</p>
                )}

                <div className="flex items-center gap-3 mt-auto pt-1">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-xs text-text-dim">
                      <FaCircle size={8} style={{ color: LANG_COLORS[repo.language] ?? '#888' }} />
                      {repo.language}
                    </span>
                  )}
                  {repo.topics.slice(0, 3).map(t => (
                    <span
                      key={t}
                      className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

        </div>
      )}
    </section>
  )
}