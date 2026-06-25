import { useState, useEffect } from 'react'
import { FaStar, FaCodeFork, FaCircle } from 'react-icons/fa6'

const GITHUB_USERNAME = 'kaloy' // ← your GitHub username
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

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

function ghFetch(path: string) {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  }).then(r => r.json())
}

interface Repo {
  id: number
  name: string
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
        const repoData: Repo[] = await ghFetch(
          `/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6&type=public`
        )
        setRepos(repoData)

        const langTotals: Record<string, number> = {}
        await Promise.all(
          repoData.map(async repo => {
            const langs = await ghFetch(`/repos/${GITHUB_USERNAME}/${repo.name}/languages`)
            for (const [lang, bytes] of Object.entries(langs as Record<string, number>)) {
              langTotals[lang] = (langTotals[lang] ?? 0) + bytes
            }
          })
        )
        setLangMap(langTotals)

        const [commits, prs, issues] = await Promise.all([
          ghFetch(`/search/commits?q=author:${GITHUB_USERNAME}&per_page=1`),
          ghFetch(`/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=1`),
          ghFetch(`/search/issues?q=author:${GITHUB_USERNAME}+type:issue&per_page=1`),
        ])
        setStats({
          totalCommits: commits.total_count ?? 0,
          totalPRs: prs.total_count ?? 0,
          totalIssues: issues.total_count ?? 0,
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
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-bg-overlay border border-border rounded-md p-4 hover:border-accent/40 transition-colors duration-200 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-text group-hover:text-accent transition-colors duration-200 truncate">
                    {repo.name}
                  </p>
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