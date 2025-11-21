interface BarChartProps {
  data: { label: string; value: number; percentage: string }[]
  height?: number
  color?: string
  title: string
}

export default function BarChart({ data, color = '#3b82f6', title }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      
      <div>
        {data.map((item) => {
          const barWidth = (item.value / maxValue) * 100
          
          return (
            <div key={item.label} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-sm font-bold text-gray-900">{item.percentage}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-7 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: color,
                  }}
                >
                  {barWidth > 20 && (
                    <span className="text-xs font-semibold text-white">
                      {item.percentage}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
