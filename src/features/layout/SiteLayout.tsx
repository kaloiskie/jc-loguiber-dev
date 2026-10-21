import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteNavigation } from '@/features/navigation'

function SiteLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="min-h-screen bg-bg text-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-surface focus:px-4 focus:py-2 focus:text-text"
      >
        Skip to content
      </a>
      <SiteNavigation />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}

export { SiteLayout }
