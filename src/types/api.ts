// API Response Types for Executive Overview Dashboard

export interface KPIOverview {
  id: string
  title: string
  value: string
  delta: string
  deltaType: 'positive' | 'negative'
  tooltip: string
  target: string
}

export interface ActiveAlert {
  id: string
  kpi: string
  severity: 'red' | 'yellow'
  message: string
  timestamp: string
  hasRecommendation: boolean
}

export interface AlertDetail extends ActiveAlert {
  trend: { label: string; value: string }[]
  insight: string
  tasks: string[]
}

export interface DailyInsight {
  type: 'opportunity' | 'risk' | 'neutral'
  sentence: string
  indicator: 'up' | 'down' | 'neutral'
  target: string
}

export interface TileSummary {
  title: string
  icon: string
  metrics: {
    label: string
    value: string
    trend: 'up' | 'down' | 'neutral'
  }[]
  target: string
}

export interface NavigationModule {
  title: string
  description: string
  icon: string
  link: string
}

// API Response Interfaces
export interface KPIOverviewResponse {
  data: KPIOverview[]
  timestamp: string
}

export interface ActiveAlertsResponse {
  data: ActiveAlert[]
  count: number
  timestamp: string
}

export interface AlertDetailResponse {
  data: AlertDetail
  timestamp: string
}

export interface DailyInsightsResponse {
  data: DailyInsight[]
  generatedAt: string
  aiModel: string
}

export interface TilesSummaryResponse {
  sales: TileSummary
  customer: TileSummary
  product: TileSummary
  timestamp: string
}

export interface NavigationModulesResponse {
  data: NavigationModule[]
}
