import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GitHubSummary } from './GitHubSummary'
import { ReadmeModal } from './ReadmeModal'
import { RepositoryGrid } from './RepositoryGrid'
import {
  GITHUB_TOKEN,
  GITHUB_TOKEN_NGC,
  ghFetch,
  ghFetchReadmeRaw,
  parseReadme,
} from './github-api'
import type { ReadmeMeta, Repo, Stats } from './github-api'

export default function GitHub() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [langMap, setLangMap] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [readmeRepo, setReadmeRepo] = useState<{ owner: string; repo: string; token?: string } | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [readmeMeta, setReadmeMeta] = useState<Record<number, ReadmeMeta>>({})
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    async function load() {
      try {
        const [personalRepos, ngcRepos] = await Promise.all([
          ghFetch(`/user/repos?sort=pushed&per_page=100&visibility=all&affiliation=owner,collaborator`, GITHUB_TOKEN),
          ghFetch(`/user/repos?sort=pushed&per_page=100&visibility=all&affiliation=owner,collaborator`, GITHUB_TOKEN_NGC),
        ])

        const seen = new Set<number>()
        const allRepos = [
          ...(Array.isArray(personalRepos) ? personalRepos : []),
          ...(Array.isArray(ngcRepos) ? ngcRepos : []),
        ]
          .filter((repo: Repo) => {
            if (seen.has(repo.id)) return false
            seen.add(repo.id)
            return true
          })
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())

        setRepos(allRepos)

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
        const statResponses = [commits1, prs1, issues1, commits2, prs2, issues2]
        if (statResponses.some(Boolean)) {
          setStats({
            totalCommits: (commits1?.total_count ?? 0) + (commits2?.total_count ?? 0) * 2,
            totalPRs: (prs1?.total_count ?? 0) + (prs2?.total_count ?? 0) * 2,
            totalIssues: (issues1?.total_count ?? 0) + (issues2?.total_count ?? 0) * 2,
          })
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (repos.length === 0) return
    const visible = showAll ? repos : repos.slice(0, 9)
    const pending = visible.filter(r => !(r.id in readmeMeta))
    if (pending.length === 0) return

    let cancelled = false
    Promise.all(
      pending.map(async repo => {
        const token = repo.owner.login === 'kaloiskie' ? GITHUB_TOKEN : GITHUB_TOKEN_NGC
        try {
          const res = await ghFetchReadmeRaw(repo.owner.login, repo.name, token)
          if (!res.ok) return [repo.id, {}] as const
          const text = await res.text()
          return [repo.id, parseReadme(text)] as const
        } catch {
          return [repo.id, {}] as const
        }
      })
    ).then(results => {
      if (cancelled) return
      setReadmeMeta(prev => {
        const next = { ...prev }
        for (const [id, meta] of results) next[id] = meta
        return next
      })
    })

    return () => {
      cancelled = true
    }
  }, [repos, showAll, readmeMeta])

  const openReadme = useCallback((owner: string, repo: string) => {
    const token = owner === 'kaloiskie' ? GITHUB_TOKEN : GITHUB_TOKEN_NGC
    setReadmeRepo({ owner, repo, token })
  }, [])

  const closeReadme = useCallback(() => {
    setReadmeRepo(null)
  }, [])

  return (
    <section id="github" className="page-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">Code activity</p>
          <div className="section-heading ruled-line">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Work visible in the repository.
            </h2>
          </div>

          {loading ? (
            <p className="text-text-muted text-sm">Loading…</p>
          ) : (
            <div className="section-stack">

              <GitHubSummary stats={stats} langMap={langMap} />
              <RepositoryGrid
                repos={repos}
                readmeMeta={readmeMeta}
                showAll={showAll}
                onShowAll={() => setShowAll(true)}
                onOpenReadme={openReadme}
              />

            </div>
          )}
        </motion.div>
      </div>

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
