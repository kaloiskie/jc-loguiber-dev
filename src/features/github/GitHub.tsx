import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GitHubSummary } from './GitHubSummary'
import { RepositoryGrid } from './RepositoryGrid'
import { fetchRepositoryCatalog } from './github-api'
import type { Repo } from './github-api'

const ReadmeModal = lazy(() => import('./ReadmeModal').then((module) => ({
  default: module.ReadmeModal,
})))

export default function GitHub() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [loadFailed, setLoadFailed] = useState(false)
  const [readmeRepo, setReadmeRepo] = useState<{
    owner: string
    repo: string
    private: boolean
  } | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    const controller = new AbortController()

    fetchRepositoryCatalog(controller.signal)
      .then((catalogRepos) => {
        if (catalogRepos === null) {
          setLoadFailed(true)
          return
        }

        setRepos(catalogRepos)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const openReadme = useCallback((owner: string, repo: string, isPrivate: boolean) => {
    setReadmeRepo({ owner, repo, private: isPrivate })
  }, [])

  const closeReadme = useCallback(() => {
    setReadmeRepo(null)
  }, [])

  return (
    <section id="github" className="page-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={false}
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
            <p className="text-text-muted text-sm" aria-live="polite">Loading repository catalog...</p>
          ) : (
            <div className="section-stack">
              {repos.length > 0 ? (
                <>
                  <GitHubSummary repos={repos} />
                  <RepositoryGrid repos={repos} onOpenReadme={openReadme} />
                </>
              ) : (
                <div className="repo-empty" role={loadFailed ? 'alert' : undefined}>
                  <p>{loadFailed ? 'GitHub is temporarily unavailable.' : 'No repositories are available.'}</p>
                  <a href="https://github.com/kaloiskie" target="_blank" rel="noopener noreferrer">
                    View GitHub profile
                  </a>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {readmeRepo && (
        <Suspense fallback={null}>
          <ReadmeModal
            owner={readmeRepo.owner}
            repo={readmeRepo.repo}
            isPrivate={readmeRepo.private}
            onClose={closeReadme}
          />
        </Suspense>
      )}
    </section>
  )
}
