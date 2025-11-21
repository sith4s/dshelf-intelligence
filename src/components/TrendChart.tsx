interface TrendChartProps {
  data: { date: string; value: number }[]
  height?: number
  color?: string
  showInsight?: boolean
  insightText?: string
}

export default function TrendChart({ 
  data, 
  height = 200, 
  color = '#3b82f6',
  showInsight = false,
  insightText 
}: TrendChartProps) {
  // Simple area chart with gradient
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = height - ((d.value - minValue) / range) * height
    return `${x},${y}`
  }).join(' ')

  const areaPath = `M 0,${height} L ${points} L 100,${height} Z`

  return (
    <div className="relative w-full bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Analiza czasowa dostępności (tygodniowa)
      </h3>
      
      <svg 
        viewBox={`0 0 100 ${height}`} 
        className="w-full"
        style={{ height: `${height}px` }}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>
        
        {/* Area */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
          stroke="none"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {showInsight && insightText && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-800">
            <span className="font-semibold">Insight:</span> {insightText}
          </p>
        </div>
      )}

      {/* Average line */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="h-px w-8 bg-blue-500"></div>
        <span className="text-xs text-gray-500">
          Średnia dostępność ({(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1)}%)
        </span>
      </div>
    </div>
  )
}
