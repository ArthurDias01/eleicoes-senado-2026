"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getBlocColor, getBlocTextColor } from "@/lib/bloc-utils"
import { senateData } from "@/lib/senate-data"
import { Minus, RotateCcw, TrendingDown, TrendingUp } from "lucide-react"
import { useCallback, useMemo, useState } from "react"

interface MyProjectionProps {
  userProjections: Record<string, string[]>
  setUserProjections: (projections: Record<string, string[]>) => void
}


const originalProjections = {
  AC: ["Centro-Direita", "Centro-Direita"],
  AL: ["Centro-Esquerda", "Centro"],
  AP: ["Centro-Esquerda", "Centro"],
  AM: ["Centro-Direita", "Centro"],
  BA: ["Centro-Esquerda", "Centro"],
  CE: ["Centro-Esquerda", "Centro-Esquerda"],
  DF: ["Centro-Direita", "Centro-Direita"],
  ES: ["Centro-Direita", "Centro"],
  GO: ["Centro-Direita", "Centro-Esquerda"],
  MA: ["Centro-Esquerda", "Centro-Esquerda"],
  MT: ["Centro-Direita", "Centro"],
  MS: ["Centro-Direita", "Centro"],
  MG: ["Centro-Direita", "Centro"],
  PA: ["Centro-Esquerda", "Centro"],
  PB: ["Centro-Esquerda", "Centro"],
  PR: ["Centro-Direita", "Centro-Esquerda"],
  PE: ["Centro-Esquerda", "Centro"],
  PI: ["Centro-Direita", "Centro"],
  RJ: ["Centro-Direita", "Centro-Direita"],
  RN: ["Centro-Direita", "Centro"],
  RS: ["Centro-Direita", "Centro-Direita"],
  RO: ["Centro-Direita", "Centro"],
  RR: ["Centro-Direita", "Centro-Direita"],
  SC: ["Centro-Direita", "Centro"],
  SP: ["Centro-Direita", "Centro"],
  SE: ["Centro-Esquerda", "Centro"],
  TO: ["Centro-Esquerda", "Centro"],
}

interface PieChartProps {
  data: { label: string; value: number; color: string }[]
  title: string
}

