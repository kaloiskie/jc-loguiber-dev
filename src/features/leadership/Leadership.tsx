import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaUsers, FaUserTie } from 'react-icons/fa'
import { leadership } from './leadership.data'
import type { LeadershipItem } from '../../shared/types'

function LeadershipCard({ item, index }: { item: LeadershipItem; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
          {item.role.includes('President') || item.role.includes('Editor-in-Chief') ? <FaUserTie size={18} /> : <FaUsers size={18} />}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="text-lg font-bold">{item.role}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
              {item.period}
            </span>
          </div>
          <p className="text-primary text-sm font-medium mb-3">{item.organization}</p>
          <ul className="space-y-1.5">
            {item.details.map((d, j) => (
              <li key={j} className="text-text-secondary text-sm flex items-start gap-2">
                <span className="text-accent mt-1 shrink-0">▸</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function Leadership() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="leadership" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-alt/30 via-transparent to-surface-alt/30" />
      <div className="section-container relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Leadership & <span className="gradient-text">Organizational</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-5">
          {leadership.map((item, i) => (
            <LeadershipCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leadership
