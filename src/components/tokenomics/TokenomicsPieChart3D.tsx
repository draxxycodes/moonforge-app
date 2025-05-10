

import type React from "react"
import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { PieSlice } from "./PieSlice"
import { tokenomicsData } from "./tokenomicsData"
import { ChartTooltip } from "./ChartTooltip"
import type { TokenDistribution } from "./types"
import type * as THREE from "three"

interface TokenomicsPieChart3DProps {
  className?: string
}

const PieChartScene: React.FC = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Auto-rotate when not interacting
  useFrame(({ clock }) => {
    if (groupRef.current && !hoveredSegment && !selectedSegment) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  // Calculate angles for each segment
  const totalPercentage = tokenomicsData.reduce((sum, item) => sum + item.percentage, 0)
  const TWO_PI = Math.PI * 2

  let currentAngle = -Math.PI / 2 // Start from the top

  const handleHover = (segment: string | null) => {
    setHoveredSegment(segment)
  }

  const handleClick = (segment: string) => {
    setSelectedSegment(segment === selectedSegment ? null : segment)
  }

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Directional lights for better 3D effect */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#8b5cf6" />

      {/* Pie chart group */}
      <group ref={groupRef}>
        {tokenomicsData.map((item, index) => {
          const angleSize = (item.percentage / totalPercentage) * TWO_PI
          const startAngle = currentAngle
          const endAngle = currentAngle + angleSize

          currentAngle = endAngle

          const isActive = hoveredSegment === item.id || selectedSegment === item.id

          return (
            <PieSlice
              key={item.id}
              id={item.id}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={0.8}
              outerRadius={2}
              color={item.color}
              depth={0.4}
              percentage={item.percentage}
              isActive={isActive}
              onHover={handleHover}
              onClick={handleClick}
            />
          )
        })}

        {/* Legend */}
        <Html position={[2.5, 0, 0]} transform>
          <div className="bg-black/70 backdrop-blur-sm p-4 rounded-lg text-white text-xs w-48">
            <h3 className="font-bold mb-2 text-sm">Token Distribution</h3>
            <div className="space-y-1.5">
              {tokenomicsData.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-1.5 cursor-pointer transition-colors p-1 rounded ${
                    hoveredSegment === item.id || selectedSegment === item.id ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                  onMouseEnter={() => handleHover(item.id)}
                  onMouseLeave={() => handleHover(null)}
                  onClick={() => handleClick(item.id)}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}</span>
                  <span className="ml-auto font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </Html>

        {/* Tooltip */}
        {hoveredSegment && (
          <ChartTooltip data={tokenomicsData.find((item) => item.id === hoveredSegment) as TokenDistribution} />
        )}
      </group>

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={8}
      />
    </>
  )
}

export const TokenomicsPieChart3D: React.FC<TokenomicsPieChart3DProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <PieChartScene />
      </Canvas>
    </div>
  )
}
