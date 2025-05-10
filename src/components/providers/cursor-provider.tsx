

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CursorContextType {
  setHovered: (hovered: boolean) => void
  setClicking: (clicking: boolean) => void
  setHideCursor: (hide: boolean) => void
  setType: (type: "default" | "button" | "link" | "text") => void
}

const CursorContext = createContext<CursorContextType>({
  setHovered: () => {},
  setClicking: () => {},
  setHideCursor: () => {},
  setType: () => {},
})

export const useCursor = () => useContext(CursorContext)

interface CursorProviderProps {
  children: React.ReactNode
}

export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hideCursor, setHideCursor] = useState(false)
  const [cursorType, setCursorType] = useState<"default" | "button" | "link" | "text">("default")
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Only show cursor after a short delay to prevent initial animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Mouse move event
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    // Mouse down event
    const mouseDown = () => setIsClicking(true)
    // Mouse up event
    const mouseUp = () => setIsClicking(false)

    // Add event listeners
    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mousedown", mouseDown)
    document.addEventListener("mouseup", mouseUp)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mousedown", mouseDown)
      document.removeEventListener("mouseup", mouseUp)
      window.removeEventListener("resize", checkMobile)
    }
  }, [cursorX, cursorY])

  // Don't render cursor on mobile devices
  if (isMobile) {
    return <>{children}</>
  }

  const getCursorSize = () => {
    switch (cursorType) {
      case "button":
        return isHovered ? 60 : 20
      case "link":
        return isHovered ? 40 : 20
      case "text":
        return isHovered ? 100 : 20
      default:
        return 20
    }
  }

  const getCursorColor = () => {
    switch (cursorType) {
      case "button":
        return "rgba(236, 72, 153, 0.5)"
      case "link":
        return "rgba(14, 165, 233, 0.5)"
      case "text":
        return "rgba(236, 72, 153, 0.2)"
      default:
        return "rgba(14, 165, 233, 0.3)"
    }
  }

  return (
    <CursorContext.Provider
      value={{
        setHovered: setIsHovered,
        setClicking: setIsClicking,
        setHideCursor: setHideCursor,
        setType: setCursorType,
      }}
    >
      {isVisible && !hideCursor && (
        <>
          {/* Main cursor */}
          <motion.div
            className="pointer-events-none fixed z-[9999] flex items-center justify-center mix-blend-difference"
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
              x: "-50%",
              y: "-50%",
            }}
          >
            <motion.div
              className="rounded-full"
              style={{
                backgroundColor: getCursorColor(),
                boxShadow: `0 0 20px ${getCursorColor()}`,
              }}
              animate={{
                width: getCursorSize(),
                height: getCursorSize(),
                scale: isClicking ? 0.8 : 1,
              }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.5,
              }}
            />
          </motion.div>

          {/* Cursor dot */}
          <motion.div
            className="pointer-events-none fixed z-[10000] h-3 w-3 rounded-full bg-sky-400 mix-blend-difference"
            style={{
              left: cursorX,
              top: cursorY,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: isClicking ? 0.5 : 1,
            }}
          />
        </>
      )}
      {children}
    </CursorContext.Provider>
  )
}

// HOC to add cursor interaction to any component
export const withCursorInteraction = (
  Component: React.ComponentType<any>,
  type: "button" | "link" | "text" = "button",
) => {
  return (props: any) => {
    const { setHovered, setType } = useCursor()

    return (
      <div
        onMouseEnter={() => {
          setHovered(true)
          setType(type)
        }}
        onMouseLeave={() => {
          setHovered(false)
          setType("default")
        }}
      >
        <Component {...props} />
      </div>
    )
  }
}
