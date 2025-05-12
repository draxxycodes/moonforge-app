"use client"

import type React from "react"
import { useEffect, useRef } from "react"

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
  
  // Set opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case "subtle": return 0.15;
      case "medium": return 0.25;
      case "strong": return 0.35;
      default: return 0.25;
    }
  };

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
    window.addEventListener('resize', setCanvasSize);
    
    // Create static beams instead of animated ones
    const color = getColor();
    const opacity = getOpacity();
    const beamCount = 8; // Fewer beams for better performance
    
    // Draw static beams
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "blur(50px)";
    
    // Draw basic beams
    for (let i = 0; i < beamCount; i++) {
      const x = canvas.width * (i / beamCount);
      const width = canvas.width / beamCount * 1.5;
      const height = canvas.height * 2;
      const angle = -35 + (Math.random() * 10);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `${color}00`);
      gradient.addColorStop(0.2, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(0.5, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${color}00`);
      
      // Draw beam
      ctx.save();
      ctx.translate(x, canvas.height * 0.5);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = gradient;
      ctx.fillRect(-width / 2, -height / 2, width, height);
      ctx.restore();
    }

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [colorScheme, intensity]);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-background ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: "blur(20px)" }} />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-background/10" />

      {children}
    </div>
  );
}

