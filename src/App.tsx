import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Hero } from './features/hero'
import { About } from './features/objective'
import { TechStack } from './features/skills'
import { Experience } from './features/experience'
import { Projects } from './features/projects'
import { Education } from './features/education'
import { Awards } from './features/awards'
import { Contact } from './features/footer'
import { navSections } from './shared/navigation'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navSections.map((s) => document.getElementById(s.id)).filter(Boolean)
      const scrollPos = window.scrollY + 120

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
    <div className="min-h-screen bg-bg text-text">
      <Analytics />
      <SpeedInsights />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between h-14">
          <button
            onClick={() => scrollTo('hero')}
            className="font-display text-lg font-semibold text-text hover:text-accent transition-colors"
          >
            JC Loguiber
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  activeSection === section.id
                    ? 'text-accent'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-muted hover:text-text p-1"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg/95 backdrop-blur-md border-b border-border"
            >
              <div className="section-container py-4 flex flex-col gap-0.5">
                {navSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`px-3 py-2.5 text-sm font-medium text-left transition-colors ${
                      activeSection === section.id
                        ? 'text-accent'
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Education />
        <Awards />
      </main>

      <Contact />
    </div>
  )
}

export default App
