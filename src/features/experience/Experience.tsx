import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBuilding, FaMapMarkerAlt, FaCircle } from 'react-icons/fa'
import { experiences } from './experience.data'
import type { ExperienceItem } from '../../shared/types'

function TimelineCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      className="relative pl-10 sm:pl-0"
    >
      <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent sm:hidden" />
      <div className="absolute left-[5px] top-6 w-[7px] h-[7px] rounded-full bg-primary sm:hidden animate-pulse-glow" />
      <div className={`sm:flex items-center ${index % 2 === 0 ? '' : 'sm:flex-row-reverse'}`}>
        <div className="hidden sm:block flex-1" />
        <div className="hidden sm:flex items-center justify-center w-8 shrink-0">
          <div className="w-4 h-4 rounded-full bg-primary border-4 border-surface z-10 animate-pulse-glow" />
        </div>
        <div className={`flex-1 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
          <div className="glass rounded-xl p-6 hover:border-primary/20 transition-all duration-300 group">
            <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
              <FaCircle className="text-[6px]" />
              {exp.period}
            </div>
            <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
            <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-text-secondary text-sm mb-4 ${index % 2 === 0 ? 'sm:justify-end' : ''}`}>
              <span className="flex items-center gap-1">
                <FaBuilding className="text-primary shrink-0" size={12} />
                {exp.company}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-primary shrink-0" size={12} />
                {exp.location}
              </span>
            </div>
            <ul className={`space-y-2 ${index % 2 === 0 ? 'sm:text-right' : ''}`}>
              {exp.highlights.map((h, i) => (
                <li key={i} className="text-text-secondary text-sm leading-relaxed flex items-start gap-2">
                  <span className="text-primary mt-1 shrink-0">◆</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />
      <div className="section-container relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Relevant <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <TimelineCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
