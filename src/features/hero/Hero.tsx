import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { hero } from './hero.data'
import { SystemTrace } from './SystemTrace'

function Hero() {
  const yearsExp = `${Math.max(1, new Date().getUTCFullYear() - 2022)}+`

  return (
    <section id="hero" className="hero-section">
      <div className="section-container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="hero-identity">
            <img src="/profilepicture.jpg" alt="Jhon Carlo L. Loguiber" />
            <div>
              <span className="hero-availability">
                <span /> Available for remote engineering roles
              </span>
              <span className="hero-location">{hero.location}</span>
            </div>
          </div>

          <h1>{hero.name}</h1>
          <p className="hero-thesis">
            Full-stack engineer building <strong>production systems</strong> that keep operations moving.
          </p>
          <p className="hero-summary">
            I design and ship reliable web platforms from database schema to deployment,
            with a focus on real-time workflows, infrastructure, and operational clarity.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="hero-action hero-action-primary">
              Explore selected work
              <ArrowDown size={16} />
            </a>
            <a href={`mailto:${hero.email}`} className="hero-action hero-action-secondary">
              <Mail size={16} />
              Contact me
            </a>
          </div>

          <div className="hero-proof" aria-label="Engineering profile">
            <div>
              <strong>{yearsExp}</strong>
              <span>years building</span>
            </div>
            <div>
              <strong>Production</strong>
              <span>systems operated</span>
            </div>
            <div>
              <strong>Full stack</strong>
              <span>schema to deployment</span>
            </div>
          </div>

          <div className="hero-links">
            <a href={hero.github} target="_blank" rel="noopener noreferrer">
              <FaGithub size={15} /> GitHub
            </a>
            <a href={hero.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn size={15} /> LinkedIn
            </a>
            <a href={hero.cvLink} download>
              <Download size={15} /> Download CV
            </a>
          </div>
        </motion.div>

        <SystemTrace />
      </div>

      <div className="section-container hero-footnote" aria-hidden="true">
        <span>Selected systems below</span>
        <span className="hero-footnote-line" />
      </div>
    </section>
  )
}

export default Hero
