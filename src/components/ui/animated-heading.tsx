import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { useCursor } from "./cursor-provider"

interface AnimatedHeadingProps {
  title: string
  subtitle?: string
  animationType?: "glow" | "cosmic" | "particles" | "stars" | "none"
  size?: "sm" | "md" | "lg" | "xl"
  align?: "left" | "center" | "right"
  className?: string
}

export function AnimatedHeading({
  title,
  subtitle,
  animationType = "none",
  size = "lg",
  align = "center",
  className,
}: AnimatedHeadingProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { setHovered, setType } = useCursor()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xl md:text-2xl"
      case "md":
        return "text-2xl md:text-3xl"
      case "lg":
        return "text-3xl md:text-4xl"
      case "xl":
        return "text-4xl md:text-5xl"
      default:
        return "text-3xl md:text-4xl"
    }
  }

  const getAlignClasses = () => {
    switch (align) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-center"
    }
  }

  const getTitleClasses = () => {
    switch (animationType) {
      case "glow":
        return "text-white drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]"
      case "cosmic":
        return "bg-gradient-to-r from-sky-500 via-pink-500 to-sky-500 bg-clip-text text-transparent animate-gradient-x"
      case "particles":
        return "text-white"
      case "stars":
        return "bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
      default:
        return "text-foreground"
    }
  }

  if (!isMounted) {
    return (
      <div className={cn("mb-12", getAlignClasses(), className)}>
        <h2 className={cn("font-bold tracking-tight", getSizeClasses(), getTitleClasses())}>{title}</h2>
        {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
      </div>
    )
  }

  return (
    <div
      className={cn("mb-12", getAlignClasses(), className)}
      onMouseEnter={() => {
        setHovered(true)
        setType("text")
      }}
      onMouseLeave={() => {
        setHovered(false)
        setType("default")
      }}
    >
      <motion.h2
        className={cn("font-bold tracking-tight", getSizeClasses(), getTitleClasses())}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        >
          {subtitle}
        </motion.p>
      )}

      {animationType === "cosmic" && (
        <motion.div
          className="absolute -z-10 h-8 w-full blur-xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(14, 165, 233, 0.5) 0%, rgba(236, 72, 153, 0.5) 50%, rgba(14, 165, 233, 0.5) 100%)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )}

      {animationType === "particles" && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Particles would be rendered here */}
        </motion.div>
      )}

      {animationType === "stars" && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Stars would be rendered here */}
        </motion.div>
      )}
    </div>
  )
}
