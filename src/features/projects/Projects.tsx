import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from './projects.data'

const statusColors: Record<string, string> = {
  Production: 'text-green-400 border-green-400/20 bg-green-400/5',
  Active: 'text-accent border-accent/20 bg-accent/5',
  Internal: 'text-text-muted border-border-light bg-bg',
}

function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="py-24">
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
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] px-2 py-0.5 text-text-muted border border-border-light hover:border-accent hover:text-accent transition-colors"
                      >
                        GitHub ↗
                      </a>
                    )}
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
    </section>
  )
}

export default Projects
