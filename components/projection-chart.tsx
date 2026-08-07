"use client"

import { changePanelClass, getBlocHexColor } from "@/lib/bloc-utils"
import { BLOCS, COMPOSITION_CHANGES, CURRENT_COMPOSITION, PROJECTED_COMPOSITION } from "@/lib/projection-data"

const PROJECTION_DATA = BLOCS.map((bloc) => ({
  bloc,
  current: CURRENT_COMPOSITION[bloc],
  projected: PROJECTED_COMPOSITION[bloc],
  change: COMPOSITION_CHANGES[bloc],
}))

export function ProjectionChart() {
  const maxValue = Math.max(...PROJECTION_DATA.map((item) => Math.max(item.current, item.projected)))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROJECTION_DATA.map((item) => (
          <div key={item.bloc} className="space-y-4">
            <h4
              className="text-center text-xs font-bold uppercase tracking-[0.14em]"
              style={{ color: getBlocHexColor(item.bloc) }}
            >
              {item.bloc}
            </h4>

            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Atual (2025)</span>
                  <span className="font-medium tabular-nums">{item.current}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-ink/10">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${(item.current / maxValue) * 100}%`,
                      backgroundColor: getBlocHexColor(item.bloc),
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Projetado (2026)</span>
                  <span className="font-medium tabular-nums">{item.projected}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-ink/10">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${(item.projected / maxValue) * 100}%`,
                      backgroundColor: getBlocHexColor(item.bloc),
                    }}
                  />
                </div>
              </div>

              <div className={`rounded-md border p-2 text-center ${changePanelClass(item.change)}`}>
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
