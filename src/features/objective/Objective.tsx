import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { about } from './objective.data'

function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-3">01 / About</p>
          <div className="ruled-line pb-8 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              I build systems that run.
            </h2>
          </div>

          <div className="max-w-3xl space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
