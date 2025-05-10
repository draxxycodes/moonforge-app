"use client"

import { motion } from "framer-motion"
import { useCursor } from "./cursor-provider"
import { Twitter, MessageCircle, Youtube } from "lucide-react"

export function FloatingCards() {
  const { setHovered, setType } = useCursor()

  const platforms = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      description: "Boost your Twitter presence with increased visibility and engagement.",
    },
    {
      name: "Telegram",
      icon: MessageCircle,
      color: "#0088cc",
      description: "Grow your Telegram community with featured promotions and channel highlights.",
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "#FF0000",
      description: "Increase your YouTube subscribers and views with strategic promotion.",
    },
  ]

  return (
    <section className="relative z-10 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Promote Across Multiple Platforms
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-100/90">
            MoonForge helps you grow your audience across all major social media platforms with targeted promotion plans.
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className="w-full max-w-xs"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.7, type: 'spring' }}
              whileHover={{ scale: 1.06 }}
              onMouseEnter={() => {
                setHovered(true)
                setType("button")
              }}
              onMouseLeave={() => {
                setHovered(false)
                setType("default")
              }}
            >
              <div className="overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-black via-green-900 to-blue-900 p-8 shadow-xl backdrop-blur-xl">
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${platform.color}20` }}
                >
                  <platform.icon className="h-8 w-8" style={{ color: platform.color }} />
                </div>
                <h3 className="mb-3 text-2xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">{platform.name}</h3>
                <p className="text-lg text-blue-100/90 leading-relaxed drop-shadow-sm">{platform.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Background green-blue glow effect */}
        <motion.div
          className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gradient-to-br from-green-500/30 via-blue-500/30 to-black/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
    </section>
  )
}
