import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHandshake } from 'react-icons/fa'
import { collaborators } from './collaboration.data'

function Collaboration() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="collaborations" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-3">05 / Collaborations</p>
          <div className="ruled-line pb-8 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Teams I build with.
            </h2>
          </div>

          <div className="max-w-3xl">
            {collaborators.map((org, i) => (
              <motion.a
                key={org.url}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                className="block group mb-10"
              >
                <div className="flex items-start gap-3 mb-2">
                  <FaHandshake className="text-accent mt-0.5 shrink-0 text-lg" />
                  <h3 className="font-display text-xl font-semibold text-text group-hover:text-accent transition-colors">
                    {org.name}
                  </h3>
                </div>
                <p className="text-text-muted text-sm leading-relaxed ml-8">
                  {org.description}
                </p>

                {i < collaborators.length - 1 && (
                  <div className="mt-8 ruled-line" />
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Collaboration
