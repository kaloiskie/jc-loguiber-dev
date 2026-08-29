import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TechIcon } from '@/components/ui/tech-icon'
import { skillCategories } from './skills.data'

function TechStack() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="tech-stack" className="page-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">Technical range</p>
          <div className="section-heading ruled-line">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Tools chosen around the system.
            </h2>
          </div>

          <div className="max-w-3xl section-stack">
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <p className="font-mono text-xs text-accent mb-3 tracking-wider uppercase">
                  {cat.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 bg-accent-muted text-text border border-accent/10"
                    >
                      <TechIcon name={item} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack
