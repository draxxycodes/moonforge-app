

import React, { useRef, useEffect, useState, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Html } from "@react-three/drei"
import * as THREE from "three"

// Define the tokenomics data structure
interface TokenDistribution {
  name: string
  percentage: number
  amount: string
  description: string
  color: string
  icon: React.ElementType
  vesting?: string
}

interface TokenomicsPieChart3DProps {
  data: TokenDistribution[]
  onSegmentHover: (segment: string | null) => void
  selectedSegment: string | null
}

// Helper function to convert hex color to THREE.Color
const hexToThreeColor = (hex: string): THREE.Color => {
  return new THREE.Color(hex)
}

// PieSegment component
const PieSegment: React.FC<{
  startAngle: number
  endAngle: number
  innerRadius: number
  outerRadius: number
  color: string
  depth: number
  index: number
  name: string
  percentage: number
  isHovered: boolean
  onHover: (name: string | null) => void
  onClick: (name: string) => void
}> = ({
  startAngle,
  endAngle,
  innerRadius,
  outerRadius,
  color,
  depth,
  index,
  name,
  percentage,
  isHovered,
  onHover,
  onClick,
}) => {
  const segmentRef = useRef<THREE.Mesh>(null)
  const labelRef = useRef<THREE.Group>(null)
  const segments = 32 // Number of segments to create the arc

  // Calculate the middle angle for positioning the label
  const middleAngle = (startAngle + endAngle) / 2
  const labelRadius = ((innerRadius + outerRadius) / 2) * 0.7
  const labelX = Math.cos(middleAngle) * labelRadius
  const labelY = Math.sin(middleAngle) * labelRadius

  // Create the pie segment geometry
  useEffect(() => {
    if (!segmentRef.current) return

    const shape = new THREE.Shape()

    // Move to the start of the inner arc
    shape.moveTo(innerRadius * Math.cos(startAngle), innerRadius * Math.sin(startAngle))

    // Draw the inner arc
    for (let i = 0; i <= segments; i++) {
      const angle = startAngle + (endAngle - startAngle) * (i / segments)
      shape.lineTo(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle))
    }

    // Draw the outer arc
    for (let i = segments; i >= 0; i--) {
      const angle = startAngle + (endAngle - startAngle) * (i / segments)
      shape.lineTo(outerRadius * Math.cos(angle), outerRadius * Math.sin(angle))
    }

    shape.closePath()

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: false,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    segmentRef.current.geometry = geometry

    // Position the segment
    segmentRef.current.position.z = -depth / 2

    return () => {
      if (segmentRef.current && segmentRef.current.geometry) {
        segmentRef.current.geometry.dispose()
      }
    }
  }, [startAngle, endAngle, innerRadius, outerRadius, depth, segments])

  // Animate the segment on hover
  useFrame(() => {
    if (segmentRef.current) {
      if (isHovered) {
        segmentRef.current.position.z = THREE.MathUtils.lerp(segmentRef.current.position.z, -depth / 2 + 0.1, 0.1)
        if (labelRef.current) {
          labelRef.current.scale.setScalar(THREE.MathUtils.lerp(labelRef.current.scale.x, 1.2, 0.1))
        }
      } else {
        segmentRef.current.position.z = THREE.MathUtils.lerp(segmentRef.current.position.z, -depth / 2, 0.1)
        if (labelRef.current) {
          labelRef.current.scale.setScalar(THREE.MathUtils.lerp(labelRef.current.scale.x, 1, 0.1))
        }
      }
    }
  })

  return (
    <group>
      <mesh
        ref={segmentRef}
        onPointerOver={() => onHover(name)}
        onPointerOut={() => onHover(null)}
        onClick={() => onClick(name)}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.2}
          emissive={isHovered ? color : "#000000"}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>

      <group ref={labelRef} position={[labelX, labelY, 0]}>
        {percentage >= 5 && (
          <Text color="white" fontSize={0.15} anchorX="center" anchorY="middle" font="/fonts/Inter-Bold.ttf">
            {`${percentage}%`}
          </Text>
        )}
      </group>
    </group>
  )
}

// Legend component
const Legend: React.FC<{
  data: TokenDistribution[]
  hoveredSegment: string | null
  onHover: (name: string | null) => void
  onClick: (name: string) => void
}> = ({ data, hoveredSegment, onHover, onClick }) => {
  return (
    <Html position={[2, 0, 0]} transform>
      <div className="bg-black/70 backdrop-blur-sm p-3 rounded-lg text-white text-xs w-40">
        <h3 className="font-bold mb-2 text-sm">Distribution</h3>
        <div className="space-y-1.5">
          {data.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-1.5 cursor-pointer transition-colors p-1 rounded ${
                hoveredSegment === item.name ? "bg-white/20" : "hover:bg-white/10"
              }`}
              onMouseEnter={() => onHover(item.name)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(item.name)}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="truncate">{item.name}</span>
              <span className="ml-auto font-medium">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </Html>
  )
}

// Scene component
const PieChartScene: React.FC<{
  data: TokenDistribution[]
  onSegmentHover: (segment: string | null) => void
  selectedSegment: string | null
}> = ({ data, onSegmentHover, selectedSegment }) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
  const { camera } = useThree()

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)
  }, [camera])

  // Handle hover
  const handleHover = useCallback(
    (segment: string | null) => {
      setHoveredSegment(segment)
      onSegmentHover(segment)
    },
    [onSegmentHover],
  )

  // Handle click
  const handleClick = useCallback(
    (segment: string) => {
      onSegmentHover(segment === selectedSegment ? null : segment)
    },
    [onSegmentHover, selectedSegment],
  )

  // Calculate angles for each segment
  const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0)
  const TWO_PI = Math.PI * 2

  let currentAngle = -Math.PI / 2 // Start from the top

  return (
    <group rotation={[0.2, 0, 0]}>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Directional light */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#8b5cf6" />

      {/* Pie segments */}
      {data.map((item, index) => {
        const angleSize = (item.percentage / totalPercentage) * TWO_PI
        const startAngle = currentAngle
        const endAngle = currentAngle + angleSize

        currentAngle = endAngle

        const isActive = hoveredSegment === item.name || selectedSegment === item.name

        return (
          <PieSegment
            key={item.name}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={0.8}
            outerRadius={2}
            color={item.color}
            depth={0.4}
            index={index}
            name={item.name}
            percentage={item.percentage}
            isHovered={isActive}
            onHover={handleHover}
            onClick={handleClick}
          />
        )
      })}

      {/* Legend */}
      <Legend data={data} hoveredSegment={hoveredSegment} onHover={handleHover} onClick={handleClick} />

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={8}
      />
    </group>
  )
}

// Error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
          <h3 className="mb-2 text-lg font-bold text-red-500">Something went wrong</h3>
          <p className="text-sm text-muted-foreground">{this.state.error?.message || "Failed to load 3D chart"}</p>
          <button
            className="mt-4 rounded-md bg-primary px-3 py-1 text-sm text-white"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Main component
export const TokenomicsPieChart3D: React.FC<TokenomicsPieChart3DProps> = ({
  data,
  onSegmentHover,
  selectedSegment,
}) => {
  return (
    <div className="h-full w-full">
      <ErrorBoundary>
        <Canvas>
          <PieChartScene data={data} onSegmentHover={onSegmentHover} selectedSegment={selectedSegment} />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
