

import { ReactNode, useEffect } from "react"
import Lenis from "@studio-freight/lenis"

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Smoothness factor (0 to 1)
      wheelMultiplier: 1, // Scroll speed multiplier
      touchMultiplier: 2, // Touch scroll speed multiplier
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
