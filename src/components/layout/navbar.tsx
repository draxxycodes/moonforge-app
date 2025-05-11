import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Rocket, Menu, Wallet } from "lucide-react"
import { WalletConnectModal } from "../modals/wallet-connect-modal"
import { useCursor } from "../ui/cursor-provider"

// Update the navItems array to include DEX
const navItems = [
  { name: "Home", path: "/" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Rewards", path: "/rewards" },
  { name: "DEX", path: "/dex-integration" },
  { name: "Documentation", path: "/documentation" },
  { name: "Tokenomics", path: "/tokenomics" },
]

export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const [isScrolled, setIsScrolled] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { setHovered, setType } = useCursor()

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mock wallet connection
  const handleConnectWallet = () => {
    setIsWalletModalOpen(true)
  }

  const handleWalletConnected = () => {
    setIsConnected(true)
    setIsWalletModalOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-teal-500/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link
            to="/"
            className="flex items-center gap-2"
            onMouseEnter={() => {
              setHovered(true)
              setType("link")
            }}
            onMouseLeave={() => {
              setHovered(false)
              setType("default")
            }}
          >
            <motion.div
              className="flex h-9 w-9 items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/logo.png" alt="MoonForge Logo" className="w-full h-full object-contain" />
            </motion.div>
            <motion.span
              className="text-2xl font-bold text-white heading-font"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              MoonForge
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === item.path 
                    ? "text-white" 
                    : "text-gray-300 hover:text-white"
                }`}
                onMouseEnter={() => {
                  setHovered(true)
                  setType("link")
                }}
                onMouseLeave={() => {
                  setHovered(false)
                  setType("default")
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  {item.name}
                </motion.span>
                {pathname === item.path && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute inset-0 z-[-1] rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isConnected ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 md:flex text-white"
                  onMouseEnter={() => {
                    setHovered(true)
                    setType("button")
                  }}
                  onMouseLeave={() => {
                    setHovered(false)
                    setType("default")
                  }}
                >
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-400" />
                  0x71C7...976F
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 md:flex text-white"
                  onClick={handleConnectWallet}
                  onMouseEnter={() => {
                    setHovered(true)
                    setType("button")
                  }}
                  onMouseLeave={() => {
                    setHovered(false)
                    setType("default")
                  }}
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              </motion.div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white"
                  aria-label="Toggle Menu"
                  onMouseEnter={() => {
                    setHovered(true)
                    setType("button")
                  }}
                  onMouseLeave={() => {
                    setHovered(false)
                    setType("default")
                  }}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px] bg-black/90 border-teal-500/20 text-white">
                <SheetHeader className="mb-4">
                  <SheetTitle className="flex items-center gap-2 text-white">
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden">
                      <img src="/logo.png" alt="MoonForge Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="heading-font">MoonForge</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  <AnimatePresence>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            pathname === item.path
                              ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-white"
                              : "text-gray-300 hover:text-white hover:bg-teal-500/5"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnected}
      />
    </>
  )
}
