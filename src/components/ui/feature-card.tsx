"use client"

import { motion } from "framer-motion"
import { Rocket, Coins, Share } from "lucide-react"
import { useCursor } from "./cursor-provider"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  color: string
  delay?: number
}

export function FeatureCard({ title, description, icon, color, delay = 0 }: FeatureCardProps) {
  const { setHovered, setType } = useCursor()

  const getIcon = () => {
    switch (icon) {
      case "rocket":
        return <Rocket className="h-6 w-6" />
      case "coins":
        return <Coins className="h-6 w-6" />
      case "share":
        return <Share className="h-6 w-6" />
      default:
        return <Rocket className="h-6 w-6" />
    }
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-black via-green-900 to-blue-900 p-8 shadow-xl backdrop-blur-xl transition-transform duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.7, type: 'spring' }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => {
        setHovered(true)
        setType("button")
      }}
      onMouseLeave={() => {
        setHovered(false)
        setType("default")
      }}
    >
      {/* Glow effect */}
      <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-500/30 via-blue-500/30 to-black/30 opacity-0 blur-lg transition duration-300 group-hover:opacity-40"></div>

      <div className="relative z-10">
        <motion.div
          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${color} shadow-lg`}
          whileHover={{ scale: 1.12, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {getIcon()}
        </motion.div>
        <h3 className="mb-3 text-2xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">{title}</h3>
        <p className="text-lg text-blue-100/90 leading-relaxed drop-shadow-sm">{description}</p>
      </div>
    </motion.div>
  )
}
