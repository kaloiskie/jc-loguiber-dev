import { useEffect } from 'react'
import gsap from 'gsap'

function ScrollReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'))
    if (!elements.length) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        gsap.to(entry.target, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', overwrite: true })
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })
    elements.forEach((element) => {
      gsap.set(element, { autoAlpha: 0, y: 28 })
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])
  return null
}

export { ScrollReveals }
