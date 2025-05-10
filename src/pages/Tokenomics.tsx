"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PageHeader } from "../components/ui/page-header"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Progress } from "../components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import {
  Coins,
  Flame,
  Lock,
  Users,
  Rocket,
  ArrowRight,
  Download,
  ExternalLink,
  Zap,
  RefreshCw,
  TrendingUp,
} from "lucide-react"
import { TokenDistributionChart } from "../components/ui/token-distribution-chart"

// Mock data for token distribution
const tokenDistribution = [
  { name: "Community Rewards", value: 30, color: "#7c3aed" },
  { name: "Team & Advisors", value: 20, color: "#8b5cf6" },
  { name: "Ecosystem Growth", value: 15, color: "#a78bfa" },
  { name: "Liquidity", value: 15, color: "#c4b5fd" },
  { name: "Marketing", value: 10, color: "#ddd6fe" },
  { name: "Reserve", value: 10, color: "#ede9fe" },
]

// Mock data for token utility
const tokenUtility = [
  {
    title: "Promotion Plans",
    description: "Purchase social media promotion plans to increase your visibility and reach.",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Governance",
    description: "Vote on platform proposals and help shape the future of MoonForge.",
    icon: Users,
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Staking Rewards",
    description: "Stake $MOON tokens to earn passive income and platform benefits.",
    icon: Coins,
    color: "from-pink-500 to-orange-500",
  },
  {
    title: "Fee Discounts",
    description: "Get discounts on platform fees by holding $MOON tokens.",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
  },
]

// Mock data for token metrics
const tokenMetrics = {
  totalSupply: "100,000,000",
  circulatingSupply: "35,000,000",
  marketCap: "$12,500,000",
  currentPrice: "$0.35",
  allTimeHigh: "$0.58",
  holders: "12,450",
}

// Mock data for token release schedule
const releaseSchedule = [
  { month: "Jan", amount: 5000000 },
  { month: "Feb", amount: 7500000 },
  { month: "Mar", amount: 10000000 },
  { month: "Apr", amount: 15000000 },
  { month: "May", amount: 20000000 },
  { month: "Jun", amount: 25000000 },
  { month: "Jul", amount: 30000000 },
  { month: "Aug", amount: 35000000 },
  { month: "Sep", amount: 40000000 },
  { month: "Oct", amount: 45000000 },
  { month: "Nov", amount: 50000000 },
  { month: "Dec", amount: 55000000 },
]

// Mock data for token price history
const priceHistory = [
  { month: "Jan", price: 0.1 },
  { month: "Feb", price: 0.15 },
  { month: "Mar", price: 0.2 },
  { month: "Apr", price: 0.18 },
  { month: "May", price: 0.25 },
  { month: "Jun", price: 0.3 },
  { month: "Jul", price: 0.28 },
  { month: "Aug", price: 0.35 },
  { month: "Sep", price: 0.4 },
  { month: "Oct", price: 0.45 },
  { month: "Nov", price: 0.5 },
  { month: "Dec", price: 0.35 },
]

