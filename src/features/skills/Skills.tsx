import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillCategories } from './skills.data'

function TechStack() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="tech-stack" className="py-20">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-3">02 / Tech Stack</p>
          <div className="ruled-line pb-6 mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Tools I work with daily.
            </h2>
          </div>

          <div className="max-w-3xl space-y-8">
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <p className="font-mono text-xs text-accent mb-3 tracking-wider uppercase">
                  {cat.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs px-3 py-1.5 bg-accent-muted text-text border border-accent/10"
                    >
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
