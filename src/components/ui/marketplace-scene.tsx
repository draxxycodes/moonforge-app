"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function MarketplaceScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000

    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10
      posArray[i + 1] = (Math.random() - 0.5) * 10
      posArray[i + 2] = (Math.random() - 0.5) * 10

      // Color - purple to pink gradient
      colorArray[i] = 0.5 + Math.random() * 0.3 // R
      colorArray[i + 1] = 0.2 + Math.random() * 0.2 // G
      colorArray[i + 2] = 0.8 + Math.random() * 0.2 // B
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add some floating cards
    const createCard = (x: number, y: number, z: number, color: number) => {
      const geometry = new THREE.BoxGeometry(1, 1.4, 0.05)
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.7,
      })
      const card = new THREE.Mesh(geometry, material)
      card.position.set(x, y, z)
      scene.add(card)
      return card
    }

    const cards = [
      createCard(-2, 0.5, -1, 0x7c3aed), // Primary color
      createCard(0, -0.8, -2, 0x9333ea), // Lighter purple
      createCard(2, 0.2, -3, 0xc026d3), // Pink
    ]

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate particle system
      particlesMesh.rotation.y = elapsedTime * 0.05

      // Animate cards
      cards.forEach((card, i) => {
        card.rotation.y = elapsedTime * 0.2 + i
        card.rotation.z = Math.sin(elapsedTime * 0.3 + i) * 0.1
        card.position.y = Math.sin(elapsedTime * 0.5 + i) * 0.2 + card.position.y * 0.99
      })

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      scene.clear()
    }
  }, [])

  return <div ref={containerRef} className="h-full w-full" />
}
