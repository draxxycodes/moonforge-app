"use client"

import type { ReactNode } from "react"
import { Card3D } from "@/components/ui/3d-card"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function DashboardCard({ children, className, glowColor = "rgba(124, 58, 237, 0.5)" }: DashboardCardProps) {
  return (
    <Card3D
      className={cn("border border-primary/20 bg-card/50 backdrop-blur-sm", className)}
      glowColor={glowColor}
      hoverScale={1.03}
      rotationIntensity={7}
      floatingEffect={false}
    >
      {children}
    </Card3D>
  )
}
