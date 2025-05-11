import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

export function MarketplaceScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const container = containerRef.current

    // Get container dimensions
    const width = container.clientWidth
    const height = container.clientHeight

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Add orbit controls for better testing
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    
    // Completely disable any control buttons
    controls.enablePan = false
    controls.enableRotate = false

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener("resize", handleResize)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position - create a sphere of particles
      const radius = 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i + 2] = radius * Math.cos(phi)

      // Color - teal to cyan gradient
      colorArray[i] = 0.2 + Math.random() * 0.2 // R
      colorArray[i + 1] = 0.6 + Math.random() * 0.3 // G
      colorArray[i + 2] = 0.7 + Math.random() * 0.3 // B
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
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
        side: THREE.DoubleSide,
      })
      const card = new THREE.Mesh(geometry, material)
      card.position.set(x, y, z)
      scene.add(card)
      return card
    }

    const cards = [
      createCard(-2, 0.5, -1, 0x14b8a6), // Teal 500
      createCard(0, -0.8, -2, 0x0d9488), // Teal 600
      createCard(2, 0.2, -3, 0x0891b2), // Cyan 600
      createCard(-1.5, 1.2, -2, 0x06b6d4), // Cyan 500
      createCard(1.5, 0.7, -1.5, 0x22d3ee), // Cyan 400
    ]

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Animation
    const clock = new THREE.Clock()
    let animationId: number

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update controls
      controls.update()

      // Rotate particle system
      particlesMesh.rotation.y = elapsedTime * 0.05
      particlesMesh.rotation.x = elapsedTime * 0.025

      // Animate cards
      cards.forEach((card, i) => {
        card.rotation.y = elapsedTime * 0.2 + i
        card.rotation.z = Math.sin(elapsedTime * 0.3 + i) * 0.1
        card.position.y = Math.sin(elapsedTime * 0.5 + i * 0.5) * 0.2 + card.position.y * 0.99
      })

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      
      // Dispose of Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      });
      
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      
      // Remove renderer from DOM
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
      controls.dispose()
    }
  }, [])

  return <div ref={containerRef} className="h-full w-full absolute top-0 left-0" />
}
