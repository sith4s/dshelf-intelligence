import { useState } from 'react'

interface Alert {
  id: string
  kpi: string
  area: 'Sales' | 'Product' | 'Customer' | 'Operations' | 'Marketing'
  severity: 'red' | 'yellow'
  message: string
  timestamp: string
  owner: string
  status: 'active' | 'in-progress' | 'resolved'
  age: number // days
  hasRecommendation: boolean
}

interface Task {
  id: string
  title: string
  kpi: string
  area: string
  owner: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'high' | 'medium' | 'low'
  impact: string
  effectiveness?: 'effective' | 'not-effective' | null
}

interface Resolution {
  id: string
  alertId: string
  kpi: string
  resolvedDate: string
  timeToResolve: number // days
  tasksCompleted: number
  effectiveness: number // percentage
}

export default function AICenter() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'tasks' | 'history'>('alerts')
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [severityFilter, setSeverityFilter] = useState<'all' | 'red' | 'yellow'>('all')
  const [areaFilter, setAreaFilter] = useState<string>('all')

  // Mock data - alerts
  const alerts: Alert[] = [
    {
      id: 'alert-1',
      kpi: 'Conversion Rate',
      area: 'Sales',
      severity: 'red',
      message: 'Conversion Rate dropped -0.3pp in TVs category',
      timestamp: '2025-11-18T10:30:00Z',
      owner: 'Sarah Chen',
      status: 'active',
      age: 3,
      hasRecommendation: true
    },
    {
      id: 'alert-2',
      kpi: 'Gross Margin',
      area: 'Sales',
      severity: 'yellow',
      message: 'Margin compression detected across Audio category',
      timestamp: '2025-11-19T14:20:00Z',
      owner: 'Mike Rodriguez',
      status: 'in-progress',
      age: 2,
      hasRecommendation: true
    },
    {
      id: 'alert-3',
      kpi: 'Stock Availability',
      area: 'Operations',
      severity: 'yellow',
      message: 'Top 10 SKUs showing stockout risk within 14 days',
      timestamp: '2025-11-18T08:00:00Z',
      owner: 'Lisa Park',
      status: 'active',
      age: 3,
      hasRecommendation: false
    },
    {
      id: 'alert-4',
      kpi: 'Customer Churn',
      area: 'Customer',
      severity: 'red',
      message: 'Champions segment showing 12% churn increase',
      timestamp: '2025-11-20T09:15:00Z',
      owner: 'David Kim',
      status: 'active',
      age: 1,
      hasRecommendation: true
    },
    {
      id: 'alert-5',
      kpi: 'Product Returns',
      area: 'Product',
      severity: 'yellow',
      message: 'Return rate up 8% for Gaming peripherals',
      timestamp: '2025-11-19T16:45:00Z',
      owner: 'Emma Watson',
      status: 'in-progress',
      age: 2,
      hasRecommendation: true
    }
  ]

  // Mock data - tasks
  const tasks: Task[] = [
    {
      id: 'task-1',
      title: 'Audit TV pricing vs competitors',
      kpi: 'Conversion Rate',
      area: 'Sales',
      owner: 'Sarah Chen',
      dueDate: '2025-11-25',
      status: 'in-progress',
      priority: 'high',
      impact: '+0.2pp CVR',
      effectiveness: null
    },
    {
      id: 'task-2',
      title: 'Review product page content quality',
      kpi: 'Conversion Rate',
      area: 'Sales',
      owner: 'Sarah Chen',
      dueDate: '2025-11-26',
      status: 'pending',
      priority: 'high',
      impact: '+0.15pp CVR'
    },
    {
      id: 'task-3',
      title: 'Expedite shipments for top 10 at-risk SKUs',
      kpi: 'Stock Availability',
      area: 'Operations',
      owner: 'Lisa Park',
      dueDate: '2025-11-22',
      status: 'in-progress',
      priority: 'high',
      impact: '+2% availability'
    },
    {
      id: 'task-4',
      title: 'Launch retention campaign for Champions',
      kpi: 'Customer Churn',
      area: 'Customer',
      owner: 'David Kim',
      dueDate: '2025-11-28',
      status: 'pending',
      priority: 'high',
      impact: '-5% churn'
    },
    {
      id: 'task-5',
      title: 'Analyze Gaming peripheral quality issues',
      kpi: 'Product Returns',
      area: 'Product',
      owner: 'Emma Watson',
      dueDate: '2025-11-24',
      status: 'in-progress',
      priority: 'medium',
      impact: '-3% returns'
    }
  ]

  // Mock data - history
  const resolutions: Resolution[] = [
    {
      id: 'res-1',
      alertId: 'alert-old-1',
      kpi: 'AOV',
      resolvedDate: '2025-11-15',
      timeToResolve: 5,
      tasksCompleted: 4,
      effectiveness: 87
    },
    {
      id: 'res-2',
      alertId: 'alert-old-2',
      kpi: 'Organic Traffic',
      resolvedDate: '2025-11-10',
      timeToResolve: 8,
      tasksCompleted: 6,
      effectiveness: 72
    },
    {
      id: 'res-3',
      alertId: 'alert-old-3',
      kpi: 'Product Rating',
      resolvedDate: '2025-11-08',
      timeToResolve: 12,
      tasksCompleted: 8,
      effectiveness: 94
    }
  ]

  const filteredAlerts = alerts.filter(alert => {
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false
    if (areaFilter !== 'all' && alert.area !== areaFilter) return false
    return true
  })

  const getSeverityBadge = (severity: 'red' | 'yellow') => {
    if (severity === 'red') {
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
        Critical
      </span>
    }
    return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full">
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
      Warning
    </span>
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'active': 'bg-blue-50 text-blue-700',
      'in-progress': 'bg-purple-50 text-purple-700',
      'resolved': 'bg-green-50 text-green-700',
      'pending': 'bg-gray-50 text-gray-700',
      'completed': 'bg-green-50 text-green-700'
    }
    return <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
      {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
    </span>
  }

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      'high': 'bg-red-50 text-red-700',
      'medium': 'bg-yellow-50 text-yellow-700',
      'low': 'bg-gray-50 text-gray-700'
    }
    return <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  }

  const avgResolutionTime = resolutions.reduce((sum, r) => sum + r.timeToResolve, 0) / resolutions.length
  const avgEffectiveness = resolutions.reduce((sum, r) => sum + r.effectiveness, 0) / resolutions.length

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* PAGE HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AI Recommendations Center</h1>
        <p className="text-base text-gray-600 mt-3">Central hub for alerts, tasks, and intelligent recommendations</p>
        <div className="mt-6 h-px bg-linear-to-r from-blue-200 via-gray-200 to-transparent"></div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div className="text-sm font-medium text-gray-600 mb-2">Active Alerts</div>
          <div className="text-3xl font-bold text-gray-900">{alerts.filter(a => a.status === 'active').length}</div>
          <div className="text-xs text-red-600 mt-2">{alerts.filter(a => a.severity === 'red').length} critical</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div className="text-sm font-medium text-gray-600 mb-2">Pending Tasks</div>
          <div className="text-3xl font-bold text-gray-900">{tasks.filter(t => t.status !== 'completed').length}</div>
          <div className="text-xs text-yellow-600 mt-2">{tasks.filter(t => t.priority === 'high').length} high priority</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div className="text-sm font-medium text-gray-600 mb-2">Avg Resolution Time</div>
          <div className="text-3xl font-bold text-gray-900">{avgResolutionTime.toFixed(1)}</div>
          <div className="text-xs text-gray-500 mt-2">days</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div className="text-sm font-medium text-gray-600 mb-2">Task Effectiveness</div>
          <div className="text-3xl font-bold text-gray-900">{avgEffectiveness.toFixed(0)}%</div>
          <div className="text-xs text-green-600 mt-2">+5% vs last month</div>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-8">
        <div className="flex items-center gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-6 py-3 text-sm font-semibold transition-all ${
              activeTab === 'alerts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-3 text-sm font-semibold transition-all ${
              activeTab === 'tasks'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Task Management ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm font-semibold transition-all ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            History & Learning
          </button>
        </div>
      </div>

      {/* ALERTS TAB */}
      {activeTab === 'alerts' && (
        <div>
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Severity
                </label>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="all">All Severities</option>
                  <option value="red">Critical Only</option>
                  <option value="yellow">Warnings Only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Area
                </label>
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="all">All Areas</option>
                  <option value="Sales">Sales</option>
                  <option value="Product">Product</option>
                  <option value="Customer">Customer</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Alerts Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">KPI</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Area</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{alert.kpi}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{alert.area}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getSeverityBadge(alert.severity)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-md">{alert.message}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{alert.age}d</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{alert.owner}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(alert.status)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedAlert(alert)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TASKS TAB */}
      {activeTab === 'tasks' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">KPI</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Area</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{task.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{task.kpi}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{task.area}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{task.owner}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getPriorityBadge(task.priority)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-green-600">{task.impact}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resolution Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Average Resolution Time</span>
                    <span className="font-bold text-gray-900">{avgResolutionTime.toFixed(1)} days</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Task Effectiveness Rate</span>
                    <span className="font-bold text-gray-900">{avgEffectiveness.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${avgEffectiveness}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Alerts Resolved This Month</span>
                    <span className="font-bold text-gray-900">{resolutions.length}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Pricing adjustments most effective</div>
                    <div className="text-xs text-gray-600 mt-1">94% success rate in resolving conversion issues</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Fastest resolutions in Operations</div>
                    <div className="text-xs text-gray-600 mt-1">Average 4.2 days vs 8.3 days overall</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">
                    <span className="text-yellow-600 font-bold">⚡</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Customer alerts need attention</div>
                    <div className="text-xs text-gray-600 mt-1">Longer resolution times, consider process review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Timeline */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Resolutions</h3>
            <div className="space-y-4">
              {resolutions.map((resolution) => (
                <div key={resolution.id} className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{resolution.kpi}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Resolved on {new Date(resolution.resolvedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Time to Resolve</div>
                    <div className="text-lg font-bold text-gray-900">{resolution.timeToResolve}d</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Tasks Completed</div>
                    <div className="text-lg font-bold text-gray-900">{resolution.tasksCompleted}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Effectiveness</div>
                    <div className="text-lg font-bold text-green-600">{resolution.effectiveness}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alert Detail Modal (simplified) */}
      {selectedAlert && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
            onClick={() => setSelectedAlert(null)}
          />
          <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  {getSeverityBadge(selectedAlert.severity)}
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">{selectedAlert.kpi}</h2>
                  <p className="text-sm text-gray-600 mt-2">{selectedAlert.message}</p>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Owner:</span>
                      <span className="font-medium text-gray-900">{selectedAlert.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium text-gray-900">{selectedAlert.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium text-gray-900">{selectedAlert.age} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      {getStatusBadge(selectedAlert.status)}
                    </div>
                  </div>
                </div>

                {selectedAlert.hasRecommendation && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">AI Recommendations</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-sm text-blue-900 mb-3">
                        Based on similar cases, we recommend taking the following actions:
                      </p>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Audit pricing against top 3 competitors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Review product page content quality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Check for availability issues</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                  Create Action Plan
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
