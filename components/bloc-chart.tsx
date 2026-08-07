"use client"

import { changeToneClass, getBlocHexColor } from "@/lib/bloc-utils"

interface BlocChartProps {
  current: Record<string, number>
  projected: Record<string, number>
}

export function BlocChart({ current, projected }: BlocChartProps) {
  const blocs = Object.keys(current)
  const total = Object.values(current).reduce((sum, val) => sum + val, 0)

  return (
    <div className="space-y-6">
      {/* Current Composition */}
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Composição Atual (2025)
        </h4>
        <div className="space-y-3">
          {blocs.map((bloc) => {
            const percentage = (current[bloc] / total) * 100
            return (
              <div key={bloc} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{bloc}</span>
                  <span className="font-medium tabular-nums">
                    {current[bloc]} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-ink/10">
                  <div
                    className="h-2 rounded-full transition-[width] duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getBlocHexColor(bloc),
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
        <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Projeção Pós-2026</h4>
        <div className="space-y-3">
          {blocs.map((bloc) => {
            const percentage = (projected[bloc] / total) * 100
            const change = projected[bloc] - current[bloc]
            return (
              <div key={bloc} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{bloc}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium tabular-nums">
                      {projected[bloc]} ({percentage.toFixed(1)}%)
                    </span>
                    <span className={`text-xs tabular-nums ${changeToneClass(change)}`}>
                      ({change > 0 ? "+" : ""}
                      {change})
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-ink/10">
                  <div
                    className="h-2 rounded-full transition-[width] duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getBlocHexColor(bloc),
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
