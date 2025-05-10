"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { PageHeader } from "../components/ui/page-header"
import { CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Twitter, MessageCircle, Youtube } from "lucide-react"

// Import the SocialAccountCard component
import { SocialAccountCard } from "../components/ui/social-account-card"
import type { TwitterAccountData } from "../components/ui/twitter-auth-modal"
import { DashboardCard } from "../components/ui/dashboard-card"
import { AnimatedIcon } from "../components/ui/animated-icon"

// Mock data
const mockWallet = {
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  balance: 1250,
}

const mockActivePlans = [
  {
    id: 1,
    name: "Growth Engine",
    startDate: "2025-03-28",
    endDate: "2025-04-04",
    platforms: ["Twitter", "Telegram"],
    status: "active",
  },
  {
    id: 2,
    name: "Cosmic Reach",
    startDate: "2025-03-25",
    endDate: "2025-04-01",
    platforms: ["Twitter", "Telegram", "YouTube"],
    status: "active",
  },
]

const mockEngagementData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 280 },
  { name: "Fri", value: 590 },
  { name: "Sat", value: 620 },
  { name: "Sun", value: 700 },
]

const mockTokenData = [
  { name: "Week 1", value: 1000 },
  { name: "Week 2", value: 1200 },
  { name: "Week 3", value: 900 },
  { name: "Week 4", value: 1500 },
  { name: "Week 5", value: 1250 },
  { name: "Week 6", value: 1800 },
]

const mockPlatformStats = [
  {
    platform: "Twitter",
    icon: Twitter,
    growth: 32,
    followers: 2450,
    engagement: 5.7,
    color: "#1DA1F2",
  },
  {
    platform: "Telegram",
    icon: MessageCircle,
    growth: 18,
    followers: 1280,
    engagement: 8.2,
    color: "#0088cc",
  },
  {
    platform: "YouTube",
    icon: Youtube,
    growth: 24,
    followers: 850,
    engagement: 12.5,
    color: "#FF0000",
  },
]

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  // Add state for Twitter connection
  const [twitterConnected, setTwitterConnected] = useState(false)
  const [twitterAccount, setTwitterAccount] = useState<TwitterAccountData | undefined>(undefined)

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const cardsY = useTransform(scrollYProgress, [0, 0.1], [50, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Calculate days remaining for a plan
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Handle Twitter connection
  const handleTwitterConnect = (data: TwitterAccountData) => {
    setTwitterConnected(true)
    setTwitterAccount(data)
  }

  // Handle Twitter disconnection
  const handleTwitterDisconnect = () => {
    setTwitterConnected(false)
    setTwitterAccount(undefined)
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Dashboard" subtitle="Monitor your visibility and $MOON performance"/> 

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8 grid gap-6 md:grid-cols-3" style={{ opacity: cardsOpacity, y: cardsY }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <DashboardCard>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Wallet Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{formatAddress(mockWallet.address)}</span>
                  <Badge variant="outline" className="border-primary/50">
                    Connected
                  </Badge>
                </div>
              </CardContent>
            </DashboardCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <DashboardCard glowColor="rgba(124, 58, 237, 0.7)">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">$MOON Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <motion.span
                    className="text-2xl font-bold text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {mockWallet.balance}
                  </motion.span>
                  <Badge variant="outline" className="border-primary/50 bg-primary/10">
                    $MOON
                  </Badge>
                </div>
              </CardContent>
            </DashboardCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <DashboardCard glowColor="rgba(34, 197, 94, 0.5)">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <motion.span
                    className="text-2xl font-bold text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {mockActivePlans.length}
                  </motion.span>
                  <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                    Running
                  </Badge>
                </div>
              </CardContent>
            </DashboardCard>
          </motion.div>
        </motion.div>

        {/* Connected Social Accounts Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <AnimatedIcon pulse>
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
            </AnimatedIcon>
            <h2 className="text-xl font-bold">Connected Social Accounts</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <SocialAccountCard
              platform="twitter"
              connected={twitterConnected}
              accountData={twitterAccount}
              onConnect={handleTwitterConnect}
              onDisconnect={handleTwitterDisconnect}
            />
            {/* Add more social platforms here in the future */}
          </div>
        </motion.div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <DashboardCard>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="engagement">
                  <TabsList className="mb-4">
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    <TabsTrigger value="tokens">$MOON Value</TabsTrigger>
                  </TabsList>
                  <TabsContent value="engagement" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockEngagementData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a1a1a",
                            borderColor: "#333",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(124, 58, 237)" stopOpacity={1} />
                            <stop offset="100%" stopColor="rgb(124, 58, 237)" stopOpacity={0.2} />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="tokens" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockTokenData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a1a1a",
                            borderColor: "#333",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#7c3aed"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </DashboardCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <DashboardCard>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockPlatformStats.map((platform, index) => (
                    <motion.div
                      key={platform.platform}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon className="h-4 w-4" delay={index * 0.2} bounce>
                            <platform.icon className="h-4 w-4" style={{ color: platform.color }} />
                          </AnimatedIcon>
                          <span className="text-sm font-medium">{platform.platform}</span>
                        </div>
                        <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                          +{platform.growth}%
                        </Badge>
                      </div>
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
                      >
                        <Progress
                          value={platform.engagement * 8}
                          className="h-2"
                          indicatorClassName="bg-gradient-to-r from-primary/50 to-primary"
                        />
                      </motion.div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{platform.followers} followers</span>
                        <span>{platform.engagement}% engagement</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </DashboardCard>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <DashboardCard>
            <CardHeader>
              <CardTitle>Active Promotion Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {mockActivePlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="overflow-hidden"
                  >
                    <DashboardCard glowColor="rgba(124, 58, 237, 0.4)">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                            {plan.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Time Remaining</span>
                            <span>{getDaysRemaining(plan.endDate)} days left</span>
                          </div>
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          >
                            <Progress
                              value={(getDaysRemaining(plan.endDate) / 7) * 100}
                              className="h-2"
                              indicatorClassName="bg-gradient-to-r from-primary/50 to-primary"
                            />
                          </motion.div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {plan.platforms.map((platform, platformIndex) => (
                            <motion.div
                              key={platform}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.6 + platformIndex * 0.1 }}
                            >
                              <Badge variant="secondary" className="bg-secondary/30">
                                {platform}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </DashboardCard>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  )
}
