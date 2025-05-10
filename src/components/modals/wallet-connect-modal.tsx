

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
}

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const wallets = [
    { name: "MetaMask", icon: "🦊" },
    { name: "Coinbase Wallet", icon: "🔵" },
    { name: "WalletConnect", icon: "🔗" },
    { name: "Trust Wallet", icon: "🛡️" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black/90 border-sky-500/20 text-white backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Button
                variant="outline"
                className="w-full justify-between border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 text-white"
                onClick={onConnect}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{wallet.icon}</span>
                  {wallet.name}
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-center text-xs text-gray-400">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  )
}
