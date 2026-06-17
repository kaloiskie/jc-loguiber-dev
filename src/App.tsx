import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Hero } from './features/hero'
import { About } from './features/objective'
import { TechStack } from './features/skills'
import { Experience } from './features/experience'
import { Projects } from './features/projects'
import { Organizations } from './features/organizations'
import { Education } from './features/education'
import { Awards } from './features/awards'
import { Contact } from './features/footer'
import { navSections } from './shared/navigation'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

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
      <Helmet
        defaultTitle="JC Loguiber — Full-Stack Engineer"
        titleTemplate="%s — JC Loguiber"
      >
        <html lang="en" />
        <meta name="description" content="Full-Stack Engineer specializing in building modern web applications with React, TypeScript, and Node.js." />
      </Helmet>
      <Analytics />
      <SpeedInsights />

      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="section-container flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo('hero')}
              className="font-display text-lg font-semibold text-text hover:text-accent transition-colors"
            >
              JC Loguiber
            </button>

            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-1">
                {navSections.map((section) => (
                  <NavigationMenuItem key={section.id}>
                    <NavigationMenuLink
                      onSelect={() => scrollTo(section.id)}
                      className={cn(
                        'px-3 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer border-b-2 border-transparent hover:border-accent',
                        activeSection === section.id
                          ? 'text-accent'
                          : 'text-text-muted hover:text-text'
                      )}
                    >
                      {section.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2">
            <Popover open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-48 p-1 md:hidden bg-bg border-border">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0">
                    {navSections.map((section) => (
                      <NavigationMenuItem key={section.id} className="w-full">
                        <NavigationMenuLink
                          onSelect={() => scrollTo(section.id)}
                          className={cn(
                            'block w-full px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
                            activeSection === section.id
                              ? 'text-accent'
                              : 'text-text-muted hover:text-text'
                          )}
                        >
                          {section.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>

            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex text-sm text-text-muted hover:text-text">
              <a href="mailto:jcarlo.loguiber@gmail.com">Contact</a>
            </Button>
            <Button asChild size="sm" className="hidden md:inline-flex text-sm">
              <a href="/cv.pdf">Download CV</a>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Organizations />
        <Education />
        <Awards />
      </main>

      <Contact />
    </div>
  )
}

export default App
