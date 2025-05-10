

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function ParticleField() {
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
      originalX: number
      originalY: number
      angle: number
      angleSpeed: number
      distance: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 1.5 + 0.2
        this.speedX = (Math.random() - 0.5) * 0.2
        this.speedY = (Math.random() - 0.5) * 0.2
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = Math.random() * 0.002 - 0.001
        this.distance = Math.random() * 100 + 50

        // Random color between sky blue and pink
        const colorChoice = Math.random()
        if (colorChoice < 0.4) {
          this.color = "#0ea5e9" // Sky blue
        } else if (colorChoice < 0.8) {
          this.color = "#ec4899" // Pink
        } else {
          this.color = "#ffffff" // White
        }

        this.alpha = Math.random() * 0.5 + 0.1
        this.alphaSpeed = Math.random() * 0.01
      }

      update() {
        // Orbital movement
        this.angle += this.angleSpeed
        this.x = this.originalX + Math.cos(this.angle) * this.distance * 0.05
        this.y = this.originalY + Math.sin(this.angle) * this.distance * 0.05

        // Linear movement
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas!.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas!.height || this.y < 0) {
          this.speedY = -this.speedY
        }

        // Reset position if out of bounds
        if (this.x > canvas!.width + 100 || this.x < -100 || this.y > canvas!.height + 100 || this.y < -100) {
          this.x = Math.random() * canvas!.width
          this.y = Math.random() * canvas!.height
          this.originalX = this.x
          this.originalY = this.y
        }

        // Pulsate alpha
        this.alpha += this.alphaSpeed
        if (this.alpha > 0.6 || this.alpha < 0.1) {
          this.alphaSpeed = -this.alphaSpeed
        }
      }

      draw() {
        if (!ctx) return
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
    const particleCount = Math.min(150, Math.floor((canvas!.width * canvas!.height) / 10000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.globalAlpha = (1 - distance / 120) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)

            // Gradient line color based on the particles' colors
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            gradient.addColorStop(0, particles[i].color)
            gradient.addColorStop(1, particles[j].color)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.3
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
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 2 }}
    />
  )
}
