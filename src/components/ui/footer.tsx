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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Rocket className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold">MoonForge</span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              The on-chain social growth protocol that's revolutionizing how creators promote their content.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Telegram">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-medium">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/marketplace" className="text-muted-foreground transition-colors hover:text-foreground">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/rewards" className="text-muted-foreground transition-colors hover:text-foreground">
                    Rewards
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Referrals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Tokenomics
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} MoonForge. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="#" className="transition-colors hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
