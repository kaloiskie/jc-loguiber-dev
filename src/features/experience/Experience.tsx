import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences } from './experience.data'

function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="py-20">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-3">03 / Experience</p>
          <div className="ruled-line pb-6 mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Where I have shipped.
            </h2>
          </div>

          <div className="max-w-3xl">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                className="mb-12"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="font-display text-xl font-semibold text-text">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-xs text-text-muted">
                    {exp.period}
                  </span>
                </div>
                <p className="text-accent text-sm font-medium mb-3">
                  {exp.role}
                </p>
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="text-text-muted text-sm flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-accent mt-1.5 shrink-0 text-[10px]">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {i < experiences.length - 1 && (
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

export default Experience
