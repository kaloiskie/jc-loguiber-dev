import { useEffect } from 'react'
import Lenis from 'lenis'

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    let frame = 0
    const onFrame = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(onFrame)
    }

    frame = requestAnimationFrame(onFrame)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}

export { SmoothScroll }
