import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '@/shared/types'

interface ProjectLightboxProps {
  project: Project
  onClose: () => void
}

function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="project-dialog-backdrop" onMouseDown={onClose}>
      <div
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="project-dialog-header">
          <div>
            <span>{project.status} system</span>
            <h3 id="project-dialog-title">{project.title}</h3>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close project preview">
            <X size={20} />
          </button>
        </div>

        {project.image && (
          <div className="project-dialog-visual">
            <img src={project.image} alt={`${project.title} full interface preview`} />
          </div>
        )}

        <div className="project-dialog-footer">
          <p>{project.result ?? project.description}</p>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Open live site <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export { ProjectLightbox }
