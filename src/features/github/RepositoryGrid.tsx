import { FaBookOpen, FaCircle, FaCodeFork, FaStar } from 'react-icons/fa6'
import { LANG_COLORS } from './github-api'
import type { ReadmeMeta, Repo } from './github-api'

interface RepositoryGridProps {
  repos: Repo[]
  readmeMeta: Record<number, ReadmeMeta>
  showAll: boolean
  onShowAll: () => void
  onOpenReadme: (owner: string, repo: string) => void
}

function RepositoryGrid({
  repos,
  readmeMeta,
  showAll,
  onShowAll,
  onOpenReadme,
}: RepositoryGridProps) {
  const visibleRepos = showAll ? repos : repos.slice(0, 9)

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-muted">
        Repositories
      </p>
      <div className="repo-grid">
        {visibleRepos.map((repo) => {
          const meta = readmeMeta[repo.id]
          const title = meta?.title || repo.name
          const description = meta?.description || repo.description

          return (
            <div key={repo.id} className="repo-card">
              <div className="repo-card-header">
                <span className="repo-card-title">{title}</span>
                {repo.private && <span className="repo-card-badge">private</span>}
              </div>

              {description && <p className="repo-card-desc">{description}</p>}

              <div className="repo-card-footer">
                {repo.language && (
                  <span className="repo-card-stat">
                    <FaCircle size={7} style={{ color: LANG_COLORS[repo.language] ?? '#888' }} />
                    {repo.language}
                  </span>
                )}
                <span className="repo-card-stat"><FaCodeFork size={11} /> {repo.forks_count}</span>
                <span className="repo-card-stat"><FaStar size={11} /> {repo.stargazers_count}</span>
              </div>

              <button
                type="button"
                onClick={() => onOpenReadme(repo.owner.login, repo.name)}
                className="repo-card-details-btn"
              >
                <FaBookOpen size={11} />
                Read README
              </button>
            </div>
          )
        })}
      </div>

      {!showAll && repos.length > 9 && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={onShowAll} className="repo-show-more">
            Show more repositories
          </button>
        </div>
      )}
    </div>
  )
}

export { RepositoryGrid }
