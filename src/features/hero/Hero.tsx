import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { hero } from './hero.data'
import { ResumeViewer } from '@/features/resume'

function StaggerLine({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <span className="hero-stagger-line" aria-hidden="true">
      {text.split('').map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: baseDelay + i * 0.028, ease: 'easeOut' }}
        >
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </span>
  )
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLElement>(null)
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const portrait = portraitRef.current
    if (!section || !portrait) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const quickX = gsap.quickTo(portrait, 'x', { duration: 0.45, ease: 'power3.out' })
    const quickY = gsap.quickTo(portrait, 'y', { duration: 0.45, ease: 'power3.out' })
    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      quickX(x * 14)
      quickY(y * 10)
    }
    const onLeave = () => {
      quickX(0)
      quickY(0)
    }
    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="hero-section hero-devx">
      <div className="section-container hero-devx-grid">
        <motion.div
          className="hero-devx-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <span className="hero-devx-rule" aria-hidden="true" />
          <p className="hero-eyebrow">Full-Stack Developer · IT Operations Professional</p>
          <h1 className="hero-devx-headline" aria-label="I'm JC, a Full-stack Developer">
            <StaggerLine text="I'm JC, a" baseDelay={0.1} />
            <StaggerLine text="Full-stack" baseDelay={0.32} />
            <StaggerLine text="Developer" baseDelay={0.5} />
          </h1>
          <p className="hero-summary">
            Full-stack developer and IT operations professional with 4+ years of experience
            building web applications, backend services, and automation that keep business
            operations running.
          </p>

          <div className="hero-actions">
            <Link to="/projects" className="hero-action hero-action-primary">
              Explore My Work
              <ArrowDown size={16} />
            </Link>
            <Link to="/contact" className="hero-action hero-action-secondary">
              Get in Touch
            </Link>
          </div>
        </motion.div>

        <motion.figure
          ref={portraitRef}
          className="hero-devx-portrait"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <span className="hero-ghost" aria-hidden="true">Developer</span>
          <img src="/portrait.png" alt="Portrait of Jhon Carlo L. Loguiber" fetchPriority="high" />
        </motion.figure>

        <motion.aside
          className="hero-devx-rail"
          aria-label="About, work, and profiles"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="hero-rail-block">
            <h2>About me</h2>
            <p>Full-stack developer and IT Supervisor — React, Node.js, PostgreSQL, and IT operations.</p>
            <Link to="/about" className="hero-rail-link">
              Learn more <ArrowRight size={14} />
            </Link>
          </div>
          <div className="hero-rail-block">
            <h2>My work</h2>
            <p>Gaming dashboards, HR platforms, loyalty systems, rider-fare apps.</p>
            <Link to="/projects" className="hero-rail-link">
              Browse portfolio <ArrowRight size={14} />
            </Link>
          </div>
          <div className="hero-rail-block">
            <h2>Follow me</h2>
            <div className="hero-rail-social">
              <a href={hero.github} target="_blank" rel="noopener noreferrer">
                <FaGithub size={15} /> GitHub
              </a>
              <a href={hero.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={15} /> LinkedIn
              </a>
              <button type="button" onClick={() => setResumeOpen(true)} className="hero-rail-resume">
                <Download size={15} /> View Résumé
              </button>
            </div>
          </div>
        </motion.aside>
      </div>

      <div className="section-container hero-footnote" aria-hidden="true">
        <span>Selected systems below</span>
        <span className="hero-footnote-line" />
      </div>

      {resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}
    </section>
  )
}

export default Hero
