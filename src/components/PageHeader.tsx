interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
      <div className="mt-3 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent"></div>
    </div>
  )
}
