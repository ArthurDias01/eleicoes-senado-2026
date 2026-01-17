"use client"

import { BlocChart } from "@/components/bloc-chart"
import { BrazilMap } from "@/components/brazil-map"
import { MyProjection } from "@/components/my-projection"
import { ProjectionChart } from "@/components/projection-chart"
import { SenatorCard } from "@/components/senator-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { senateData } from "@/lib/senate-data"
import { Filter, GithubIcon, Minus, Search, TrendingDown, TrendingUp } from "lucide-react"
import { useMemo, useState } from "react"

export default function SenateDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBloc, setSelectedBloc] = useState<string>("all")
  const [selectedState, setSelectedState] = useState<string>("all")
  const [userProjections, setUserProjections] = useState<Record<string, string[]>>({})

  const filteredSenators = useMemo(() => {
    return senateData.senators.filter((senator) => {
      const matchesSearch =
        senator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        senator.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
        senator.state.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBloc = selectedBloc === "all" || senator.bloc === selectedBloc
      const matchesState = selectedState === "all" || senator.state === selectedState

      return matchesSearch && matchesBloc && matchesState
    })
  }, [searchTerm, selectedBloc, selectedState])

  const currentComposition = {
    "Centro-Esquerda": 27,
    Centro: 25,
    "Centro-Direita": 29,
  }

  const projectedComposition = {
    "Centro-Esquerda": 17,
    Centro: 10,
    "Centro-Direita": 54,
  }

  const changes = {
    "Centro-Esquerda": -10,
    Centro: -15,
    "Centro-Direita": 25,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Análise do Senado Federal 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dashboard interativo para análise das eleições do Senado Federal brasileiro de 2026, incluindo composição
            atual, projeções e análise estratégica por blocos políticos.
          </p>
          <div className="text-sm text-gray-600 flex items-center justify-center flex-row">
            Feito por{" "}
            <a
              href="https://github.com/ArthurDias01"
              className="underline ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arthur Dias
            </a>
            <a
              href="https://github.com/ArthurDias01/eleicoes-senado-2026/blob/main/lib/senate-data.ts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Senadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">81</div>
              <p className="text-xs text-gray-500">3 por estado + DF</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Vagas em Disputa 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">54</div>
              <p className="text-xs text-gray-500">2 por estado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Centro-Direita Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">29</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +25 projetado
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Centro-Esquerda Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">27</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="w-3 h-3 mr-1" />
                -10 projetado
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="current">Composição Atual</TabsTrigger>
            <TabsTrigger value="projections">Projeções 2026</TabsTrigger>
            <TabsTrigger value="my-projection">Minha Projeção</TabsTrigger>
            <TabsTrigger value="senators">Senadores</TabsTrigger>
            <TabsTrigger value="analysis">Análise</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Composição Atual vs Projetada</CardTitle>
                </CardHeader>
                <CardContent>
                  <BlocChart current={currentComposition} projected={projectedComposition} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mudanças Projetadas por Bloco</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(changes).map(([bloc, change]) => (
                      <div key={bloc} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium">{bloc}</span>
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mapa do Brasil - Projeção 2026</CardTitle>
                <p className="text-sm text-gray-600">
                  Visualização dos blocos políticos dominantes por estado após as eleições de 2026
                </p>
              </CardHeader>
              <CardContent>
                <BrazilMap />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="current" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição Atual por Blocos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
                    <div className="text-2xl font-bold text-red-700">27</div>
                    <div className="text-sm font-medium text-red-600">Centro-Esquerda</div>
                    <div className="text-xs text-red-500">33.3% do Senado</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-700">25</div>
                    <div className="text-sm font-medium text-yellow-600">Centro</div>
                    <div className="text-xs text-yellow-500">30.9% do Senado</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">29</div>
                    <div className="text-sm font-medium text-blue-600">Centro-Direita</div>
                    <div className="text-xs text-blue-500">35.8% do Senado</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projeções Pós-Eleição 2026</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectionChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">Centro-Esquerda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Atual:</span>
                      <span className="font-bold">27 assentos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projetado:</span>
                      <span className="font-bold">17 assentos</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Mudança:</span>
                      <span className="font-bold">-10 assentos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-700">Centro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Atual:</span>
                      <span className="font-bold">25 assentos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projetado:</span>
                      <span className="font-bold">10 assentos</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Mudança:</span>
                      <span className="font-bold">-15 assentos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Centro-Direita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Atual:</span>
                      <span className="font-bold">29 assentos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projetado:</span>
                      <span className="font-bold">54 assentos</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Mudança:</span>
                      <span className="font-bold">+25 assentos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="senators" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros e Busca</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar senador, partido ou estado..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedBloc} onValueChange={setSelectedBloc}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por bloco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os blocos</SelectItem>
                      <SelectItem value="Centro-Esquerda">Centro-Esquerda</SelectItem>
                      <SelectItem value="Centro">Centro</SelectItem>
                      <SelectItem value="Centro-Direita">Centro-Direita</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os estados</SelectItem>
                      {senateData.states.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.name} ({state.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedBloc("all")
                      setSelectedState("all")
                    }}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Senators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSenators.map((senator) => (
                <SenatorCard key={`${senator.name}-${senator.state}`} senator={senator} />
              ))}
            </div>

            {filteredSenators.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">Nenhum senador encontrado com os filtros aplicados.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Centro-Direita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Estratégia Defensiva
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Defende menos assentos, em estados favoráveis. Vai tomar cadeiras da esquerda e do centro nos
                      estados que votaram em Bolsonaro.
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Oportunidades:</strong> Estados do Sul, Sudeste e Centro-Oeste
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">Centro-Esquerda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      Posição Vulnerável
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Muitas cadeiras em estados que votaram em Bolsonaro. Oportunidades de crescimento no Nordeste.
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Fortalezas:</strong> Nordeste e alguns estados do Norte
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-700">Centro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Maior Pressão
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Perde cadeiras para ambos os blocos. Candidatos com mais chance se aliando a Lula onde a esquerda
                      não tem candidato viável.
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Estratégia:</strong> Alianças regionais estratégicas
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">O que significa "BOLSONARISTA"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Definição Política
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Um senador é considerado <strong>(Bolsonarista)</strong> quando se identifica com o
                    bolsonarismo, movimento político associado ao ex-presidente Jair Bolsonaro. Esta posição vai além de
                    simples apoio político e envolve um conjunto de crenças, práticas e discursos específicos.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-800">Principais características:</h4>
                    <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                      <li>
                        <strong>Conservadorismo social:</strong> Defesa de valores tradicionais (família, religião) e
                        moral conservadora
                      </li>
                      <li>
                        <strong>Retórica antissistema:</strong> Crítica ao establishment político e partidos
                        tradicionais
                      </li>
                      <li>
                        <strong>Nacionalismo e militarismo:</strong> Valorização de símbolos nacionais e presença
                        militar na política
                      </li>
                      <li>
                        <strong>Negacionismo:</strong> Questionamento de consensos científicos e eleitorais, uso de
                        teorias da conspiração
                      </li>
                      <li>
                        <strong>Culto à personalidade:</strong> Forte identificação com a liderança de Jair Bolsonaro
                      </li>
                    </ul>
                  </div>
                  <div className="text-xs text-gray-500 pt-2 border-t">
                    <strong>Critérios para a tag:</strong> Senadores que apoiam publicamente Bolsonaro, defendem políticas
                    alinhadas ao bolsonarismo, ou participam de grupos e manifestações bolsonaristas.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estados-Chave para 2026</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Favoráveis ao Centro-Direita</h4>
                    <div className="space-y-1 text-sm">
                      <div>• São Paulo - Maior colégio eleitoral</div>
                      <div>• Rio de Janeiro - Influência nacional</div>
                      <div>• Minas Gerais - Estado-pêndulo</div>
                      <div>• Rio Grande do Sul - Base conservadora</div>
                      <div>• Santa Catarina - Tendência direita</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Favoráveis ao Centro-Esquerda</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Bahia - Maior estado nordestino</div>
                      <div>• Pernambuco - Base histórica</div>
                      <div>• Ceará - Liderança regional</div>
                      <div>• Maranhão - Influência local</div>
                      <div>• Pará - Norte estratégico</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="my-projection" className="space-y-6">
            <MyProjection userProjections={userProjections} setUserProjections={setUserProjections} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
