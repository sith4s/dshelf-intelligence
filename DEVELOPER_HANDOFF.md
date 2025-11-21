# DShelf Intel - Executive Overview Dashboard
## Developer Handoff Documentation

### 🎯 Overview
Executive Overview is the main dashboard providing real-time KPI monitoring, AI-powered alerts, daily insights, and navigation to detailed analytics modules.

---

## 📦 Reusable Components

All components are located in `src/components/`

### 1. **KPICard**
```tsx
interface KPICardProps {
  id: string
  title: string
  value: string
  delta: string
  deltaType: 'positive' | 'negative'
  tooltip?: string
  onClick: () => void
}
```
**Usage:** Display individual KPI metrics with trend indicators
**Features:** Hover effects, tooltips, click navigation

---

### 2. **AlertItem**
```tsx
interface AlertItemProps {
  id: string
  kpi: string
  severity: 'red' | 'yellow'  // red = critical, yellow = warning
  message: string
  timestamp: string
  hasRecommendation: boolean
  onClick: () => void
}
```
**Usage:** Display individual alert with severity badge
**Features:** Severity color coding, recommendation indicator

---

### 3. **AlertsPanel**
```tsx
interface AlertsPanelProps {
  alerts: Alert[]
  onAlertClick: (alertId: string) => void
}
```
**Usage:** Container for alert list
**Features:** Responsive layout (2/3 width on desktop, full width on mobile)

---

### 4. **SummaryTile**
```tsx
interface SummaryTileProps {
  title: string
  icon: string
  metrics: { label: string; value: string; trend: 'up' | 'down' | 'neutral' }[]
  onClick: () => void
}
```
**Usage:** Quick summary cards for Sales/Customer/Product metrics
**Features:** Trend color coding (green/red/gray)

---

### 5. **InsightCard**
```tsx
interface InsightCardProps {
  type: 'opportunity' | 'risk' | 'neutral'
  sentence: string
  indicator: 'up' | 'down' | 'neutral'
  onClick: () => void
}
```
**Usage:** AI-generated daily insights
**Features:** Dynamic icons (📈📉➡️), type-based color coding

---

### 6. **NavBlock**
```tsx
interface NavBlockProps {
  title: string
  description: string
  icon: string
  onClick: () => void
}
```
**Usage:** Navigation cards to other dashboard modules
**Features:** Hover effects, large clickable surface

---

### 7. **SidePanel**
```tsx
interface SidePanelProps {
  isOpen: boolean
  alert: AlertDetail | null
  onClose: () => void
  onNavigateToAICenter: () => void
}
```
**Usage:** Detailed alert view with recommendations
**Features:** 
- Backdrop overlay
- Trend analysis table
- AI insights
- Recommended action list
- CTA to AI Center
- Responsive (fullscreen on mobile, 600px on desktop)

---

### 8. **GridContainer**
```tsx
interface GridContainerProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 5
  gap?: 2 | 4 | 6 | 8
  className?: string
}
```
**Usage:** Responsive grid wrapper with breakpoints
**Features:** Auto-responsive column layout

---

### 9. **PageHeader**
```tsx
interface PageHeaderProps {
  title: string
  subtitle?: string
}
```
**Usage:** Consistent page title formatting

---

## 🔌 API Endpoints

Base URL: `/api` (configure via `VITE_API_BASE_URL` env variable)

### 1. **GET /api/kpi/overview**
Fetch all 9 KPI metrics for top bar

**Response:**
```json
{
  "data": [
    {
      "id": "gmv",
      "title": "GMV",
      "value": "$2.4M",
      "delta": "+12.5%",
      "deltaType": "positive",
      "tooltip": "Gross Merchandise Value (today vs yesterday)",
      "target": "/sales"
    }
  ],
  "timestamp": "2025-11-18T12:00:00Z"
}
```

---

### 2. **GET /api/alerts/active**
Fetch active alerts list

**Response:**
```json
{
  "data": [
    {
      "id": "alert-1",
      "kpi": "Conversion Rate",
      "severity": "red",
      "message": "Conversion Rate dropped -0.3pp in TVs category",
      "timestamp": "2025-11-18T10:30:00Z",
      "hasRecommendation": true
    }
  ],
  "count": 3,
  "timestamp": "2025-11-18T12:00:00Z"
}
```

---

### 3. **GET /api/alerts/:id**
Fetch detailed alert with recommendations

**Response:**
```json
{
  "data": {
    "id": "alert-1",
    "kpi": "Conversion Rate",
    "severity": "red",
    "message": "Conversion Rate dropped -0.3pp in TVs category",
    "timestamp": "2025-11-18T10:30:00Z",
    "hasRecommendation": true,
    "trend": [
      { "label": "Today", "value": "2.1%" },
      { "label": "Yesterday", "value": "2.4%" },
      { "label": "7d avg", "value": "2.6%" },
      { "label": "30d avg", "value": "2.8%" }
    ],
    "insight": "TVs category showing consistent CVR decline...",
    "tasks": [
      "Review pricing strategy for Samsung QLED series",
      "Check stock levels for top-converting TV models"
    ]
  },
  "timestamp": "2025-11-18T12:00:00Z"
}
```

---

### 4. **GET /api/insights/daily**
Fetch AI-generated daily insights

**Response:**
```json
{
  "data": [
    {
      "type": "opportunity",
      "sentence": "Accessories category showing +22% WoW growth...",
      "indicator": "up",
      "target": "/categories"
    }
  ],
  "generatedAt": "2025-11-18T06:00:00Z",
  "aiModel": "gpt-4-turbo"
}
```

