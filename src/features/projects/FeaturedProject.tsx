import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Expand } from 'lucide-react'
import type { Project } from '@/shared/types'

interface FeaturedProjectProps {
  project: Project
  index: number
  onPreview: (project: Project) => void
}

type ProjectStyle = CSSProperties & { '--project-accent': string }

function FeaturedProject({ project, index, onPreview }: FeaturedProjectProps) {
  const projectStyle: ProjectStyle = {
    '--project-accent': project.accent ?? '#7c6aff',
  }

  return (
    <motion.article
      className="featured-project"
      style={projectStyle}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <button
        type="button"
        className="featured-project-visual"
        onClick={() => onPreview(project)}
        aria-label={`Open ${project.title} project preview`}
      >
        {project.image && (
          <img src={project.image} alt={`${project.title} interface`} loading="lazy" />
        )}
        <span className="featured-project-visual-topline">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{project.status}</span>
        </span>
        <span className="featured-project-expand">
          <Expand size={15} /> Inspect interface
        </span>
      </button>

      <div className="featured-project-copy">
        <p className="featured-project-kicker">Production case study</p>
        <h3>{project.title}</h3>
        <p className="featured-project-description">{project.description}</p>

        <dl className="featured-project-facts">
          <div>
            <dt>Ownership</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Operational result</dt>
            <dd>{project.result}</dd>
          </div>
        </dl>

        <div className="featured-project-architecture" aria-label="System architecture">
          {project.architecture?.map((layer) => <span key={layer}>{layer}</span>)}
        </div>

        <ul className="featured-project-highlights">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="featured-project-links">
          <button type="button" onClick={() => onPreview(project)}>
            Explore case study
          </button>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Live site <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export { FeaturedProject }
