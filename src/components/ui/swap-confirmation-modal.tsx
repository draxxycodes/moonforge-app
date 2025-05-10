"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowDown, AlertCircle, Check, Loader2 } from "lucide-react"

interface SwapConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  fromToken: any
  toToken: any
  fromAmount: string
  toAmount: string
  slippage: number
}

export function SwapConfirmationModal({
  isOpen,
  onClose,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  slippage,
}: SwapConfirmationModalProps) {
  const [stage, setStage] = useState<"confirm" | "processing" | "success">("confirm")

  const handleConfirm = () => {
    setStage("processing")

    // Simulate transaction processing
    setTimeout(() => {
      setStage("success")
    }, 2000)
  }

  const handleClose = () => {
    if (stage === "success") {
      setStage("confirm")
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="border-primary/20 bg-card/95 backdrop-blur-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {stage === "confirm" && "Confirm Swap"}
            {stage === "processing" && "Processing Swap"}
            {stage === "success" && "Swap Successful"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {stage === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-4"
            >
              <div className="rounded-lg border border-border bg-card/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={fromToken?.logo || "/placeholder.svg"}
                      alt={fromToken?.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{fromToken?.symbol}</p>
                      <p className="text-xs text-muted-foreground">{fromToken?.name}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold">{fromAmount}</p>
                </div>
              </div>

              <div className="my-4 flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={toToken?.logo || "/placeholder.svg"}
                      alt={toToken?.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{toToken?.symbol}</p>
                      <p className="text-xs text-muted-foreground">{toToken?.name}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold">{toAmount}</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-muted/30 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <p className="text-sm font-medium">Transaction Details</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span>
                      1 {fromToken?.symbol} = {(Number.parseFloat(toAmount) / Number.parseFloat(fromAmount)).toFixed(6)}{" "}
                      {toToken?.symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Slippage Tolerance</span>
                    <span>{slippage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Minimum Received</span>
                    <span>
                      {(Number.parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken?.symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span>~0.0005 ETH</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-primary/20 bg-primary/5 hover:bg-primary/10"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleConfirm}>
                  Confirm Swap
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Processing Your Swap</h3>
              <p className="mb-4 text-sm text-muted-foreground">Please wait while we process your transaction...</p>
              <div className="w-full rounded-lg bg-muted/30 p-4 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Swapping</span>
                  <span>
                    {fromAmount} {fromToken?.symbol} → {toAmount} {toToken?.symbol}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Swap Successful!</h3>
              <p className="mb-4 text-sm text-muted-foreground">Your swap has been completed successfully.</p>
              <div className="w-full rounded-lg bg-muted/30 p-4 text-left">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Swapped</span>
                  <span>
                    {fromAmount} {fromToken?.symbol} → {toAmount} {toToken?.symbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Transaction Hash</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">0x71C7...976F</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground">
                      <ArrowDown className="h-3 w-3 rotate-[225deg]" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full" onClick={handleClose}>
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
