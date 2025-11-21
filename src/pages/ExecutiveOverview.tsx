import { useState } from 'react'
import KPICard from '../components/KPICard'
import AlertItem from '../components/AlertItem'
import SummaryTile from '../components/SummaryTile'
import InsightCard from '../components/InsightCard'
import NavBlock from '../components/NavBlock'
import SidePanel from '../components/SidePanel'
import TrendChart from '../components/TrendChart'
import FilterBar from '../components/FilterBar'
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'

// (1) TOP KPI BAR - 9 clickable KPI cards
const topKPIs = [
  { 
    id: 'gmv',
    title: 'GMV', 
    value: '$2.4M', 
    delta: '+12.5%',
    deltaType: 'positive' as const,
    tooltip: 'Gross Merchandise Value (today vs yesterday)',
    target: '/sales'
  },
  { 
    id: 'revenue',
    title: 'Net Revenue', 
    value: '$1.8M', 
    delta: '+8.3%',
    deltaType: 'positive' as const,
    tooltip: 'Revenue after returns and discounts',
    target: '/sales'
  },
  { 
    id: 'margin',
    title: 'Gross Margin %', 
    value: '24.5%', 
    delta: '-1.2pp',
    deltaType: 'negative' as const,
    tooltip: 'Profit margin percentage',
    target: '/sales'
  },
  { 
    id: 'cvr',
    title: 'Conversion Rate', 
    value: '2.8%', 
    delta: '-0.4pp',
    deltaType: 'negative' as const,
    tooltip: 'Visitors to purchase conversion',
    target: '/marketing'
  },
  { 
    id: 'aov',
    title: 'AOV', 
    value: '$145', 
    delta: '+$12',
    deltaType: 'positive' as const,
    tooltip: 'Average Order Value',
    target: '/sales'
  },
  { 
    id: 'return',
    title: 'Return Rate %', 
    value: '5.2%', 
    delta: '+0.8pp',
    deltaType: 'negative' as const,
    tooltip: 'Product return rate',
    target: '/operations'
  },
  { 
    id: 'repeat',
    title: 'Repeat Purchase Rate', 
    value: '34.2%', 
    delta: '+2.1pp',
    deltaType: 'positive' as const,
    tooltip: 'Customers making repeat purchases',
    target: '/customers'
  },
  { 
    id: 'availability',
    title: 'Availability Compliance %', 
    value: '94.2%', 
    delta: '+1.8pp',
    deltaType: 'positive' as const,
    tooltip: 'Products in stock vs target',
    target: '/operations'
  },
  { 
    id: 'sqi',
    title: 'Sales Quality Index', 
    value: '78.2', 
    delta: '-3.4 pts',
    deltaType: 'negative' as const,
    tooltip: 'Composite quality score (margin × rating × delivery)',
    target: '/sales'
  },
]

// (2) AI ALERTS PANEL - active KPI alerts
const aiAlerts = [
  {
    id: 'alert-1',
    kpi: 'Conversion Rate',
    severity: 'red' as const,
    message: 'Conversion Rate dropped -0.3pp in TVs category',
    timestamp: '2025-11-18T10:30:00Z',
    hasRecommendation: true,
  },
  {
    id: 'alert-2',
    kpi: 'Gross Margin %',
    severity: 'yellow' as const,
    message: 'Electronics margin pressure: -1.8pp in last 7 days',
    timestamp: '2025-11-18T09:15:00Z',
    hasRecommendation: true,
  },
  {
    id: 'alert-3',
    kpi: 'Stock Availability',
    severity: 'yellow' as const,
    message: 'Top 10 SKUs showing stockout risk within 14 days',
    timestamp: '2025-11-18T08:00:00Z',
    hasRecommendation: false,
  },
]