function PieChart({ data, title }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (total === 0) {
    return (
      <div className="text-center">
        <h3 className="font-semibold mb-4">{title}</h3>
        <div className="w-48 h-48 mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full">
          <span className="text-gray-500 text-sm">Sem dados</span>
        </div>
      </div>
    )
  }

  let currentAngle = 0
  const radius = 80
  const centerX = 100
  const centerY = 100

  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle

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

    currentAngle += angle

    return {
      ...item,
      pathData,
      percentage: percentage.toFixed(1),
    }
  })

  return (
    <div className="text-center">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="relative">
        <svg width="200" height="200" className="mx-auto">
          {slices.map((slice, index) => (
            <path key={index} d={slice.pathData} fill={slice.color} stroke="white" strokeWidth="2" />
          ))}
        </svg>
        <div className="mt-4 space-y-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center justify-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }} />
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

export function MyProjection({ userProjections, setUserProjections }: MyProjectionProps) {
  const [selectedState, setSelectedState] = useState<string>("")

  // Get all states for senate elections (all 27 states)
  const statesWithElections = useMemo(() => senateData.states.map((state) => state.code).sort(), [])

  const handleProjectionChange = useCallback(
    (state: string, position: number, bloc: string) => {
      const newProjections = { ...userProjections }
      if (!newProjections[state]) {
        newProjections[state] = ["", ""]
      }
      newProjections[state] = [...newProjections[state]]
      newProjections[state][position] = bloc
      setUserProjections(newProjections)
    },
    [userProjections, setUserProjections],
  )

  const resetProjections = useCallback(() => {
    setUserProjections({})
  }, [setUserProjections])

  const loadOriginalProjections = useCallback(() => {
    setUserProjections(originalProjections)
  }, [setUserProjections])

  // Calculate aggregates - memoized for performance
  const aggregates = useMemo(() => {
    const currentComposition = { "Centro-Esquerda": 27, Centro: 25, "Centro-Direita": 29, Bolsonarista: 0 }

    // Count senators NOT up for reelection (those with termEnd !== "2027")
    const senatorsNotUpForReelection = { "Centro-Esquerda": 0, Centro: 0, "Centro-Direita": 0, Bolsonarista: 0 }
    senateData.senators
      .filter((senator) => senator.termEnd !== "2027")
      .forEach((senator) => {
        senatorsNotUpForReelection[senator.bloc as keyof typeof senatorsNotUpForReelection]++
        // Count bolsonaro-aligned senators separately (they can overlap with blocs)
        if (senator.bolsonaroAligned) {
          senatorsNotUpForReelection.Bolsonarista++
        }
      })

    // Count user projections (2 senators per state)
    const userProjectedSeats = { "Centro-Esquerda": 0, Centro: 0, "Centro-Direita": 0, Bolsonarista: 0 }
    Object.values(userProjections).forEach((stateProjections) => {
      stateProjections.forEach((bloc) => {
        if (bloc && userProjectedSeats[bloc as keyof typeof userProjectedSeats] !== undefined) {
          userProjectedSeats[bloc as keyof typeof userProjectedSeats]++
        }
      })
    })

    // Calculate final composition (senators not up for reelection + user projections)
    const finalComposition = {
      "Centro-Esquerda": senatorsNotUpForReelection["Centro-Esquerda"] + userProjectedSeats["Centro-Esquerda"],
      Centro: senatorsNotUpForReelection["Centro"] + userProjectedSeats["Centro"],
      "Centro-Direita": senatorsNotUpForReelection["Centro-Direita"] + userProjectedSeats["Centro-Direita"],
      Bolsonarista: senatorsNotUpForReelection["Bolsonarista"] + userProjectedSeats["Bolsonarista"],
    }

    return {
      current: currentComposition,
      senatorsNotUpForReelection,
      userProjectedSeats,
      finalComposition,
      changes: {
        "Centro-Esquerda": finalComposition["Centro-Esquerda"] - currentComposition["Centro-Esquerda"],
        Centro: finalComposition["Centro"] - currentComposition["Centro"],
        "Centro-Direita": finalComposition["Centro-Direita"] - currentComposition["Centro-Direita"],
        Bolsonarista: finalComposition["Bolsonarista"] - currentComposition["Bolsonarista"],
      },
      totalUserSeats: Object.values(userProjectedSeats).reduce((sum, count) => sum + count, 0),
      totalFinalSeats: Object.values(finalComposition).reduce((sum, count) => sum + count, 0),
    }
  }, [userProjections])

  const completedProjections = useMemo(() => {
    return Object.values(userProjections).filter(
      (projections) => projections.length === 2 && projections[0] && projections[1],
    ).length
  }, [userProjections])

  const totalElections = statesWithElections.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Minha Projeção para o Senado</CardTitle>
          <p className="text-sm text-gray-600">
            Faça suas próprias previsões para a composição completa do Senado Federal. Cada estado elege 2 senadores
            para um total de 81 assentos (27 estados × 3 senadores cada).
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Progresso:</span>
              <Badge variant="outline">
                {completedProjections}/{totalElections} estados completos
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Posições projetadas:</span>
              <Badge variant="outline">{aggregates.totalUserSeats}/54 vagas</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Total final:</span>
              <Badge variant="outline">{aggregates.totalFinalSeats}/81 senadores</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadOriginalProjections}>
                Carregar Projeção Base
              </Button>
              <Button variant="outline" size="sm" onClick={resetProjections}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Limpar Tudo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de Pizza */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <PieChart
              title="Composição Atual do Senado"
              data={[
                { label: "Centro-Esquerda", value: 27, color: "#ef4444" },
                { label: "Centro", value: 25, color: "#eab308" },
                { label: "Centro-Direita", value: 29, color: "#3b82f6" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <PieChart
              title="Sua Projeção"
              data={[
                { label: "Centro-Esquerda", value: aggregates.finalComposition["Centro-Esquerda"], color: "#ef4444" },
                { label: "Centro", value: aggregates.finalComposition["Centro"], color: "#eab308" },
                { label: "Centro-Direita", value: aggregates.finalComposition["Centro-Direita"], color: "#3b82f6" },
                { label: "Bolsonarista", value: aggregates.finalComposition["Bolsonarista"], color: "#22c55e" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Agregados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(aggregates.changes).map(([bloc, change]) => (
          <Card key={bloc} className={`border-2 ${getBlocColor(bloc)}`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-lg ${getBlocTextColor(bloc)}`}>{bloc}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Atual:</span>
                  <span className="font-medium">{aggregates.current[bloc as keyof typeof aggregates.current]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sua projeção final:</span>
                  <span className="font-medium">
                    {aggregates.finalComposition[bloc as keyof typeof aggregates.finalComposition]}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Mudança:</span>
                  <div className="flex items-center">
                    {change > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : change < 0 ? (
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    ) : (
                      <Minus className="w-4 h-4 text-gray-600 mr-1" />
                    )}
                    <span
                      className={`font-bold ${
                        change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      {change > 0 ? "+" : ""}
                      {change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seletor de Estado */}
      <Card>
        <CardHeader>
          <CardTitle>Fazer Projeção por Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Selecionar Estado</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um estado..." />
                </SelectTrigger>
                <SelectContent>
                  {statesWithElections.map((stateCode) => {
                    const state = senateData.states.find((s) => s.code === stateCode)
                    return (
                      <SelectItem key={stateCode} value={stateCode}>
                        {state?.name} ({stateCode})
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedState && (() => {
              const bolsonaristaCandidatesForState = senateData.senators.filter(
                (s) => s.state === selectedState && s.bolsonaroAligned && s.upForReelection
              )
              return (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">1º Senador - {selectedState}</label>
                    <Select
                      value={userProjections[selectedState]?.[0] || ""}
                      onValueChange={(value) => handleProjectionChange(selectedState, 0, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o bloco..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Centro-Esquerda">Centro-Esquerda</SelectItem>
                        <SelectItem value="Centro">Centro</SelectItem>
                        <SelectItem value="Centro-Direita">Centro-Direita</SelectItem>
                        {bolsonaristaCandidatesForState.length > 0 && (
                          <SelectItem value="Bolsonarista">Bolsonarista</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">2º Senador - {selectedState}</label>
                    <Select
                      value={userProjections[selectedState]?.[1] || ""}
                      onValueChange={(value) => handleProjectionChange(selectedState, 1, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o bloco..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Centro-Esquerda">Centro-Esquerda</SelectItem>
                        <SelectItem value="Centro">Centro</SelectItem>
                        <SelectItem value="Centro-Direita">Centro-Direita</SelectItem>
                        {bolsonaristaCandidatesForState.length > 0 && (
                          <SelectItem value="Bolsonarista">Bolsonarista</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Projeções */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Projeções por Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {statesWithElections.map((stateCode) => {
              const state = senateData.states.find((s) => s.code === stateCode)
              const userChoices = userProjections[stateCode] || ["", ""]
              const originalChoices = originalProjections[stateCode as keyof typeof originalProjections]
              
              // Get Bolsonarista candidates for this state
              const bolsonaristaCandidates = senateData.senators.filter(
                (s) => s.state === stateCode && s.bolsonaroAligned && s.upForReelection
              )

              return (
                <Card key={stateCode} className="p-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{state?.name}</h4>
                        <p className="text-xs text-gray-600">({stateCode})</p>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {userChoices.map(
                          (choice, index) =>
                            choice && (
                              <Badge
                                key={index}
                                className={`text-xs ${
                                  choice === "Centro-Esquerda"
                                    ? "bg-red-100 text-red-800"
                                    : choice === "Centro"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : choice === "Bolsonarista"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {choice === "Bolsonarista" ? "Bolsonarista" : choice.split("-")[1] || choice}
                              </Badge>
                            ),
                        )}
                      </div>
                    </div>
                    
                    {bolsonaristaCandidates.length > 0 && (
                      <div className="text-xs">
                        <span className="text-gray-500">Candidatos Bolsonaristas: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bolsonaristaCandidates.map((candidate) => (
                            <Badge
                              key={candidate.name}
                              variant="outline"
                              className="text-xs bg-green-50 text-green-700 border-green-300"
                            >
                              {candidate.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs space-y-1">
                      <div>
                        <span className="text-gray-500">Projeção base: </span>
                        <span className="font-medium">
                          {originalChoices[0]} + {originalChoices[1]}
                        </span>
                      </div>
                      {(userChoices[0] || userChoices[1]) && (
                        <div>
                          <span className="text-gray-500">Sua projeção: </span>
                          <span className="font-medium">
                            {userChoices[0] || "?"} + {userChoices[1] || "?"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-700">1º Senador:</div>
                      <div className="flex flex-wrap gap-1">
                        {["Centro-Esquerda", "Centro", "Centro-Direita"].map((bloc) => {
                          const bolsonaristaForBloc = bolsonaristaCandidates.filter(
                            (c) => c.bloc === bloc
                          )
                          return (
                            <div key={bloc} className="flex flex-col gap-1">
                              <Button
                                size="sm"
                                variant={userChoices[0] === bloc ? "default" : "outline"}
                                className={`text-xs px-2 py-1 ${
                                  userChoices[0] === bloc
                                    ? bloc === "Centro-Esquerda"
                                      ? "bg-red-600 hover:bg-red-700"
                                      : bloc === "Centro"
                                        ? "bg-yellow-600 hover:bg-yellow-700"
                                        : "bg-blue-600 hover:bg-blue-700"
                                    : ""
                                }`}
                                onClick={() => handleProjectionChange(stateCode, 0, bloc)}
                              >
                                {bloc.split("-")[1] || bloc}
                              </Button>
                              {bolsonaristaForBloc.length > 0 && userChoices[0] === bloc && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-green-50 text-green-700 border-green-300"
                                >
                                  {bolsonaristaForBloc.length} Bolsonarista{bolsonaristaForBloc.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                          )
                        })}
                        {bolsonaristaCandidates.length > 0 && (
                          <Button
                            size="sm"
                            variant={userChoices[0] === "Bolsonarista" ? "default" : "outline"}
                            className={`text-xs px-2 py-1 ${
                              userChoices[0] === "Bolsonarista"
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : ""
                            }`}
                            onClick={() => handleProjectionChange(stateCode, 0, "Bolsonarista")}
                          >
                            Bolsonarista
                          </Button>
                        )}
                      </div>

                      <div className="text-xs font-medium text-gray-700">2º Senador:</div>
                      <div className="flex flex-wrap gap-1">
                        {["Centro-Esquerda", "Centro", "Centro-Direita"].map((bloc) => {
                          const bolsonaristaForBloc = bolsonaristaCandidates.filter(
                            (c) => c.bloc === bloc
                          )
                          return (
                            <div key={bloc} className="flex flex-col gap-1">
                              <Button
                                size="sm"
                                variant={userChoices[1] === bloc ? "default" : "outline"}
                                className={`text-xs px-2 py-1 ${
                                  userChoices[1] === bloc
                                    ? bloc === "Centro-Esquerda"
                                      ? "bg-red-600 hover:bg-red-700"
                                      : bloc === "Centro"
                                        ? "bg-yellow-600 hover:bg-yellow-700"
                                        : "bg-blue-600 hover:bg-blue-700"
                                    : ""
                                }`}
                                onClick={() => handleProjectionChange(stateCode, 1, bloc)}
                              >
                                {bloc.split("-")[1] || bloc}
                              </Button>
                              {bolsonaristaForBloc.length > 0 && userChoices[1] === bloc && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-green-50 text-green-700 border-green-300"
                                >
                                  {bolsonaristaForBloc.length} Bolsonarista{bolsonaristaForBloc.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                          )
                        })}
                        {bolsonaristaCandidates.length > 0 && (
                          <Button
                            size="sm"
                            variant={userChoices[1] === "Bolsonarista" ? "default" : "outline"}
                            className={`text-xs px-2 py-1 ${
                              userChoices[1] === "Bolsonarista"
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : ""
                            }`}
                            onClick={() => handleProjectionChange(stateCode, 1, "Bolsonarista")}
                          >
                            Bolsonarista
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comparação com Cenário Atual */}
      {aggregates.totalUserSeats > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparação com Cenário Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Senado Atual</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      Centro-Esquerda: <span className="font-medium">27 assentos (33.3%)</span>
                    </div>
                    <div>
                      Centro: <span className="font-medium">25 assentos (30.9%)</span>
                    </div>
                    <div>
                      Centro-Direita: <span className="font-medium">29 assentos (35.8%)</span>
                    </div>
                    <div>
                      Bolsonarista: <span className="font-medium">0 assentos (0%)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Sua Projeção Final</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      Centro-Esquerda:{" "}
                      <span className="font-medium">
                        {aggregates.finalComposition["Centro-Esquerda"]} assentos (
                        {((aggregates.finalComposition["Centro-Esquerda"] / 81) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div>
                      Centro:{" "}
                      <span className="font-medium">
                        {aggregates.finalComposition["Centro"]} assentos (
                        {((aggregates.finalComposition["Centro"] / 81) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div>
                      Centro-Direita:{" "}
                      <span className="font-medium">
                        {aggregates.finalComposition["Centro-Direita"]} assentos (
                        {((aggregates.finalComposition["Centro-Direita"] / 81) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div>
                      Bolsonarista:{" "}
                      <span className="font-medium">
                        {aggregates.finalComposition["Bolsonarista"]} assentos (
                        {((aggregates.finalComposition["Bolsonarista"] / 81) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
