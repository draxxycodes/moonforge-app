"use client"

import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  // Split text into lines
  const lines = text.split("<br>")

  return (
    <div className={cn(className)}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="overflow-hidden">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + lineIndex * 0.1,
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
