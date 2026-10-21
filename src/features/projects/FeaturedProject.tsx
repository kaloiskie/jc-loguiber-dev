import { useRef, type CSSProperties } from 'react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ArrowUpRight, Expand } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '@/shared/types'

interface FeaturedProjectProps {
  project: Project
  index: number
  onPreview: (project: Project) => void
}

type ProjectStyle = CSSProperties & { '--project-accent': string }

function FeaturedProject({ project, index, onPreview }: FeaturedProjectProps) {
  const cardRef = useRef<HTMLElement>(null)
  const projectStyle: ProjectStyle = {
    '--project-accent': project.accent ?? '#7c6aff',
  }

  return (
    <motion.article
      ref={cardRef}
      className="featured-project"
      style={projectStyle}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const card = cardRef.current
        if (!card) return
        const bounds = card.getBoundingClientRect()
        const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 3
        const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -3
        gsap.to(card, { rotateX, rotateY, duration: 0.35, ease: 'power2.out', overwrite: true })
      }}
      onPointerLeave={() => {
        if (cardRef.current) gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' })
      }}
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
        <p className="featured-project-kicker">
          {project.status === 'Production' ? 'Production case study' : 'Live system case study'}
        </p>
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
          {project.slug && (
            <Link to={`/projects/${project.slug}`}>
              Explore case study <ArrowUpRight size={14} />
            </Link>
          )}
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Live site <ArrowUpRight size={14} />
            </a>
          )}
          {project.repository && (
            <a href={project.repository} target="_blank" rel="noopener noreferrer">
              Source <GitHubLogoIcon width={14} height={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export { FeaturedProject }
