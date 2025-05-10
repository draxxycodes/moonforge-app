"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Twitter, X, Check, Loader2 } from "lucide-react"

interface TwitterAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (twitterData: TwitterAccountData) => void
}

export interface TwitterAccountData {
  id: string
  username: string
  displayName: string
  profileImage: string
  followers: number
  following: number
  verified: boolean
}

export function TwitterAuthModal({ isOpen, onClose, onConnect }: TwitterAuthModalProps) {
  const [stage, setStage] = useState<"initial" | "connecting" | "success">("initial")

  // Mock Twitter account data
  const mockTwitterAccount: TwitterAccountData = {
    id: "1234567890",
    username: "moonforge_user",
    displayName: "MoonForge User",
    profileImage: "/placeholder.svg?height=48&width=48",
    followers: 1250,
    following: 450,
    verified: false,
  }

  const handleConnect = () => {
    setStage("connecting")

    // Simulate connection delay
    setTimeout(() => {
      setStage("success")
      // Wait a bit to show success state before closing
      setTimeout(() => {
        onConnect(mockTwitterAccount)
      }, 1000)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-primary/20 bg-card/95 backdrop-blur-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Twitter className="h-5 w-5 text-[#1DA1F2]" />
            Connect Twitter
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <AnimatePresence mode="wait">
            {stage === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1DA1F2]/10">
                  <Twitter className="h-8 w-8 text-[#1DA1F2]" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Connect Your Twitter Account</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Connect your Twitter account to verify your social media presence and track promotion performance.
                </p>
                <div className="mt-2 flex w-full gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-primary/20 bg-primary/5 hover:bg-primary/10"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 gap-2 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90" onClick={handleConnect}>
                    <Twitter className="h-4 w-4" />
                    Connect Twitter
                  </Button>
                </div>
              </motion.div>
            )}

            {stage === "connecting" && (
              <motion.div
                key="connecting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1DA1F2]/10">
                  <Loader2 className="h-8 w-8 animate-spin text-[#1DA1F2]" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Connecting to Twitter</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Please authorize MoonForge in the Twitter popup window...
                </p>
                <Button variant="ghost" size="sm" className="mt-4" onClick={() => setStage("initial")}>
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </Button>
              </motion.div>
            )}

            {stage === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Twitter Connected!</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Your Twitter account has been successfully connected to MoonForge.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
