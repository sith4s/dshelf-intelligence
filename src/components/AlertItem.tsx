interface AlertItemProps {
  kpiName: string
  severity: 'red' | 'yellow'
  message: string
  timestamp: string
  hasRecommendation: boolean
  onClick: () => void
}

export default function AlertItem({ kpiName, severity, message, timestamp, hasRecommendation, onClick }: AlertItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer text-left"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-2 h-2 rounded-full ${severity === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
            <span className="text-xs font-semibold text-gray-900 uppercase tracking-wide">{kpiName}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              severity === 'red' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
            }`}>
              {severity === 'red' ? 'Critical' : 'Warning'}
            </span>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed mb-3">{message}</div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            {hasRecommendation && (
              <>
                <span>•</span>
                <span className="text-blue-600 font-medium">AI Recommendation available</span>
              </>
            )}
          </div>
        </div>
        <div className="text-blue-600 text-sm font-medium flex-shrink-0">View</div>
      </div>
    </button>
  )
}
