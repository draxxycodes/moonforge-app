"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

interface ScrollProgressProps {
  color?: string
  height?: number
  showPercentage?: boolean
}

export function ScrollProgress({
  color = 'rgba(14, 165, 233, 0.7)',
  height = 3,
  showPercentage = false,
}: ScrollProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      // Show the progress bar after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 origin-left"
        style={{
          scaleX,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: color,
          height: `${height}px`,
        }}
      />
      {showPercentage && (
        <div
          className="fixed right-4 top-2 z-50 text-xs text-primary-foreground bg-primary/80 px-2 py-0.5 rounded shadow"
          style={{ pointerEvents: 'none' }}
        >
          {Math.round((scaleX.get() as number) * 100)}%
        </div>
      )}
    </>
  )
}
