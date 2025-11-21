import { useState } from 'react'
import KPICard from '../components/KPICard'
import TrendChart from '../components/TrendChart'

type Page = 'executive' | 'ai-center' | 'sales' | 'categories' | 'products' | 'customers' | 'marketing' | 'operations'

interface SalesOverviewProps {
  onNavigate: (page: Page) => void
}

export default function SalesOverview({ onNavigate }: SalesOverviewProps) {
  const [revenueType, setRevenueType] = useState<'gross' | 'net'>('gross')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Top KPI Strip
  const topKPIs = [
    {
      id: 'gmv',
      title: 'GMV',
      value: '$2.4M',
      delta: '+12.5%',
      deltaType: 'positive' as const,
    },
    {
      id: 'revenue',
      title: 'Net Revenue',
      value: '$1.8M',
      delta: '+8.3%',
      deltaType: 'positive' as const,
    },
    {
      id: 'margin',
      title: 'Gross Margin %',
      value: '24.5%',
      delta: '-1.2pp',
      deltaType: 'negative' as const,
    },
    {
      id: 'aov',
      title: 'AOV',
      value: '$145',
      delta: '+$12',
      deltaType: 'positive' as const,
    },
    {
      id: 'orders',
      title: 'Orders',
      value: '18.4K',
      delta: '+8.3%',
      deltaType: 'positive' as const,
    },
    {
      id: 'discount',
      title: 'Discount Rate',
      value: '18.2%',
      delta: '+2.1pp',
      deltaType: 'negative' as const,
    },
    {
      id: 'sqi',
      title: 'SQI',
      value: '87.3',
      delta: '+3.2',
      deltaType: 'positive' as const,
    },
  ]

  // Sales trend data
  const salesTrendData = [
    { date: '09-01', value: 1820 },
    { date: '09-15', value: 1950 },
    { date: '10-01', value: 2100 },
    { date: '10-15', value: 2280 },
    { date: '10-30', value: 2150 },
    { date: '11-08', value: 2320 },
    { date: '11-15', value: 2450 },
    { date: '11-21', value: 2400 },
  ]

  // Margin & Discount by Category
  const categoryData = [
    { category: 'Smartphones', revenue: 620000, margin: 28.5, discount: 15.2, color: '#3b82f6' },
    { category: 'TVs', revenue: 480000, margin: 22.3, discount: 18.5, color: '#8b5cf6' },
    { category: 'Audio', revenue: 340000, margin: 31.2, discount: 12.8, color: '#10b981' },
    { category: 'Laptops', revenue: 280000, margin: 18.7, discount: 21.3, color: '#f59e0b' },
    { category: 'Gaming', revenue: 180000, margin: 26.8, discount: 16.4, color: '#ef4444' },
  ]

  // Top margin changes
  const marginChanges = [
    { category: 'Audio - Headphones', change: '+4.2pp', value: 31.2, trend: 'positive' },
    { category: 'Smartphones - Premium', change: '+3.8pp', value: 32.1, trend: 'positive' },
    { category: 'Gaming - Consoles', change: '+2.9pp', value: 24.5, trend: 'positive' },
    { category: 'Smart Home', change: '+2.1pp', value: 28.7, trend: 'positive' },
    { category: 'Accessories', change: '+1.8pp', value: 42.3, trend: 'positive' },
    { category: 'TVs - Budget', change: '-5.2pp', value: 16.8, trend: 'negative' },
    { category: 'Laptops - Entry', change: '-3.4pp', value: 14.2, trend: 'negative' },
    { category: 'Smartphones - Budget', change: '-2.8pp', value: 18.9, trend: 'negative' },
    { category: 'Tablets', change: '-2.1pp', value: 21.4, trend: 'negative' },
    { category: 'Wearables', change: '-1.9pp', value: 26.3, trend: 'negative' },
  ]

  // Price mix data
  const priceMixData = {
    all: { affordable: 32, regular: 45, premium: 23 },
    smartphones: { affordable: 28, regular: 42, premium: 30 },
    tvs: { affordable: 38, regular: 48, premium: 14 },
    audio: { affordable: 25, regular: 43, premium: 32 },
    laptops: { affordable: 35, regular: 47, premium: 18 },
  }

  const currentPriceMix = priceMixData[selectedCategory as keyof typeof priceMixData] || priceMixData.all

  // Volatility data
  const volatilityData = [
    { category: 'Smartphones', weeks: [2.1, 3.4, 2.8, 4.2, 3.1] },
    { category: 'TVs', weeks: [5.8, 6.2, 5.4, 7.1, 6.5] },
    { category: 'Audio', weeks: [1.8, 2.1, 1.9, 2.4, 2.0] },
    { category: 'Laptops', weeks: [4.2, 4.8, 5.1, 4.5, 5.3] },
    { category: 'Gaming', weeks: [3.5, 4.1, 3.8, 4.4, 3.9] },
  ]

  // Forecast data
  const forecastData = [
    { date: '11-21', value: 2400, forecast: false },
    { date: '11-28', value: 2520, forecast: true },
    { date: '12-05', value: 2680, forecast: true },
    { date: '12-12', value: 2850, forecast: true },
    { date: '12-19', value: 3100, forecast: true },
    { date: '12-26', value: 3400, forecast: true },
  ]

  const maxRevenue = Math.max(...categoryData.map(c => c.revenue))
  const getVolatilityColor = (value: number) => {
    if (value < 2.5) return '#10b981' // green
    if (value < 4.5) return '#f59e0b' // yellow
    return '#ef4444' // red
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* PAGE HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sales & Revenue Overview</h1>
        <p className="text-base text-gray-600 mt-3">Understand how money flows: GMV, revenue, margin, volatility, and forecast</p>
        <div className="mt-6 h-px bg-linear-to-r from-blue-200 via-gray-200 to-transparent"></div>
      </div>

      {/* TOP KPI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
        {topKPIs.map((kpi) => (
          <KPICard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            delta={kpi.delta}
            deltaType={kpi.deltaType}
            onClick={() => console.log('KPI clicked:', kpi.id)}
          />
        ))}
      </div>

      {/* SALES TREND */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRevenueType('gross')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                revenueType === 'gross'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Gross Revenue
            </button>
            <button
              onClick={() => setRevenueType('net')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                revenueType === 'net'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Net Revenue
            </button>
          </div>
        </div>
        <TrendChart
          data={salesTrendData}
          height={200}
          color="#3b82f6"
          showInsight={true}
          insightText="Revenue up 14% vs last 4 weeks, mainly from Smartphones Premium segment. Black Friday prep driving growth."
        />
      </div>

      {/* MARGIN & DISCOUNT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Revenue & Margin */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue & Margin by Category</h3>
          <div className="space-y-6">
            {categoryData.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => onNavigate('categories')}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {item.category}
                  </button>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-900">
                      ${(item.revenue / 1000).toFixed(0)}K
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {item.margin}%
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.revenue / maxRevenue) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <div className="absolute top-0 right-0 h-8 flex items-center pr-3">
                    <span className="text-xs text-gray-500">
                      Disc: {item.discount}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Margin Changes */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top 10 Margin Changes</h3>
          <div className="space-y-3">
            {marginChanges.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.category}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-bold ${
                    item.trend === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </span>
                  <span className="text-sm text-gray-600 w-16 text-right">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICE MIX & VOLATILITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Price Mix */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Price Mix Contribution</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="smartphones">Smartphones</option>
              <option value="tvs">TVs</option>
              <option value="audio">Audio</option>
              <option value="laptops">Laptops</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="flex h-16 rounded-xl overflow-hidden">
              <div
                className="bg-blue-500 flex items-center justify-center text-white font-semibold text-sm"
                style={{ width: `${currentPriceMix.affordable}%` }}
              >
                {currentPriceMix.affordable}%
              </div>
              <div
                className="bg-purple-500 flex items-center justify-center text-white font-semibold text-sm"
                style={{ width: `${currentPriceMix.regular}%` }}
              >
                {currentPriceMix.regular}%
              </div>
              <div
                className="bg-amber-500 flex items-center justify-center text-white font-semibold text-sm"
                style={{ width: `${currentPriceMix.premium}%` }}
              >
                {currentPriceMix.premium}%
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span className="text-gray-600">Affordable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-500"></div>
                <span className="text-gray-600">Regular</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500"></div>
                <span className="text-gray-600">Premium</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-900">
                <strong>Insight:</strong> Premium segment growing fastest at +18% WoW. 
                Consider expanding premium SKU selection.
              </p>
            </div>
          </div>
        </div>

        {/* Volatility Heatmap */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Volatility by Category</h3>
          <div className="space-y-3">
            {volatilityData.map((item) => (
              <div key={item.category}>
                <div className="text-sm font-medium text-gray-900 mb-2">{item.category}</div>
                <div className="flex gap-2">
                  {item.weeks.map((value, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-12 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
                      style={{ backgroundColor: getVolatilityColor(value) }}
                      title={`Week ${idx + 1}: ${value}%`}
                    >
                      {value}%
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-xs text-green-600 font-semibold mb-1">Most Stable</div>
              <div className="text-lg font-bold text-green-900">Audio</div>
              <div className="text-xs text-green-700">Avg: 2.0%</div>
            </div>
            <div className="p-4 bg-red-50 rounded-xl">
              <div className="text-xs text-red-600 font-semibold mb-1">Most Volatile</div>
              <div className="text-lg font-bold text-red-900">TVs</div>
              <div className="text-xs text-red-700">Avg: 6.2%</div>
            </div>
          </div>
        </div>
      </div>

      {/* FORECAST */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Forecast (Next 6 Weeks)</h2>
        <div className="relative h-64">
          <svg width="100%" height="100%" viewBox="0 0 800 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="forecastGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Area */}
            <path
              d={`M 0,${240 - (forecastData[0].value / 3400) * 240} 
                  L ${(800 / (forecastData.length - 1)) * 1},${240 - (forecastData[1].value / 3400) * 240}
                  L ${(800 / (forecastData.length - 1)) * 2},${240 - (forecastData[2].value / 3400) * 240}
                  L ${(800 / (forecastData.length - 1)) * 3},${240 - (forecastData[3].value / 3400) * 240}
                  L ${(800 / (forecastData.length - 1)) * 4},${240 - (forecastData[4].value / 3400) * 240}
                  L ${(800 / (forecastData.length - 1)) * 5},${240 - (forecastData[5].value / 3400) * 240}
                  L 800,240 L 0,240 Z`}
              fill="url(#forecastGradient)"
            />
            {/* Line */}
            <polyline
              points={forecastData.map((d, i) => 
                `${(800 / (forecastData.length - 1)) * i},${240 - (d.value / 3400) * 240}`
              ).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray={forecastData.findIndex(d => d.forecast) > 0 ? `${(800 / (forecastData.length - 1)) * 1},0,800` : '0'}
            />
            {/* Forecast marker line */}
            <line
              x1={(800 / (forecastData.length - 1)) * 1}
              y1="0"
              x2={(800 / (forecastData.length - 1)) * 1}
              y2="240"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-600">
            {forecastData.map((d) => (
              <span key={d.date}>{d.date}</span>
            ))}
          </div>
        </div>
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-900">
            <strong>AI Forecast Alert:</strong> Revenue trending upward with strong holiday season momentum. 
            Risk of supply constraints in Laptops category if current demand continues. 
            Consider increasing inventory buffer by 15-20%.
          </p>
        </div>
      </div>
    </div>
  )
}
