interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  filters: {
    network: FilterOption[]
    category: FilterOption[]
    level: FilterOption[]
  }
  selected: {
    network: string
    category: string
    level: string
  }
  onChange: (filterType: 'network' | 'category' | 'level', value: string) => void
}

export default function FilterBar({ filters, selected, onChange }: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Store Network */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Store Network
          </label>
          <select
            value={selected.network}
            onChange={(e) => onChange('network', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-300"
          >
            {filters.network.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Product Category
          </label>
          <select
            value={selected.category}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-300"
          >
            {filters.category.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Detail Level */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Detail Level
          </label>
          <select
            value={selected.level}
            onChange={(e) => onChange('level', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-300"
          >
            {filters.level.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filters display */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500">Active:</span>
        {selected.network !== 'all' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {filters.network.find(f => f.value === selected.network)?.label}
          </span>
        )}
        {selected.category !== 'all' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {filters.category.find(f => f.value === selected.category)?.label}
          </span>
        )}
        {selected.level !== 'all' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {filters.level.find(f => f.value === selected.level)?.label}
          </span>
        )}
      </div>
    </div>
  )
}