---

### 5. **GET /api/tiles/summary**
Fetch summary tiles data (Sales, Customer, Product)

**Response:**
```json
{
  "sales": {
    "title": "Sales Summary",
    "icon": "💰",
    "metrics": [
      { "label": "TVs", "value": "+12%", "trend": "up" }
    ],
    "target": "/sales"
  },
  "customer": { ... },
  "product": { ... },
  "timestamp": "2025-11-18T12:00:00Z"
}
```

---

### 6. **GET /api/navigation/modules**
Fetch navigation modules configuration

**Response:**
```json
{
  "data": [
    {
      "title": "Sales Overview",
      "description": "GMV, revenue, margin trends and forecasts",
      "icon": "📊",
      "link": "/sales"
    }
  ]
}
```

---

## 🛠️ Mock API

For development before backend is ready, use `mockAPI` from `src/services/api.ts`

```tsx
import { mockAPI } from '@/services/api'

const kpis = await mockAPI.getKPIOverview()
```

Mock API includes:
- 300ms simulated network delay
- Realistic sample data
- Same type signatures as real API

---

## 🗺️ Navigation Routes

Required routes for React Router:

| Route | Description |
|-------|-------------|
| `/` | Executive Overview (current page) |
| `/sales` | Sales Overview Dashboard |
| `/categories` | Category Performance Dashboard |
| `/products` | Product Insights Dashboard |
| `/customers` | Customer Intelligence Dashboard |
| `/marketing` | Marketing & Traffic Dashboard |
| `/operations` | Operations & Logistics Dashboard |
| `/ai-center` | AI Recommendation Center |

---

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px` - Single column, stack all
- **Tablet**: `768px - 1024px` - 2 columns
- **Desktop**: `> 1024px` - 3 columns

KPI Bar behavior:
- Mobile: 1 column with horizontal scroll
- Tablet/Desktop: 3 columns grid

---

## 🎨 Design System

### Colors
- **Positive trends**: `text-green-600`
- **Negative trends**: `text-red-600`
- **Neutral**: `text-gray-900`
- **Critical severity**: `bg-red-100 text-red-700 border-red-300`
- **Warning severity**: `bg-yellow-100 text-yellow-700 border-yellow-300`
- **Hover accent**: `border-blue-500 text-blue-600`

### Spacing
- Card padding: `p-4` to `p-6`
- Grid gaps: `gap-4` to `gap-6`
- Section margins: `mb-6` to `mb-8`

### Transitions
- All interactive elements: `transition-all`
- Hover: `hover:shadow-lg hover:border-blue-500`

---

## 🔄 Data Flow

```
Page Load
  ↓
Fetch from API (or mockAPI)
  ↓
Display KPIs, Alerts, Insights, Tiles, Navigation
  ↓
User clicks Alert
  ↓
Fetch Alert Detail (/api/alerts/:id)
  ↓
Open SidePanel with recommendations
  ↓
User clicks "Open in AI Center"
  ↓
Navigate to /ai-center
```

---

## 📊 ASCII Wireframe

```
┌──────────────────────────────────────────────────────────┐
│                   TOP KPI BAR (9 CARDS)                  │
│  GMV | Revenue | Margin | CVR | AOV | Return | ...       │
└──────────────────────────────────────────────────────────┘

┌───────────────────────────────┬──────────────────────────┐
│        AI ALERTS PANEL        │       QUICK TILES        │
│   [Alert 1 - CRITICAL]        │   [Sales Summary]        │
│   [Alert 2 - WARNING]         │   [Customer Summary]     │
│   [Alert 3 - WARNING]         │   [Product Summary]      │
└───────────────────────────────┴──────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                DAILY INSIGHTS (3 CARDS)                  │
│  [Opportunity] | [Risk] | [Neutral]                      │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                NAVIGATION BLOCKS (3×3 grid)              │
│  Sales | Categories | Products                            │
│  Customers | Marketing | Operations | AI Center           │
└──────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   ```bash
   # .env.local
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```

4. **Use mock data** (if backend not ready):
   ```tsx
   import { mockAPI } from '@/services/api'
   ```

5. **Switch to real API** when backend is ready:
   ```tsx
   import { api } from '@/services/api'
   ```

---

## ✅ Testing Checklist

- [ ] All KPI cards clickable and navigate to correct routes
- [ ] Alert severity badges show correct colors (red/yellow)
- [ ] Clicking alert opens side panel with details
- [ ] Side panel shows trend, insight, and tasks
- [ ] Side panel closes on backdrop click or X button
- [ ] Quick tiles show correct trend colors
- [ ] Insights display correct type badges (opportunity/risk/neutral)
- [ ] Navigation blocks have hover effects
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Mock API returns data with ~300ms delay
- [ ] All TypeScript types compile without errors

---

## 📚 Type Definitions

See `src/types/api.ts` for complete TypeScript interfaces.

---

## 🐛 Known Issues / Future Enhancements

- [ ] React Router not yet implemented (console.log navigation)
- [ ] Trend charts are tables, not visual charts (future: integrate Recharts)
- [ ] No real-time data updates (future: WebSocket integration)
- [ ] No error handling UI (future: error boundaries)
- [ ] No loading states (future: skeleton screens)

---

**Last Updated:** 2025-11-18  
**Version:** 1.0.0  
**Contact:** Development Team
