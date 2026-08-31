import { useMemo, useState } from 'react'
import { BookOpen, Building2, Code2, LockKeyhole } from 'lucide-react'
import { FaCircle, FaCodeFork, FaStar } from 'react-icons/fa6'
import { LANG_COLORS } from './github-api'
import type { Repo } from './github-api'

type RepositoryFilter = 'selected' | 'all' | 'public' | 'private' | 'organization'

interface RepositoryGridProps {
  repos: Repo[]
  onOpenReadme: (owner: string, repo: string, isPrivate: boolean) => void
}

const FILTERS: Array<{ id: RepositoryFilter; label: string }> = [
  { id: 'selected', label: 'Selected' },
  { id: 'all', label: 'All' },
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' },
  { id: 'organization', label: 'Organization' },
]

function matchesFilter(repo: Repo, filter: RepositoryFilter) {
  if (filter === 'selected') return repo.selected
  if (filter === 'public') return !repo.private
  if (filter === 'private') return repo.private
  if (filter === 'organization') return repo.relationship === 'organization'
  return true
}

function RepositoryGrid({ repos, onOpenReadme }: RepositoryGridProps) {
  const [filter, setFilter] = useState<RepositoryFilter>('selected')
  const [showAll, setShowAll] = useState(false)
  const counts = useMemo(() => Object.fromEntries(
    FILTERS.map(({ id }) => [id, repos.filter((repo) => matchesFilter(repo, id)).length]),
  ) as Record<RepositoryFilter, number>, [repos])
  const filteredRepos = useMemo(
    () => repos.filter((repo) => matchesFilter(repo, filter)),
    [filter, repos],
  )
  const visibleRepos = showAll ? filteredRepos : filteredRepos.slice(0, 9)

  const changeFilter = (nextFilter: RepositoryFilter) => {
    setFilter(nextFilter)
    setShowAll(false)
  }

  return (
    <div>
      <div className="repo-toolbar">
        <div>
          <p className="repo-toolbar-label">Repository archive</p>
          <p className="repo-toolbar-context">
            {filter === 'selected'
              ? 'Current systems selected for relevance and production depth.'
              : `${filteredRepos.length} qualifying repositories in this view.`}
          </p>
        </div>
        <div className="repo-filters" role="tablist" aria-label="Filter repositories">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={filter === id}
              className={filter === id ? 'is-active' : undefined}
              onClick={() => changeFilter(id)}
            >
              <span>{label}</span>
              <small>{counts[id]}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="repo-grid" role="tabpanel">
        {visibleRepos.map((repo) => {
          const title = repo.readme_title || repo.name
          const description = repo.readme_description || repo.description || 'No repository summary available.'

          return (
            <article key={repo.id} className="repo-card">
              <div className="repo-card-header">
                <span className="repo-card-title">{title}</span>
                {repo.private && <span className="repo-card-badge">private</span>}
              </div>
              <p className="repo-card-owner">
                {repo.relationship === 'organization' ? <Building2 size={12} /> : <Code2 size={12} />}
                {repo.owner.login} / {repo.name}
              </p>

              <p className="repo-card-desc">{description}</p>

              <div className="repo-card-footer">
                {repo.language && (
                  <span className="repo-card-stat">
                    <FaCircle size={7} style={{ color: LANG_COLORS[repo.language] ?? '#888' }} />
                    {repo.language}
                  </span>
                )}
                {!repo.private && (
                  <>
                    <span className="repo-card-stat"><FaCodeFork size={11} /> {repo.forks_count}</span>
                    <span className="repo-card-stat"><FaStar size={11} /> {repo.stargazers_count}</span>
                  </>
                )}
              </div>

              {repo.private && repo.readme_available ? (
                <button
                  type="button"
                  onClick={() => onOpenReadme(repo.owner.login, repo.name, true)}
                  className="repo-card-details-btn"
                >
                  <LockKeyhole size={12} />
                  View redacted README
                </button>
              ) : repo.private ? (
                <div className="repo-card-private-note">
                  <LockKeyhole size={12} />
                  No README available
                </div>
              ) : repo.readme_available ? (
                <button
                  type="button"
                  onClick={() => onOpenReadme(repo.owner.login, repo.name, false)}
                  className="repo-card-details-btn"
                >
                  <BookOpen size={12} />
                  Read README
                </button>
              ) : repo.html_url ? (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card-details-btn"
                >
                  <Code2 size={12} />
                  Open repository
                </a>
              ) : null}
            </article>
          )
        })}
      </div>

      {filteredRepos.length === 0 && (
        <div className="repo-empty">
          <p>No repositories match this view.</p>
        </div>
      )}

      {!showAll && filteredRepos.length > 9 && (
        <div className="repo-show-more-wrap">
          <button type="button" onClick={() => setShowAll(true)} className="repo-show-more">
            Show all {filteredRepos.length} repositories
          </button>
        </div>
      )}
    </div>
  )
}

export { RepositoryGrid }
