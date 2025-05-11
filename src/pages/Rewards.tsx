import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Gift, Star, Sparkles } from "lucide-react"
import { RewardClaimModal } from "../components/ui/reward-claim-modal"
import { PageHeader } from "../components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

// Mock data for leaderboard
const mockLeaderboard = [
  {
    id: 1,
    username: "cosmic_whale",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    points: 12500,
    rank: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    username: "moon_hunter",
    address: "0x3243Ed9fdCDE2345890DDEAf6b083CA4cF0F68f2",
    points: 10800,
    rank: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    username: "stellar_growth",
    address: "0x2932A5aD465A36A49e0530D91A2D6503273B7f8c",
    points: 9200,
    rank: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    username: "orbit_builder",
    address: "0x8e5F125E40e2F33A9D1F4C3F4c221F4F4B2D2D1a",
    points: 8500,
    rank: 4,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    username: "nebula_networker",
    address: "0x9A1b2C3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B",
    points: 7800,
    rank: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    username: "galactic_guru",
    address: "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B",
    points: 6900,
    rank: 6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    username: "lunar_legend",
    address: "0x2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B1a",
    points: 5400,
    rank: 7,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for available rewards
const mockRewards = [
  {
    id: 1,
    name: "Weekly Community Bonus",
    amount: 250,
    status: "available",
    type: "community",
    expiresIn: "2 days",
  },
  {
    id: 2,
    name: "Engagement Reward",
    amount: 120,
    status: "available",
    type: "engagement",
    expiresIn: "5 days",
  },
  {
    id: 3,
    name: "Referral Bonus",
    amount: 75,
    status: "pending",
    type: "referral",
    expiresIn: "N/A",
  },
]

// Mock user stats
const mockUserStats = {
  username: "your_username",
  rank: 42,
  points: 3200,
  nextRankPoints: 5000,
  totalEarned: 1450,
  referrals: 3,
}

export default function Rewards() {
  const [mounted, setMounted] = useState(false)
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleClaimReward = (reward: any) => {
    setSelectedReward(reward)
    setIsClaimModalOpen(true)
  }

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Your Ranking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Rank</p>
                      <p className="text-2xl font-bold text-primary">#{mockUserStats.rank}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Points</p>
                      <p className="text-2xl font-bold text-primary">{mockUserStats.points}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">$MOON Earned</p>
                      <p className="text-2xl font-bold text-primary">{mockUserStats.totalEarned}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress to Next Rank</span>
                      <span>
                        {mockUserStats.points} / {mockUserStats.nextRankPoints}
                      </span>
                    </div>
                    <Progress
                      value={(mockUserStats.points / mockUserStats.nextRankPoints) * 100}
                      className="h-2"
                      indicatorClassName="bg-gradient-to-r from-primary/50 to-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-500" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <span className="text-3xl font-bold text-primary">
                    {mockRewards.filter((r) => r.status === "available").length}
                  </span>
                  <span className="text-center text-sm text-muted-foreground">Rewards ready to claim</span>
                  <Button
                    variant="default"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => handleClaimReward(mockRewards.find((r) => r.status === "available"))}
                  >
                    Claim Rewards
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Referral Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <span className="text-3xl font-bold text-primary">{mockUserStats.referrals}</span>
                  <span className="text-center text-sm text-muted-foreground">Active referrals</span>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Invite Friends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Community Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center justify-between rounded-lg p-3 ${
                        index < 3 ? "bg-primary/10 shadow-glow-sm" : "bg-card/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold">
                          {user.rank}
                        </div>
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.username} />
                          <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-xs text-muted-foreground">{formatAddress(user.address)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{user.points.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">points</span>
                        {index < 3 && (
                          <Sparkles
                            className={`h-4 w-4 ${
                              index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-300" : "text-amber-600"
                            }`}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-500" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRewards.map((reward) => (
                    <Card
                      key={reward.id}
                      className={`border-primary/10 bg-card/30 backdrop-blur-sm ${
                        reward.status === "available" ? "border-green-500/20" : "border-yellow-500/20"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{reward.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {reward.status === "available" ? `Expires in ${reward.expiresIn}` : "Processing"}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              reward.status === "available"
                                ? "border-green-500/50 bg-green-500/10 text-green-500"
                                : "border-yellow-500/50 bg-yellow-500/10 text-yellow-500"
                            }
                          >
                            {reward.status === "available" ? "Available" : "Pending"}
                          </Badge>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-bold text-primary">{reward.amount}</span>
                            <span className="text-xs text-muted-foreground">$MOON</span>
                          </div>
                          {reward.status === "available" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleClaimReward(reward)}
                              className="border-primary/20 bg-primary/5 hover:bg-primary/10"
                            >
                              Claim
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isClaimModalOpen && selectedReward && (
          <RewardClaimModal
            reward={selectedReward}
            isOpen={isClaimModalOpen}
            onClose={() => setIsClaimModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
