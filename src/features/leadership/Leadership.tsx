import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { leadership } from './leadership.data'

function Leadership() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="leadership" className="page-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">Leadership</p>
          <div className="section-heading ruled-line">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Led teams before leading systems.
            </h2>
          </div>

          <div className="max-w-3xl">
            <ol className="leadership-timeline">
              {leadership.map((item, i) => (
                <motion.li
                  key={`${item.role}-${item.period}`}
                  className="leadership-item"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                >
                  <span className="leadership-dot" aria-hidden="true" />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <h3 className="font-display text-lg font-semibold text-text">
                      {item.role}
                    </h3>
                    <span className="font-mono text-xs text-text-muted">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-accent text-sm font-medium mb-2">
                    {item.organization}
                  </p>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-text-muted text-sm flex items-start gap-2 leading-relaxed"
                      >
                        <span className="text-accent mt-1.5 shrink-0 text-[10px]">—</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Leadership
