import type {
  KPIOverviewResponse,
  ActiveAlertsResponse,
  AlertDetailResponse,
  DailyInsightsResponse,
  TilesSummaryResponse,
  NavigationModulesResponse,
} from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    throw error
  }
}

// API Endpoints
export const api = {
  // GET /api/kpi/overview - Fetch all KPI metrics
  getKPIOverview: () => 
    fetchAPI<KPIOverviewResponse>('/kpi/overview'),

  // GET /api/alerts/active - Fetch active alerts list
  getActiveAlerts: () => 
    fetchAPI<ActiveAlertsResponse>('/alerts/active'),

  // GET /api/alerts/:id - Fetch detailed alert information
  getAlertDetail: (alertId: string) => 
    fetchAPI<AlertDetailResponse>(`/alerts/${alertId}`),

  // GET /api/insights/daily - Fetch AI-generated daily insights
  getDailyInsights: () => 
    fetchAPI<DailyInsightsResponse>('/insights/daily'),

  // GET /api/tiles/summary - Fetch summary tiles data
  getTilesSummary: () => 
    fetchAPI<TilesSummaryResponse>('/tiles/summary'),

  // GET /api/navigation/modules - Fetch navigation modules configuration
  getNavigationModules: () => 
    fetchAPI<NavigationModulesResponse>('/navigation/modules'),
}

// Mock data (for development before backend is ready)
export const mockAPI = {
  getKPIOverview: async (): Promise<KPIOverviewResponse> => {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate network delay
    return {
      data: [
        { id: 'gmv', title: 'GMV', value: '$2.4M', delta: '+12.5%', deltaType: 'positive', tooltip: 'Gross Merchandise Value (today vs yesterday)', target: '/sales' },
        { id: 'revenue', title: 'Net Revenue', value: '$1.8M', delta: '+8.3%', deltaType: 'positive', tooltip: 'Revenue after returns and discounts', target: '/sales' },
        { id: 'margin', title: 'Gross Margin %', value: '24.5%', delta: '-1.2pp', deltaType: 'negative', tooltip: 'Profit margin percentage', target: '/sales' },
        { id: 'cvr', title: 'Conversion Rate', value: '2.8%', delta: '-0.4pp', deltaType: 'negative', tooltip: 'Visitors to purchase conversion', target: '/marketing' },
        { id: 'aov', title: 'AOV', value: '$145', delta: '+$12', deltaType: 'positive', tooltip: 'Average Order Value', target: '/sales' },
        { id: 'return', title: 'Return Rate %', value: '5.2%', delta: '+0.8pp', deltaType: 'negative', tooltip: 'Product return rate', target: '/operations' },
        { id: 'repeat', title: 'Repeat Purchase Rate', value: '34.2%', delta: '+2.1pp', deltaType: 'positive', tooltip: 'Customers making repeat purchases', target: '/customers' },
        { id: 'availability', title: 'Availability Compliance %', value: '94.2%', delta: '+1.8pp', deltaType: 'positive', tooltip: 'Products in stock vs target', target: '/operations' },
        { id: 'sqi', title: 'Sales Quality Index', value: '78.2', delta: '-3.4 pts', deltaType: 'negative', tooltip: 'Composite quality score (margin × rating × delivery)', target: '/sales' },
      ],
      timestamp: new Date().toISOString(),
    }
  },

  getActiveAlerts: async (): Promise<ActiveAlertsResponse> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      data: [
        { id: 'alert-1', kpi: 'Conversion Rate', severity: 'red', message: 'Conversion Rate dropped -0.3pp in TVs category', timestamp: '2025-11-18T10:30:00Z', hasRecommendation: true },
        { id: 'alert-2', kpi: 'Gross Margin %', severity: 'yellow', message: 'Electronics margin pressure: -1.8pp in last 7 days', timestamp: '2025-11-18T09:15:00Z', hasRecommendation: true },
        { id: 'alert-3', kpi: 'Stock Availability', severity: 'yellow', message: 'Top 10 SKUs showing stockout risk within 14 days', timestamp: '2025-11-18T08:00:00Z', hasRecommendation: false },
      ],
      count: 3,
      timestamp: new Date().toISOString(),
    }
  },

  getDailyInsights: async (): Promise<DailyInsightsResponse> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      data: [
        { type: 'opportunity', sentence: 'Accessories category showing +22% WoW growth with healthy 64% margin – consider increasing ad spend', indicator: 'up', target: '/categories' },
        { type: 'risk', sentence: 'Mobile category conversion dropped to 2.1% (-0.5pp) – potential pricing or availability issue', indicator: 'down', target: '/categories' },
        { type: 'neutral', sentence: 'Customer retention rate stable at 68.4% – monitor Champions segment for upsell opportunities', indicator: 'neutral', target: '/customers' },
      ],
      generatedAt: new Date().toISOString(),
      aiModel: 'gpt-4-turbo',
    }
  },

  getTilesSummary: async (): Promise<TilesSummaryResponse> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      sales: { title: 'Sales Summary', icon: '💰', metrics: [{ label: 'TVs', value: '+12%', trend: 'up' }, { label: 'Mobile', value: '-3%', trend: 'down' }, { label: 'Accessories', value: '+22%', trend: 'up' }], target: '/sales' },
      customer: { title: 'Customer Summary', icon: '👥', metrics: [{ label: 'Champions', value: '2,840', trend: 'up' }, { label: 'At Risk', value: '1,890', trend: 'neutral' }, { label: 'CLV Avg', value: '$1,240', trend: 'up' }], target: '/customers' },
      product: { title: 'Product Summary', icon: '📦', metrics: [{ label: 'Health Score', value: '4.2/5.0', trend: 'down' }, { label: 'Growth Stage', value: '42%', trend: 'up' }, { label: 'High Returns', value: '18 SKUs', trend: 'neutral' }], target: '/products' },
      timestamp: new Date().toISOString(),
    }
  },

  getNavigationModules: async (): Promise<NavigationModulesResponse> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      data: [
        { title: 'Sales Overview', description: 'GMV, revenue, margin trends and forecasts', icon: '📊', link: '/sales' },
        { title: 'Category Performance', description: 'Category health, volatility, and attainment', icon: '📁', link: '/categories' },
        { title: 'Product Performance', description: 'Product health scores and lifecycle stages', icon: '📦', link: '/products' },
        { title: 'Customer Intelligence', description: 'RFM segmentation and behavioral insights', icon: '👥', link: '/customers' },
        { title: 'Marketing & Traffic', description: 'Channel performance, ROAS, and attribution', icon: '📢', link: '/marketing' },
        { title: 'Operations & Logistics', description: 'Delivery metrics, stock, and fulfillment', icon: '⚙️', link: '/operations' },
        { title: 'AI Recommendation Center', description: 'AI-powered insights and action recommendations', icon: '🤖', link: '/ai-center' },
      ],
    }
  },
}
