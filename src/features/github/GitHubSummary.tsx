import { FaCircle } from 'react-icons/fa6'
import { LANG_COLORS } from './github-api'
import type { Repo } from './github-api'

interface GitHubSummaryProps {
  repos: Repo[]
}

function GitHubSummary({ repos }: GitHubSummaryProps) {
  const privateCount = repos.filter((repo) => repo.private).length
  const organizationCount = repos.filter((repo) => repo.relationship === 'organization').length
  const languageCounts = repos.reduce<Record<string, number>>((counts, repo) => {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1
    return counts
  }, {})
  const totalLanguages = Object.values(languageCounts).reduce((sum, count) => sum + count, 0)
  const topLanguages = Object.entries(languageCounts)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 6)

  return (
    <>
      <div className="github-metrics" aria-label="Repository catalog summary">
        {[
          { label: 'Qualified repositories', value: repos.length },
          { label: 'Private systems', value: privateCount },
          { label: 'Organization work', value: organizationCount },
        ].map((metric) => (
          <div key={metric.label} className="github-metric">
            <p>{metric.value}</p>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      {topLanguages.length > 0 && totalLanguages > 0 && (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-muted">
            Primary languages by repository
          </p>
          <div className="github-language-bar" aria-hidden="true">
            {topLanguages.map(([language, count]) => (
              <div
                key={language}
                style={{
                  width: `${(count / totalLanguages) * 100}%`,
                  backgroundColor: LANG_COLORS[language] ?? '#888',
                }}
              />
            ))}
          </div>
          <div className="github-language-key">
            {topLanguages.map(([language, count]) => (
              <div key={language}>
                <FaCircle size={8} style={{ color: LANG_COLORS[language] ?? '#888' }} />
                <span>{language}</span>
                <span>{Math.round((count / totalLanguages) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export { GitHubSummary }
