"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
  threshold?: number
  once?: boolean
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  threshold = 0.1,
  once = false,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const [scrollingDirection, setScrollingDirection] = useState<"up" | "down">("down")
  const [shouldAnimate, setShouldAnimate] = useState(false)

  const { scrollY } = useScroll()

  // Track scrolling direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    setScrollingDirection(latest > previous ? "down" : "up")
  })

  // Determine if animation should play
  useEffect(() => {
    if (isInView) {
      setHasBeenVisible(true)
      setShouldAnimate(true)
    } else if (!once && hasBeenVisible) {
      // If we're scrolling up and the element is out of view, reset the animation
      if (scrollingDirection === "up") {
        setShouldAnimate(false)
      }
    }
  }, [isInView, once, hasBeenVisible, scrollingDirection])

  // Set initial and animate values based on direction
  const getInitialAndAnimate = () => {
    const initialOffset = 50

    switch (direction) {
      case "up":
        return {
          initial: { opacity: 0, y: initialOffset },
          animate: shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: initialOffset },
        }
      case "down":
        return {
          initial: { opacity: 0, y: -initialOffset },
          animate: shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -initialOffset },
        }
      case "left":
        return {
          initial: { opacity: 0, x: initialOffset },
          animate: shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: initialOffset },
        }
      case "right":
        return {
          initial: { opacity: 0, x: -initialOffset },
          animate: shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -initialOffset },
        }
      default:
        return {
          initial: { opacity: 0, y: initialOffset },
          animate: shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: initialOffset },
        }
    }
  }

  const { initial, animate } = getInitialAndAnimate()

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
