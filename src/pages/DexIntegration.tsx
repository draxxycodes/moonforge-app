"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PageHeader } from "../components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  ArrowDown,
  RefreshCw,
  Settings,
  Info,
  Wallet,
  ExternalLink,
  BarChart3,
  Zap,
  ChevronRight,
  Copy,
  Code,
  FileText,
} from "lucide-react"
import { WalletConnectModal } from "../components/ui/wallet-connect-modal"
import { SwapConfirmationModal } from "../components/ui/swap-confirmation-modal"

// Mock data for price chart
const priceData = [
  { time: "00:00", price: 0.32 },
  { time: "04:00", price: 0.34 },
  { time: "08:00", price: 0.33 },
  { time: "12:00", price: 0.36 },
  { time: "16:00", price: 0.38 },
  { time: "20:00", price: 0.35 },
  { time: "24:00", price: 0.37 },
  { time: "28:00", price: 0.39 },
  { time: "32:00", price: 0.41 },
  { time: "36:00", price: 0.4 },
  { time: "40:00", price: 0.42 },
  { time: "44:00", price: 0.43 },
  { time: "48:00", price: 0.45 },
]

// Mock token list
const tokenList = [
  {
    id: "moon",
    symbol: "MOON",
    name: "MoonForge",
    logo: "/placeholder.svg?height=24&width=24",
    balance: 1250,
    price: 0.35,
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    logo: "/placeholder.svg?height=24&width=24",
    balance: 1.5,
    price: 3500,
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    logo: "/placeholder.svg?height=24&width=24",
    balance: 2500,
    price: 1,
  },
  { id: "usdt", symbol: "USDT", name: "Tether", logo: "/placeholder.svg?height=24&width=24", balance: 1800, price: 1 },
  { id: "dai", symbol: "DAI", name: "Dai", logo: "/placeholder.svg?height=24&width=24", balance: 1200, price: 1 },
]

// Mock transaction history
const transactionHistory = [
  {
    id: 1,
    type: "Swap",
    fromToken: "ETH",
    toToken: "MOON",
    fromAmount: 0.1,
    toAmount: 350,
    timestamp: "2025-03-28 14:32",
    status: "completed",
    txHash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  },
  {
    id: 2,
    type: "Swap",
    fromToken: "USDC",
    toToken: "MOON",
    fromAmount: 200,
    toAmount: 571.43,
    timestamp: "2025-03-27 09:15",
    status: "completed",
    txHash: "0x3243Ed9fdCDE2345890DDEAf6b083CA4cF0F68f2",
  },
  {
    id: 3,
    type: "Add Liquidity",
    fromToken: "MOON",
    toToken: "ETH",
    fromAmount: 500,
    toAmount: 0.05,
    timestamp: "2025-03-25 16:48",
    status: "completed",
    txHash: "0x2932A5aD465A36A49e0530D91A2D6503273B7f8c",
  },
]

// Mock liquidity pools
const liquidityPools = [
  {
    id: 1,
    pair: "MOON-ETH",
    token0: "MOON",
    token1: "ETH",
    token0Amount: 1250000,
    token1Amount: 125,
    apr: 42.5,
    totalLiquidity: "$437,500",
    myLiquidity: "$875",
    myShare: 0.2,
  },
  {
    id: 2,
    pair: "MOON-USDC",
    token0: "MOON",
    token1: "USDC",
    token0Amount: 2500000,
    token1Amount: 875000,
    apr: 36.8,
    totalLiquidity: "$875,000",
    myLiquidity: "$1,750",
    myShare: 0.2,
  },
  {
    id: 3,
    pair: "MOON-USDT",
    token0: "MOON",
    token1: "USDT",
    token0Amount: 1800000,
    token1Amount: 630000,
    apr: 38.2,
    totalLiquidity: "$630,000",
    myLiquidity: "$0",
    myShare: 0,
  },
]

