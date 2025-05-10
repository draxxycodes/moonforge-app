

import type React from "react"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"

interface PieSliceProps {
  id: string
  startAngle: number
  endAngle: number
  innerRadius: number
  outerRadius: number
  color: string
  depth: number
  percentage: number
  isActive: boolean
  onHover: (id: string | null) => void
  onClick: (id: string) => void
}

export const PieSlice: React.FC<PieSliceProps> = ({
  id,
  startAngle,
  endAngle,
  innerRadius,
  outerRadius,
  color,
  depth,
  percentage,
  isActive,
  onHover,
  onClick,
}) => {
  const sliceRef = useRef<THREE.Mesh>(null)
  const labelRef = useRef<THREE.Group>(null)
  const segments = 32 // Number of segments to create the arc

  // Calculate the middle angle for positioning the label
  const middleAngle = (startAngle + endAngle) / 2
  const labelRadius = ((innerRadius + outerRadius) / 2) * 0.7
  const labelX = Math.cos(middleAngle) * labelRadius
  const labelY = Math.sin(middleAngle) * labelRadius

  // Create the pie slice geometry
  useEffect(() => {
    if (!sliceRef.current) return

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
    sliceRef.current.geometry = geometry

    // Position the segment
    sliceRef.current.position.z = -depth / 2

    return () => {
      if (sliceRef.current && sliceRef.current.geometry) {
        sliceRef.current.geometry.dispose()
      }
    }
  }, [startAngle, endAngle, innerRadius, outerRadius, depth, segments])

  // Animate the slice on hover/active state
  useFrame(() => {
    if (sliceRef.current) {
      if (isActive) {
        // Push the slice out slightly when active
        sliceRef.current.position.z = THREE.MathUtils.lerp(sliceRef.current.position.z, -depth / 2 + 0.1, 0.1)

        // Scale up the label when active
        if (labelRef.current) {
          labelRef.current.scale.setScalar(THREE.MathUtils.lerp(labelRef.current.scale.x, 1.2, 0.1))
        }
      } else {
        // Return to original position when not active
        sliceRef.current.position.z = THREE.MathUtils.lerp(sliceRef.current.position.z, -depth / 2, 0.1)

        // Return label to original scale
        if (labelRef.current) {
          labelRef.current.scale.setScalar(THREE.MathUtils.lerp(labelRef.current.scale.x, 1, 0.1))
        }
      }
    }
  })

  return (
    <group>
      <mesh
        ref={sliceRef}
        onPointerOver={() => onHover(id)}
        onPointerOut={() => onHover(null)}
        onClick={() => onClick(id)}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.2}
          emissive={isActive ? color : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </mesh>

      {/* Label for percentage (only show for larger segments) */}
      {percentage >= 5 && (
        <group ref={labelRef} position={[labelX, labelY, 0]}>
          <Text color="white" fontSize={0.15} anchorX="center" anchorY="middle" font="/fonts/Inter-Bold.ttf">
            {`${percentage}%`}
          </Text>
        </group>
      )}
    </group>
  )
}
