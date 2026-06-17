import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTrophy } from 'react-icons/fa'
import { awards } from './awards.data'

function Awards() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="awards" className="py-28 relative">
      <div className="section-container relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Employment <span className="gradient-text">Recognition</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="glass rounded-2xl p-8 text-center hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                <FaTrophy className="text-accent text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{award.title}</h3>
              <p className="text-primary font-medium mb-1">{award.organization}</p>
              <p className="text-accent text-sm font-medium mb-4">{award.date}</p>
              <p className="text-text-secondary leading-relaxed max-w-xl mx-auto">
                {award.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Awards
