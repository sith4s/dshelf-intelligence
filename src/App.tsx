import { useState } from 'react'
import ExecutiveOverview from './pages/ExecutiveOverview'
import AICenter from './pages/AICenter'
import SalesOverview from './pages/SalesOverview'
import Sidebar from './components/Sidebar'

type Page = 'executive' | 'ai-center' | 'sales' | 'categories' | 'products' | 'customers' | 'marketing' | 'operations'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('executive')

  const renderPage = () => {
    switch (currentPage) {
      case 'ai-center':
        return <AICenter />
      case 'sales':
        return <SalesOverview onNavigate={setCurrentPage} />
      case 'executive':
      default:
        return <ExecutiveOverview onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 ml-64 p-10">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
