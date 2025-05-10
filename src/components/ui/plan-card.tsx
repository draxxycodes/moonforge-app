"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, Rocket } from "lucide-react"

interface PlanProps {
  id: number
  name: string
  description: string
  price: number
  duration: string
  features: string[]
  popular: boolean
}

export function PlanCard({ plan }: { plan: PlanProps }) {
  return (
    <Card
      className={`group relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow ${
        plan.popular ? "border-primary/30 shadow-glow" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -right-12 top-6 z-10 rotate-45 bg-primary px-12 py-1 text-xs font-medium text-primary-foreground">
          Popular
        </div>
      )}
      <CardHeader className="pb-8 pt-6">
        <div className="mb-1 text-sm font-medium text-muted-foreground">{plan.duration}</div>
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="mb-6">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="ml-1 text-muted-foreground">$MOON</span>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <motion.li
              key={feature}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="mt-0.5 h-4 w-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pb-6">
        <Button className="w-full gap-2 group-hover:bg-primary/90">
          <Rocket className="h-4 w-4" />
          Select Plan
        </Button>
      </CardFooter>
    </Card>
  )
}
