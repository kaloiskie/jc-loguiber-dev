import { useCallback, useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { navSections } from '@/shared/navigation'

function SiteNavigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
      const scrollPosition = window.scrollY + 140

      for (let index = navSections.length - 1; index >= 0; index -= 1) {
        const section = document.getElementById(navSections[index].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navSections[index].id)
          return
        }
      }

      setActiveSection('hero')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const initialSection = window.location.hash.slice(1)
    if (!initialSection) return

    const frame = requestAnimationFrame(() => {
      document.getElementById(initialSection)?.scrollIntoView()
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
    setMobileMenuOpen(false)
  }, [])

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-200',
        scrolled ? 'border-border bg-bg/95 backdrop-blur-md' : 'border-transparent bg-bg',
      )}
    >
      <div className="section-container flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 text-left"
          aria-label="Back to top"
        >
          <span className="flex size-8 items-center justify-center border border-border-light font-mono text-xs text-accent">
            JC
          </span>
          <span className="font-display text-sm font-semibold text-text">Jhon Carlo Loguiber</span>
        </button>

        <div className="flex items-center gap-3">
          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList className="gap-1">
              {navSections.map((section) => (
                <NavigationMenuItem key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    className={cn(
                      'px-3 py-2 text-sm transition-colors',
                      activeSection === section.id
                        ? 'text-text'
                        : 'text-text-muted hover:text-text',
                    )}
                  >
                    {section.label}
                  </button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild size="sm" className="hidden rounded-sm bg-text text-bg hover:bg-text/90 sm:inline-flex">
            <a href="/cv.pdf" download>
              <Download size={14} />
              CV
            </a>
          </Button>

          <Popover open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-sm text-text lg:hidden"
                aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 rounded-sm border-border-light bg-surface p-2 lg:hidden">
              <div className="flex flex-col">
                {navSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    className={cn(
                      'w-full px-3 py-2.5 text-left text-sm transition-colors',
                      activeSection === section.id
                        ? 'bg-surface-raised text-text'
                        : 'text-text-muted hover:text-text',
                    )}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  )
}

export { SiteNavigation }
