import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Rocket, Twitter, Github, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useCursor } from "../ui/cursor-provider"

export function Footer() {
  const { setHovered, setType } = useCursor()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <footer className="border-t border-teal-500/10 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid gap-8 md:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="md:col-span-1" variants={item}>
            <Link
              to="/"
              className="mb-4 flex items-center gap-2"
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
              <span className="text-xl font-bold text-white heading-font">MoonForge</span>
            </Link>
            <p className="mb-4 text-sm text-gray-400">
              The on-chain social growth protocol that's revolutionizing how creators promote their content.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3" variants={item}>
            <div>
              <h3 className="mb-3 text-sm font-medium text-white heading-font">Platform</h3>
              <ul className="space-y-2 text-sm">
                <motion.li variants={item}>
                  <Link
                    to="/marketplace"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Marketplace
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Dashboard
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/rewards"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Rewards
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/marketplace"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Referrals
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-white heading-font">Resources</h3>
              <ul className="space-y-2 text-sm">
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Documentation
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/tokenomics"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Tokenomics
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Whitepaper
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    FAQ
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-white heading-font">Company</h3>
              <ul className="space-y-2 text-sm">
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    About
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Blog
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Careers
                  </Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-teal-500"
                    onMouseEnter={() => {
                      setHovered(true)
                      setType("link")
                    }}
                    onMouseLeave={() => {
                      setHovered(false)
                      setType("default")
                    }}
                  >
                    Contact
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-teal-500/10 pt-8 text-sm text-gray-400 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="heading-font">&copy; {new Date().getFullYear()} MoonForge. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              to="/terms"
              className="transition-colors hover:text-teal-500"
              onMouseEnter={() => {
                setHovered(true)
                setType("link")
              }}
              onMouseLeave={() => {
                setHovered(false)
                setType("default")
              }}
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="transition-colors hover:text-teal-500"
              onMouseEnter={() => {
                setHovered(true)
                setType("link")
              }}
              onMouseLeave={() => {
                setHovered(false)
                setType("default")
              }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookie"
              className="transition-colors hover:text-teal-500"
              onMouseEnter={() => {
                setHovered(true)
                setType("link")
              }}
              onMouseLeave={() => {
                setHovered(false)
                setType("default")
              }}
            >
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
