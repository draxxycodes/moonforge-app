"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "../components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { AlertCircle, CheckCircle, Search, Shield, Users, XCircle } from "lucide-react"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    username: "cosmic_whale",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    status: "active",
    joinedAt: "2025-01-15",
    plans: 2,
    balance: 1250,
  },
  {
    id: 2,
    username: "moon_hunter",
    address: "0x3243Ed9fdCDE2345890DDEAf6b083CA4cF0F68f2",
    status: "active",
    joinedAt: "2025-02-03",
    plans: 1,
    balance: 800,
  },
  {
    id: 3,
    username: "stellar_growth",
    address: "0x2932A5aD465A36A49e0530D91A2D6503273B7f8c",
    status: "inactive",
    joinedAt: "2025-01-28",
    plans: 0,
    balance: 450,
  },
  {
    id: 4,
    username: "orbit_builder",
    address: "0x8e5F125E40e2F33A9D1F4C3F4c221F4F4B2D2D1a",
    status: "active",
    joinedAt: "2025-02-10",
    plans: 3,
    balance: 2100,
  },
  {
    id: 5,
    username: "nebula_networker",
    address: "0x9A1b2C3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B",
    status: "suspended",
    joinedAt: "2025-01-05",
    plans: 0,
    balance: 300,
  },
]

// Mock data for promotions
const mockPromotions = [
  {
    id: 1,
    username: "cosmic_whale",
    plan: "Growth Engine",
    platform: "Twitter",
    startDate: "2025-03-28",
    endDate: "2025-04-04",
    status: "active",
  },
  {
    id: 2,
    username: "cosmic_whale",
    plan: "Cosmic Reach",
    platform: "YouTube",
    startDate: "2025-03-25",
    endDate: "2025-04-01",
    status: "active",
  },
  {
    id: 3,
    username: "moon_hunter",
    plan: "Lunar Starter",
    platform: "Twitter",
    startDate: "2025-03-20",
    endDate: "2025-04-20",
    status: "active",
  },
  {
    id: 4,
    username: "orbit_builder",
    plan: "Growth Engine",
    platform: "Telegram",
    startDate: "2025-03-15",
    endDate: "2025-03-22",
    status: "expired",
  },
  {
    id: 5,
    username: "orbit_builder",
    plan: "Orbital Growth",
    platform: "Twitter",
    startDate: "2025-03-10",
    endDate: "2025-04-10",
    status: "active",
  },
]

// Mock data for reports
const mockReports = [
  {
    id: 1,
    username: "nebula_networker",
    reason: "Inappropriate content",
    date: "2025-03-28",
    status: "pending",
    reporter: "cosmic_whale",
  },
  {
    id: 2,
    username: "stellar_growth",
    reason: "Spam",
    date: "2025-03-25",
    status: "resolved",
    reporter: "moon_hunter",
  },
  {
    id: 3,
    username: "orbit_builder",
    reason: "Fake account",
    date: "2025-03-20",
    status: "rejected",
    reporter: "nebula_networker",
  },
]

// Mock platform stats
const mockStats = {
  totalUsers: 156,
  activePromotions: 42,
  totalRevenue: 28500,
  pendingReports: 3,
}

export default function Admin() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Filter users based on search query and status filter
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Admin Dashboard" subtitle="Manage users, promotions, and platform settings" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-teal-500">{mockStats.totalUsers}</p>
                  </div>
                  <div className="rounded-full bg-teal-500/10 p-3">
                    <Users className="h-5 w-5 text-teal-500" />
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
            <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Promotions</p>
                    <p className="text-2xl font-bold text-teal-500">{mockStats.activePromotions}</p>
                  </div>
                  <div className="rounded-full bg-teal-500/10 p-3">
                    <CheckCircle className="h-5 w-5 text-teal-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-teal-500">{mockStats.totalRevenue} $MOON</p>
                  </div>
                  <div className="rounded-full bg-teal-500/10 p-3">
                    <Shield className="h-5 w-5 text-teal-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Reports</p>
                    <p className="text-2xl font-bold text-teal-500">{mockStats.pendingReports}</p>
                  </div>
                  <div className="rounded-full bg-teal-500/10 p-3">
                    <AlertCircle className="h-5 w-5 text-teal-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="border-teal-500/20 bg-teal-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Platform Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users">
                <TabsList className="mb-4">
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="promotions">Promotions</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by username or address"
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Wallet Address</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Plans</TableHead>
                          <TableHead>Balance</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{formatAddress(user.address)}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  user.status === "active"
                                    ? "border-teal-500/50 bg-teal-500/10 text-teal-500"
                                    : user.status === "inactive"
                                      ? "border-teal-500/50 bg-teal-500/10 text-teal-500"
                                      : "border-teal-500/50 bg-teal-500/10 text-teal-500"
                                }`}
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.joinedAt}</TableCell>
                            <TableCell>{user.plans}</TableCell>
                            <TableCell>{user.balance} $MOON</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-teal-500 hover:bg-teal-500/10 hover:text-teal-600">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="promotions">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Platform</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPromotions.map((promo) => (
                          <TableRow key={promo.id}>
                            <TableCell className="font-medium">{promo.username}</TableCell>
                            <TableCell>{promo.plan}</TableCell>
                            <TableCell>{promo.platform}</TableCell>
                            <TableCell>{promo.startDate}</TableCell>
                            <TableCell>{promo.endDate}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  promo.status === "active"
                                    ? "border-teal-500/50 bg-teal-500/10 text-teal-500"
                                    : "border-teal-500/50 bg-teal-500/10 text-teal-500"
                                }`}
                              >
                                {promo.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 px-2 text-teal-500 hover:bg-teal-500/10 hover:text-teal-600"
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="reports">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reported User</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Reporter</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.username}</TableCell>
                            <TableCell>{report.reason}</TableCell>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>{report.reporter}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  report.status === "pending"
                                    ? "border-teal-500/50 bg-teal-500/10 text-teal-500"
                                    : report.status === "resolved"
                                      ? "border-teal-500/50 bg-teal-500/10 text-teal-500"
                                      : "border-teal-500/50 bg-teal-500/10 text-teal-500"
                                }`}
                              >
                                {report.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {report.status === "pending" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      className="border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                                    >
                                      <CheckCircle className="mr-1 h-4 w-4" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10"
                                    >
                                      <XCircle className="mr-1 h-4 w-4" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                                {report.status !== "pending" && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 px-2 text-teal-500 hover:bg-teal-500/10 hover:text-teal-600"
                                  >
                                    View
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
