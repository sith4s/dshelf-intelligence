import AlertItem from './AlertItem'

interface Alert {
  id: string
  kpiName: string
  severity: 'red' | 'yellow'
  message: string
  timestamp: string
  hasRecommendation: boolean
}

interface AlertsPanelProps {
  alerts: Alert[]
  onAlertClick: (alertId: string) => void
}

export default function AlertsPanel({ alerts, onAlertClick }: AlertsPanelProps) {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <AlertItem
            key={alert.id}
            {...alert}
            onClick={() => onAlertClick(alert.id)}
          />
        ))}
      </div>
    </div>
  )
}
