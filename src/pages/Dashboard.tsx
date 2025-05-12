"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  Twitter,
  MessageCircle,
  Youtube,
  Wallet,
  RefreshCw,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Check,
  AlertTriangle,
  X,
  Zap,
  Rocket,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Sparkles,
} from "lucide-react"

// Import components
import { AnimatedHeading } from "../components/ui/animated-heading"
import { ScrollReveal } from "../components/ui/scroll-reveal"
import { ScrollProgress } from "../components/ui/scroll-progress"
import { SocialAccountCard } from "../components/ui/social-account-card"
import { AnimatedIcon } from "../components/ui/animated-icon"
import { Card3D } from "../components/ui/3d-card"
import type { TwitterAccountData } from "../components/ui/twitter-auth-modal"

// Import UI components
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

// Mock data
const mockWallet = {
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  balance: 1250,
  suiAddress: "0x5a0d2d6c0d91c0e4d7c3b0a9f9c0e4d7c3b0a9f9c0e4d7c3b0a9f9c0e4d7c3b0",
  change: 12.5,
  positive: true,
  history: [1100, 1150, 1200, 1180, 1220, 1250],
}

const mockActivePlans = [
  {
    id: 1,
    name: "Growth Engine",
    startDate: "2025-03-28",
    endDate: "2025-04-04",
    platforms: ["Twitter", "Telegram"],
    status: "active",
    progress: 65,
    metrics: {
      impressions: 12500,
      engagement: 8.2,
      clicks: 450,
    },
  },
  {
    id: 2,
    name: "Cosmic Reach",
    startDate: "2025-03-25",
    endDate: "2025-04-01",
    platforms: ["Twitter", "Telegram", "YouTube"],
    status: "active",
    progress: 42,
    metrics: {
      impressions: 28700,
      engagement: 9.5,
      clicks: 820,
    },
  },
]

const mockEngagementData = [
  { name: "Mon", value: 400, avg: 320 },
  { name: "Tue", value: 300, avg: 310 },
  { name: "Wed", value: 500, avg: 340 },
  { name: "Thu", value: 280, avg: 290 },
  { name: "Fri", value: 590, avg: 370 },
  { name: "Sat", value: 620, avg: 400 },
  { name: "Sun", value: 700, avg: 450 },
]

const mockTokenData = [
  { name: "Week 1", value: 1000, avg: 950 },
  { name: "Week 2", value: 1200, avg: 1000 },
  { name: "Week 3", value: 900, avg: 1050 },
  { name: "Week 4", value: 1500, avg: 1100 },
  { name: "Week 5", value: 1250, avg: 1150 },
  { name: "Week 6", value: 1800, avg: 1200 },
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

const mockRewardsData = [
  { name: "Engagement", value: 45 },
  { name: "Referrals", value: 25 },
  { name: "Staking", value: 20 },
  { name: "Other", value: 10 },
]

const mockNotifications = [
  {
    id: 1,
    title: "Plan Activated",
    message: "Your Growth Engine plan is now active and running.",
    time: "2 hours ago",
    read: false,
    type: "success",
  },
  {
    id: 2,
    title: "Reward Earned",
    message: "You've earned 25 $MOON tokens from engagement rewards.",
    time: "Yesterday",
    read: false,
    type: "reward",
  },
  {
    id: 3,
    title: "Low Balance Warning",
    message: "Your $MOON balance is getting low for automatic renewals.",
    time: "2 days ago",
    read: true,
    type: "warning",
  },
]

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/50 bg-background/95 p-3 shadow-md backdrop-blur-sm">
        <p className="mb-1 font-medium">{label}</p>
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-teal-500"></span>
            Current: <span className="font-medium text-teal-500">{payload[0].value}</span>
          </p>
          {payload[1] && (
            <p className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/50"></span>
              Average: <span className="font-medium text-muted-foreground">{payload[1].value}</span>
            </p>
          )}
        </div>
      </div>
    )
  }
  return null
}

