"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  isLoading?: boolean
  children: React.ReactNode
  type?: "fade" | "slide" | "scale" | "blur"
  color?: string
}

export function LoadingScreen({
  isLoading: externalIsLoading,
  children,
  type = "fade",
  color = "#14b8a6", // Teal default (was purple)
}: LoadingScreenProps) {
  const [internalIsLoading, setInternalIsLoading] = useState(true)

  // Use external isLoading if provided, otherwise use internal state
  const isLoading = externalIsLoading !== undefined ? externalIsLoading : internalIsLoading

  useEffect(() => {
    // Simulate page loading
    if (externalIsLoading === undefined) {
      const timer = setTimeout(() => {
        setInternalIsLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [externalIsLoading])

  // Loader variants based on type
  const loaderVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 },
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
    },
    blur: {
      initial: { filter: "blur(10px)", opacity: 0 },
      animate: { filter: "blur(0px)", opacity: 1 },
      exit: { filter: "blur(10px)", opacity: 0 },
    },
  }

  // Content variants based on type
  const contentVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slide: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    scale: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
    blur: {
      initial: { filter: "blur(10px)", opacity: 0 },
      animate: { filter: "blur(0px)", opacity: 1 },
    },
  }

  // Particle config
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    distance: Math.random() * 25 + 15,
    angle: i * 30 + (Math.random() * 10 - 5),
    duration: Math.random() * 1.5 + 1.5,
  }))

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={loaderVariants[type]}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Static loader icon */}
              <Loader2 className="h-16 w-16 text-primary" style={{ color }} />

              {/* Animated particles */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full bg-primary"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                    backgroundColor: color,
                  }}
                  animate={{
                    x: `calc(-50% + ${Math.cos(particle.angle * (Math.PI / 180)) * particle.distance}px)`,
                    y: `calc(-50% + ${Math.sin(particle.angle * (Math.PI / 180)) * particle.distance}px)`,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <motion.p
              className="mt-6 text-lg font-medium text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Loading MoonForge...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full"
            initial="initial"
            animate="animate"
            variants={contentVariants[type]}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
