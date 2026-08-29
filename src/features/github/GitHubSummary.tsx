import { FaCircle } from 'react-icons/fa6'
import { LANG_COLORS } from './github-api'
import type { Stats } from './github-api'

interface GitHubSummaryProps {
  stats: Stats | null
  langMap: Record<string, number>
}

function GitHubSummary({ stats, langMap }: GitHubSummaryProps) {
  const totalLanguageBytes = Object.values(langMap).reduce((sum, bytes) => sum + bytes, 0)
  const topLanguages = Object.entries(langMap)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 6)

  return (
    <>
      {stats && (
        <div className="github-metrics">
          {[
            { label: 'Commits', value: stats.totalCommits.toLocaleString() },
            { label: 'Pull Requests', value: stats.totalPRs.toLocaleString() },
            { label: 'Issues', value: stats.totalIssues.toLocaleString() },
          ].map((metric) => (
            <div key={metric.label} className="github-metric">
              <p>{metric.value}</p>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      {topLanguages.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-muted">
            Languages
          </p>
          <div className="mb-4 flex h-2 overflow-hidden rounded-full">
            {topLanguages.map(([language, bytes]) => (
              <div
                key={language}
                style={{
                  width: `${(bytes / totalLanguageBytes) * 100}%`,
                  backgroundColor: LANG_COLORS[language] ?? '#888',
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {topLanguages.map(([language, bytes]) => (
              <div key={language} className="flex items-center gap-1.5 text-xs text-text-muted">
                <FaCircle size={8} style={{ color: LANG_COLORS[language] ?? '#888' }} />
                <span>{language}</span>
                <span>{((bytes / totalLanguageBytes) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export { GitHubSummary }