export default function DexIntegration() {
  // State for swap form
  const [fromToken, setFromToken] = useState("eth")
  const [toToken, setToToken] = useState("moon")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState(0.5)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  // Refs for scroll animations
  const swapRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const poolsRef = useRef<HTMLDivElement>(null)

  // Check if elements are in view
  const swapInView = useInView(swapRef, { once: true, amount: 0.2 })
  const chartInView = useInView(chartRef, { once: true, amount: 0.2 })
  const poolsInView = useInView(poolsRef, { once: true, amount: 0.2 })

  // Calculate swap rate
  const calculateSwapRate = () => {
    const from = tokenList.find((t) => t.id === fromToken)
    const to = tokenList.find((t) => t.id === toToken)

    if (from && to) {
      return from.price / to.price
    }
    return 1
  }

  // Handle amount change
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue)) {
      const rate = calculateSwapRate()
      setToAmount((numValue * rate).toFixed(6))
    } else {
      setToAmount("")
    }
  }

  const handleToAmountChange = (value: string) => {
    setToAmount(value)
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue)) {
      const rate = calculateSwapRate()
      setFromAmount((numValue / rate).toFixed(6))
    } else {
      setFromAmount("")
    }
  }

  // Swap tokens
  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)

    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  // Handle wallet connection
  const handleConnectWallet = () => {
    setIsWalletModalOpen(true)
  }

  const handleWalletConnected = () => {
    setIsConnected(true)
    setIsWalletModalOpen(false)
  }

  // Handle swap confirmation
  const handleSwapConfirm = () => {
    if (fromAmount && toAmount) {
      setIsConfirmModalOpen(true)
    }
  }

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="DEX Integration" subtitle="Swap, provide liquidity, and trade $MOON tokens" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Swap Card */}
          <div ref={swapRef} className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={swapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Swap Tokens</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                      className="h-8 w-8 text-teal-500 hover:text-teal-500"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  {isSettingsOpen && (
                    <div className="mt-4 rounded-lg border border-border bg-teal-500/5 p-4">
                      <h4 className="mb-3 text-sm font-medium">Transaction Settings</h4>
                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Label htmlFor="slippage" className="text-sm">
                            Slippage Tolerance
                          </Label>
                          <span className="text-sm font-medium">{slippage}%</span>
                        </div>
                        <Slider
                          id="slippage"
                          min={0.1}
                          max={5}
                          step={0.1}
                          value={[slippage]}
                          onValueChange={(value) => setSlippage(value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-teal-500">
                          <span>0.1%</span>
                          <span>5%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="expert-mode" className="text-sm">
                          Expert Mode
                        </Label>
                        <Switch id="expert-mode" />
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* From Token */}
                    <div className="rounded-lg border border-border bg-teal-500/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-teal-500">From</span>
                        {isConnected && (
                          <span className="text-xs text-teal-500">
                            Balance: {tokenList.find((t) => t.id === fromToken)?.balance.toFixed(4) || "0"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder="0.0"
                          value={fromAmount}
                          onChange={(e) => handleFromAmountChange(e.target.value)}
                          className="border-0 bg-transparent text-lg shadow-none focus-visible:ring-0"
                        />
                        <Select value={fromToken} onValueChange={setFromToken}>
                          <SelectTrigger className="w-[140px] border-0 bg-teal-500/10 focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {tokenList
                              .filter((t) => t.id !== toToken)
                              .map((token) => (
                                <SelectItem key={token.id} value={token.id}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={token.logo || "/placeholder.svg"}
                                      alt={token.name}
                                      className="h-5 w-5 rounded-full"
                                    />
                                    <span>{token.symbol}</span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSwapTokens}
                        className="h-8 w-8 rounded-full bg-teal-500/10 text-teal-500 hover:bg-teal-500 hover:text-teal-500"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* To Token */}
                    <div className="rounded-lg border border-border bg-teal-500/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-teal-500">To</span>
                        {isConnected && (
                          <span className="text-xs text-teal-500">
                            Balance: {tokenList.find((t) => t.id === toToken)?.balance.toFixed(4) || "0"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder="0.0"
                          value={toAmount}
                          onChange={(e) => handleToAmountChange(e.target.value)}
                          className="border-0 bg-transparent text-lg shadow-none focus-visible:ring-0"
                        />
                        <Select value={toToken} onValueChange={setToToken}>
                          <SelectTrigger className="w-[140px] border-0 bg-teal-500/10 focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {tokenList
                              .filter((t) => t.id !== fromToken)
                              .map((token) => (
                                <SelectItem key={token.id} value={token.id}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={token.logo || "/placeholder.svg"}
                                      alt={token.name}
                                      className="h-5 w-5 rounded-full"
                                    />
                                    <span>{token.symbol}</span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Swap Rate */}
                    {fromAmount && toAmount && (
                      <div className="rounded-lg bg-teal-500/10 p-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-teal-500">Rate</span>
                          <div className="flex items-center gap-1">
                            <span>
                              1 {tokenList.find((t) => t.id === fromToken)?.symbol} = {calculateSwapRate().toFixed(6)}{" "}
                              {tokenList.find((t) => t.id === toToken)?.symbol}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 text-teal-500 hover:text-teal-500"
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-teal-500">Slippage Tolerance</span>
                          <span>{slippage}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {isConnected ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90" 
                      disabled={!fromAmount || !toAmount} 
                      onClick={handleSwapConfirm}
                    >
                      Swap
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90" 
                      onClick={handleConnectWallet}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {/* Network Info */}
              <Card className="mt-4 border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/10">
                        <img src="/placeholder.svg?height=20&width=20" alt="Base" className="h-5 w-5 rounded-full" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Base Mainnet</h3>
                        <p className="text-xs text-teal-500">Ethereum L2 Solution</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-teal-500/50 bg-teal-500/10 text-teal-500">
                      Connected
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Chart and Info */}
          <div ref={chartRef} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>$MOON Price Chart</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-teal-500/50 bg-teal-500/10 text-teal-500">
                        +5.7%
                      </Badge>
                      <Select defaultValue="24h">
                        <SelectTrigger className="h-8 w-[70px] border-0 bg-teal-500/10 focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1H</SelectItem>
                          <SelectItem value="24h">24H</SelectItem>
                          <SelectItem value="7d">7D</SelectItem>
                          <SelectItem value="30d">30D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="time" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                          stroke="#888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value}`}
                          domain={["auto", "auto"]}
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

                  <div className="mt-6 grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border border-border bg-teal-500/5 p-3">
                      <p className="text-xs text-teal-500">Current Price</p>
                      <p className="text-lg font-bold text-teal-500">$0.35</p>
                    </div>
                    <div className="rounded-lg border border-border bg-teal-500/5 p-3">
                      <p className="text-xs text-teal-500">24h Volume</p>
                      <p className="text-lg font-bold">$1.2M</p>
                    </div>
                    <div className="rounded-lg border border-border bg-teal-500/5 p-3">
                      <p className="text-xs text-teal-500">Market Cap</p>
                      <p className="text-lg font-bold">$12.5M</p>
                    </div>
                    <div className="rounded-lg border border-border bg-teal-500/5 p-3">
                      <p className="text-xs text-teal-500">Circulating Supply</p>
                      <p className="text-lg font-bold">35M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card className="mt-4 border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  {isConnected ? (
                    <div className="space-y-3">
                      {transactionHistory.map((tx) => (
                        <div key={tx.id} className="rounded-lg border border-border bg-teal-500/10 p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/10">
                                {tx.type === "Swap" ? (
                                  <RefreshCw className="h-4 w-4 text-teal-500" />
                                ) : (
                                  <Zap className="h-4 w-4 text-teal-500" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{tx.type}</p>
                                <p className="text-xs text-teal-500">
                                  {tx.fromAmount} {tx.fromToken} → {tx.toAmount} {tx.toToken}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="border-teal-500/50 bg-teal-500/10 text-teal-500">
                                  {tx.status}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-teal-500 hover:text-teal-500"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="text-xs text-teal-500">{tx.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10">
                        <Wallet className="h-8 w-8 text-teal-500" />
                      </div>
                      <h3 className="mb-2 text-lg font-medium">Connect Your Wallet</h3>
                      <p className="mb-4 text-sm text-teal-500">
                        Connect your wallet to view your transaction history
                      </p>
                      <Button 
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90" 
                        onClick={handleConnectWallet}
                      >
                        Connect Wallet
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Liquidity Pools */}
        <section ref={poolsRef} className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={poolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-teal-500" />
                <h2 className="text-2xl font-bold">Liquidity Pools</h2>
              </div>
              <Button variant="outline" className="gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10">
                Add Liquidity
                <Zap className="h-4 w-4" />
              </Button>
            </div>
            <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <Tabs defaultValue="pools">
                  <TabsList className="mb-6 w-full justify-start">
                    <TabsTrigger value="pools">All Pools</TabsTrigger>
                    <TabsTrigger value="my-pools">My Pools</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pools">
                    <div className="overflow-hidden rounded-lg border border-border">
                      <div className="grid grid-cols-6 border-b border-border bg-teal-500/10">
                        <div className="p-3 text-sm font-medium">Pool</div>
                        <div className="p-3 text-sm font-medium">APR</div>
                        <div className="p-3 text-sm font-medium">Total Liquidity</div>
                        <div className="p-3 text-sm font-medium">My Liquidity</div>
                        <div className="p-3 text-sm font-medium">My Share</div>
                        <div className="p-3 text-sm font-medium text-right">Actions</div>
                      </div>
                      {liquidityPools.map((pool) => (
                        <div key={pool.id} className="grid grid-cols-6 border-b border-border">
                          <div className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <img
                                  src="/placeholder.svg?height=24&width=24"
                                  alt={pool.token0}
                                  className="h-6 w-6 rounded-full"
                                />
                                <img
                                  src="/placeholder.svg?height=24&width=24"
                                  alt={pool.token1}
                                  className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full ring-2 ring-background"
                                />
                              </div>
                              <span className="font-medium">{pool.pair}</span>
                            </div>
                          </div>
                          <div className="flex items-center p-3">
                            <Badge variant="outline" className="border-teal-500/50 bg-teal-500/10 text-teal-500">
                              {pool.apr}%
                            </Badge>
                          </div>
                          <div className="p-3">{pool.totalLiquidity}</div>
                          <div className="p-3">{pool.myLiquidity}</div>
                          <div className="p-3">{pool.myShare}%</div>
                          <div className="flex items-center justify-end gap-2 p-3">
                            {pool.myShare > 0 ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                                >
                                  Remove
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                                >
                                  Add
                                </Button>
                              </>
                            ) : (
                              <Button size="sm" className="h-8">
                                Add Liquidity
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="my-pools">
                    {isConnected ? (
                      <div className="overflow-hidden rounded-lg border border-border">
                        <div className="grid grid-cols-6 border-b border-border bg-teal-500/10">
                          <div className="p-3 text-sm font-medium">Pool</div>
                          <div className="p-3 text-sm font-medium">APR</div>
                          <div className="p-3 text-sm font-medium">Total Liquidity</div>
                          <div className="p-3 text-sm font-medium">My Liquidity</div>
                          <div className="p-3 text-sm font-medium">My Share</div>
                          <div className="p-3 text-sm font-medium text-right">Actions</div>
                        </div>
                        {liquidityPools
                          .filter((pool) => pool.myShare > 0)
                          .map((pool) => (
                            <div key={pool.id} className="grid grid-cols-6 border-b border-border">
                              <div className="p-3">
                                <div className="flex items-center gap-2">
                                  <div className="relative">
                                    <img
                                      src="/placeholder.svg?height=24&width=24"
                                      alt={pool.token0}
                                      className="h-6 w-6 rounded-full"
                                    />
                                    <img
                                      src="/placeholder.svg?height=24&width=24"
                                      alt={pool.token1}
                                      className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full ring-2 ring-background"
                                    />
                                  </div>
                                  <span className="font-medium">{pool.pair}</span>
                                </div>
                              </div>
                              <div className="flex items-center p-3">
                                <Badge variant="outline" className="border-teal-500/50 bg-teal-500/10 text-teal-500">
                                  {pool.apr}%
                                </Badge>
                              </div>
                              <div className="p-3">{pool.totalLiquidity}</div>
                              <div className="p-3">{pool.myLiquidity}</div>
                              <div className="p-3">{pool.myShare}%</div>
                              <div className="flex items-center justify-end gap-2 p-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                                >
                                  Remove
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10">
                          <Wallet className="h-8 w-8 text-teal-500" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium">Connect Your Wallet</h3>
                        <p className="mb-4 text-sm text-teal-500">
                          Connect your wallet to view your liquidity positions
                        </p>
                        <Button 
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90" 
                          onClick={handleConnectWallet}
                        >
                          Connect Wallet
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Integration Guide */}
        <section className="mt-8">
          <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-teal-500" />
                Integration Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border border-teal-500/10 bg-teal-500/5 p-4">
                  <h3 className="mb-2 font-medium">How to Integrate with MoonForge DEX</h3>
                  <p className="text-sm text-teal-500">
                    MoonForge DEX is built on Base, an Ethereum Layer 2 solution that provides fast and low-cost
                    transactions. Follow these steps to integrate with our DEX:
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-500">
                        1
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Add Base Network to Your Wallet</h4>
                        <p className="text-xs text-teal-500">
                          Configure your wallet to connect to the Base Mainnet with the following parameters:
                        </p>
                        <div className="mt-2 rounded-md bg-teal-500/5 p-2 text-xs">
                          <div className="grid grid-cols-2 gap-1">
                            <span className="text-teal-500">Network Name:</span>
                            <span>Base Mainnet</span>
                            <span className="text-teal-500">RPC URL:</span>
                            <span>https://mainnet.base.org</span>
                            <span className="text-teal-500">Chain ID:</span>
                            <span>8453</span>
                            <span className="text-teal-500">Currency Symbol:</span>
                            <span>ETH</span>
                            <span className="text-teal-500">Block Explorer:</span>
                            <span>https://basescan.org</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-500">
                        2
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Import $MOON Token</h4>
                        <p className="text-xs text-teal-500">
                          Add the $MOON token to your wallet using the contract address:
                        </p>
                        <div className="mt-2 flex items-center gap-2 rounded-md bg-teal-500/5 p-2 text-xs">
                          <code>0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 text-teal-500 hover:text-teal-500"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-500">
                        3
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Bridge Assets to Base</h4>
                        <p className="text-xs text-teal-500">
                          Use the Base Bridge or other cross-chain bridges to move your assets from Ethereum to Base.
                        </p>
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 gap-2 border-teal-500/20 bg-teal-500/5 text-xs hover:bg-teal-500/10"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Base Bridge
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-500">
                        4
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Start Trading</h4>
                        <p className="text-xs text-teal-500">
                          Once you have assets on Base, you can start trading $MOON tokens on our DEX.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-teal-500/10 bg-teal-500/5 p-4">
                  <h3 className="mb-2 font-medium">Developer Resources</h3>
                  <p className="mb-4 text-sm text-teal-500">
                    Integrate with our DEX programmatically using our SDK and smart contracts.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-teal-500/10 p-3">
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-teal-500" />
                        <h4 className="font-medium">MoonForge DEX SDK</h4>
                      </div>
                      <p className="mt-1 text-xs text-teal-500">
                        Our JavaScript SDK provides easy integration with the MoonForge DEX for your dApps.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Documentation
                      </Button>
                    </div>
                    <div className="rounded-lg bg-teal-500/10 p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-teal-500" />
                        <h4 className="font-medium">Smart Contracts</h4>
                      </div>
                      <p className="mt-1 text-xs text-teal-500">
                        Explore our verified smart contracts on Basescan for direct integration.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on Basescan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="mt-8">
          <Card className="overflow-hidden border-teal-500/20 bg-gradient-to-r from-teal-500/5 to-cyan-500/10 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="relative z-10 p-8 text-center md:p-12">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Trade $MOON?</h2>
                  <p className="mx-auto mb-8 max-w-2xl text-lg text-teal-500">
                    Get started with MoonForge DEX and join the growing community of traders and liquidity providers.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button 
                      size="lg" 
                      className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90" 
                      onClick={handleConnectWallet}
                    >
                      Connect Wallet <Wallet className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                    >
                      Learn More
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Modals */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnected}
      />

      <SwapConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        fromToken={tokenList.find((t) => t.id === fromToken)}
        toToken={tokenList.find((t) => t.id === toToken)}
        fromAmount={fromAmount}
        toAmount={toAmount}
        slippage={slippage}
      />
    </div>
  )
}
