interface AlertDetail {
  id: string
  kpiName: string
  severity: 'red' | 'yellow'
  message: string
  timestamp: string
  hasRecommendation: boolean
  trend: { label: string; value: string }[]
  insight: string
  tasks: string[]
}

interface SidePanelProps {
  isOpen: boolean
  alert: AlertDetail | null
  onClose: () => void
  onNavigateToAICenter: () => void
}

export default function SidePanel({ isOpen, alert, onClose, onNavigateToAICenter }: SidePanelProps) {
  if (!isOpen || !alert) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full ${alert.severity === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                  alert.severity === 'red' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {alert.severity === 'red' ? 'Critical' : 'Warning'}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">{alert.kpiName}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{alert.message}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(alert.timestamp).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-300 hover:text-gray-600 text-xl leading-none p-2 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Trend Mini Chart */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Trend Analysis</h3>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="space-y-3">
                {alert.trend.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insight Summary */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">AI Insight</h3>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-gray-700 leading-relaxed">{alert.insight}</p>
            </div>
          </div>

          {/* Recommended Tasks */}
          {alert.hasRecommendation && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Recommended Actions</h3>
              <div className="space-y-2">
                {alert.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-gray-400 text-xs mt-0.5 font-medium">{idx + 1}</span>
                    <span className="text-sm text-gray-700 flex-1 leading-relaxed">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA to AI Center */}
          <div className="pt-6 border-t border-gray-100">
            <button 
              onClick={onNavigateToAICenter}
              className="w-full bg-blue-600 text-white font-medium py-3.5 px-4 rounded-xl hover:bg-blue-700 transition-colors text-sm"
            >
              Open full recommendation in AI Center
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
