"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroParticles({ opacity = 0.12 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      alphaSpeed: number
      trail: { x: number; y: number; alpha: number }[]
      hasTrail: boolean

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = "#7c3aed" // Primary color
        this.alpha = Math.random() * 0.5 + 0.1
        this.alphaSpeed = Math.random() * 0.01
        this.trail = []
        this.hasTrail = Math.random() > 0.7 // 30% of particles have trails
      }

      update() {
        if (this.hasTrail) {
          // Add current position to trail
          this.trail.push({
            x: this.x,
            y: this.y,
            alpha: this.alpha * 0.5,
          })

          // Limit trail length
          if (this.trail.length > 5) {
            this.trail.shift()
          }
        }

        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }

        // Pulsate alpha
        this.alpha += this.alphaSpeed
        if (this.alpha > 0.6 || this.alpha < 0.1) {
          this.alphaSpeed = -this.alphaSpeed
        }
      }

      draw() {
        if (!ctx) return

        // Draw trail
        if (this.hasTrail) {
          for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i]
            const trailAlpha = point.alpha * (i / this.trail.length)

            ctx.beginPath()
            ctx.arc(point.x, point.y, this.size * 0.8 * (i / this.trail.length), 0, Math.PI * 2)
            ctx.fillStyle = this.color
            ctx.globalAlpha = trailAlpha
            ctx.fill()
          }
        }

        // Draw main particle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(180, Math.floor((canvas.width * canvas.height) / 8000)) // Increased from 100 to 180

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "#7c3aed"
      ctx.lineWidth = 0.3

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.globalAlpha = (1 - distance / 150) * 0.2
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1 }}
    />
  )
}
