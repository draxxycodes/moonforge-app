

import type React from "react"
import { Html } from "@react-three/drei"
import type { TokenDistribution } from "./types"

interface ChartTooltipProps {
  data: TokenDistribution
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ data }) => {
  // Position the tooltip above the chart
  return (
    <Html position={[0, 2.5, 0]} center>
      <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-[#8b5cf6]/30 shadow-lg shadow-[#8b5cf6]/20 text-white min-w-[250px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
          <h3 className="font-bold text-base">{data.name}</h3>
          <span className="ml-auto font-mono text-[#8b5cf6]">{data.percentage}%</span>
        </div>

        {data.tokenAmount && <div className="mb-2 text-sm font-medium text-gray-300">{data.tokenAmount} Tokens</div>}

        <p className="text-sm text-gray-300">{data.description}</p>

        {data.vesting && (
          <div className="mt-2 pt-2 border-t border-white/10">
            <span className="text-xs font-medium text-[#8b5cf6]">Vesting:</span>
            <p className="text-xs text-gray-300">{data.vesting}</p>
          </div>
        )}
      </div>
    </Html>
  )
}