// Notification component
function NotificationItem({
  notification,
  onDismiss,
}: {
  notification: (typeof mockNotifications)[0]
  onDismiss: (id: number) => void
}) {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <Check className="h-5 w-5 text-teal-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-cyan-500" />
      case "reward":
        return <Award className="h-5 w-5 text-teal-500" />
      default:
        return <Info className="h-5 w-5 text-teal-500" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`mb-2 rounded-lg border p-3 ${
        notification.read ? "border-border/50 bg-card/50" : "border-teal-500/20 bg-teal-500/5"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 rounded-full p-1.5 ${
              notification.type === "success"
                ? "bg-teal-500/10"
                : notification.type === "warning"
                  ? "bg-amber-500/10"
                  : "bg-teal-500/10"
            }`}
          >
            {getIcon()}
          </div>
          <div>
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            <p className="mt-1 text-xs text-muted-foreground/70">{notification.time}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => onDismiss(notification.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [twitterConnected, setTwitterConnected] = useState(false)
  const [twitterAccount, setTwitterAccount] = useState<TwitterAccountData | undefined>(undefined)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [unreadCount, setUnreadCount] = useState(mockNotifications.filter((n) => !n.read).length)

  // Refs for scroll animations
  const statsRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const cardsY = useTransform(scrollYProgress, [0, 0.1], [50, 0])

  useEffect(() => {
    setMounted(true)

    // Update unread count when notifications change
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

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

  // Handle refresh data
  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Handle notification dismissal
  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  // Handle mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  // COLORS for charts
  const COLORS = ["#14b8a6", "#06b6d4", "#0ea5e9", "#22d3ee"]

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      {/* Scroll Progress Indicator */}
      <ScrollProgress color="rgba(20, 184, 166, 0.7)" height={3} />

      <AnimatedHeading
        title="Dashboard"
        subtitle="Monitor your visibility and $MOON performance on Base blockchain"
        className="container mx-auto mb-8 mt-16 px-4"
        glowColor="rgba(20, 184, 166, 0.4)"
      />

      <div className="container mx-auto px-4">
        {/* Top Action Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-teal-500/30 bg-teal-500/5 px-3 py-1.5">
              <Wallet className="mr-1.5 h-3.5 w-3.5" />
              Base Network
            </Badge>
            <Badge variant="outline" className="border-teal-500/30 bg-teal-500/5 px-3 py-1.5 text-teal-500">
              <Check className="mr-1.5 h-3.5 w-3.5" />
              Connected
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="relative gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10" 
              onClick={handleRefresh} 
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
        </div>

        {/* Notifications Panel */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Stay updated with your account activity</CardDescription>
                  </div>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-teal-500 hover:bg-teal-500/10 hover:text-teal-600"
                    >
                      Mark all as read
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="max-h-[300px] overflow-y-auto pr-2">
                    <AnimatePresence>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onDismiss={dismissNotification}
                          />
                        ))
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-8 text-center text-muted-foreground"
                        >
                          No notifications to display
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wallet Overview Cards */}
        <motion.div
          className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          style={{ opacity: cardsOpacity, y: cardsY }}
        >
          <ScrollReveal>
            <Card3D>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Base Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Address</span>
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-pointer text-sm font-mono text-muted-foreground hover:text-foreground">
                            {formatAddress(mockWallet.suiAddress)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to copy full address</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Network</span>
                    <Badge variant="outline" className="border-primary/50">
                      Base Mainnet
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card3D glowColor="rgba(20, 184, 166, 0.7)">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">$MOON Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <motion.span
                      className="text-2xl font-bold text-teal-500"
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
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">24h Change</span>
                    <span
                      className={`flex items-center text-sm font-medium ${mockWallet.positive ? "text-teal-500" : "text-red-500"}`}
                    >
                      {mockWallet.positive ? (
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                      )}
                      {mockWallet.change}%
                    </span>
                  </div>
                  <div className="mt-1 h-[40px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockWallet.history.map((value, index) => ({ name: index, value }))}>
                        <defs>
                          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#14b8a6"
                          strokeWidth={2}
                          fill="url(#balanceGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Card3D glowColor="rgba(20, 184, 166, 0.7)">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <motion.span
                      className="text-2xl font-bold text-teal-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {mockActivePlans.length}
                    </motion.span>
                    <Badge variant="outline" className="border-teal-500/50 bg-teal-500/10 text-teal-500">
                      Running
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Total Reach</span>
                    <span className="text-sm font-medium">
                      {mockActivePlans.reduce((sum, plan) => sum + plan.metrics.impressions, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {mockActivePlans.map((plan, i) => (
                      <div
                        key={i}
                        className="h-1.5 flex-1 rounded-full bg-teal-500/20"
                        style={{
                          background: `linear-gradient(90deg, #14b8a6 ${plan.progress}%, rgba(20, 184, 166, 0.2) ${plan.progress}%)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Card3D glowColor="rgba(20, 184, 166, 0.7)">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <motion.span
                      className="text-2xl font-bold text-teal-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      325
                    </motion.span>
                    <Badge variant="outline" className="border-orange-500/50 bg-orange-500/10 text-orange-500">
                      This Month
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Distribution</span>
                    <span className="text-sm font-medium">
                      <Sparkles className="mr-1 inline-block h-3 w-3 text-cyan-500" />4 Sources
                    </span>
                  </div>
                  <div className="mt-1 h-[40px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockRewardsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={15}
                          outerRadius={20}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {mockRewardsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card3D>
          </ScrollReveal>
        </motion.div>

        {/* Connected Social Accounts Section */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <AnimatedIcon pulse>
                <Twitter className="h-5 w-5 text-teal-500" />
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
          </div>
        </ScrollReveal>

        {/* Performance Overview */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3" ref={statsRef}>
          <ScrollReveal className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-teal-500" />
                    Performance Overview
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                      >
                        Last 7 Days <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                      <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                      <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                      <DropdownMenuItem>All Time</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>Track your engagement metrics and token performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="engagement">
                  <TabsList className="mb-4 w-full justify-start">
                    <TabsTrigger value="engagement" className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Engagement
                    </TabsTrigger>
                    <TabsTrigger value="tokens" className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      $MOON Value
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="engagement" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockEngagementData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="avg" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity={1} />
                            <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity={0.2} />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="tokens" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockTokenData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#14b8a6"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="avg"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth={1.5}
                          strokeDasharray="5 5"
                          dot={{ r: 3, strokeWidth: 1, fill: "#1f1f1f", stroke: "rgba(255,255,255,0.3)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4">
                <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-teal-500"></span>
                    Your Performance
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50"></span>
                    Platform Average
                  </div>
                </div>
              </CardFooter>
            </Card>
          </ScrollReveal>

          <ScrollReveal>
            <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-500" />
                  Platform Growth
                </CardTitle>
                <CardDescription>Track your social media growth across platforms</CardDescription>
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
                        <Badge variant="outline" className="border-teal-500/50 bg-teal-500/10 text-teal-500">
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
                          variant="default"
                        />
                      </motion.div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{platform.followers.toLocaleString()} followers</span>
                        <span>{platform.engagement}% engagement</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                >
                  <Rocket className="h-4 w-4" />
                  Boost Growth
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </div>

        {/* Active Promotion Plans */}
        <div ref={plansRef}>
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-teal-500" />
                  Active Promotion Plans
                </CardTitle>
                <CardDescription>Monitor your ongoing promotion campaigns and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {mockActivePlans.map((plan, index) => (
                    <Card3D key={plan.id} glowColor="rgba(20, 184, 166, 0.4)">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          <Badge variant="outline" className="border-teal-500/50 bg-teal-500/10 text-teal-500">
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
                              variant="default"
                            />
                          </motion.div>
                        </div>

                        <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg border border-border/50 bg-card/50 p-3">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Impressions</p>
                            <p className="text-sm font-medium">{plan.metrics.impressions.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Engagement</p>
                            <p className="text-sm font-medium">{plan.metrics.engagement}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Clicks</p>
                            <p className="text-sm font-medium">{plan.metrics.clicks}</p>
                          </div>
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
                    </Card3D>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-border/40 pt-4">
                <Button 
                  className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90"
                >
                  <Rocket className="h-4 w-4" />
                  Create New Plan
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
