"use client"

interface BlocChartProps {
  current: Record<string, number>
  projected: Record<string, number>
}

export function BlocChart({ current, projected }: BlocChartProps) {
  const blocs = Object.keys(current)
  const total = Object.values(current).reduce((sum, val) => sum + val, 0)

  const getBlocColor = (bloc: string) => {
    switch (bloc) {
      case "Centro-Esquerda":
        return "#ef4444"
      case "Centro":
        return "#eab308"
      case "Centro-Direita":
        return "#3b82f6"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Composition */}
      <div>
        <h4 className="font-semibold mb-3">Composição Atual (2025)</h4>
        <div className="space-y-3">
          {blocs.map((bloc) => {
            const percentage = (current[bloc] / total) * 100
            return (
              <div key={bloc} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{bloc}</span>
                  <span className="font-medium">
                    {current[bloc]} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getBlocColor(bloc),
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Projected Composition */}
      <div>
        <h4 className="font-semibold mb-3">Projeção Pós-2026</h4>
        <div className="space-y-3">
          {blocs.map((bloc) => {
            const percentage = (projected[bloc] / total) * 100
            const change = projected[bloc] - current[bloc]
            return (
              <div key={bloc} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{bloc}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {projected[bloc]} ({percentage.toFixed(1)}%)
                    </span>
                    <span
                      className={`text-xs ${
                        change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      ({change > 0 ? "+" : ""}
                      {change})
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getBlocColor(bloc),
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
