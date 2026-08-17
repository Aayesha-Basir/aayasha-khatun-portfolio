"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A subtle desktop-only cursor: a small dot plus a slightly lagging ring
 * that gently expands over interactive elements. Disabled on touch
 * devices and when the user prefers reduced motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    setEnabled(true)

    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0
    let raf = 0

    function onMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
      const target = e.target as HTMLElement | null
      const interactive = target?.closest("a, button, input, textarea, [role='button']")
      if (ringRef.current) {
        ringRef.current.dataset.active = interactive ? "true" : "false"
      }
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        data-active="false"
        className="absolute left-0 top-0 -ml-3.5 -mt-3.5 size-7 rounded-full border border-brand/60 transition-[width,height,margin,opacity] duration-200 data-[active=true]:-ml-5 data-[active=true]:-mt-5 data-[active=true]:size-10 data-[active=true]:border-brand"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-0.5 -mt-0.5 size-1 rounded-full bg-brand"
      />
    </div>
  )
}
