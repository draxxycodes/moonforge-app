import { Link } from "react-router-dom"
import { Button } from "./button"
import { Rocket, Twitter, Github, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="w-11 h-11 shrink-0 mr-2">
                <img 
                  src="/logo.png" 
                  alt="MoonForge Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl mokoto-font">MoonForge</span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              The on-chain social growth protocol that's revolutionizing how creators promote their content.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-medium heading-font">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/marketplace" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/rewards" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Rewards
                  </Link>
                </li>
                <li>
                  <Link to="/referrals" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Referrals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium heading-font">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/documentation" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/tokenomics" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Tokenomics
                  </Link>
                </li>
                <li>
                  <Link to="/whitepaper" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground transition-colors hover:text-teal-500">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium heading-font">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-muted-foreground transition-colors hover:text-teal-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground transition-colors hover:text-teal-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-sm text-muted-foreground md:flex-row">
          <p className="heading-font">&copy; {new Date().getFullYear()} MoonForge. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms" className="transition-colors hover:text-teal-500">
              Terms of Service
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-teal-500">
              Privacy Policy
            </Link>
            <Link to="/cookie" className="transition-colors hover:text-teal-500">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
