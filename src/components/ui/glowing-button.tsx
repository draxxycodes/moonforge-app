"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "./button"
import { cn } from "../../lib/utils"

export interface GlowingButtonProps extends ButtonProps {}

export const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div className="group relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <motion.div
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sky-500 to-pink-500 opacity-70 blur-lg transition-all duration-300 group-hover:opacity-100"
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <Button ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </Button>
      </motion.div>
    )
  },
)

GlowingButton.displayName = "GlowingButton"
