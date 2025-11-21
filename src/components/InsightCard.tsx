interface InsightCardProps {
  type: 'opportunity' | 'risk' | 'neutral'
  title: string
  description: string
  indicator: 'up' | 'down' | 'neutral'
  onClick: () => void
}

export default function InsightCard({ type, title, description, indicator, onClick }: InsightCardProps) {
  const getIndicatorColor = () => {
    if (indicator === 'up') return 'bg-green-500'
    if (indicator === 'down') return 'bg-red-500'
    return 'bg-gray-400'
  }

  const getTypeColor = () => {
    if (type === 'opportunity') return 'text-green-700 bg-green-50'
    if (type === 'risk') return 'text-red-700 bg-red-50'
    return 'text-gray-700 bg-gray-50'
  }

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer text-left"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getIndicatorColor()}`}></div>
        <div className="flex-1">
          <div className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md mb-3 ${getTypeColor()}`}>
            {type}
          </div>
          <div className="text-sm text-gray-900 mb-1 font-medium">{title}</div>
          <div className="text-xs text-gray-600 leading-relaxed">{description}</div>
          <div className="mt-2 text-xs text-blue-600 font-medium">View details</div>
        </div>
      </div>
    </button>
  )
}
