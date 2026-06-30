import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from './projects.data'

const statusColors: Record<string, string> = {
  Production: 'text-green-400 border-green-400/20 bg-green-400/5',
  Active: 'text-accent border-accent/20 bg-accent/5',
  Internal: 'text-text-muted border-border-light bg-bg',
}

const websiteImages = [
  {
    src: '/websites/northmangaming%20operation%20dashboard.png',
    label: 'Northman Gaming Dashboard',
    url: 'https://northmangaming.com/',
  },
  {
    src: '/websites/dev-recruitment.png',
    label: 'Dev Recruitment',
    url: 'https://dev-recruitment-five.vercel.app/admin/login',
  },
  {
    src: '/websites/hr.dashboard.png',
    label: 'HR Dashboard',
    url: 'https://hr.northmangaming.com/',
  },
  {
    src: '/websites/sukirewards.png',
    label: 'Suki Rewards',
    url: 'https://sukirewards.proofconcept.site/',
  },
]

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: {
  images: typeof websiteImages
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose, onPrev, onNext])

  const current = images[currentIndex]

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close gallery">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous image">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next image">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="lightbox-image-wrapper">
          <img
            src={current.src}
            alt={current.label}
            className="lightbox-image"
          />
        </div>

        <div className="lightbox-caption">
          <span className="lightbox-counter">{currentIndex + 1} / {images.length}</span>
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="lightbox-label"
          >
            {current.label} ↗
          </a>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? websiteImages.length - 1 : prev - 1))
  }, [])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === websiteImages.length - 1 ? 0 : prev + 1))
  }, [])

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
              Things I have built.
            </h2>
          </div>

          {/* Magazine-style website gallery */}
          <div className="magazine-grid mb-16">
            {websiteImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="magazine-card"
              >
                <button
                  onClick={() => openLightbox(i)}
                  className="magazine-image-wrapper"
                  aria-label={`View ${img.label}`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="magazine-image"
                    loading="lazy"
                  />
                  <div className="magazine-overlay">
                    <span className="magazine-view-label">View</span>
                  </div>
                </button>
                <div className="magazine-caption">
                  <a
                    href={img.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magazine-title"
                  >
                    {img.label}
                  </a>
                  <a
                    href={img.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magazine-arrow-link"
                    aria-label={`Open ${img.label}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl">
            {projects.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                className="mb-12"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display text-xl font-semibold text-text">
                    {proj.title}
                  </h3>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 border ${statusColors[proj.status]}`}
                  >
                    {proj.status}
                  </span>
                </div>

                <p className="text-text-muted text-sm leading-relaxed mb-3">
                  {proj.description}
                </p>

                {(proj.url || proj.github) && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] px-2 py-0.5 text-accent border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors"
                      >
                        Live Site ↗
                      </a>
                    )}
                    {proj.github?.map((gh) => (
                      <a
                        key={gh}
                        href={gh}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] px-2 py-0.5 text-text-muted border border-border-light hover:border-accent hover:text-accent transition-colors"
                      >
                        GitHub ↗
                      </a>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2 py-0.5 text-text-muted border border-border-light"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="space-y-1.5">
                  {proj.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="text-text-muted text-sm flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-accent mt-1.5 shrink-0 text-[10px]">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {i < projects.length - 1 && (
                  <div className="mt-10 ruled-line" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={websiteImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  )
}

export default Projects
