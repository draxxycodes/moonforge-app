"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface AnimatedGradientBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: "subtle" | "medium" | "strong"
  colorScheme?: "purple" | "blue" | "cyan" | "teal"
}

export function BeamsBackground({
  className = "",
  intensity = "strong",
  colorScheme = "teal",
  children,
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bottomBeamsRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Handle initial mount to prevent SSR hydration issues
  useEffect(() => {
    setIsMounted(true)
    
    // Force a redraw after mounting
    setTimeout(() => {
      if (canvasRef.current) {
        const event = new Event('resize');
        window.dispatchEvent(event);
      }
    }, 100);
  }, [])
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Get colors based on colorScheme
  const getColor = () => {
    switch (colorScheme) {
      case "purple": return "#9333ea";
      case "blue": return "#3b82f6";
      case "cyan": return "#06b6d4";
      case "teal": 
      default: return "#14b8a6";
    }
  };
  
  // Set opacity based on intensity and device
  const getOpacity = () => {
    const baseOpacity = isMobile ? 2 : 1; // Increase opacity on mobile even more
    
    switch (intensity) {
      case "subtle": return 0.15 * baseOpacity;
      case "medium": return 0.25 * baseOpacity;
      case "strong": return 0.35 * baseOpacity;
      default: return 0.25 * baseOpacity;
    }
  };

  // Main beams effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    setCanvasSize();
    
    // Draw the beams
    const drawBeams = () => {
      const color = getColor();
      const opacity = getOpacity();
      // Adjust beam count for mobile
      const beamCount = isMobile ? 6 : 8;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reduced blur for better performance on mobile
      try {
        ctx.filter = isMobile ? "blur(30px)" : "blur(50px)";
      } catch (e) {
        console.warn("Canvas filter not supported");
      }
      
      // Draw beams with higher opacity on mobile
      for (let i = 0; i < beamCount; i++) {
        const x = canvas.width * (i / beamCount);
        const width = canvas.width / beamCount * 1.5;
        const height = canvas.height * 2;
        const angle = -35 + (Math.random() * 10);
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        const opacityHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
        
        gradient.addColorStop(0, `${color}00`);
        gradient.addColorStop(0.2, `${color}${opacityHex}`);
        gradient.addColorStop(0.5, `${color}${opacityHex}`);
        gradient.addColorStop(1, `${color}00`);
        
        // Draw beam
        ctx.save();
        ctx.translate(x, canvas.height * 0.5);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.fillStyle = gradient;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
      }
    };
    
    // Draw immediately
    drawBeams();
    
    // Draw whenever window resizes or mobile state changes
    const handleResize = () => {
      setCanvasSize();
      drawBeams();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [colorScheme, intensity, isMobile]); // React to mobile state changes

  // Additional bottom beams effect for desktop
  useEffect(() => {
    if (isMobile) return; // Skip on mobile devices
    
    const canvas = bottomBeamsRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * 0.7 * dpr; // 70% of viewport height
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight * 0.7}px`;
      ctx.scale(dpr, dpr);
    };
    
    setCanvasSize();
    
    // Draw the bottom beams
    const drawBottomBeams = () => {
      const color = getColor();
      const opacity = getOpacity() * 0.8; // Slightly reduced opacity
      const beamCount = 5; // Fewer beams
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply blur effect
      try {
        ctx.filter = "blur(60px)"; // Extra blurry
      } catch (e) {
        console.warn("Canvas filter not supported");
      }
      
      // Draw beams coming from bottom
      for (let i = 0; i < beamCount; i++) {
        const x = canvas.width * (i / beamCount + 0.1); // Offset for variety
        const width = canvas.width / beamCount * 2;
        const height = canvas.height * 1.5;
        const angle = 75 + (Math.random() * 20); // Up from bottom
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        const opacityHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
        
        gradient.addColorStop(0, `${color}${opacityHex}`);
        gradient.addColorStop(0.5, `${color}${opacityHex}`);
        gradient.addColorStop(1, `${color}00`);
        
        // Draw beam
        ctx.save();
        ctx.translate(x, canvas.height);
        ctx.rotate(-(angle * Math.PI) / 180);
        ctx.fillStyle = gradient;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
      }
    };
    
    // Draw immediately
    drawBottomBeams();
    
    // Draw whenever window resizes
    const handleResize = () => {
      setCanvasSize();
      drawBottomBeams();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [colorScheme, intensity, isMobile]);

  // Get static background gradient based on color scheme
  const getStaticBackground = () => {
    switch (colorScheme) {
      case "purple":
        return "bg-gradient-to-b from-purple-900/40 via-background to-background";
      case "blue":
        return "bg-gradient-to-b from-blue-900/40 via-background to-background";
      case "cyan":
        return "bg-gradient-to-b from-cyan-900/40 via-background to-background";
      case "teal":
      default:
        return "bg-gradient-to-b from-teal-900/40 via-background to-background";
    }
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#030711] ${className}`}>
      {/* Static fallback background that will always show */}
      <div className={`absolute inset-0 ${getStaticBackground()} z-0`} />
      
      {/* Canvas-based beams */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-1" 
        style={{
          filter: isMobile ? "blur(15px)" : "blur(20px)",
          opacity: 1,
          mixBlendMode: "normal",
          top: 0
        }} 
      />
      
      {/* Bottom beams (desktop only) */}
      {!isMobile && (
        <canvas
          ref={bottomBeamsRef}
          className="absolute bottom-0 left-0 right-0 z-1"
          style={{
            filter: "blur(30px)",
            opacity: 0.8,
            mixBlendMode: "normal"
        }}
      />
      )}
      
      {/* Additional decorative elements for mobile */}
      {isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-teal-500/20 blur-2xl z-0" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-cyan-500/20 blur-2xl z-0" />
        </>
      )}
      
      {/* Desktop decorative elements */}
      {!isMobile && (
        <>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl z-0" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl z-0" />
        </>
      )}
      
      {/* Subtle overlay - reduced opacity */}
      <div className="absolute inset-0 bg-background/10 z-2" />

      {/* Content with higher z-index */}
      <div className="relative z-10 pt-0 mt-0">{children}</div>
    </div>
  );
}

