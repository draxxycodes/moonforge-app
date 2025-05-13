import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Menu, Wallet } from "lucide-react"
import { WalletConnectModal } from "../modals/wallet-connect-modal"

// Static nav items
const navItems = [
  { name: "Home", path: "/" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Rewards", path: "/rewards" },
  { name: "MOONDEX", path: "/dex-integration" },
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

  // Handle scroll event with performance optimization
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
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
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-colors ${
          isScrolled ? "bg-black/70 backdrop-blur-sm border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div style={{ background: 'transparent', boxShadow: 'none' }} className="flex h-9 w-9 items-center justify-center bg-transparent border-0 outline-none rounded-none p-0 m-0">
              <img src="/logo.png" alt="MoonForge Logo" className="w-full h-full" />
            </div>
            <span className="text-2xl font-bold text-white">
              MoonForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === item.path 
                    ? "text-white bg-white/10" 
                    : "text-white hover:text-white"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute inset-0 z-[-1] rounded-lg bg-white/10" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                className="hidden border-white/20 bg-white/5 md:flex text-white"
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-green-400" />
                0x71C7...976F
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden gap-2 border-white/20 bg-white/5 md:flex text-white"
                onClick={handleConnectWallet}
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white"
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px] bg-black/90 border-white/20 text-white">
                <SheetHeader className="mb-4">
                  <SheetTitle className="flex items-center gap-2 text-white">
                    <div style={{ background: 'transparent', boxShadow: 'none' }} className="flex h-9 w-9 items-center justify-center bg-transparent border-0 outline-none rounded-none p-0 m-0">
                      <img src="/logo.png" alt="MoonForge Logo" className="w-full h-full" />
                    </div>
                    <span className="text-white">MoonForge</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        pathname === item.path
                          ? "bg-white/10 text-white"
                          : "text-white hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnected}
      />
    </>
  )
}
