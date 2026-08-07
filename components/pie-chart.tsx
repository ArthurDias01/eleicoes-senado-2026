interface PieChartProps {
  data: { label: string; value: number; color: string }[]
  title: string
}

export function PieChart({ data, title }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (total === 0) {
    return (
      <div className="text-center">
        <h3 className="mb-4 font-semibold">{title}</h3>
        <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-dashed border-line">
          <span className="text-sm text-muted-foreground">Sem dados</span>
        </div>
      </div>
    )
  }

  const radius = 80
  const centerX = 100
  const centerY = 100
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = data
      .slice(0, index)
      .reduce((sum, previousItem) => sum + (previousItem.value / total) * 360, 0)
    const endAngle = startAngle + angle
    const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180)
    const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180)
    const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180)
    const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180)
    const largeArcFlag = angle > 180 ? 1 : 0
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ")

    return {
      ...item,
      pathData,
      percentage: percentage.toFixed(1),
    }
  })

  return (
    <div className="text-center">
      <h3 className="mb-4 font-semibold">{title}</h3>
      <div className="relative">
        <svg width="200" height="200" className="mx-auto" role="img" aria-label={title}>
          {slices.map((slice) => (
            <path key={slice.label} d={slice.pathData} fill={slice.color} stroke="#0a1626" strokeWidth="2" />
          ))}
        </svg>
        <div className="mt-4 space-y-2">
          {slices.map((slice) => (
            <div key={slice.label} className="flex items-center justify-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: slice.color }} aria-hidden="true" />
              <span>
                {slice.label}: {slice.value} ({slice.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
