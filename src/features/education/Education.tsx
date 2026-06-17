import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGraduationCap } from 'react-icons/fa'
import { education } from './education.data'

function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="education" className="py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-3">06 / Education</p>
          <div className="ruled-line pb-8 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Academic foundation.
            </h2>
          </div>

          <div className="max-w-3xl">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                    <FaGraduationCap className="text-accent" size={22} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h3 className="font-display text-lg font-semibold text-text">
                        {edu.degree}
                      </h3>
                      <span className="font-mono text-xs text-text-muted">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-accent text-sm font-medium mb-2">
                      {edu.school}
                    </p>
                    <ul className="space-y-2">
                      {edu.details.map((d, j) => (
                        <li
                          key={j}
                          className="text-text-muted text-sm flex items-start gap-2 leading-relaxed"
                        >
                          <span className="text-accent mt-1.5 shrink-0 text-[10px]">—</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
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

export default Education
