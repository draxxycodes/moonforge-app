import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import { Badge } from "./badge"
import {
  ArrowRight,
  ChevronRight,
  Rocket,
  Wallet,
  BarChart3,
  Twitter,
  MessageCircle,
  Youtube,
  Zap,
  Flame,
  RefreshCw,
  ArrowDown,
} from "lucide-react"
import { HeroParticles } from "./hero-particles"
import { ScrollReveal } from "./scroll-reveal"
import { HomeRoadmap } from "./home-roadmap"
import { BeamsBackground } from "./beams-background"
import { LoadingScreen } from "./loading-screen"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Refs for scroll animations
  const targetRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // Scroll state
  const [hasScrolled, setHasScrolled] = useState(false)

  // Check if elements are in view
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 })
  const tokenomicsInView = useInView(tokenomicsRef, { once: true, amount: 0.2 })
  const scrollIndicatorInView = useInView(scrollIndicatorRef, { once: false, amount: 0.1 })

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Platform showcase data
  const platforms = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      description: "Boost your Twitter presence with increased visibility and engagement.",
    },
    {
      name: "Telegram",
      icon: MessageCircle,
      color: "#0088cc",
      description: "Grow your Telegram community with featured promotions and channel highlights.",
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "#FF0000",
      description: "Increase your YouTube subscribers and views with strategic promotion.",
    },
  ]

  // Steps data
  const steps = [
    {
      title: "Connect Sui Wallet",
      description: "Link your Sui-compatible wallet to access the MoonForge platform.",
      icon: Wallet,
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Buy Plan with $MOON",
      description: "Choose a promotion plan that fits your needs and pay with $MOON tokens.",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Boost Reach",
      description: "Watch your social media presence grow with increased visibility and engagement.",
      icon: Rocket,
      color: "from-pink-500 to-orange-500",
    },
  ]

  // Tokenomics data
  const tokenomics = [
    {
      title: "Total Supply",
      value: "100,000,000",
      description: "Fixed supply of $MOON tokens on Sui",
      icon: Zap,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Rewards Loop",
      value: "15%",
      description: "Of all fees distributed to community",
      icon: RefreshCw,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Burn Mechanism",
      value: "5%",
      description: "Of all transactions burned forever",
      icon: Flame,
      color: "bg-orange-500/10 text-orange-500",
    },
  ]

  return (
    <LoadingScreen isLoading={isLoading} type="scale">
      <div ref={targetRef} className="relative overflow-hidden">
        {/* Hero Section */}
        <BeamsBackground intensity="strong" colorScheme="purple">
          <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
            <div className="absolute inset-0 z-0">
              <HeroParticles />
            </div>
            <motion.div
              className="relative z-10 max-w-4xl"
              style={{ y, opacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-sm">
                The Future of Social Media Promotion on Sui
              </Badge>
              <h1 className="mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                Turn Clout Into Capital.
                <br />
                Promote & Earn with $MOON.
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                MoonForge is the first SocialFi platform on Sui blockchain that lets you boost your social media
                presence using the power of blockchain technology and the $MOON token.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/marketplace">
                  <Button size="lg" className="gap-2 text-lg">
                    Launch App
                    <Rocket className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/tokenomics">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-primary/20 bg-primary/5 text-lg hover:bg-primary/10"
                  >
                    Learn More
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              ref={scrollIndicatorRef}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
              initial={{ opacity: 1, y: 0 }}
              animate={{
                opacity: hasScrolled || !scrollIndicatorInView ? 0 : 1,
                y: hasScrolled ? 10 : [0, 10, 0],
              }}
              transition={{
                y: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.3 },
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">Scroll to explore</p>
                <ArrowDown className="h-5 w-5 text-primary animate-pulse" />
              </div>
            </motion.div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </section>
        </BeamsBackground>

        {/* Platform Showcase */}
        <section ref={featuresRef} className="container mx-auto px-4 py-20 md:py-28">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-sm">
                Platform Showcase
              </Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Boost Your Social Media Presence</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                MoonForge helps you grow your audience across multiple platforms with targeted promotion plans.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {platforms.map((platform, index) => (
              <ScrollReveal key={platform.name} delay={index * 0.1} once={false}>
                <Card className="group h-full overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow hover:scale-[1.02]">
                  <CardContent className="flex h-full flex-col p-6">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110 group-hover:shadow-md"
                      style={{ backgroundColor: `${platform.color}20` }}
                    >
                      <platform.icon className="h-6 w-6" style={{ color: platform.color }} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{platform.name}</h3>
                    <p className="mb-6 flex-1 text-muted-foreground">{platform.description}</p>
                    <Button variant="ghost" className="group w-fit gap-2 p-0 text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 3-Step Flow */}
        <section ref={stepsRef} className="container mx-auto px-4 py-20 md:py-28">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-sm">
                How It Works
              </Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Three Simple Steps to Boost Your Reach
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Getting started with MoonForge is easy. Follow these three steps to begin growing your social media
                presence.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.1} once={false}>
                <Card className="group h-full overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow hover:scale-[1.02]">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${step.color} transition-transform group-hover:scale-110`}
                      >
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary transition-transform group-hover:scale-110">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 flex justify-center">
              <Link to="/marketplace">
                <Button size="lg" className="gap-2 group">
                  Explore Plans
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Roadmap Section */}
        <HomeRoadmap />

        {/* Tokenomics Overview */}
        <section ref={tokenomicsRef} className="container mx-auto px-4 py-20 md:py-28">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-sm">
                Tokenomics
              </Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">$MOON Token Economics on Sui</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                The $MOON token powers the entire MoonForge ecosystem on Sui blockchain, providing utility and value to
                all participants.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {tokenomics.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1} once={false}>
                <Card className="group h-full overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow hover:scale-[1.02]">
                  <CardContent className="flex h-full flex-col items-center p-6 text-center">
                    <div
                      className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${item.color} transition-transform group-hover:scale-110`}
                    >
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="mb-2 text-3xl font-bold text-primary">{item.value}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 group"
              >
                View Tokenomics
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 md:py-28">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-8 shadow-glow-lg md:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Deploy $MOON for Reach?</h2>
                <p className="mb-8 text-lg text-muted-foreground">
                  Join the on-chain social growth protocol on Sui blockchain that's revolutionizing how creators promote
                  their content and engage with their audience.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" className="gap-2 group">
                    Get Started
                    <Rocket className="h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 group"
                  >
                    View Documentation
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </LoadingScreen>
  )
}
