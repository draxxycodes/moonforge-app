export interface TokenDistribution {
  id: string
  name: string
  percentage: number
  tokenAmount?: string
  description: string
  color: string
  vesting?: string
}
