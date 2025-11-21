interface KPICardProps {
  title: string
  value: string
  delta: string
  deltaType: 'positive' | 'negative'
  onClick: () => void
}

export default function KPICard({ title, value, delta, deltaType, onClick }: KPICardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{value}</div>
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${deltaType === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
        <div className={`text-xs font-semibold ${deltaType === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {delta}
        </div>
      </div>
    </button>
  )
}
