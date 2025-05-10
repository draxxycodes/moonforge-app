import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PlanCard } from "../components/ui/plan-card"
import { PageHeader } from "../components/ui/page-header"
import { MarketplaceScene } from "../components/ui/marketplace-scene"

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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Marketplace" subtitle="Deploy $MOON for reach. Select your visibility plan." />

      <div className="relative h-[40vh] w-full overflow-hidden">
        <MarketplaceScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg bg-background p-1 shadow-glow">
            <button
              onClick={() => setActiveTab("weekly")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "weekly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              Weekly Plans
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "monthly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              Monthly Plans
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {(activeTab === "weekly" ? weeklyPlans : monthlyPlans).map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