export default function Tokenomics() {
  // Refs for scroll animations
  const overviewRef = useRef<HTMLDivElement>(null)
  const distributionRef = useRef<HTMLDivElement>(null)
  const utilityRef = useRef<HTMLDivElement>(null)
  const vestingRef = useRef<HTMLDivElement>(null)

  // Check if elements are in view
  const overviewInView = useInView(overviewRef, { once: true, amount: 0.2 })
  const distributionInView = useInView(distributionRef, { once: true, amount: 0.2 })
  const utilityInView = useInView(utilityRef, { once: true, amount: 0.2 })
  const vestingInView = useInView(vestingRef, { once: true, amount: 0.2 })

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Tokenomics" subtitle="Understanding the $MOON token economics and utility" />

      <div className="container mx-auto px-4 py-8">
        {/* Token Overview */}
        <section ref={overviewRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Coins className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Token Overview</h2>
            </div>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-medium">$MOON Token</h3>
                    <p className="mb-4 text-muted-foreground">
                      $MOON is the native utility token of the MoonForge platform, powering all transactions and
                      interactions within the ecosystem.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Token Type</span>
                        <span className="font-medium">ERC-20</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Blockchain</span>
                        <span className="font-medium">Base (Ethereum L2)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Contract Address</span>
                        <div className="flex items-center gap-1">
                          <code className="text-xs">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-primary/20 bg-primary/5 hover:bg-primary/10"
                      >
                        <Download className="h-4 w-4" />
                        Whitepaper
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-primary/20 bg-primary/5 hover:bg-primary/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on Basescan
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {Object.entries(tokenMetrics).map(([key, value], index) => (
                      <Card key={key} className="border-primary/10 bg-card/30 backdrop-blur-sm">
                        <CardContent className="p-4">
                          <h4 className="mb-1 text-sm text-muted-foreground">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </h4>
                          <p className="text-xl font-bold text-primary">{value}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h3 className="mb-3 text-lg font-medium">Token Mechanics</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Flame className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Burn Mechanism</h4>
                        <p className="text-sm text-muted-foreground">
                          5% of all transaction fees are burned, reducing the total supply over time.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <RefreshCw className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Rewards Loop</h4>
                        <p className="text-sm text-muted-foreground">
                          15% of all fees are redistributed to active community members.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Deflationary Model</h4>
                        <p className="text-sm text-muted-foreground">
                          The combination of burning and staking creates a deflationary pressure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Token Distribution */}
        <section ref={distributionRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={distributionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Token Distribution</h2>
            </div>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-medium">Allocation</h3>
                    <p className="mb-6 text-muted-foreground">
                      The total supply of 100,000,000 $MOON tokens is distributed across various categories to ensure
                      the long-term sustainability and growth of the platform.
                    </p>
                    <div className="space-y-4">
                      {tokenDistribution.map((item) => (
                        <div key={item.name}>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-sm font-medium">{item.value}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-background">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${item.value}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <TokenDistributionChart data={tokenDistribution} />
                  </div>
                </div>

                <Tabs defaultValue="release">
                  <TabsList className="mb-4 w-full justify-start">
                    <TabsTrigger value="release">Release Schedule</TabsTrigger>
                    <TabsTrigger value="price">Price History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="release">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={releaseSchedule}>
                          <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis
                            stroke="#888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value / 1000000}M`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1a1a1a",
                              borderColor: "#333",
                              borderRadius: "8px",
                            }}
                            formatter={(value: any) => [`${(value as number).toLocaleString()} $MOON`, "Amount"]}
                          />
                          <Bar dataKey="amount" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                          <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="rgb(124, 58, 237)" stopOpacity={1} />
                              <stop offset="100%" stopColor="rgb(124, 58, 237)" stopOpacity={0.2} />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="price">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceHistory}>
                          <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis
                            stroke="#888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1a1a1a",
                              borderColor: "#333",
                              borderRadius: "8px",
                            }}
                            formatter={(value: any) => [`$${value}`, "Price"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#7c3aed"
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Token Utility */}
        <section ref={utilityRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={utilityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Token Utility</h2>
            </div>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-medium">$MOON Use Cases</h3>
                  <p className="text-muted-foreground">
                    The $MOON token is designed to have multiple utilities within the MoonForge ecosystem, creating a
                    sustainable token economy.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {tokenUtility.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={utilityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full border-primary/10 bg-card/30 backdrop-blur-sm">
                        <CardContent className="flex h-full flex-col p-6">
                          <div
                            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${item.color}`}
                          >
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                          <p className="flex-1 text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
                  <h3 className="mb-4 text-xl font-medium">Staking Benefits</h3>
                  <p className="mb-6 text-muted-foreground">
                    Staking $MOON tokens provides various benefits based on the amount staked and the staking duration.
                  </p>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <div className="grid grid-cols-4 border-b border-border bg-muted/50">
                      <div className="p-3 text-sm font-medium">Tier</div>
                      <div className="p-3 text-sm font-medium">Staking Amount</div>
                      <div className="p-3 text-sm font-medium">APY</div>
                      <div className="p-3 text-sm font-medium">Benefits</div>
                    </div>
                    <div className="grid grid-cols-4 border-b border-border">
                      <div className="p-3 text-sm">Bronze</div>
                      <div className="p-3 text-sm">1,000 $MOON</div>
                      <div className="p-3 text-sm">5%</div>
                      <div className="p-3 text-sm">5% discount on platform fees</div>
                    </div>
                    <div className="grid grid-cols-4 border-b border-border">
                      <div className="p-3 text-sm">Silver</div>
                      <div className="p-3 text-sm">5,000 $MOON</div>
                      <div className="p-3 text-sm">7.5%</div>
                      <div className="p-3 text-sm">10% discount on platform fees, priority support</div>
                    </div>
                    <div className="grid grid-cols-4 border-b border-border">
                      <div className="p-3 text-sm">Gold</div>
                      <div className="p-3 text-sm">10,000 $MOON</div>
                      <div className="p-3 text-sm">10%</div>
                      <div className="p-3 text-sm">15% discount, priority support, exclusive features</div>
                    </div>
                    <div className="grid grid-cols-4">
                      <div className="p-3 text-sm">Platinum</div>
                      <div className="p-3 text-sm">25,000 $MOON</div>
                      <div className="p-3 text-sm">12.5%</div>
                      <div className="p-3 text-sm">20% discount, VIP support, governance voting power</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Vesting & Governance */}
        <section ref={vestingRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={vestingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Vesting & Governance</h2>
            </div>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-medium">Vesting Schedule</h3>
                    <p className="mb-6 text-muted-foreground">
                      To ensure the long-term stability of the $MOON token, team and advisor allocations are subject to
                      a vesting schedule.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Team & Advisors (20%)</h4>
                          <Badge variant="outline" className="border-primary/50 bg-primary/10">
                            24 months
                          </Badge>
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">
                          6-month cliff, then linear vesting over 18 months
                        </p>
                        <Progress
                          value={75}
                          className="h-2"
                          indicatorClassName="bg-gradient-to-r from-primary/50 to-primary"
                        />
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Ecosystem Growth (15%)</h4>
                          <Badge variant="outline" className="border-primary/50 bg-primary/10">
                            36 months
                          </Badge>
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">
                          3-month cliff, then linear vesting over 33 months
                        </p>
                        <Progress
                          value={50}
                          className="h-2"
                          indicatorClassName="bg-gradient-to-r from-primary/50 to-primary"
                        />
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Marketing (10%)</h4>
                          <Badge variant="outline" className="border-primary/50 bg-primary/10">
                            18 months
                          </Badge>
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">No cliff, linear vesting over 18 months</p>
                        <Progress
                          value={65}
                          className="h-2"
                          indicatorClassName="bg-gradient-to-r from-primary/50 to-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-medium">Governance</h3>
                    <p className="mb-6 text-muted-foreground">
                      $MOON token holders can participate in the governance of the MoonForge platform through the
                      MoonForge DAO.
                    </p>
                    <div className="rounded-lg border border-primary/10 bg-card/30 p-4">
                      <h4 className="mb-3 font-medium">Voting Power</h4>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Voting power is determined by the amount of $MOON tokens staked in the governance contract. 1
                        $MOON = 1 vote.
                      </p>
                      <div className="space-y-3">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Proposal Threshold</span>
                            <span className="text-sm font-medium">10,000 $MOON</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Minimum amount required to submit a proposal</p>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Quorum</span>
                            <span className="text-sm font-medium">5% of staked $MOON</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Minimum participation required for a vote to be valid
                          </p>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Voting Period</span>
                            <span className="text-sm font-medium">7 days</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Duration of the voting period for each proposal
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 rounded-lg border border-primary/10 bg-card/30 p-4">
                      <h4 className="mb-3 font-medium">Governance Scope</h4>
                      <p className="mb-4 text-sm text-muted-foreground">
                        The MoonForge DAO can vote on the following aspects of the platform:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            •
                          </div>
                          <span>Platform fee adjustments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            •
                          </div>
                          <span>New feature implementations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            •
                          </div>
                          <span>Treasury fund allocations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            •
                          </div>
                          <span>Protocol upgrades</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative z-10 p-8 text-center md:p-12">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Ready to Join the MoonForge Ecosystem?
                  </h2>
                  <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                    Get started with $MOON tokens and unlock the full potential of the MoonForge platform.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button size="lg" className="gap-2">
                      Buy $MOON Tokens
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
                    >
                      View on DEX
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
