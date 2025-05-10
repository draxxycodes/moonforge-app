

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

interface ScrollProgressProps {
  color?: string
  height?: number
  showPercentage?: boolean
}

export function ScrollProgress({ color = "#0ea5e9", height = 3, showPercentage = false }: ScrollProgressProps) {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] origin-left"
        style={{
          scaleX,
          background: `linear-gradient(to right, ${color}, rgba(236, 72, 153, 0.7))`,
          height,
        }}
      />
      {showPercentage && (
        <motion.div
          className="fixed bottom-4 right-4 z-[100] rounded-full bg-gradient-to-r from-sky-500 to-pink-500 px-2 py-1 text-xs font-medium text-white"
          style={{
            opacity: scrollYProgress,
          }}
        >
          <motion.span>{Math.round(scrollYProgress.get() * 100)}%</motion.span>
        </motion.div>
      )}
    </>
  )
}
