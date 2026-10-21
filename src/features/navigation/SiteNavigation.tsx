import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
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
import { navItems } from '@/shared/navigation'

function SiteNavigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
        <Link
          to="/"
          className="flex items-center gap-3 text-left"
          aria-label="Jhon Carlo Loguiber, back to home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex size-8 items-center justify-center border border-border-light font-mono text-xs text-accent">
            JC
          </span>
          <span className="font-display text-sm font-semibold text-text">Jhon Carlo Loguiber</span>
        </Link>

        <div className="flex items-center gap-3">
          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'px-3 py-2 text-sm transition-colors',
                        isActive
                          ? 'text-text underline decoration-accent decoration-2 underline-offset-8'
                          : 'text-text-muted hover:text-text',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
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
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'w-full px-3 py-2.5 text-left text-sm transition-colors',
                        isActive ? 'bg-surface-raised text-text' : 'text-text-muted hover:text-text',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
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
