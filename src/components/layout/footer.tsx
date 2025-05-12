import { Link } from "react-router-dom"
import { Button } from "../ui/button"

export function Footer() {
  return (
    <footer className="border-t border-teal-500/10 bg-black/90">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="12" cy="12" r="10" fill="#1E1E2E" stroke="#6D28D9" strokeWidth="2"/>
                  <path d="M7 13L10 16L17 9" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MoonForge</span>
            </Link>
            <p className="mb-4 text-sm text-gray-400">
              The on-chain social growth protocol that's revolutionizing how creators promote their content.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-medium text-white">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/marketplace"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rewards"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Rewards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Referrals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tokenomics"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Tokenomics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-teal-500/10 pt-8 text-sm text-gray-400 md:flex-row">
          <p>&copy; {new Date().getFullYear()} MoonForge. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              to="/terms"
              className="transition-colors hover:text-teal-500"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="transition-colors hover:text-teal-500"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookie"
              className="transition-colors hover:text-teal-500"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
