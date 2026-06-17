import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaQuoteLeft } from 'react-icons/fa'
import { objective } from '../data/resume'

function Objective() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="objective" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-alt/30 to-transparent" />
      <div className="section-container relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Career <span className="gradient-text">Objective</span>
            </motion.h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </div>

          <div className="relative glass rounded-2xl p-8 sm:p-10">
            <FaQuoteLeft className="text-primary/20 text-3xl absolute top-6 left-6" />
            <p className="text-lg text-text-secondary leading-relaxed pl-12">
              {objective.content}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Objective
