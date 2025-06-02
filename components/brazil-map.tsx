"use client"

import { Card } from "@/components/ui/card"

const stateProjections = {
  AC: "Centro-Direita",
  AL: "Centro-Esquerda",
  AP: "Centro-Esquerda",
  AM: "Centro-Direita",
  BA: "Centro-Esquerda",
  CE: "Centro-Esquerda",
  DF: "Centro-Direita",
  ES: "Centro-Direita",
  GO: "Centro-Direita",
  MA: "Centro-Esquerda",
  MT: "Centro-Direita",
  MS: "Centro-Direita",
  MG: "Centro-Direita",
  PA: "Centro-Esquerda",
  PB: "Centro-Esquerda",
  PR: "Centro-Direita",
  PE: "Centro-Esquerda",
  PI: "Centro-Direita",
  RJ: "Centro-Direita",
  RN: "Centro-Direita",
  RS: "Centro-Direita",
  RO: "Centro-Direita",
  RR: "Centro-Direita",
  SC: "Centro-Direita",
  SP: "Centro-Direita",
  SE: "Centro-Esquerda",
  TO: "Centro-Esquerda",
}

const getBlocColor = (bloc: string) => {
  switch (bloc) {
    case "Centro-Esquerda":
      return "bg-red-500"
    case "Centro":
      return "bg-yellow-500"
    case "Centro-Direita":
      return "bg-blue-500"
    default:
      return "bg-gray-300"
  }
}

const getBlocTextColor = (bloc: string) => {
  switch (bloc) {
    case "Centro-Esquerda":
      return "text-red-700"
    case "Centro":
      return "text-yellow-700"
    case "Centro-Direita":
      return "text-blue-700"
    default:
      return "text-gray-700"
  }
}

export function BrazilMap() {
  const blocCounts = Object.values(stateProjections).reduce(
    (acc, bloc) => {
      acc[bloc] = (acc[bloc] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm">Centro-Esquerda ({blocCounts["Centro-Esquerda"] || 0})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm">Centro ({blocCounts["Centro"] || 0})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm">Centro-Direita ({blocCounts["Centro-Direita"] || 0})</span>
        </div>
      </div>

      {/* Simplified State Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {Object.entries(stateProjections).map(([state, bloc]) => (
          <Card key={state} className="p-3 text-center hover:shadow-md transition-shadow">
            <div className={`w-8 h-8 mx-auto mb-2 rounded ${getBlocColor(bloc)}`}></div>
            <div className="font-bold text-sm">{state}</div>
            <div className={`text-xs ${getBlocTextColor(bloc)}`}>{bloc.split("-")[1] || bloc}</div>
          </Card>
        ))}
      </div>

      {/* Regional Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold text-red-700 mb-2">Centro-Esquerda</h4>
          <div className="text-2xl font-bold text-red-600 mb-1">{blocCounts["Centro-Esquerda"] || 0}</div>
          <div className="text-xs text-gray-600">estados projetados</div>
          <div className="mt-2 text-xs">Forte no Nordeste e Norte</div>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold text-yellow-700 mb-2">Centro</h4>
          <div className="text-2xl font-bold text-yellow-600 mb-1">{blocCounts["Centro"] || 0}</div>
          <div className="text-xs text-gray-600">estados projetados</div>
          <div className="mt-2 text-xs">Perda significativa de espaço</div>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold text-blue-700 mb-2">Centro-Direita</h4>
          <div className="text-2xl font-bold text-blue-600 mb-1">{blocCounts["Centro-Direita"] || 0}</div>
          <div className="text-xs text-gray-600">estados projetados</div>
          <div className="mt-2 text-xs">Domínio no Sul, Sudeste e Centro-Oeste</div>
        </Card>
      </div>
    </div>
  )
}
