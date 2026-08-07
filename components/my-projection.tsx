"use client"

import { ChangeIndicator } from "@/components/change-indicator"
import { PieChart } from "@/components/pie-chart"
import { ProjectionEditor } from "@/components/projection-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBlocSurfaceClass, getBlocTextColor } from "@/lib/bloc-utils"
import {
    BASE_PROJECTIONS,
    CURRENT_COMPOSITION,
    STATES_WITH_ELECTIONS,
    calculateAggregates,
    compositionPieSlices,
    type SeatChoice,
    type TaggedComposition,
    type UserProjections,
} from "@/lib/projection-data"
import { RotateCcw } from "lucide-react"
import { useCallback, useMemo, type Dispatch, type ReactNode, type SetStateAction } from "react"

interface MyProjectionProps {
  userProjections: UserProjections
  setUserProjections: Dispatch<SetStateAction<UserProjections>>
}

export function MyProjection({ userProjections, setUserProjections }: MyProjectionProps) {
  const handleProjectionChange = useCallback(
    (state: string, position: number, bloc: SeatChoice) => {
      setUserProjections((currentProjections) => {
        const current = currentProjections[state] ?? (["", ""] as const)
        const nextSeat: [SeatChoice | "", SeatChoice | ""] = [...current]
        nextSeat[position] = bloc
        return { ...currentProjections, [state]: nextSeat }
      })
    },
    [setUserProjections],
  )

  const resetProjections = useCallback(() => {
    setUserProjections({})
  }, [setUserProjections])

  const loadOriginalProjections = useCallback(() => {
    setUserProjections({ ...BASE_PROJECTIONS })
  }, [setUserProjections])

  const aggregates = useMemo(() => calculateAggregates(userProjections), [userProjections])
  const completedProjections = Object.values(userProjections).filter(
    (projections) => projections?.[0] && projections?.[1],
  ).length

  return (
    <div className="space-y-6">
      <Card className="campaign-panel">
        <CardHeader>
          <CardTitle>Minha Projeção para o Senado</CardTitle>
          <p className="text-sm text-muted-foreground">
            Faça suas próprias previsões para a composição completa do Senado Federal. Cada estado elege 2 senadores
            para um total de 81 assentos (27 estados × 3 senadores cada). Bolsonarista marca apoio direto de Flávio
            Bolsonaro — etiqueta dentro da Centro-Direita, não soma cadeira extra.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <ProjectionMetric label="Progresso">
              {completedProjections}/{STATES_WITH_ELECTIONS.length} estados completos
            </ProjectionMetric>
            <ProjectionMetric label="Posições projetadas">{aggregates.totalUserSeats}/54 vagas</ProjectionMetric>
            <ProjectionMetric label="Total final">{aggregates.totalFinalSeats}/81 senadores</ProjectionMetric>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadOriginalProjections}>
                Carregar Projeção Base
              </Button>
              <Button variant="outline" size="sm" onClick={resetProjections}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Limpar Tudo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="campaign-panel">
          <CardContent className="p-6">
            <PieChart title="Composição Atual do Senado" data={compositionPieSlices(CURRENT_COMPOSITION)} />
          </CardContent>
        </Card>
        <Card className="campaign-panel">
          <CardContent className="p-6">
            <PieChart title="Sua Projeção" data={compositionPieSlices(aggregates.finalComposition)} />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Etiqueta Bolsonarista: {aggregates.finalComposition.Bolsonarista} senadores (sobreposição, não cadeira
              extra)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {(Object.keys(aggregates.changes) as Array<keyof TaggedComposition>).map((bloc) => (
          <AggregateCard key={bloc} bloc={bloc} change={aggregates.changes[bloc]} aggregates={aggregates} />
        ))}
      </div>

      <ProjectionEditor userProjections={userProjections} onProjectionChange={handleProjectionChange} />

      {aggregates.totalUserSeats > 0 ? <ProjectionComparison aggregates={aggregates} /> : null}
    </div>
  )
}

function ProjectionMetric({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}:</span>
      <Badge variant="outline">{children}</Badge>
    </div>
  )
}

type Aggregates = ReturnType<typeof calculateAggregates>

function AggregateCard({
  bloc,
  change,
  aggregates,
}: {
  bloc: keyof TaggedComposition
  change: number
  aggregates: Aggregates
}) {
  return (
    <Card className={`campaign-panel border-2 ${getBlocSurfaceClass(bloc)}`}>
      <CardHeader className="pb-3">
        <CardTitle className={`text-lg ${getBlocTextColor(bloc)}`}>{bloc}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{bloc === "Bolsonarista" ? "Etiqueta atual:" : "Atual:"}</span>
            <span className="font-medium">{aggregates.current[bloc]}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{bloc === "Bolsonarista" ? "Etiqueta na projeção:" : "Sua projeção final:"}</span>
            <span className="font-medium">{aggregates.finalComposition[bloc]}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <span className="text-sm font-medium">Mudança:</span>
            <ChangeIndicator change={change} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectionComparison({ aggregates }: { aggregates: Aggregates }) {
  return (
    <Card className="campaign-panel">
      <CardHeader>
        <CardTitle>Comparação com Cenário Atual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CompositionList title="Senado Atual" values={aggregates.current} />
          <CompositionList title="Sua Projeção Final" values={aggregates.finalComposition} />
        </div>
      </CardContent>
    </Card>
  )
}

function CompositionList({ title, values }: { title: string; values: TaggedComposition }) {
  return (
    <div>
      <h4 className="mb-2 font-semibold">{title}</h4>
      <div className="space-y-1 text-sm">
        {(Object.entries(values) as Array<[keyof TaggedComposition, number]>).map(([bloc, value]) => (
          <div key={bloc}>
            {bloc}:{" "}
            <span className="font-medium">
              {value} {bloc === "Bolsonarista" ? "etiquetas" : "assentos"}
              {bloc === "Bolsonarista" ? "" : ` (${((value / 81) * 100).toFixed(1)}%)`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
