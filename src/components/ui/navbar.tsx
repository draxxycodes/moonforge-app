import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "./button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet"
import { Rocket, Menu, Wallet } from "lucide-react"
import { WalletConnectModal } from "./wallet-connect-modal"
import { ThemeToggle } from "./theme-toggle"

// Update the navItems array to include DEX
const navItems = [
  { name: "Home", path: "/" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Rewards", path: "/rewards" },
  { name: "DEX", path: "/dex-integration" },
  { name: "Admin", path: "/admin" },
]

export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const [isScrolled, setIsScrolled] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

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
        transition={{ duration: 0.3 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">MoonForge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {pathname === item.path && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute inset-0 z-[-1] rounded-md bg-primary/10"
                    transition={{ duration: 0.3 }}
                  />
                )}
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                className="hidden border-primary/20 bg-primary/5 hover:bg-primary/10 md:flex"
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                0x71C7...976F
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 md:flex"
                onClick={handleConnectWallet}
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}

            <ThemeToggle />

            <Link to="/marketplace">
              <Button size="sm" className="hidden gap-2 md:flex">
                <Rocket className="h-4 w-4" />
                Launch App
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                <SheetHeader className="mb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Rocket className="h-4 w-4" />
                    </div>
                    MoonForge
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`rounded-md px-3 py-2 text-sm transition-colors ${
                        pathname === item.path
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 flex flex-col gap-2">
                  {isConnected ? (
                    <Button
                      variant="outline"
                      className="w-full justify-start border-primary/20 bg-primary/5 hover:bg-primary/10"
                    >
                      <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                      0x71C7...976F
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        handleConnectWallet()
                      }}
                    >
                      <Wallet className="h-4 w-4" />
                      Connect Wallet
                    </Button>
                  )}
                  <Link to="/marketplace" className="w-full">
                    <Button className="w-full justify-start gap-2">
                      <Rocket className="h-4 w-4" />
                      Launch App
                    </Button>
                  </Link>
                </div>
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
