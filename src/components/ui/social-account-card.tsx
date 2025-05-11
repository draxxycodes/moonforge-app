"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { Twitter, X } from "lucide-react"
import { TwitterAuthModal, type TwitterAccountData } from "./twitter-auth-modal"

interface SocialAccountCardProps {
  platform: "twitter" | "telegram" | "youtube"
  connected: boolean
  accountData?: TwitterAccountData
  onConnect: (data: TwitterAccountData) => void
  onDisconnect: () => void
}

export function SocialAccountCard({
  platform,
  connected,
  accountData,
  onConnect,
  onDisconnect,
}: SocialAccountCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConnect = () => {
    if (platform === "twitter") {
      setIsModalOpen(true)
    }
  }

  const handleTwitterAuth = (data: TwitterAccountData) => {
    setIsModalOpen(false)
    onConnect(data)
  }

  return (
    <>
      <Card className="overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-glow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              {platform === "twitter" && <Twitter className="h-5 w-5 text-[#1DA1F2]" />}
              {platform === "twitter" ? "Twitter" : platform}
            </CardTitle>
            {connected ? (
              <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="border-muted/50 bg-muted/10 text-muted-foreground">
                Not Connected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {connected && accountData ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <img
                    src={accountData.profileImage || "/placeholder.svg?height=48&width=48"}
                    alt={accountData.username}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{accountData.name}</h3>
                  <p className="text-sm text-muted-foreground">@{accountData.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-lg border border-border/50 bg-card/50 p-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Followers</p>
                  <p className="text-sm font-medium">{accountData.followers.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Following</p>
                  <p className="text-sm font-medium">{accountData.following.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Posts</p>
                  <p className="text-sm font-medium">{accountData.posts.toLocaleString()}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10"
                onClick={onDisconnect}
              >
                <X className="h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Connect your {platform === "twitter" ? "Twitter" : platform} account to boost your social media presence
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleConnect} className="gap-2">
                  <Twitter className="h-4 w-4" />
                  Connect {platform === "twitter" ? "Twitter" : platform}
                </Button>
              </motion.div>
            </div>
          )}
        </CardContent>
      </Card>

      {platform === "twitter" && (
        <TwitterAuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAuth={handleTwitterAuth} />
      )}
    </>
  )
}
