import { useRef } from "react"
import { useInView } from "framer-motion"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"
import { ScrollReveal } from "./scroll-reveal"
import { Check, Clock, type LucideIcon, Rocket, Users, Code, CoinsIcon as Coin, Zap, BarChart } from "lucide-react"

interface RoadmapItemProps {
  title: string
  description: string
  quarter: string
  year: string
  status: "completed" | "current" | "upcoming"
  icon: LucideIcon
  index: number
}

const roadmapItems = [
  {
    title: "Platform Concept",
    description: "Initial idea development and market research for MoonForge platform",
    quarter: "Q4",
    year: "2023",
    status: "completed",
    icon: Rocket,
  },
  {
    title: "Community Building",
    description: "Initial community formation and social media presence establishment",
    quarter: "Q1",
    year: "2024",
    status: "completed",
    icon: Users,
  },
  {
    title: "Sui Integration",
    description: "Full integration with Sui blockchain for all platform features",
    quarter: "Q2",
    year: "2024",
    status: "current",
    icon: Code,
  },
  {
    title: "Token Launch",
    description: "$MOON token launch on DEXs with initial liquidity pools",
    quarter: "Q3",
    year: "2024",
    status: "upcoming",
    icon: Coin,
  },
  {
    title: "Platform Expansion",
    description: "Adding more social media platforms and promotion features",
    quarter: "Q4",
    year: "2024",
    status: "upcoming",
    icon: Zap,
  },
  {
    title: "Data Analytics",
    description: "Advanced analytics and performance metrics for promotions",
    quarter: "Q1",
    year: "2025",
    status: "upcoming",
    icon: BarChart,
  },
]

function RoadmapItem({ title, description, quarter, year, status, icon: Icon, index }: RoadmapItemProps) {
  const isEven = index % 2 === 0
  const delay = index * 0.1

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-green-500" />
      case "current":
        return <Clock className="h-5 w-5 text-amber-500 animate-pulse" />
      case "upcoming":
        return <Clock className="h-5 w-5 text-blue-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "current":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30"
      case "upcoming":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
    }
  }

  return (
    <ScrollReveal delay={delay} once={false} direction={isEven ? "left" : "right"}>
      <div className={`flex w-full ${isEven ? "justify-start" : "justify-end"} mb-16 relative`}>
        <Card
          className={`w-full max-w-md border-primary/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow`}
        >
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10`}>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
              </div>
              <Badge variant="outline" className={`${getStatusColor()} px-2 py-1 flex items-center gap-1`}>
                {getStatusIcon()}
                <span className="capitalize">{status}</span>
              </Badge>
            </div>
            <p className="mb-4 text-muted-foreground">{description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-primary/30 bg-primary/10">
                {quarter} {year}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollReveal>
  )
}

export function HomeRoadmap() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section ref={sectionRef} className="container mx-auto px-4 py-20 md:py-28">
      <ScrollReveal>
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-sm">
            Project Timeline
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">MoonForge Roadmap</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our strategic plan for developing and expanding the MoonForge platform on Sui blockchain
          </p>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 transform -translate-x-1/2"></div>

        {/* Roadmap items */}
        <div className="relative z-10">
          {roadmapItems.map((item, index) => (
            <RoadmapItem key={index} {...item as RoadmapItemProps} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
