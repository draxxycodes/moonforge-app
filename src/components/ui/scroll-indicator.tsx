"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useCursor } from "./cursor-provider"

export function ScrollIndicator() {
  const { setHovered, setType } = useCursor()

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <motion.div
      className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onClick={handleClick}
      onMouseEnter={() => {
        setHovered(true)
        setType("button")
      }}
      onMouseLeave={() => {
        setHovered(false)
        setType("default")
      }}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
      >
        <span className="mb-2 text-xs text-gray-400">Scroll Down</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 backdrop-blur-md">
          <ChevronDown className="h-4 w-4 text-sky-500" />
        </div>
      </motion.div>
    </motion.div>
  )
}
