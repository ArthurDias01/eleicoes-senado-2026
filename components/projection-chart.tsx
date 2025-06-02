"use client"

export function ProjectionChart() {
  const data = [
    { bloc: "Centro-Esquerda", current: 27, projected: 17, change: -10 },
    { bloc: "Centro", current: 25, projected: 10, change: -15 },
    { bloc: "Centro-Direita", current: 29, projected: 54, change: 25 },
  ]

  const maxValue = Math.max(...data.map((d) => Math.max(d.current, d.projected)))

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.bloc} className="space-y-4">
            <h4 className="font-semibold text-center" style={{ color: getBlocColor(item.bloc) }}>
              {item.bloc}
            </h4>

            <div className="space-y-3">
              {/* Current */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Atual (2025)</span>
                  <span className="font-medium">{item.current}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${(item.current / maxValue) * 100}%`,
                      backgroundColor: getBlocColor(item.bloc),
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>

              {/* Projected */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Projetado (2026)</span>
                  <span className="font-medium">{item.projected}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${(item.projected / maxValue) * 100}%`,
                      backgroundColor: getBlocColor(item.bloc),
                    }}
                  />
                </div>
              </div>

              {/* Change */}
              <div
                className={`text-center p-2 rounded ${
                  item.change > 0
                    ? "bg-green-50 text-green-700"
                    : item.change < 0
                      ? "bg-red-50 text-red-700"
                      : "bg-gray-50 text-gray-700"
                }`}
              >
                <span className="font-bold">
                  {item.change > 0 ? "+" : ""}
                  {item.change} assentos
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
