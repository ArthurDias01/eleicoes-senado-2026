"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, RotateCcw } from "lucide-react"
import { senateData } from "@/lib/senate-data"

interface MyProjectionProps {
  userProjections: Record<string, string>
  setUserProjections: (projections: Record<string, string>) => void
}

const originalProjections = {
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

export function MyProjection({ userProjections, setUserProjections }: MyProjectionProps) {
  const [selectedState, setSelectedState] = useState<string>("")

  // Estados com vagas em disputa em 2026 (senadores com mandato terminando em 2027)
  const statesWithElections = senateData.senators
    .filter((senator) => senator.termEnd === "2027")
    .map((senator) => senator.state)
    .filter((state, index, self) => self.indexOf(state) === index)
    .sort()

  const handleProjectionChange = (state: string, bloc: string) => {
    setUserProjections({
      ...userProjections,
      [state]: bloc,
    })
  }

  const resetProjections = () => {
    setUserProjections({})
  }

  const loadOriginalProjections = () => {
    const filteredOriginal: Record<string, string> = {}
    statesWithElections.forEach((state) => {
      filteredOriginal[state] = originalProjections[state as keyof typeof originalProjections]
    })
    setUserProjections(filteredOriginal)
  }

  // Calcular agregados
  const calculateAggregates = () => {
    const currentComposition = { "Centro-Esquerda": 0, Centro: 0, "Centro-Direita": 0 }
    const userComposition = { "Centro-Esquerda": 0, Centro: 0, "Centro-Direita": 0 }

    // Contar composição atual dos senadores que disputam reeleição
    statesWithElections.forEach((state) => {
      const currentSenator = senateData.senators.find((s) => s.state === state && s.termEnd === "2027")
      if (currentSenator) {
        currentComposition[currentSenator.bloc as keyof typeof currentComposition]++
      }
    })

    // Contar projeção do usuário
    statesWithElections.forEach((state) => {
      const userChoice = userProjections[state]
      if (userChoice) {
        userComposition[userChoice as keyof typeof userComposition]++
      }
    })

    return {
      current: currentComposition,
      user: userComposition,
      changes: {
        "Centro-Esquerda": userComposition["Centro-Esquerda"] - currentComposition["Centro-Esquerda"],
        Centro: userComposition["Centro"] - currentComposition["Centro"],
        "Centro-Direita": userComposition["Centro-Direita"] - currentComposition["Centro-Direita"],
      },
    }
  }

  const aggregates = calculateAggregates()
  const completedProjections = Object.keys(userProjections).length
  const totalElections = statesWithElections.length

  const getBlocColor = (bloc: string) => {
    switch (bloc) {
      case "Centro-Esquerda":
        return "border-red-200 bg-red-50"
      case "Centro":
        return "border-yellow-200 bg-yellow-50"
      case "Centro-Direita":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Minha Projeção para 2026</CardTitle>
          <p className="text-sm text-gray-600">
            Faça suas próprias previsões para as 27 vagas do Senado em disputa em 2026. Cada estado elegerá 1 senador.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Progresso:</span>
              <Badge variant="outline">
                {completedProjections}/{totalElections} estados
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadOriginalProjections}>
                Carregar Projeção Original
              </Button>
              <Button variant="outline" size="sm" onClick={resetProjections}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Limpar Tudo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agregados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(aggregates.changes).map(([bloc, change]) => (
          <Card key={bloc} className={getBlocColor(bloc)}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-lg ${getBlocTextColor(bloc)}`}>{bloc}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Atual (disputas):</span>
                  <span className="font-medium">{aggregates.current[bloc as keyof typeof aggregates.current]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sua projeção:</span>
                  <span className="font-medium">{aggregates.user[bloc as keyof typeof aggregates.user]}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Selecionar Estado</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um estado..." />
                </SelectTrigger>
                <SelectContent>
                  {statesWithElections.map((stateCode) => {
                    const state = senateData.states.find((s) => s.code === stateCode)
                    const currentSenator = senateData.senators.find(
                      (s) => s.state === stateCode && s.termEnd === "2027",
                    )
                    return (
                      <SelectItem key={stateCode} value={stateCode}>
                        {state?.name} ({stateCode}) - Atual: {currentSenator?.name} ({currentSenator?.bloc})
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedState && (
              <div>
                <label className="text-sm font-medium mb-2 block">Projeção para {selectedState}</label>
                <Select
                  value={userProjections[selectedState] || ""}
                  onValueChange={(value) => handleProjectionChange(selectedState, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o bloco vencedor..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Centro-Esquerda">Centro-Esquerda</SelectItem>
                    <SelectItem value="Centro">Centro</SelectItem>
                    <SelectItem value="Centro-Direita">Centro-Direita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
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
              const currentSenator = senateData.senators.find((s) => s.state === stateCode && s.termEnd === "2027")
              const userChoice = userProjections[stateCode]
              const originalChoice = originalProjections[stateCode as keyof typeof originalProjections]

              return (
                <Card key={stateCode} className="p-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{state?.name}</h4>
                        <p className="text-xs text-gray-600">({stateCode})</p>
                      </div>
                      {userChoice && (
                        <Badge
                          className={`text-xs ${
                            userChoice === "Centro-Esquerda"
                              ? "bg-red-100 text-red-800"
                              : userChoice === "Centro"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {userChoice.split("-")[1] || userChoice}
                        </Badge>
                      )}
                    </div>

                    <div className="text-xs space-y-1">
                      <div>
                        <span className="text-gray-500">Atual: </span>
                        <span className="font-medium">
                          {currentSenator?.name} ({currentSenator?.bloc})
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Projeção original: </span>
                        <span className="font-medium">{originalChoice}</span>
                      </div>
                      {userChoice && (
                        <div>
                          <span className="text-gray-500">Sua projeção: </span>
                          <span className="font-medium">{userChoice}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-1">
                      {["Centro-Esquerda", "Centro", "Centro-Direita"].map((bloc) => (
                        <Button
                          key={bloc}
                          size="sm"
                          variant={userChoice === bloc ? "default" : "outline"}
                          className={`text-xs px-2 py-1 ${
                            userChoice === bloc
                              ? bloc === "Centro-Esquerda"
                                ? "bg-red-600 hover:bg-red-700"
                                : bloc === "Centro"
                                  ? "bg-yellow-600 hover:bg-yellow-700"
                                  : "bg-blue-600 hover:bg-blue-700"
                              : ""
                          }`}
                          onClick={() => handleProjectionChange(stateCode, bloc)}
                        >
                          {bloc.split("-")[1] || bloc}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comparação com Projeção Original */}
      {completedProjections > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparação com Projeção Original</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Projeção Original</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      Centro-Esquerda: <span className="font-medium">17 assentos</span>
                    </div>
                    <div>
                      Centro: <span className="font-medium">10 assentos</span>
                    </div>
                    <div>
                      Centro-Direita: <span className="font-medium">54 assentos</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Sua Projeção</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      Centro-Esquerda:{" "}
                      <span className="font-medium">
                        {27 - aggregates.current["Centro-Esquerda"] + aggregates.user["Centro-Esquerda"]} assentos
                      </span>
                    </div>
                    <div>
                      Centro:{" "}
                      <span className="font-medium">
                        {25 - aggregates.current["Centro"] + aggregates.user["Centro"]} assentos
                      </span>
                    </div>
                    <div>
                      Centro-Direita:{" "}
                      <span className="font-medium">
                        {29 - aggregates.current["Centro-Direita"] + aggregates.user["Centro-Direita"]} assentos
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
