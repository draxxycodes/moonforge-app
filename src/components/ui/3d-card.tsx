import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "../../lib/utils"
import { useCursor } from "./cursor-provider"

interface Card3DProps {
  children: React.ReactNode
  className?: string
  glareColor?: string
  rotationIntensity?: number
  hoverScale?: number
  perspective?: number
  damping?: number
  stiffness?: number
  floatingEffect?: boolean
}

export function Card3D({
  children,
  className,
  glareColor = "rgba(176, 58, 249, 0.04)",
  rotationIntensity = 10,
  hoverScale = 1.05,
  perspective = 1000,
  damping = 20,
  stiffness = 200,
  floatingEffect = false,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { setHovered, setType } = useCursor()

  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animations for smoother movement
  const springX = useSpring(mouseX, { damping, stiffness })
  const springY = useSpring(mouseY, { damping, stiffness })

  // Transform mouse position to rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [rotationIntensity, -rotationIntensity])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-rotationIntensity, rotationIntensity])

  // Glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    setHovered(false)
    setType("default")
  }

  // Set cursor on mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true)
    setHovered(true)
    setType("button")
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground shadow", className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow", className)}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: hoverScale }}
      animate={
        floatingEffect
          ? {
              y: [0, -10, 0],
              transition: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative z-10 h-full w-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>

      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor} 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  )
}
