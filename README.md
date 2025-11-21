# Digital Shelf Intelligence Dashboard

A professional e-commerce analytics dashboard for monitoring product availability, sales performance, and AI-powered insights across retail networks.

## 🚀 Features

### Executive Overview
- **9 Key Performance Indicators** - GMV, Revenue, Margin, CVR, AOV, Traffic, Stock, NPS, SQI
- **Dynamic Filters** - Filter by store network, product category, and detail level (region/city/store/product)
- **Quick Summary Tiles** - Sales Overview, Customer Overview, Product Health with detailed metrics
- **AI-Powered Alerts** - Real-time alerts with severity indicators and recommendations
- **Trend Analysis** - Availability trends with AI insights
- **Regional Analytics** - Bar chart showing availability by region (Top 10)
- **Segmentation** - Pie chart for availability distribution (High/Medium/Low/Critical)
- **Daily Insights** - Opportunity and risk cards with actionable recommendations
- **Navigation Blocks** - Quick access to detailed dashboards

### AI Recommendations Center
- **Active Alerts Dashboard** - Filterable table with KPI, area, severity, age, owner, and status
- **Task Management** - Task board with priority, due dates, impact, and effectiveness tracking
- **History & Learning** - Resolution metrics, effectiveness rates, and performance insights
- **Alert Details** - Detailed view with AI recommendations and action plans
- **Performance Stats** - Average resolution time, task effectiveness rate, and trend analysis

### Sales & Revenue Overview
- **Top KPI Strip** - GMV, Net Revenue, Gross Margin %, AOV, Orders, Discount Rate %, SQI
- **Revenue Trends** - Time-series chart with Gross/Net toggle and AI insights
- **Margin Analysis** - Revenue & margin by category with clickable navigation
- **Top 10 Margin Changes** - Gainers and losers comparison table
- **Price Mix** - Stacked bar showing Affordable/Regular/Premium contribution
- **Volatility Heatmap** - 5-week volatility index per category with color-coded cells
- **Revenue Forecast** - 6-week forecast with AI alerts on supply risks

## 🛠️ Tech Stack

- **React 19.2.0** - Modern UI framework
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.2.2** - Lightning-fast build tool
- **Tailwind CSS 4.1.17** - Utility-first styling with v4 syntax
- **Custom SVG Charts** - Lightweight visualizations without external libraries

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/sith4s/dshelf-intelligence.git

# Navigate to project directory
cd dshelf-intelligence

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
dshelf-intelligence/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AlertItem.tsx    # Individual alert card
│   │   ├── AlertsPanel.tsx  # Alerts container
│   │   ├── BarChart.tsx     # Horizontal bar chart
│   │   ├── FilterBar.tsx    # Multi-filter component
│   │   ├── InsightCard.tsx  # Daily insights card
│   │   ├── KPICard.tsx      # KPI metric card
│   │   ├── NavBlock.tsx     # Navigation block
│   │   ├── PieChart.tsx     # Pie chart with legend
│   │   ├── SidePanel.tsx    # Alert detail drawer
│   │   ├── Sidebar.tsx      # Main navigation
│   │   ├── SummaryTile.tsx  # Quick summary tile
│   │   └── TrendChart.tsx   # Time-series area chart
│   ├── pages/               # Main dashboard pages
│   │   ├── ExecutiveOverview.tsx
│   │   ├── AICenter.tsx
│   │   └── SalesOverview.tsx
│   ├── services/            # API integration (placeholder)
│   ├── types/               # TypeScript definitions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🎨 Design System

The dashboard follows a **Mindshore.io-inspired** design philosophy:

- **Typography**: Inter font with bold headings and clear hierarchy
- **Colors**: Emerald (positive), Rose (negative), Blue (accent), Gray (neutral)
- **Spacing**: Generous padding with `rounded-2xl` containers
- **Shadows**: Subtle `0 2px 8px rgba(0, 0, 0, 0.04)` for depth
- **Interactions**: Smooth transitions with `hover:-translate-y-0.5` animations
- **Responsive**: Mobile-first grid layouts with breakpoints

## 📊 Key Metrics

### Executive Overview KPIs
- **GMV** - Gross Merchandise Value
- **Net Revenue** - Revenue after returns and discounts
- **Gross Margin %** - Profit margin percentage
- **CVR** - Conversion Rate
- **AOV** - Average Order Value
- **Traffic** - Site visitors
- **Stock Availability** - Product availability percentage
- **NPS** - Net Promoter Score
- **SQI** - Sales Quality Index

### Sales Overview KPIs
- **Discount Rate %** - Average discount applied
- **Revenue by Category** - Category-level performance
- **Margin Changes** - Top gainers and losers
- **Price Mix** - Affordable/Regular/Premium split
- **Volatility Index** - Revenue stability by category

## 🔮 Future Enhancements

- [ ] Category Performance - Distribution density, volatility index
- [ ] Product Insights - Health score (0-100), Pareto 80/20, lifecycle stages
- [ ] Customer Intelligence - Quality segmentation, purchase momentum
- [ ] Marketing & Traffic - Incremental revenue, organic vs paid ROI
- [ ] Operations & Logistics - Opportunity cost, FPI (Fulfillment Performance Index)
- [ ] Strategic Layer - Forecasted revenue, churn prediction, price sensitivity
- [ ] Real API Integration - Connect to backend services
- [ ] React Router - Full SPA routing
- [ ] Export & Reports - PDF/Excel generation
- [ ] User Authentication - Role-based access control

## 📝 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit
```

## 🤝 Contributing

This is a professional demo project. Feel free to fork and adapt for your needs.

## 📄 License

MIT

## 👤 Author

**sith4s**
- GitHub: [@sith4s](https://github.com/sith4s)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
