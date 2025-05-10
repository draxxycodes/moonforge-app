

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
  >([])

  useEffect(() => {
    // Create random floating elements
    const newElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full opacity-10"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
            background: `radial-gradient(circle at center, rgba(14, 165, 233, 0.8), rgba(236, 72, 153, 0.8))`,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.1, 0.2, 0.1, 0.3, 0.1],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  )
}
