"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Button } from "./button"
import { Gift, Check, Sparkles } from "lucide-react"

interface RewardClaimModalProps {
  isOpen: boolean
  onClose: () => void
  reward: {
    id: number
    name: string
    amount: number
    type: string
  }
}

export function RewardClaimModal({ isOpen, onClose, reward }: RewardClaimModalProps) {
  const [stage, setStage] = useState<"initial" | "claiming" | "success">("initial")

  useEffect(() => {
    if (isOpen) {
      setStage("initial")
    }
  }, [isOpen])

  const handleClaim = () => {
    setStage("claiming")

    // Simulate claiming process
    setTimeout(() => {
      setStage("success")
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-primary/20 bg-card/95 backdrop-blur-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Gift className="h-5 w-5 text-primary" />
            Claim Reward
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
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{reward.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  You are about to claim {reward.amount} $MOON tokens. This reward will be sent directly to your wallet.
                </p>
                <div className="mt-2 flex w-full gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-primary/20 bg-primary/5 hover:bg-primary/10"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 gap-2" onClick={handleClaim}>
                    <Gift className="h-4 w-4" />
                    Claim Reward
                  </Button>
                </div>
              </motion.div>
            )}

            {stage === "claiming" && (
              <motion.div
                key="claiming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Gift className="h-8 w-8 text-primary" />
                  </motion.div>
                </div>
                <h3 className="mb-2 text-lg font-medium">Processing Your Claim</h3>
                <p className="mb-4 text-sm text-muted-foreground">Please wait while we process your reward claim...</p>
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
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <Check className="h-8 w-8 text-green-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                    }}
                    style={{ border: "2px solid rgb(34, 197, 94)" }}
                  />
                </div>
                <h3 className="mb-2 text-lg font-medium">Claim Successful!</h3>
                <div className="mb-4 flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-primary">{reward.amount}</span>
                  <span className="text-sm text-muted-foreground">$MOON</span>
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Your reward has been successfully claimed and added to your wallet balance.
                </p>
                <Button className="mt-2 w-full gap-2" onClick={onClose}>
                  <Check className="h-4 w-4" />
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

