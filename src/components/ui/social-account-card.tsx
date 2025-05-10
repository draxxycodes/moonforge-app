"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./button"
import { Badge } from "./badge"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Twitter, Link2, ExternalLink, Unlink } from "lucide-react"
import { TwitterAuthModal, type TwitterAccountData } from "./twitter-auth-modal"
import { Card3D } from "./3d-card"

interface SocialAccountCardProps {
  platform: "twitter" | "telegram" | "youtube"
  connected: boolean
  accountData?: TwitterAccountData
  onConnect: (data: TwitterAccountData) => void
  onDisconnect: () => void
}

const MotionButton = motion(Button)

export function SocialAccountCard({
  platform,
  connected,
  accountData,
  onConnect,
  onDisconnect,
}: SocialAccountCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const getPlatformColor = () => {
    switch (platform) {
      case "twitter":
        return "#1DA1F2"
      case "telegram":
        return "#0088cc"
      case "youtube":
        return "#FF0000"
      default:
        return "#1DA1F2"
    }
  }

  const getPlatformIcon = () => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-5 w-5" style={{ color: getPlatformColor() }} />
      default:
        return <Twitter className="h-5 w-5" style={{ color: getPlatformColor() }} />
    }
  }

  const getPlatformName = () => {
    switch (platform) {
      case "twitter":
        return "Twitter"
      case "telegram":
        return "Telegram"
      case "youtube":
        return "YouTube"
      default:
        return "Twitter"
    }
  }

  const handleConnectClick = () => {
    setIsAuthModalOpen(true)
  }

  const handleTwitterConnect = (data: TwitterAccountData) => {
    setIsAuthModalOpen(false)
    onConnect(data)
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card3D
          className="overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm"
          glowColor={`${getPlatformColor()}80`}
          hoverScale={1.03}
          rotationIntensity={8}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4" style={{ backgroundColor: `${getPlatformColor()}20` }}>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {getPlatformIcon()}
              </motion.div>
              <h3 className="font-medium">{getPlatformName()}</h3>
            </div>
            {connected ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }}>
                <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                  Connected
                </Badge>
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }}>
                <Badge variant="outline" className="border-yellow-500/50 bg-yellow-500/10 text-yellow-500">
                  Not Connected
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Content */}
          {connected && accountData ? (
            <div className="p-4">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Avatar>
                  <AvatarImage src={accountData.profileImage} alt={accountData.username} />
                  <AvatarFallback>{accountData.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-medium">{accountData.displayName}</p>
                    {accountData.verified && <Badge className="ml-1 h-4 bg-[#1DA1F2] px-1 text-[10px]">✓</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">@{accountData.username}</p>
                </div>
              </motion.div>

              <motion.div
                className="mt-4 flex items-center justify-between text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div>
                  <span className="font-medium">{accountData.followers.toLocaleString()}</span>{" "}
                  <span className="text-muted-foreground">Followers</span>
                </div>
                <div>
                  <span className="font-medium">{accountData.following.toLocaleString()}</span>{" "}
                  <span className="text-muted-foreground">Following</span>
                </div>
              </motion.div>

              <motion.div
                className="mt-4 flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 border-primary/20 bg-primary/5 hover:bg-primary/10"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Profile
                </MotionButton>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10"
                  onClick={onDisconnect}
                >
                  <Unlink className="h-3 w-3" />
                  Disconnect
                </Button>
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: `${getPlatformColor()}20` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, 0] }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <Link2 className="h-6 w-6" style={{ color: getPlatformColor() }} />
              </motion.div>
              <motion.h3
                className="mb-1 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Connect {getPlatformName()}
              </motion.h3>
              <motion.p
                className="mb-4 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Connect your {getPlatformName()} account to track promotion performance
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="gap-2"
                  style={{ backgroundColor: getPlatformColor(), color: "white" }}
                  onClick={handleConnectClick}
                >
                  {getPlatformIcon()}
                  Connect {getPlatformName()}
                </Button>
              </motion.div>
            </div>
          )}
        </Card3D>
      </motion.div>

      {platform === "twitter" && (
        <TwitterAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onConnect={handleTwitterConnect}
        />
      )}
    </>
  )
}
