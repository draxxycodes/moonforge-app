"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "../../lib/utils"

interface Card3DProps {
  children: ReactNode
  className?: string
  glowColor?: string
  hoverScale?: number
  rotationIntensity?: number
  floatingEffect?: boolean
}

export function Card3D({
  children,
  className,
  glowColor = "rgba(124, 58, 237, 0.5)",
  hoverScale = 1.02,
  rotationIntensity = 10,
  floatingEffect = true,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for rotation
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  // Transform mouse position to rotation values
  const transformMouseX = useTransform(mouseX, [0, 1], [rotationIntensity * -1, rotationIntensity])
  const transformMouseY = useTransform(mouseY, [0, 1], [rotationIntensity, rotationIntensity * -1])

  // Floating animation variants
  const floatingVariants = {
    initial: {
      y: 0,
    },
    floating: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const mouseXPercent = offsetX / width
    const mouseYPercent = offsetY / height

    mouseX.set(mouseXPercent)
    mouseY.set(mouseYPercent)
    rotateX.set(transformMouseY.get())
    rotateY.set(transformMouseX.get())
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      variants={floatingEffect ? floatingVariants : undefined}
      initial="initial"
      animate={floatingEffect ? "floating" : undefined}
      whileHover={{ scale: hoverScale, zIndex: 10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 z-0 rounded-xl"
        style={{
          boxShadow: `0 0 30px ${glowColor}`,
          opacity: 0,
        }}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card content with 3D effect */}
      <motion.div
        className="relative z-10 h-full w-full"
        style={{
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
