import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillCategories } from './skills.data'
import type { SkillCategory } from '../../shared/types'

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 mb-4">
        {category.icon && (
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
            <category.icon className="text-lg" />
          </div>
        )}
        <h3 className="text-lg font-bold">{category.title}</h3>
      </div>
      <ul className="space-y-2">
        {category.items.map((item, i) => (
          <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
            <span className="text-accent mt-1 shrink-0">▸</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="py-28 relative">
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
            Skills & <span className="gradient-text">Interests</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4" />
          <p className="text-text-secondary max-w-2xl mx-auto">
            A comprehensive set of technical skills refined through hands-on experience in production environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 glass rounded-2xl p-8 max-w-3xl mx-auto text-center"
        >
          <h3 className="text-xl font-bold mb-3">Personal Interests</h3>
          <p className="text-text-secondary leading-relaxed">
            Enthusiastic about artificial intelligence, Raspberry Pi projects, and smart home automation.
            Passionate about experimenting with emerging technologies and developing innovative solutions
            that bridge creativity and functionality.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
