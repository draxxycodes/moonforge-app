"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PlanCard } from "../components/ui/plan-card"
import { MarketplaceScene } from "../components/ui/marketplace-scene"
import { AnimatedHeading } from "../components/ui/animated-heading"
import { ScrollReveal } from "../components/ui/scroll-reveal"

// Mock data for plans
const weeklyPlans = [
  {
    id: 1,
    name: "Starter Boost",
    description: "Basic visibility across platforms",
    price: 50,
    duration: "Weekly",
    features: ["Twitter Promotion", "Basic Analytics", "24/7 Support"],
    popular: false,
  },
  {
    id: 2,
    name: "Growth Engine",
    description: "Enhanced visibility with priority placement",
    price: 120,
    duration: "Weekly",
    features: ["Twitter & Telegram Promotion", "Enhanced Analytics", "Priority Support", "Community Highlights"],
    popular: true,
  },
  {
    id: 3,
    name: "Cosmic Reach",
    description: "Maximum visibility across all platforms",
    price: 200,
    duration: "Weekly",
    features: [
      "All Platform Promotion",
      "Advanced Analytics Dashboard",
      "VIP Support",
      "Featured in Newsletter",
      "Verified Badge",
    ],
    popular: false,
  },
]

const monthlyPlans = [
  {
    id: 4,
    name: "Lunar Starter",
    description: "Basic visibility with monthly commitment",
    price: 180,
    duration: "Monthly",
    features: ["Twitter Promotion", "Basic Analytics", "24/7 Support", "10% Token Savings"],
    popular: false,
  },
  {
    id: 5,
    name: "Orbital Growth",
    description: "Enhanced visibility with extended reach",
    price: 400,
    duration: "Monthly",
    features: [
      "Twitter & Telegram Promotion",
      "Enhanced Analytics",
      "Priority Support",
      "Community Highlights",
      "15% Token Savings",
    ],
    popular: true,
  },
  {
    id: 6,
    name: "Galactic Domination",
    description: "Ultimate visibility package for serious growth",
    price: 700,
    duration: "Monthly",
    features: [
      "All Platform Promotion",
      "Advanced Analytics Dashboard",
      "VIP Support",
      "Featured in Newsletter",
      "Verified Badge",
      "Exclusive DAO Access",
      "20% Token Savings",
    ],
    popular: false,
  },
]

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly")
  const [mounted, setMounted] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const sceneContainerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* 3D Scene Background */}
        <div ref={sceneContainerRef} className="relative h-[60vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <MarketplaceScene />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />

          {/* Header positioned over the 3D scene */}
          <div ref={headerRef} className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >
              <AnimatedHeading
                title="Marketplace"
                subtitle="Deploy $MOON for reach. Select your visibility plan."
                className="text-white"
                glowColor="rgba(20, 184, 166, 0.5)"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-lg bg-teal-500/5 p-1 shadow-teal">
              <button
                onClick={() => setActiveTab("weekly")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "weekly"
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-sm"
                    : "bg-transparent text-muted-foreground hover:bg-teal-500/10 hover:text-teal-500"
                }`}
              >
                Weekly Plans
              </button>
              <button
                onClick={() => setActiveTab("monthly")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "monthly"
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-sm"
                    : "bg-transparent text-muted-foreground hover:bg-teal-500/10 hover:text-teal-500"
                }`}
              >
                Monthly Plans
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(activeTab === "weekly" ? weeklyPlans : monthlyPlans).map((plan, index) => (
            <ScrollReveal key={plan.id} delay={index * 0.1}>
              <PlanCard plan={plan} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
