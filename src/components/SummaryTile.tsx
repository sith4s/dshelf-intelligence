interface Metric {
  label: string
  value: string
  trend: 'up' | 'down' | 'neutral'
  change?: string
}

interface SummaryTileProps {
  title: string
  period?: string
  metrics: Metric[]
  onClick: () => void
}

export default function SummaryTile({ title, period = 'Last 30 days', metrics, onClick }: SummaryTileProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left"
      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm font-bold text-gray-900 mb-1">{title}</div>
          <div className="text-xs text-gray-500">{period}</div>
        </div>
      </div>
      <div className="space-y-4">
        {metrics.map((metric, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">{metric.label}</span>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  metric.trend === 'up' ? 'bg-emerald-500' : 
                  metric.trend === 'down' ? 'bg-rose-500' : 
                  'bg-gray-400'
                }`}></div>
                <span className={`text-xs font-semibold ${
                  metric.trend === 'up' ? 'text-emerald-600' : 
                  metric.trend === 'down' ? 'text-rose-600' : 
                  'text-gray-900'
                }`}>
                  {metric.change || ''}
                </span>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{metric.value}</div>
          </div>
        ))}
      </div>
    </button>
  )
}
