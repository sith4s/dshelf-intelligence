interface NavBlockProps {
  title: string
  description: string
  onClick: () => void
}

export default function NavBlock({ title, description, onClick }: NavBlockProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer text-left group"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="h-1 w-8 bg-blue-600 rounded-full mb-4 group-hover:w-12 transition-all"></div>
      <div className="font-semibold text-gray-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
        {title}
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">{description}</div>
    </button>
  )
}
