"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { PageHeader } from "../components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import {
  Search,
  Book,
  Rocket,
  Shield,
  Code,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  FileText,
  BarChart3,
  Twitter,
  MessageCircle,
  Youtube,
} from "lucide-react"

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)

  // Refs for scroll animations
  const gettingStartedRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  // Check if elements are in view
  const gettingStartedInView = useInView(gettingStartedRef, { once: true, amount: 0.2 })
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const apiInView = useInView(apiRef, { once: true, amount: 0.2 })
  const faqInView = useInView(faqRef, { once: true, amount: 0.2 })

  // Mock code snippet
  const codeSnippet = `// Connect to MoonForge API
import { MoonForge } from '@moonforge/sdk';

// Initialize with your API key
const moonforge = new MoonForge({
  apiKey: 'YOUR_API_KEY',
  network: 'base-mainnet'
});

// Get user promotion stats
const stats = await moonforge.getUserStats('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
console.log(stats);`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // FAQ data
  const faqItems = [
    {
      question: "What is MoonForge?",
      answer:
        "MoonForge is a SocialFi platform that allows users to promote their social media accounts (Twitter, Telegram, YouTube) by purchasing promotion plans using the platform's native $MOON token.",
    },
    {
      question: "How do I purchase a promotion plan?",
      answer:
        "First, connect your wallet to the platform. Then, navigate to the Marketplace section, select a plan that fits your needs, and complete the purchase using $MOON tokens.",
    },
    {
      question: "What blockchain does MoonForge use?",
      answer:
        "MoonForge is built on Base, an Ethereum Layer 2 solution that provides fast and low-cost transactions while maintaining security and compatibility with the Ethereum ecosystem.",
    },
    {
      question: "How do I earn $MOON tokens?",
      answer:
        "You can earn $MOON tokens through the platform's reward system by participating in community activities, referring new users, or completing specific tasks. You can also purchase $MOON tokens through our MOONDEX.",
    },
    {
      question: "What social media platforms are supported?",
      answer:
        "Currently, MoonForge supports Twitter, Telegram, and YouTube. We plan to add more platforms in the future based on community feedback and demand.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, MoonForge is available as a responsive web application that works on all devices. A dedicated mobile app is on our roadmap for future development.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Documentation" subtitle="Everything you need to know about the MoonForge platform" />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Navigation */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1 border-primary/20 bg-primary/5 hover:bg-primary/10">
              <FileText className="h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-1 border-primary/20 bg-primary/5 hover:bg-primary/10">
              <ExternalLink className="h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="flex flex-col gap-1">
                  <a
                    href="#getting-started"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-primary hover:bg-primary/10"
                  >
                    <Rocket className="h-4 w-4" />
                    Getting Started
                  </a>
                  <a
                    href="#features"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Platform Features
                  </a>
                  <a
                    href="#api"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    <Code className="h-4 w-4" />
                    API Reference
                  </a>
                  <a
                    href="#security"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    <Shield className="h-4 w-4" />
                    Security
                  </a>
                  <a
                    href="#faq"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    <HelpCircle className="h-4 w-4" />
                    FAQ
                  </a>
                </nav>
                <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h3 className="mb-2 font-medium">Need Help?</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <Button size="sm" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documentation Content */}
          <div className="lg:col-span-3">
            {/* Getting Started */}
            <section id="getting-started" ref={gettingStartedRef} className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={gettingStartedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <Rocket className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Getting Started</h2>
                </div>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="mb-2 text-xl font-medium">Welcome to MoonForge</h3>
                      <p className="text-muted-foreground">
                        MoonForge is a SocialFi platform that allows users to promote their social media accounts by
                        purchasing promotion plans using the platform's native $MOON token. This guide will help you get
                        started with the platform.
                      </p>
                    </div>

                    <div className="mb-8 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Connect Your Wallet</h4>
                          <p className="text-sm text-muted-foreground">
                            Click on the "Connect Wallet" button in the top right corner of the page and select your
                            preferred wallet provider. MoonForge supports MetaMask, WalletConnect, and Coinbase Wallet.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Acquire $MOON Tokens</h4>
                          <p className="text-sm text-muted-foreground">
                            You'll need $MOON tokens to purchase promotion plans. You can acquire them through our{" "}
                            <Link to="/dex-integration" className="text-primary hover:underline">
                              MOONDEX
                            </Link>{" "}
                            or earn them through the platform's reward system.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Choose a Promotion Plan</h4>
                          <p className="text-sm text-muted-foreground">
                            Navigate to the{" "}
                            <Link to="/marketplace" className="text-primary hover:underline">
                              Marketplace
                            </Link>{" "}
                            and select a promotion plan that fits your needs. You can choose between weekly and monthly
                            plans with different features and price points.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium">Monitor Your Performance</h4>
                          <p className="text-sm text-muted-foreground">
                            Once your promotion is active, you can monitor its performance in the{" "}
                            <Link to="/dashboard" className="text-primary hover:underline">
                              Dashboard
                            </Link>
                            . Track your growth, engagement, and other metrics to measure the effectiveness of your
                            promotion.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <h4 className="mb-2 font-medium">Quick Start Video</h4>
                      <div className="aspect-video overflow-hidden rounded-md bg-black/20">
                        <div className="flex h-full items-center justify-center">
                          <Button
                            variant="outline"
                            className="gap-2 border-primary/20 bg-primary/10 hover:bg-primary/20"
                          >
                            <Play className="h-5 w-5" />
                            Watch Tutorial
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* Platform Features */}
            <section id="features" ref={featuresRef} className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Platform Features</h2>
                </div>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Tabs defaultValue="social">
                      <TabsList className="mb-6 w-full justify-start">
                        <TabsTrigger value="social">Social Promotion</TabsTrigger>
                        <TabsTrigger value="rewards">Rewards System</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      </TabsList>

                      <TabsContent value="social">
                        <div className="grid gap-6 md:grid-cols-3">
                          <div className="rounded-lg border border-primary/10 bg-card/30 p-4">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                              <Twitter className="h-5 w-5 text-blue-500" />
                            </div>
                            <h3 className="mb-2 font-medium">Twitter Promotion</h3>
                            <p className="text-sm text-muted-foreground">
                              Increase your Twitter followers, engagement, and visibility through strategic promotion.
                            </p>
                            <ul className="mt-3 space-y-1 text-sm">
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Featured in community feed</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Engagement boosting</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Follower growth tracking</span>
                              </li>
                            </ul>
                          </div>

                          <div className="rounded-lg border border-primary/10 bg-card/30 p-4">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10">
                              <MessageCircle className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="mb-2 font-medium">Telegram Promotion</h3>
                            <p className="text-sm text-muted-foreground">
                              Grow your Telegram community with featured promotions and channel highlights.
                            </p>
                            <ul className="mt-3 space-y-1 text-sm">
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Channel spotlights</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Member acquisition</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Content amplification</span>
                              </li>
                            </ul>
                          </div>

                          <div className="rounded-lg border border-primary/10 bg-card/30 p-4">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                              <Youtube className="h-5 w-5 text-red-500" />
                            </div>
                            <h3 className="mb-2 font-medium">YouTube Promotion</h3>
                            <p className="text-sm text-muted-foreground">
                              Increase your YouTube subscribers and views with strategic promotion.
                            </p>
                            <ul className="mt-3 space-y-1 text-sm">
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Video recommendations</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Subscriber growth</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Content discovery</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="rewards">
                        <div className="space-y-6">
                          <div className="rounded-lg border border-primary/10 bg-card/30 p-6">
                            <h3 className="mb-3 text-lg font-medium">Community Rewards</h3>
                            <p className="mb-4 text-muted-foreground">
                              MoonForge rewards active community members with $MOON tokens for their participation and
                              engagement.
                            </p>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="rounded-lg bg-primary/5 p-4">
                                <h4 className="mb-2 font-medium">Engagement Rewards</h4>
                                <p className="text-sm text-muted-foreground">
                                  Earn $MOON tokens by engaging with promoted content, providing feedback, and
                                  participating in community discussions.
                                </p>
                              </div>
                              <div className="rounded-lg bg-primary/5 p-4">
                                <h4 className="mb-2 font-medium">Referral Program</h4>
                                <p className="text-sm text-muted-foreground">
                                  Invite friends to join MoonForge and earn a percentage of their promotion spending as
                                  $MOON tokens.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-primary/10 bg-card/30 p-6">
                            <h3 className="mb-3 text-lg font-medium">Leaderboard & Achievements</h3>
                            <p className="mb-4 text-muted-foreground">
                              Compete with other users on the community leaderboard and earn achievements for your
                              activity.
                            </p>
                            <Link to="/rewards">
                              <Button
                                variant="outline"
                                className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
                              >
                                View Leaderboard
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="analytics">
                        <div className="space-y-6">
                          <div className="rounded-lg border border-primary/10 bg-card/30 p-6">
                            <h3 className="mb-3 text-lg font-medium">Performance Tracking</h3>
                            <p className="mb-4 text-muted-foreground">
                              MoonForge provides detailed analytics to help you track the performance of your
                              promotions.
                            </p>
                            <div className="grid gap-4 md:grid-cols-3">
                              <div className="rounded-lg bg-primary/5 p-4">
                                <h4 className="mb-2 font-medium">Growth Metrics</h4>
                                <p className="text-sm text-muted-foreground">
                                  Track follower growth, engagement rates, and other key metrics across all your social
                                  platforms.
                                </p>
                              </div>
                              <div className="rounded-lg bg-primary/5 p-4">
                                <h4 className="mb-2 font-medium">ROI Calculator</h4>
                                <p className="text-sm text-muted-foreground">
                                  Calculate the return on investment for your promotion spending and optimize your
                                  strategy.
                                </p>
                              </div>
                              <div className="rounded-lg bg-primary/5 p-4">
                                <h4 className="mb-2 font-medium">Comparative Analysis</h4>
                                <p className="text-sm text-muted-foreground">
                                  Compare the performance of different promotion plans and platforms to find what works
                                  best for you.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-primary/10 bg-card/30 p-6">
                            <h3 className="mb-3 text-lg font-medium">Dashboard</h3>
                            <p className="mb-4 text-muted-foreground">
                              Access all your analytics in one place with the MoonForge dashboard.
                            </p>
                            <Link to="/dashboard">
                              <Button
                                variant="outline"
                                className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
                              >
                                View Dashboard
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* API Reference */}
            <section id="api" ref={apiRef} className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={apiInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">API Reference</h2>
                </div>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="mb-2 text-xl font-medium">MoonForge API</h3>
                      <p className="text-muted-foreground">
                        MoonForge provides a comprehensive API that allows developers to integrate with the platform and
                        build custom applications.
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 font-medium">Authentication</h4>
                      <p className="mb-4 text-sm text-muted-foreground">
                        To use the MoonForge API, you'll need an API key. You can generate one in your account settings.
                      </p>
                      <div className="relative rounded-md bg-black/80 p-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={handleCopyCode}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <pre className="overflow-x-auto text-xs text-green-400">
                          <code>{codeSnippet}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg border border-primary/10 bg-card/30 p-4">
                        <h4 className="mb-2 font-medium">Endpoints</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500/10 text-green-500">GET</Badge>
                              <code className="text-sm">/api/v1/user/{"{wallet_address}"}</code>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Get user information and statistics</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500/10 text-blue-500">POST</Badge>
                              <code className="text-sm">/api/v1/promotions</code>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Create a new promotion</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500/10 text-green-500">GET</Badge>
                              <code className="text-sm">/api/v1/promotions/{"{promotion_id}"}</code>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Get promotion details</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-500/10 text-yellow-500">PUT</Badge>
                              <code className="text-sm">/api/v1/promotions/{"{promotion_id}"}</code>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Update promotion details</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-500/10 text-red-500">DELETE</Badge>
                              <code className="text-sm">/api/v1/promotions/{"{promotion_id}"}</code>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Cancel a promotion</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-primary/10 bg-card/30 p-4">
                        <h4 className="mb-2 font-medium">Rate Limits</h4>
                        <p className="text-sm text-muted-foreground">
                          The MoonForge API has the following rate limits:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <span className="text-muted-foreground">Free tier:</span>
                            <span>100 requests per minute</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-muted-foreground">Pro tier:</span>
                            <span>1,000 requests per minute</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-muted-foreground">Enterprise tier:</span>
                            <span>Custom limits</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button variant="outline" className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10">
                        <Book className="h-4 w-4" />
                        Full API Documentation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* Security */}
            <section id="security" className="mb-12">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Security</h2>
              </div>
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="mb-2 text-xl font-medium">Platform Security</h3>
                    <p className="text-muted-foreground">
                      MoonForge takes security seriously and implements multiple layers of protection to ensure the
                      safety of user data and funds.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-primary/10 bg-card/30 p-4">
                      <h4 className="mb-2 font-medium">Smart Contract Security</h4>
                      <p className="text-sm text-muted-foreground">
                        All MoonForge smart contracts undergo rigorous auditing by leading security firms to ensure they
                        are free from vulnerabilities.
                      </p>
                      <ul className="mt-3 space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Audited by CertiK and Hacken</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Open-source and verifiable</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Bug bounty program</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg border border-primary/10 bg-card/30 p-4">
                      <h4 className="mb-2 font-medium">User Data Protection</h4>
                      <p className="text-sm text-muted-foreground">
                        MoonForge implements industry-standard security measures to protect user data and privacy.
                      </p>
                      <ul className="mt-3 space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>End-to-end encryption</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>GDPR compliance</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Regular security assessments</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <h4 className="mb-2 font-medium">Security Best Practices</h4>
                    <p className="mb-3 text-sm text-muted-foreground">
                      We recommend following these security best practices when using MoonForge:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          1
                        </div>
                        <span>Use a hardware wallet for large holdings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          2
                        </div>
                        <span>Enable two-factor authentication for your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          3
                        </div>
                        <span>Never share your private keys or seed phrases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          4
                        </div>
                        <span>Verify all transaction details before confirming</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ */}
            <section id="faq" ref={faqRef} className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                </div>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {faqItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="rounded-lg border border-primary/10 bg-card/30 p-4"
                        >
                          <h3 className="mb-2 font-medium">{item.question}</h3>
                          <p className="text-sm text-muted-foreground">{item.answer}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                      <h4 className="mb-2 font-medium">Still have questions?</h4>
                      <p className="mb-4 text-sm text-muted-foreground">
                        If you couldn't find the answer to your question, feel free to reach out to our support team.
                      </p>
                      <Button className="gap-2">
                        Contact Support
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Play } from "lucide-react"
