"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface AnimatedIconProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
  pulse?: boolean
  spin?: boolean
  bounce?: boolean
}

export function AnimatedIcon({
  children,
  className,
  delay = 0,
  hover = true,
  pulse = false,
  spin = false,
  bounce = false,
}: AnimatedIconProps) {
  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        ease: "easeInOut",
        delay,
      },
    },
  }

  const spinAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        ease: "linear",
        delay,
      },
    },
  }

  const bounceAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        ease: "easeInOut",
        delay,
      },
    },
  }

  let animation = {}
  if (pulse) animation = pulseAnimation
  if (spin) animation = spinAnimation
  if (bounce) animation = bounceAnimation

  return (
    <motion.div
      className={cn("flex items-center justify-center", className)}
      initial="initial"
      animate="animate"
      whileHover={hover ? { scale: 1.1 } : undefined}
      {...animation}
    >
      {children}
    </motion.div>
  )
}
