

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float, MeshDistortMaterial, Text } from "@react-three/drei"
import { useRef } from "react"
import type { MutableRefObject } from "react"
import type { Mesh } from "three"

type OrbRingProps = {
  radius: number
  tubeRadius: number
  color: string
  rotation?: [number, number, number]
  position?: [number, number, number]
  speed?: number
}

type FloatingOrbProps = {
  position: [number, number, number]
  color: string
  size: number
  speed?: number
}

// 3D Components
const OrbRing = ({
  radius,
  tubeRadius,
  color,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  speed = 0.1,
}: OrbRingProps) => {
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.x + speed * 0.01
      mesh.current.rotation.y = mesh.current.rotation.y + speed * 0.005
    }
  })

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <torusGeometry args={[radius, tubeRadius, 16, 100]} />
      <MeshDistortMaterial color={color} speed={2} distort={0.2} radius={1} transparent opacity={0.8} />
    </mesh>
  )
}

const FloatingOrb = ({ position, color, size, speed = 1 }: FloatingOrbProps) => {
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(t) * 0.5
      mesh.current.rotation.x = Math.sin(t / 4)
      mesh.current.rotation.y = Math.sin(t / 4)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={5}
          distort={0.3}
          envMapIntensity={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  )
}

const Scene = () => {
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#ec4899" />
      <spotLight position={[0, 10, 0]} intensity={0.5} color="#0ea5e9" angle={0.6} penumbra={0.5} castShadow />

      {/* Main rings */}
      <OrbRing
        radius={isMobile ? 3 : 5}
        tubeRadius={0.2}
        color="#ec4899"
        position={[0, -1, -2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <OrbRing
        radius={isMobile ? 3.5 : 5.5}
        tubeRadius={0.15}
        color="#0ea5e9"
        position={[0, -1.5, -2]}
        rotation={[Math.PI / 2, 0, 0]}
        speed={0.05}
      />
      <OrbRing
        radius={isMobile ? 4 : 6}
        tubeRadius={0.1}
        color="#f472b6"
        position={[0, -2, -2]}
        rotation={[Math.PI / 2, 0, 0]}
        speed={0.15}
      />

      {/* Floating orbs */}
      <FloatingOrb position={[-3, 1, -1]} color="#0ea5e9" size={0.5} speed={1.5} />
      <FloatingOrb position={[3, 2, 0]} color="#ec4899" size={0.3} speed={2} />
      <FloatingOrb position={[-2, -1, 1]} color="#f472b6" size={0.2} speed={1} />
      <FloatingOrb position={[2, 0, 2]} color="#0ea5e9" size={0.4} speed={0.8} />

      {/* Text */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <Text
          font="/fonts/Geist_Bold.json"
          position={[0, isMobile ? 3 : 4, 0]}
          fontSize={isMobile ? 0.5 : 0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={10}
          textAlign="center"
        >
          MOONFORGE
        </Text>
      </Float>

      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  )
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <Scene />
    </Canvas>
  )
}