// (3) QUICK TILES - right column summaries
const quickTiles = [
  { 
    title: 'Sales Overview',
    period: 'Last 30 days',
    metrics: [
      { label: 'Total Revenue', value: '$2.4M', trend: 'up' as const, change: '+12.5%' },
      { label: 'Orders', value: '18,420', trend: 'up' as const, change: '+8.3%' },
      { label: 'Avg Order Value', value: '$145', trend: 'up' as const, change: '+$12' },
    ],
    target: '/sales'
  },
  { 
    title: 'Customer Overview',
    period: 'Last 30 days',
    metrics: [
      { label: 'New Customers', value: '3,240', trend: 'up' as const, change: '+15.2%' },
      { label: 'Returning Rate', value: '34.2%', trend: 'up' as const, change: '+2.1pp' },
      { label: 'Champions', value: '2,840', trend: 'up' as const, change: '+180' },
    ],
    target: '/customers'
  },
  { 
    title: 'Product Health',
    period: 'Active SKUs: 1,247',
    metrics: [
      { label: 'Avg Health Score', value: '78.2/100', trend: 'down' as const, change: '-3.4 pts' },
      { label: 'SKUs at Risk', value: '18', trend: 'down' as const, change: '-5' },
      { label: 'Stock Issues', value: '42', trend: 'neutral' as const, change: '0' },
    ],
    target: '/products'
  },
]

// (4) DAILY HIGHLIGHTS / INSIGHTS - auto-generated
const insights = [
  {
    type: 'opportunity' as const,
    title: 'Accessories Growth Opportunity',
    description: 'Category showing +22% WoW growth with healthy 64% margin – consider increasing ad spend',
    indicator: 'up' as const,
    target: '/categories'
  },
  {
    type: 'risk' as const,
    title: 'Mobile Conversion Drop',
    description: 'Category conversion dropped to 2.1% (-0.5pp) – potential pricing or availability issue',
    indicator: 'down' as const,
    target: '/categories'
  },
  {
    type: 'neutral' as const,
    title: 'Customer Retention Stable',
    description: 'Retention rate stable at 68.4% – monitor Champions segment for upsell opportunities',
    indicator: 'neutral' as const,
    target: '/customers'
  },
]

// (5) EXPLORE DASHBOARDS - navigation blocks

// (5) NAVIGATION BLOCKS - dashboard navigation
const navBlocks = [
  { 
    title: 'Sales Overview',
    description: 'GMV, revenue, margin trends and forecasts',
    link: '/sales'
  },
  { 
    title: 'Category Performance',
    description: 'Category health, volatility, and attainment',
    link: '/categories'
  },
  { 
    title: 'Product Performance',
    description: 'Product health scores and lifecycle stages',
    link: '/products'
  },
  { 
    title: 'Customer Intelligence',
    description: 'RFM segmentation and behavioral insights',
    link: '/customers'
  },
  { 
    title: 'Marketing & Traffic',
    description: 'Channel performance, ROAS, and attribution',
    link: '/marketing'
  },
  { 
    title: 'Operations & Logistics',
    description: 'Delivery metrics, stock, and fulfillment',
    link: '/operations'
  },
  { 
    title: 'AI Recommendation Center',
    description: 'AI-powered insights and action recommendations',
    link: '/ai-center'
  },
]

// Alert details for side panel
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

