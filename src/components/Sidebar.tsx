type Page = 'executive' | 'ai-center' | 'sales' | 'categories' | 'products' | 'customers' | 'marketing' | 'operations'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { label: string; page: Page }[] = [
  { label: 'Executive Overview', page: 'executive' },
  { label: 'AI Center', page: 'ai-center' },
  { label: 'Sales & Revenue', page: 'sales' },
  { label: 'Category Performance', page: 'categories' },
  { label: 'Product Insights', page: 'products' },
  { label: 'Customer Intelligence', page: 'customers' },
  { label: 'Marketing & Traffic', page: 'marketing' },
  { label: 'Operations', page: 'operations' },
]

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-8">
      {/* Logo / Brand */}
      <div className="mb-16">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Digital Shelf Intelligence</h1>
        <div className="mt-3 h-1 w-12 bg-linear-to-r from-blue-600 to-blue-400 rounded-full"></div>
      </div>
      
      {/* Navigation */}
      <nav>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.page}>
              <button
                onClick={() => onNavigate(item.page)}
                className={`
                  w-full text-left block px-4 py-3 text-sm font-semibold rounded-xl transition-all
                  ${currentPage === item.page
                    ? 'text-blue-700 bg-blue-50 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom info */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-xs text-gray-400">
          Last updated<br/>
          <span className="text-gray-600 font-medium">21 Nov 2025, 13:00</span>
        </div>
      </div>
    </aside>
  )
}
