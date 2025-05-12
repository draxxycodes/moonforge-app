"use client"

import { useEffect, useState } from "react"

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
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0
      
      // Show the progress bar after scrolling down a bit
      setIsVisible(scrollTop > 100)
      setProgress(scrollProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-50 origin-left"
        style={{
          transform: `scaleX(${progress})`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: color,
          height: `${height}px`,
        }}
      />
      {showPercentage && (
        <div
          className="fixed right-4 top-2 z-50 text-xs text-primary-foreground bg-primary/80 px-2 py-0.5 rounded shadow"
          style={{ 
            pointerEvents: 'none',
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {Math.round(progress * 100)}%
        </div>
      )}
    </>
  )
}
