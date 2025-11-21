interface GridContainerProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 5
  gap?: 2 | 4 | 6 | 8
  className?: string
}

export default function GridContainer({ children, columns = 3, gap = 4, className = '' }: GridContainerProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
    5: 'md:grid-cols-3 lg:grid-cols-5',
  }

  const gapClass = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }

  return (
    <div className={`grid grid-cols-1 ${colsClass[columns]} ${gapClass[gap]} ${className}`}>
      {children}
    </div>
  )
}