const alertDetails: Record<string, AlertDetail> = {
  'alert-1': {
    id: 'alert-1',
    kpiName: 'Conversion Rate',
    severity: 'red',
    message: 'Conversion Rate dropped -0.3pp in TVs category',
    timestamp: '2025-11-18T10:30:00Z',
    hasRecommendation: true,
    trend: [
      { label: 'Today', value: '2.1%' },
      { label: 'Yesterday', value: '2.4%' },
      { label: '7d avg', value: '2.6%' },
      { label: '30d avg', value: '2.8%' },
    ],
    insight: 'TVs category showing consistent CVR decline over past week. Main drivers: pricing pressure from competitors (3 major brands lowered prices 5-8%) and stock availability issues on top 5 SKUs.',
    tasks: [
      'Review pricing strategy for Samsung QLED series',
      'Check stock levels for top-converting TV models',
      'Analyze competitor pricing movements in last 7 days',
      'A/B test new product page layout',
      'Increase remarketing budget by 15%',
    ]
  },
  'alert-2': {
    id: 'alert-2',
    kpiName: 'Gross Margin %',
    severity: 'yellow',
    message: 'Electronics margin pressure: -1.8pp in last 7 days',
    timestamp: '2025-11-18T09:15:00Z',
    hasRecommendation: true,
    trend: [
      { label: 'Today', value: '22.4%' },
      { label: 'Yesterday', value: '23.1%' },
      { label: '7d avg', value: '24.2%' },
      { label: '30d avg', value: '25.8%' },
    ],
    insight: 'Margin erosion driven by aggressive promotional activity and increased product returns. Mobile phones segment showing highest pressure (-2.4pp) due to price matching policy.',
    tasks: [
      'Review promotional calendar and discount depth',
      'Implement stricter return policy for high-return SKUs',
      'Negotiate better terms with top 3 suppliers',
      'Shift ad spend to higher-margin accessories',
      'Launch bundle offers to improve basket margin',
      'Optimize dynamic pricing rules',
    ]
  },
  'alert-3': {
    id: 'alert-3',
    kpiName: 'Stock Availability',
    severity: 'yellow',
    message: 'Top 10 SKUs showing stockout risk within 14 days',
    timestamp: '2025-11-18T08:00:00Z',
    hasRecommendation: false,
    trend: [
      { label: 'In Stock', value: '94.2%' },
      { label: 'Low Stock', value: '4.1%' },
      { label: 'Out of Stock', value: '1.7%' },
    ],
    insight: 'Seasonal demand spike combined with supplier delays creating stockout risk. iPhone 15 Pro, AirPods Pro, and Samsung Galaxy S24 at highest risk.',
    tasks: [
      'Expedite shipments for top 10 at-risk SKUs',
      'Activate backup suppliers for critical items',
      'Adjust demand forecast based on current velocity',
    ]
  },
}

type Page = 'executive' | 'ai-center' | 'sales' | 'categories' | 'products' | 'customers' | 'marketing' | 'operations'

interface ExecutiveOverviewProps {
  onNavigate: (page: Page) => void
}

