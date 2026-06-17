import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaDownload } from 'react-icons/fa'
import { hero } from './hero.data'

function PhtClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setTime(now.toLocaleTimeString('en-US', options))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
      <FaMapMarkerAlt className="text-accent" size={10} />
      <span>Davao del Norte, PH — PHT (UTC+8)</span>
      <span className="text-text">{time || '--:--:--'}</span>
    </div>
  )
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function Hero() {

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 hero-gradient" />

      <div className="section-container relative z-10 w-full py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <PhtClock />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-8"
          >
            <img
              src="/profilepicture.jpg"
              alt="JC Loguiber"
              className="w-28 h-28 rounded-full object-cover border-2 border-border-light"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text mb-4"
          >
            {hero.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-mono text-sm sm:text-base text-text-muted mb-8 typewriter-cursor"
          >
            {hero.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed mb-10"
          >
            {hero.pitch}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={hero.cvLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors duration-200"
            >
              <FaDownload size={14} />
              Download CV
            </a>
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 border border-border-light text-text text-sm font-medium hover:border-accent hover:text-accent transition-all duration-200"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 border border-border-light text-text text-sm font-medium hover:border-accent hover:text-accent transition-all duration-200"
            >
              Contact Me
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
