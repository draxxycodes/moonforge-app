"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AnimatedHeadingProps {
  title: string
  subtitle?: string
  className?: string
  glowColor?: string
  delay?: number
}

export function AnimatedHeading({
  title,
  subtitle,
  className = "",
  glowColor = "rgba(20, 184, 166, 0.3)",
  delay = 0,
}: AnimatedHeadingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0

    // Set canvas size to match container
    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      // Recreate particles when canvas is resized
      createParticles()
    }

    // Create particles
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(20, 184, 166, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        // Add mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const maxDistance = 100
        const force = (maxDistance - distance) / maxDistance

        if (distance < maxDistance && mouseX !== 0 && mouseY !== 0) {
          this.speedX += forceDirectionX * force * 0.6
          this.speedY += forceDirectionY * force * 0.6
        }

        // Apply speed
        this.x += this.speedX
        this.y += this.speedY

        // Friction
        this.speedX *= 0.95
        this.speedY *= 0.95

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const createParticles = () => {
      particles = []
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 100)
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Connect particles with lines
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.2 - distance / 500})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    // Handle touch for mobile
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseX = e.touches[0].clientX - rect.left
        mouseY = e.touches[0].clientY - rect.top
      }
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("touchmove", handleTouch)
    container.addEventListener("touchstart", handleTouch)

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("touchmove", handleTouch)
      container.removeEventListener("touchstart", handleTouch)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl p-8 ${className}`}
      style={{
        background: `radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, rgba(0, 0, 0, 0) 70%)`,
        boxShadow: `0 0 30px ${glowColor}`,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10">
        <motion.h1
          className="mb-2 text-3xl mokoto-font tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
