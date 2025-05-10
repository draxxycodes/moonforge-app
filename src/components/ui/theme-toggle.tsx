

import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"
import { motion } from "framer-motion"
import { useCursor } from "./cursor-provider"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const { setHovered, setType } = useCursor()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10"
          onMouseEnter={() => {
            setHovered(true)
            setType("button")
          }}
          onMouseLeave={() => {
            setHovered(false)
            setType("default")
          }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: theme === "dark" ? 0 : 360 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          onMouseEnter={() => {
            setHovered(true)
            setType("button")
          }}
          onMouseLeave={() => {
            setHovered(false)
            setType("default")
          }}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          onMouseEnter={() => {
            setHovered(true)
            setType("button")
          }}
          onMouseLeave={() => {
            setHovered(false)
            setType("default")
          }}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          onMouseEnter={() => {
            setHovered(true)
            setType("button")
          }}
          onMouseLeave={() => {
            setHovered(false)
            setType("default")
          }}
        >
          <span className="mr-2">💻</span>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
