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
    <footer className="border-t border-sky-500/10 bg-black/90 backdrop-blur-md">
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
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-pink-500 text-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Rocket className="h-4 w-4" />
              </motion.div>
              <span className="text-xl font-bold text-white">MoonForge</span>
            </Link>
            <p className="mb-4 text-sm text-gray-400">
              The on-chain social growth protocol that's revolutionizing how creators promote their content.
            </p>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Twitter"
                  onMouseEnter={() => {
                    setHovered(true)
                    setType("button")
                  }}
                  onMouseLeave={() => {
                    setHovered(false)
                    setType("default")
                  }}
                >
                  <Twitter className="h-4 w-4 text-sky-500" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="GitHub"
                  onMouseEnter={() => {
                    setHovered(true)
                    setType("button")
                  }}
                  onMouseLeave={() => {
                    setHovered(false)
                    setType("default")
                  }}
                >
                  <Github className="h-4 w-4 text-pink-500" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Telegram"
                  onMouseEnter={() => {
                    setHovered(true)
                    setType("button")
                  }}
                  onMouseLeave={() => {
                    setHovered(false)
                    setType("default")
                  }}
                >
                  <MessageCircle className="h-4 w-4 text-sky-500" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3" variants={item}>
            <div>
              <h3 className="mb-3 text-sm font-medium text-white">Platform</h3>
              <ul className="space-y-2 text-sm">
                <motion.li variants={item}>
                  <Link
                    to="/marketplace"
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
              <h3 className="mb-3 text-sm font-medium text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
              <h3 className="mb-3 text-sm font-medium text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <motion.li variants={item}>
                  <Link
                    to="/documentation"
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
                    className="text-gray-400 transition-colors hover:text-sky-500"
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
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sky-500/10 pt-8 text-sm text-gray-400 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; {new Date().getFullYear()} MoonForge. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              to="/documentation"
              className="transition-colors hover:text-sky-500"
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
              to="/documentation"
              className="transition-colors hover:text-sky-500"
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
              to="/documentation"
              className="transition-colors hover:text-sky-500"
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
