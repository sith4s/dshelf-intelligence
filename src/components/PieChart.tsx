interface PieSegment {
  label: string
  value: number
  percentage: string
  color: string
}

interface PieChartProps {
  data: PieSegment[]
  title: string
  size?: number
}

export default function PieChart({ data, title, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = -90 // Start from top

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    // Calculate path for pie slice
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const x1 = size / 2 + (size / 2) * Math.cos(startRad)
    const y1 = size / 2 + (size / 2) * Math.sin(startRad)
    const x2 = size / 2 + (size / 2) * Math.cos(endRad)
    const y2 = size / 2 + (size / 2) * Math.sin(endRad)
    const largeArc = angle > 180 ? 1 : 0

    const path = `M ${size / 2} ${size / 2} L ${x1} ${y1} A ${size / 2} ${size / 2} 0 ${largeArc} 1 ${x2} ${y2} Z`

    return { ...item, path, percentage }
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      
      <div className="flex items-center gap-8">
        {/* Pie chart */}
        <div className="flex-shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-sm">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.path}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                className="transition-opacity hover:opacity-80 cursor-pointer"
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">{item.percentage}</span>
                <span className="text-xs text-gray-500">({item.value.toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
