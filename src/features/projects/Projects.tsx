import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import type { Project } from '@/shared/types'
import { FeaturedProject } from './FeaturedProject'
import { ProjectLightbox } from './ProjectLightbox'
import { projects } from './projects.data'

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const featuredProjects = projects.filter((project) => project.featured)
  const archiveProjects = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="page-section projects-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="section-label">Selected work</p>
          <div className="section-heading projects-heading">
            <h2>Systems I designed, shipped, and operate.</h2>
            <p>
              Production platforms built around real workflows, real-time data,
              and the reliability needed for daily operations.
            </p>
          </div>
        </motion.div>

        <div className="featured-project-list">
          {featuredProjects.map((project, index) => (
            <FeaturedProject
              key={project.title}
              project={project}
              index={index}
              onPreview={setSelectedProject}
            />
          ))}
        </div>

        <div className="project-archive">
          <div className="project-archive-heading">
            <div>
              <span>System index</span>
              <h3>More shipped work</h3>
            </div>
            <span>Fig. 04</span>
          </div>

          <div className="project-archive-list">
            {archiveProjects.map((project, index) => (
              <details className="project-archive-item" key={project.title}>
                <summary>
                  <span className="project-archive-number">
                    {String(index + featuredProjects.length + 1).padStart(2, '0')}
                  </span>
                  <span className="project-archive-title">{project.title}</span>
                  <span className="project-archive-status">{project.status}</span>
                  <span className="project-archive-tech">{project.tech.slice(0, 3).join(' / ')}</span>
                  <ChevronDown className="project-archive-chevron" size={16} />
                </summary>
                <div className="project-archive-detail">
                  <p>{project.description}</p>
                  <ul>
                    {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Open live site <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

export default Projects