export default function ExecutiveOverview({ onNavigate }: ExecutiveOverviewProps) {
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<AlertDetail | null>(null)
  const [filters, setFilters] = useState({
    network: 'all',
    category: 'all',
    level: 'wojewodztwo'
  })

  const filterOptions = {
    network: [
      { value: 'all', label: 'All Networks' },
      { value: 'media-markt', label: 'Media Markt' },
      { value: 'euro', label: 'Euro RTV AGD' },
      { value: 'x-kom', label: 'x-kom' },
      { value: 'media-expert', label: 'Media Expert' },
      { value: 'empik', label: 'Empik' },
    ],
    category: [
      { value: 'all', label: 'All Categories' },
      { value: 'tv', label: 'TVs' },
      { value: 'audio', label: 'Audio' },
      { value: 'smartphones', label: 'Smartphones' },
      { value: 'laptops', label: 'Laptops' },
      { value: 'gaming', label: 'Gaming' },
    ],
    level: [
      { value: 'wojewodztwo', label: 'Region' },
      { value: 'miasto', label: 'City' },
      { value: 'sklep', label: 'Store' },
      { value: 'produkt', label: 'Product' },
    ],
  }

  const handleFilterChange = (filterType: 'network' | 'category' | 'level', value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
    console.log('Filter changed:', filterType, value)
    // TODO: Fetch filtered data
  }

  const handleAlertClick = (alertId: string) => {
    setSelectedAlert(alertDetails[alertId])
    setSidePanelOpen(true)
  }

  const handleKPIClick = (target: string) => {
    console.log('Navigate to:', target)
    // TODO: Map target to page type
  }

  const handleNavClick = (link: string) => {
    if (link === '/ai-center') {
      onNavigate('ai-center')
    }
    // TODO: Map other links to page types
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* PAGE HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Executive Overview</h1>
        <p className="text-base text-gray-600 mt-3">Real-time intelligence for strategic decision making</p>
        <div className="mt-6 h-px bg-linear-to-r from-blue-200 via-gray-200 to-transparent"></div>
      </div>

      {/* FILTER BAR */}
      <FilterBar
        filters={filterOptions}
        selected={filters}
        onChange={handleFilterChange}
      />

      {/* (1) TOP KPI BAR - 9 clickable cards in 3×3 grid, responsive to 3 cols → slider */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-10 overflow-x-auto">
        {topKPIs.map((kpi) => (
          <KPICard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            delta={kpi.delta}
            deltaType={kpi.deltaType}
            onClick={() => handleKPIClick(kpi.target)}
          />
        ))}
      </div>

      {/* MIDDLE SECTION - Quick Summary horizontal, then AI Alerts below */}
      <div className="mb-10">
        {/* (3) QUICK TILES - horizontal 3-column layout */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Quick Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickTiles.map((tile) => (
              <SummaryTile
                key={tile.title}
                title={tile.title}
                period={tile.period}
                metrics={tile.metrics}
                onClick={() => handleNavClick(tile.target)}
              />
            ))}
          </div>
        </div>

        {/* (2) AI ALERTS PANEL - full width below */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">AI-Powered Alerts</h2>
          <div className="space-y-4">
            {aiAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                kpiName={alert.kpi}
                severity={alert.severity}
                message={alert.message}
                timestamp={alert.timestamp}
                hasRecommendation={alert.hasRecommendation}
                onClick={() => handleAlertClick(alert.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* (4) DAILY HIGHLIGHTS / INSIGHTS - full width, stacks on mobile */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Daily Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, idx) => (
            <InsightCard
              key={idx}
              type={insight.type}
              title={insight.title}
              description={insight.description}
              indicator={insight.indicator}
              onClick={() => handleNavClick(insight.target)}
            />
          ))}
        </div>
      </div>

      {/* ADDITIONAL CHARTS - Bar chart and Pie chart side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChart
          title="Availability by Region (Top 10)"
          data={[
            { label: 'Mazowieckie', value: 89.2, percentage: '89.2%' },
            { label: 'Śląskie', value: 86.5, percentage: '86.5%' },
            { label: 'Wielkopolskie', value: 84.3, percentage: '84.3%' },
            { label: 'Dolnośląskie', value: 82.7, percentage: '82.7%' },
            { label: 'Małopolskie', value: 81.4, percentage: '81.4%' },
            { label: 'Pomorskie', value: 79.8, percentage: '79.8%' },
            { label: 'Łódzkie', value: 78.2, percentage: '78.2%' },
            { label: 'Zachodniopomorskie', value: 76.5, percentage: '76.5%' },
            { label: 'Lubelskie', value: 74.9, percentage: '74.9%' },
            { label: 'Kujawsko-Pomorskie', value: 73.1, percentage: '73.1%' },
          ]}
          color="#3b82f6"
        />
        <PieChart
          title="Availability Segmentation"
          data={[
            { label: 'High (>90%)', value: 42.3, percentage: '42.3%', color: '#10b981' },
            { label: 'Medium (70-90%)', value: 38.7, percentage: '38.7%', color: '#3b82f6' },
            { label: 'Low (50-70%)', value: 14.2, percentage: '14.2%', color: '#f59e0b' },
            { label: 'Critical (<50%)', value: 4.8, percentage: '4.8%', color: '#ef4444' },
          ]}
          size={200}
        />
      </div>

      {/* TREND ANALYSIS CHART */}
      <div className="mb-10">
        <TrendChart
          data={[
            { date: '11-06', value: 74 },
            { date: '12-06', value: 76 },
            { date: '15-06', value: 77 },
            { date: '18-06', value: 75 },
            { date: '22-06', value: 78 },
            { date: '25-06', value: 79 },
            { date: '28-06', value: 80 },
            { date: '02-07', value: 81 },
            { date: '05-07', value: 79 },
            { date: '09-07', value: 82 },
            { date: '12-07', value: 83 },
            { date: '15-07', value: 83 },
          ]}
          height={180}
          color="#3b82f6"
          showInsight={true}
          insightText="Availability trend shows growth from 74.7% to 83% over the last 6 months."
        />
      </div>

      {/* (5) NAVIGATION BLOCKS - full width, 3 columns, stacks on mobile */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Explore Dashboards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navBlocks.map((block) => (
            <NavBlock
              key={block.title}
              title={block.title}
              description={block.description}
              onClick={() => handleNavClick(block.link)}
            />
          ))}
        </div>
      </div>

      {/* SIDE PANEL - Alert Details */}
      <SidePanel
        isOpen={sidePanelOpen}
        alert={selectedAlert}
        onClose={() => setSidePanelOpen(false)}
        onNavigateToAICenter={() => onNavigate('ai-center')}
      />
    </div>
  )
}
