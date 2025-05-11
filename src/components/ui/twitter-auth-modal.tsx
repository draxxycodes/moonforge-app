"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Twitter, Loader2 } from "lucide-react"

export interface TwitterAccountData {
  name: string
  username: string
  profileImage?: string
  followers: number
  following: number
  posts: number
}

interface TwitterAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuth: (data: TwitterAccountData) => void
}

export function TwitterAuthModal({ isOpen, onClose, onAuth }: TwitterAuthModalProps) {
  const [step, setStep] = useState<"initial" | "loading" | "success">("initial")
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) return

    setStep("loading")

    // Simulate API call
    setTimeout(() => {
      // Mock data
      const mockData: TwitterAccountData = {
        name: "John Doe",
        username: username.replace("@", ""),
        profileImage: "/placeholder.svg?height=100&width=100",
        followers: 2450,
        following: 584,
        posts: 327,
      }

      setStep("success")

      // Simulate delay before closing
      setTimeout(() => {
        onAuth(mockData)
      }, 1500)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-primary/20 bg-card/95 backdrop-blur-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Twitter className="h-5 w-5 text-[#1DA1F2]" />
            Connect Twitter Account
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <AnimatePresence mode="wait">
            {step === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="mb-4 text-sm text-muted-foreground">
                  Connect your Twitter account to boost your social media presence and track your growth.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Twitter Username</Label>
                    <Input
                      id="username"
                      placeholder="@username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-primary/20 bg-card"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!username}>
                      <Twitter className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Loader2 className="h-8 w-8 text-primary" />
                  </motion.div>
                </div>
                <h3 className="mb-2 text-lg font-medium">Connecting to Twitter</h3>
                <p className="text-sm text-muted-foreground">Please wait while we verify your account...</p>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Check className="h-8 w-8 text-green-500" />
                  </motion.div>
                </div>
                <h3 className="mb-2 text-lg font-medium">Successfully Connected!</h3>
                <p className="text-sm text-muted-foreground">Your Twitter account has been connected.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { Check } from "lucide-react"
