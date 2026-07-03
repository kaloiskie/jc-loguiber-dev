import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaArrowUpRightFromSquare, FaCode } from 'react-icons/fa6'
import { projects } from './projects.data'
import { TechIcon } from './techIcons'

function BrowserFrame({ image, title }: { image?: string; title: string }) {
  return (
    <div className="browser-frame">
      <div className="browser-frame-bar">
        <span className="browser-frame-dot browser-frame-dot-red" />
        <span className="browser-frame-dot browser-frame-dot-yellow" />
        <span className="browser-frame-dot browser-frame-dot-green" />
      </div>
      <div className="browser-frame-body">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="browser-frame-placeholder">
            <FaCode size={28} />
          </div>
        )}
      </div>
    </div>
  )
}

function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const openLightbox = useCallback((src: string) => setLightboxSrc(src), [])
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  return (
    <section id="projects" className="py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-3">04 / Projects</p>
          <div className="ruled-line pb-8 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              I&apos;ve been building a lot of things.
            </h2>
          </div>

          <div className="project-grid">
            {projects.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="project-card"
              >
                <button
                  type="button"
                  className="project-card-frame-btn"
                  onClick={() => proj.image && openLightbox(proj.image)}
                  aria-label={proj.image ? `View screenshot of ${proj.title}` : proj.title}
                  disabled={!proj.image}
                >
                  <BrowserFrame image={proj.image} title={proj.title} />
                </button>

                <div className="project-card-body">
                  <h3 className="project-card-title">{proj.title}</h3>
                  <p className="project-card-desc">{proj.description}</p>

                  <div className="project-card-icons">
                    {proj.tech.slice(0, 5).map((t) => (
                      <span key={t} className="project-card-icon">
                        <TechIcon name={t} />
                      </span>
                    ))}
                  </div>

                  <div className="project-card-links">
                    {proj.github?.[0] && (
                      <a
                        href={proj.github[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-link"
                      >
                        <FaCode size={12} />
                        View Source
                      </a>
                    )}
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-link"
                      >
                        <FaArrowUpRightFromSquare size={11} />
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {lightboxSrc && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="lightbox-image-wrapper">
              <img src={lightboxSrc} alt="" className="lightbox-image" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
