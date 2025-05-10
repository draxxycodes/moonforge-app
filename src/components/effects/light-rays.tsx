

import { motion } from "framer-motion"

export function LightRays() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute left-1/4 top-0 h-[500px] w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent opacity-20"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          height: ["500px", "600px", "500px"],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute left-1/3 top-0 h-[600px] w-[1px] bg-gradient-to-b from-transparent via-pink-500 to-transparent opacity-20"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          height: ["600px", "700px", "600px"],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-0 h-[700px] w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent opacity-20"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          height: ["700px", "800px", "700px"],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute left-2/3 top-0 h-[600px] w-[1px] bg-gradient-to-b from-transparent via-pink-500 to-transparent opacity-20"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          height: ["600px", "700px", "600px"],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 3,
        }}
      />
      <motion.div
        className="absolute left-3/4 top-0 h-[500px] w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent opacity-20"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          height: ["500px", "600px", "500px"],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 4,
        }}
      />
    </div>
  )
}
