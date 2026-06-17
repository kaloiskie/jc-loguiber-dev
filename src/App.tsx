import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaArrowUp, FaEnvelope, FaPhone } from 'react-icons/fa'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Hero } from './features/hero'
import { Objective } from './features/objective'
import { Experience } from './features/experience'
import { Skills } from './features/skills'
import { Education } from './features/education'
import { Leadership } from './features/leadership'
import { Awards } from './features/awards'
import { Footer } from './features/footer'
import { navSections } from './shared/navigation'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)

      const sections = navSections.map(s => document.getElementById(s.id)).filter(Boolean)
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navSections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-surface">
      <Analytics />
      <SpeedInsights />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo('hero')}
            className="text-lg font-bold gradient-text tracking-tight"
          >
            JC Loguiber
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navSections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'text-white bg-primary/20'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/5"
            >
              <div className="section-container py-4 flex flex-col gap-1">
                {navSections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'text-white bg-primary/20'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
                <div className="border-t border-white/5 mt-2 pt-2 flex gap-2">
                  <a
                    href="mailto:jcarlo.loguiber@gmail.com"
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:bg-white/5 transition-all text-center"
                  >
                    <FaEnvelope className="inline mr-1.5" size={14} />
                    Email
                  </a>
                  <a
                    href="tel:+639514567270"
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:bg-white/5 transition-all text-center"
                  >
                    <FaPhone className="inline mr-1.5" size={14} />
                    Call
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main>
        <Hero />
        <Objective />
        <Experience />
        <Skills />
        <Education />
        <Leadership />
        <Awards />
      </main>

      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => scrollTo('hero')}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors duration-200 glow"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 left-8 z-50 flex-col gap-3 hidden md:flex">
        <a
          href="mailto:jcarlo.loguiber@gmail.com"
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200"
          aria-label="Email"
        >
          <FaEnvelope />
        </a>
        <a
          href="tel:+639514567270"
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200"
          aria-label="Phone"
        >
          <FaPhone />
        </a>
      </div>
    </div>
  )
}

export default App
