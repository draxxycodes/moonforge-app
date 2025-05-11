"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Button } from "./button"
import { Wallet, X } from "lucide-react"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
}

const walletOptions = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Connect to your MetaMask wallet",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Scan with WalletConnect to connect",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Connect to your Coinbase wallet",
  },
]

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleConnect = (walletId: string) => {
    setSelectedWallet(walletId)
    setConnecting(true)

    // Simulate connection delay
    setTimeout(() => {
      setConnecting(false)
      onConnect()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-primary/20 bg-card/95 backdrop-blur-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Connect your wallet to access the MoonForge platform and manage your social media promotions.
          </p>

          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {connecting ? (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-primary/5 p-8"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Wallet className="h-8 w-8 text-primary" />
                    </motion.div>
                  </div>
                  <h3 className="mb-2 text-lg font-medium">
                    Connecting to {walletOptions.find((w) => w.id === selectedWallet)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">Please confirm the connection in your wallet...</p>
                  <Button variant="ghost" size="sm" className="mt-4" onClick={() => setConnecting(false)}>
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="options"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {walletOptions.map((wallet) => (
                    <motion.div key={wallet.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="flex h-auto w-full items-center justify-between border-primary/10 bg-card p-4 hover:border-primary/30 hover:bg-primary/5"
                        onClick={() => handleConnect(wallet.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Wallet className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-medium">{wallet.name}</h3>
                            <p className="text-xs text-muted-foreground">{wallet.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { ChevronRight } from "lucide-react"
