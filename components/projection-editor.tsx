"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBlocColor, getBlocSelectedButtonClass } from "@/lib/bloc-utils"
import {
    BASE_PROJECTIONS,
    BLOCS,
    STATES_WITH_ELECTIONS,
    createBolsonaristaByState,
    type SeatChoice,
    type SeatPair,
    type UserProjections,
} from "@/lib/projection-data"
import { senateData } from "@/lib/senate-data"
import { useMemo } from "react"

type ProjectionEditorProps = {
  userProjections: UserProjections
  onProjectionChange: (state: string, position: number, bloc: SeatChoice) => void
}

export function ProjectionEditor({ userProjections, onProjectionChange }: ProjectionEditorProps) {
  const bolsonaristaByState = useMemo(() => createBolsonaristaByState(), [])
  const stateNameByCode = useMemo(
    () => new Map(senateData.states.map((state) => [state.code, state.name])),
    [],
  )

  return (
    <Card className="campaign-panel">
      <CardHeader>
        <CardTitle>Suas Projeções por Estado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="campaign-grid grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {STATES_WITH_ELECTIONS.map((stateCode) => (
            <ProjectionState
              key={stateCode}
              stateCode={stateCode}
              stateName={stateNameByCode.get(stateCode) ?? stateCode}
              userProjections={userProjections}
              candidates={bolsonaristaByState.get(stateCode) ?? []}
              onProjectionChange={onProjectionChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectionState({
  stateCode,
  stateName,
  userProjections,
  candidates,
  onProjectionChange,
}: {
  stateCode: string
  stateName: string
  userProjections: UserProjections
  candidates: typeof senateData.senators
  onProjectionChange: (state: string, position: number, bloc: SeatChoice) => void
}) {
  const userChoices = userProjections[stateCode] ?? (["", ""] as const)
  const originalChoices = BASE_PROJECTIONS[stateCode]

  return (
    <Card className="p-3">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate font-semibold">{stateName}</h4>
            <p className="text-xs text-muted-foreground">({stateCode})</p>
          </div>
          <div className="flex flex-wrap justify-end gap-1">
            {userChoices.map((choice, seat) =>
              choice ? (
                <Badge key={`${stateCode}-${choice}-${seat}`} variant="outline" className={`text-xs ${getBlocColor(choice)}`}>
                  {choice === "Bolsonarista" ? "Bolsonarista" : choice.split("-")[1] || choice}
                </Badge>
              ) : null,
            )}
          </div>
        </div>

        {candidates.length > 0 ? (
          <div className="text-xs">
            <span className="text-muted-foreground">Apoiados por Flávio Bolsonaro: </span>
            <div className="mt-1 flex flex-wrap gap-1">
              {candidates.map((candidate) => (
                <Badge
                  key={candidate.name}
                  variant="outline"
                  className={`text-xs ${getBlocColor("Bolsonarista")}`}
                >
                  {candidate.name}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-1 text-xs">
          <div>
            <span className="text-muted-foreground">Projeção base: </span>
            <span className="font-medium">
              {originalChoices[0]} + {originalChoices[1]}
            </span>
          </div>
          {userChoices[0] || userChoices[1] ? (
            <div>
              <span className="text-muted-foreground">Sua projeção: </span>
              <span className="font-medium">
                {userChoices[0] || "?"} + {userChoices[1] || "?"}
              </span>
            </div>
          ) : null}
        </div>

        <SeatButtons
          seat={0}
          stateCode={stateCode}
          userChoice={userChoices[0]}
          candidates={candidates}
          onProjectionChange={onProjectionChange}
        />
        <SeatButtons
          seat={1}
          stateCode={stateCode}
          userChoice={userChoices[1]}
          candidates={candidates}
          onProjectionChange={onProjectionChange}
        />
      </div>
    </Card>
  )
}

function SeatButtons({
  seat,
  stateCode,
  userChoice,
  candidates,
  onProjectionChange,
}: {
  seat: number
  stateCode: string
  userChoice: SeatPair[number]
  candidates: typeof senateData.senators
  onProjectionChange: (state: string, position: number, bloc: SeatChoice) => void
}) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground">{seat + 1}º Senador:</div>
      <div className="flex flex-wrap gap-1">
        {BLOCS.map((bloc) => {
          const bolsonaristaForBloc = candidates.filter((candidate) => candidate.bloc === bloc)
          const isSelected = userChoice === bloc

          return (
            <div key={bloc} className="flex flex-col gap-1">
              <Button
                size="sm"
                variant={isSelected ? "default" : "outline"}
                className={`px-2 py-1 text-xs ${isSelected ? getBlocSelectedButtonClass(bloc) : ""}`}
                onClick={() => onProjectionChange(stateCode, seat, bloc)}
              >
                {bloc.split("-")[1] || bloc}
              </Button>
              {bolsonaristaForBloc.length > 0 && isSelected ? (
                <Badge variant="outline" className="border-bolso/35 bg-bolso/12 text-[10px] text-bolso-soft">
                  {bolsonaristaForBloc.length} Bolsonarista{bolsonaristaForBloc.length > 1 ? "s" : ""}
                </Badge>
              ) : null}
            </div>
          )
        })}
        {candidates.length > 0 ? (
          <Button
            size="sm"
            variant={userChoice === "Bolsonarista" ? "default" : "outline"}
            className={`px-2 py-1 text-xs ${
              userChoice === "Bolsonarista" ? getBlocSelectedButtonClass("Bolsonarista") : ""
            }`}
            onClick={() => onProjectionChange(stateCode, seat, "Bolsonarista")}
          >
            Bolsonarista
          </Button>
        ) : null}
      </div>
    </div>
  )
}
