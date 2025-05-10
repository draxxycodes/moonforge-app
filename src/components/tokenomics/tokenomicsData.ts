import type { TokenDistribution } from "./types"

// Total token supply
const TOTAL_SUPPLY = "1,000,000,000"

export const tokenomicsData: TokenDistribution[] = [
  {
    id: "kols",
    name: "KOLs",
    percentage: 1,
    tokenAmount: "10,000,000",
    description: "Key Opinion Leaders who help promote and advocate for the project",
    color: "#f43f5e", // Rose
    vesting: "6-month cliff, then 25% quarterly",
  },
  {
    id: "investors",
    name: "Investors",
    percentage: 25,
    tokenAmount: "250,000,000",
    description: "Private and seed round investors who provided early funding",
    color: "#8b5cf6", // Purple
    vesting: "1-year cliff, then 25% quarterly",
  },
  {
    id: "public-sale",
    name: "Public Sale",
    percentage: 10,
    tokenAmount: "100,000,000",
    description: "Tokens available for public purchase during token launch",
    color: "#06b6d4", // Cyan
    vesting: "25% at TGE, then 25% monthly",
  },
  {
    id: "community-phase1",
    name: "Community Phase 1",
    percentage: 20,
    tokenAmount: "200,000,000",
    description: "Initial airdrop to early community members and supporters",
    color: "#10b981", // Emerald
    vesting: "10% at TGE, then 15% monthly",
  },
  {
    id: "community-phase2",
    name: "Community Phase 2",
    percentage: 10,
    tokenAmount: "100,000,000",
    description: "Second phase of community rewards for platform engagement",
    color: "#22c55e", // Green
    vesting: "Locked for 3 months, then 10% monthly",
  },
  {
    id: "community-phase3",
    name: "Community Phase 3",
    percentage: 10,
    tokenAmount: "100,000,000",
    description: "Third phase of community rewards for ecosystem growth",
    color: "#84cc16", // Lime
    vesting: "Locked for 6 months, then 10% monthly",
  },
  {
    id: "community-phase4",
    name: "Community Phase 4",
    percentage: 15,
    tokenAmount: "150,000,000",
    description: "Final phase of community rewards for long-term participation",
    color: "#eab308", // Yellow
    vesting: "Locked for 9 months, then 10% monthly",
  },
  {
    id: "team",
    name: "Team",
    percentage: 10,
    tokenAmount: "100,000,000",
    description: "Allocation for the founding team and future team members",
    color: "#f97316", // Orange
    vesting: "1-year cliff, then 25% quarterly over 2 years",
  },
  {
    id: "development",
    name: "Strategic Development",
    percentage: 9,
    tokenAmount: "90,000,000",
    description: "Reserved for future development, partnerships, and ecosystem growth",
    color: "#ef4444", // Red
    vesting: "Locked for 1 year, then released as needed with governance approval",
  },
]
