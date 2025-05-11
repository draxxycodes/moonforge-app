"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { 
  Home, 
  BarChart3, 
  ShoppingBag, 
  Trophy, 
  User, 
  Repeat, 
  Settings,
  Wallet,
  Rocket,
  Shield,
  Menu
} from "lucide-react";
import { Button } from "./button";
import { WalletConnectModal } from "./wallet-connect-modal";

// Updated with correct CSS classes based on provided styles
export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  path?: string;
};

export type DockProps = {
  items?: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  isActive?: boolean;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isActive,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  // Additional styling for active state
  const activeClass = isActive 
    ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-500" 
    : "bg-transparent border-transparent hover:bg-teal-500/10";

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item relative inline-flex items-center justify-center rounded-lg ${activeClass} border-2 backdrop-blur-sm transition-colors ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      whileHover={{ 
        boxShadow: "0 0 10px rgba(20, 184, 166, 0.5)" 
      }}
      transition={{ 
        duration: 0.2 
      }}
    >
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, { isHovered } as React.Attributes);
        }
        return child;
      })}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = "", isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className} absolute bottom-[-2rem] left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060606] px-2 py-0.5 text-xs text-white`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = "", isHovered }: DockIconProps) {
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => {
      setHovered(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <motion.div 
      className={`dock-icon flex items-center justify-center ${className}`}
      animate={hovered ? { 
        scale: 1.1,
        filter: "drop-shadow(0 0 8px rgba(20, 184, 166, 0.7))"
      } : { 
        scale: 1,
        filter: "drop-shadow(0 0 0px rgba(20, 184, 166, 0))"
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Add a new component for mobile menu
function MobileMenu({
  items,
  isOpen,
  onClose,
}: {
  items: DockItemData[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-[80vw] max-w-[350px] bg-transparent backdrop-blur-md border-l border-teal-500/20 p-4"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <motion.div
                  className="flex h-9 w-9 items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src="/logo.png" alt="MoonForge Logo" className="w-full h-full object-contain" />
                </motion.div>
                <span className="text-xl font-bold text-white heading-font">
                  MoonForge
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
                &times;
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path || '#'}
                    onClick={() => {
                      item.onClick?.();
                      onClose();
                    }}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-white"
                        : "text-gray-300 hover:text-white hover:bg-teal-500/5"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="flex items-center justify-center"
                    >
                      {item.icon}
                    </motion.div>
                    <div>{item.label}</div>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AnimatedDock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 65,
  distance = 200,
  panelHeight = 65,
  dockHeight = 256,
  baseItemSize = 44,
}: DockProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Wallet connection handlers
  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const handleWalletConnected = () => {
    setIsConnected(true);
    setIsWalletModalOpen(false);
  };

  // If no items are provided, create default navigation items
  const navigationItems: DockItemData[] = items || [
    {
      icon: <Home className="h-6 w-6 text-teal-500" />,
      label: "Home",
      path: "/",
      onClick: () => navigate("/"),
    },
    {
      icon: <User className="h-6 w-6 text-teal-500" />,
      label: "Dashboard",
      path: "/dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-teal-500" />,
      label: "Marketplace",
      path: "/marketplace",
      onClick: () => navigate("/marketplace"),
    },
    {
      icon: <Repeat className="h-6 w-6 text-teal-500" />,
      label: "DEX",
      path: "/dex-integration",
      onClick: () => navigate("/dex-integration"),
    },
    {
      icon: <Trophy className="h-6 w-6 text-teal-500" />,
      label: "Rewards",
      path: "/rewards",
      onClick: () => navigate("/rewards"),
    },
    {
      icon: <Shield className="h-6 w-6 text-teal-500" />,
      label: "Admin",
      path: "/admin",
      onClick: () => navigate("/admin"),
    },
  ];

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  
  // Animation to expand downward
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        className={`navbar-dock fixed left-0 right-0 top-0 z-50 flex justify-center transition-all duration-300 ${
          isScrolled ? "bg-transparent backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo with improved styling */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="flex h-9 w-9 items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/logo.png" alt="MoonForge Logo" className="w-full h-full object-contain" />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-white heading-font"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              MoonForge
            </motion.span>
          </Link>

          {/* Navigation Dock - Hidden on mobile */}
          <motion.div
            onMouseMove={({ pageX }) => {
              isHovered.set(1);
              mouseX.set(pageX);
            }}
            onMouseLeave={() => {
              isHovered.set(0);
              mouseX.set(Infinity);
            }}
            className={`navbar-dock-panel hidden md:flex items-center justify-center gap-4 ${className}`}
            style={{ 
              height: panelHeight,
              minHeight: panelHeight 
            }}
            role="toolbar"
            aria-label="Navigation dock"
          >
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              
              return (
                <DockItem
                  key={index}
                  onClick={item.onClick}
                  className={item.className}
                  mouseX={mouseX}
                  spring={spring}
                  distance={distance}
                  magnification={magnification}
                  baseItemSize={baseItemSize}
                  isActive={isActive}
                >
                  <DockIcon>{item.icon}</DockIcon>
                  <DockLabel>{item.label}</DockLabel>
                </DockItem>
              );
            })}
          </motion.div>

          <div className="flex items-center gap-2">
            {/* Connect Wallet Button with improved styling */}
            <div className="hidden md:block">
              {isConnected ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 text-white"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-teal-500" />
                    0x71C7...976F
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 text-white backdrop-blur-md"
                    onClick={handleConnectWallet}
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
                </motion.div>
              )}
            </div>
            
            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu - now completely transparent with blur */}
      <MobileMenu 
        items={navigationItems} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnected}
      />
    </>
  );
} 