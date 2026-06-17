import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTrophy } from 'react-icons/fa'
import { awards } from './awards.data'

function Awards() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="awards" className="py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-3">06 / Awards</p>
          <div className="ruled-line pb-8 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Recognition.
            </h2>
          </div>

          <div className="max-w-3xl">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                    <FaTrophy className="text-accent" size={20} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h3 className="font-display text-lg font-semibold text-text">
                        {award.title}
                      </h3>
                      <span className="font-mono text-xs text-text-muted">
                        {award.date}
                      </span>
                    </div>
                    <p className="text-accent text-sm font-medium mb-2">
                      {award.organization}
                    </p>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Awards
