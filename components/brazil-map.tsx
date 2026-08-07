"use client"

import { getBlocBgColor, getBlocTextColor } from "@/lib/bloc-utils";
import { BASE_PROJECTIONS, BLOCS, dominantBlocForState, type Bloc } from "@/lib/projection-data";

const SUMMARIES = [
  { bloc: "Centro-Esquerda", note: "Forte no Nordeste e Norte" },
  { bloc: "Centro", note: "Perda significativa de espaço" },
  { bloc: "Centro-Direita", note: "Domínio no Sul, Sudeste e Centro-Oeste" },
] as const satisfies ReadonlyArray<{ bloc: Bloc; note: string }>

const stateProjections = Object.fromEntries(
  Object.keys(BASE_PROJECTIONS).map((code) => [code, dominantBlocForState(code)]),
) as Record<string, Bloc>

export function BrazilMap() {
  const blocCounts = BLOCS.reduce(
    (acc, bloc) => {
      acc[bloc] = Object.values(stateProjections).filter((value) => value === bloc).length
      return acc
    },
    {} as Record<Bloc, number>,
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4" aria-label="Legenda dos blocos">
        {SUMMARIES.map(({ bloc }) => (
          <div key={bloc} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${getBlocBgColor(bloc)}`} aria-hidden="true" />
            <span className="text-sm text-muted-foreground">
              {bloc} ({blocCounts[bloc]})
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {Object.entries(stateProjections).map(([state, bloc]) => (
          <div
            key={state}
            className="stat-tile p-3 text-center transition-[transform,border-color] duration-200 hover:-translate-y-0.5"
          >
            <div className={`mx-auto mb-2 h-1.5 w-8 rounded-full ${getBlocBgColor(bloc)}`} aria-hidden="true" />
            <div className="font-display text-base">{state}</div>
            <div className={`text-xs ${getBlocTextColor(bloc)}`}>{bloc.split("-")[1] || bloc}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {SUMMARIES.map(({ bloc, note }) => (
          <div key={bloc} className="stat-tile p-4">
            <h4 className={`mb-2 font-semibold ${getBlocTextColor(bloc)}`}>{bloc}</h4>
            <div className="font-display text-3xl tabular-nums">{blocCounts[bloc]}</div>
            <div className="text-xs text-muted-foreground">estados projetados</div>
            <div className="mt-2 text-xs text-muted-foreground">{note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
