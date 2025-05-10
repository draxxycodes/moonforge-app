"use client"

import { motion } from "framer-motion"
import { useCursor } from "./cursor-provider"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string
  change: string
  delay?: number
}

export function StatsCard({ label, value, change, delay = 0 }: StatsCardProps) {
  const { setHovered, setType } = useCursor()
  const isPositive = change.startsWith("+")

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-sky-500/10 bg-black/40 p-4 backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onMouseEnter={() => {
        setHovered(true)
        setType("link")
      }}
      onMouseLeave={() => {
        setHovered(false)
        setType("default")
      }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 opacity-0 blur transition duration-300 group-hover:opacity-20"></div>

      <div className="relative flex min-w-[180px] flex-col">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="mt-1 text-2xl font-bold text-white">{value}</span>
        <div className="mt-2 flex items-center gap-1">
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>{change}</span>
        </div>
      </div>
    </motion.div>
  )
}
