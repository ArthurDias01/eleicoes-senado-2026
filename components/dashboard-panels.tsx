"use client"

import { BlocChart } from "@/components/bloc-chart"
import { BrazilMap } from "@/components/brazil-map"
import { ChangeIndicator } from "@/components/change-indicator"
import { ProjectionChart } from "@/components/projection-chart"
import { SenatorCard } from "@/components/senator-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getBlocColor, getBlocSurfaceClass, getBlocTextColor } from "@/lib/bloc-utils"
import {
    BLOCS,
    COMPOSITION_CHANGES,
    CURRENT_COMPOSITION,
    PROJECTED_COMPOSITION,
} from "@/lib/projection-data"
import { senateData } from "@/lib/senate-data"
import { Filter, Search } from "lucide-react"
import { useMemo, useState } from "react"

export function OverviewPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="campaign-panel">
          <CardHeader>
            <CardTitle>Composição Atual vs Projetada</CardTitle>
          </CardHeader>
          <CardContent>
            <BlocChart current={CURRENT_COMPOSITION} projected={PROJECTED_COMPOSITION} />
          </CardContent>
        </Card>

        <Card className="campaign-panel">
          <CardHeader>
            <CardTitle>Mudanças Projetadas por Bloco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(COMPOSITION_CHANGES).map(([bloc, change]) => (
                <div key={bloc} className="stat-tile flex items-center justify-between p-3">
                  <span className="font-medium">{bloc}</span>
                  <ChangeIndicator change={change} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="campaign-panel">
        <CardHeader>
          <CardTitle>Mapa do Brasil — Projeção 2026</CardTitle>
          <p className="text-sm text-muted-foreground">
            Visualização dos blocos políticos dominantes por estado após as eleições de 2026
          </p>
        </CardHeader>
        <CardContent>
          <BrazilMap />
        </CardContent>
      </Card>
    </div>
  )
}

export function CurrentPanel() {
  return (
    <Card className="campaign-panel">
      <CardHeader>
        <CardTitle>Distribuição Atual por Blocos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BLOCS.map((bloc) => {
            const seats = CURRENT_COMPOSITION[bloc]

            return (
              <div key={bloc} className={`rounded-lg border p-4 text-center ${getBlocSurfaceClass(bloc)}`}>
                <div className="font-display text-3xl tabular-nums">{seats}</div>
                <div className="text-sm font-medium">{bloc}</div>
                <div className="text-xs opacity-80">{((seats / 81) * 100).toFixed(1)}% do Senado</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProjectionsPanel() {
  return (
    <div className="space-y-6">
      <Card className="campaign-panel">
        <CardHeader>
          <CardTitle>Projeções Pós-Eleição 2026</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectionChart />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {BLOCS.map((bloc) => (
          <ProjectionSummary
            key={bloc}
            title={bloc}
            current={CURRENT_COMPOSITION[bloc]}
            projected={PROJECTED_COMPOSITION[bloc]}
            change={COMPOSITION_CHANGES[bloc]}
            tone={getBlocTextColor(bloc)}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectionSummary({
  title,
  current,
  projected,
  change,
  tone,
}: {
  title: string
  current: number
  projected: number
  change: number
  tone: string
}) {
  return (
    <Card className="campaign-panel">
      <CardHeader>
        <CardTitle className={tone}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 tabular-nums">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Atual</span>
            <span className="font-bold">{current} assentos</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Projetado</span>
            <span className="font-bold">{projected} assentos</span>
          </div>
          <div className="flex justify-between border-t border-line pt-2">
            <span>Mudança:</span>
            <ChangeIndicator change={change} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SenatorsPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBloc, setSelectedBloc] = useState("all")
  const [selectedState, setSelectedState] = useState("all")

  const filteredSenators = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase()

    return senateData.senators.filter((senator) => {
      const matchesSearch =
        senator.name.toLowerCase().includes(normalizedSearch) ||
        senator.party.toLowerCase().includes(normalizedSearch) ||
        senator.state.toLowerCase().includes(normalizedSearch)
      const matchesBloc = selectedBloc === "all" || senator.bloc === selectedBloc
      const matchesState = selectedState === "all" || senator.state === selectedState

      return matchesSearch && matchesBloc && matchesState
    })
  }, [searchTerm, selectedBloc, selectedState])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedBloc("all")
    setSelectedState("all")
  }

  return (
    <div className="space-y-6">
      <Card className="campaign-panel">
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
          <p className="text-sm text-muted-foreground">
            {filteredSenators.length} de {senateData.senators.length} senadores
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                name="senator-search"
                aria-label="Buscar senador, partido ou estado"
                placeholder="Buscar senador, partido ou estado…"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedBloc} onValueChange={setSelectedBloc}>
              <SelectTrigger aria-label="Filtrar por bloco">
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
              <SelectTrigger aria-label="Filtrar por estado">
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

            <Button variant="outline" onClick={clearFilters}>
              <Filter className="h-4 w-4" aria-hidden="true" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="campaign-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSenators.map((senator) => (
          <SenatorCard key={`${senator.name}-${senator.state}`} senator={senator} />
        ))}
      </div>

      {filteredSenators.length === 0 ? (
        <Card className="campaign-panel">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Nenhum senador encontrado com os filtros aplicados.</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export function AnalysisPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <StrategyCard
          title="Centro-Direita"
          badge="Estratégia Defensiva"
          description="Defende menos assentos, em estados favoráveis. Vai tomar cadeiras da esquerda e do centro nos estados que votaram em Bolsonaro."
          detail="Oportunidades: Estados do Sul, Sudeste e Centro-Oeste"
        />
        <StrategyCard
          title="Centro-Esquerda"
          badge="Posição Vulnerável"
          description="Muitas cadeiras em estados que votaram em Bolsonaro. Oportunidades de crescimento no Nordeste."
          detail="Fortalezas: Nordeste e alguns estados do Norte"
        />
        <StrategyCard
          title="Centro"
          badge="Maior Pressão"
          description="Perde cadeiras para ambos os blocos. Candidatos com mais chance se aliando a Lula onde a esquerda não tem candidato viável."
          detail="Estratégia: Alianças regionais estratégicas"
        />
      </div>

      <Card className="campaign-panel">
        <CardHeader>
          <CardTitle className="text-bolso-soft">O que significa &quot;BOLSONARISTA&quot;</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Badge variant="outline" className={getBlocColor("Bolsonarista")}>
              Apoio direto
            </Badge>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A etiqueta <strong>Bolsonarista</strong> identifica candidatos ao Senado em 2026 com{" "}
              <strong>apoio direto de Flávio Bolsonaro</strong> (PL), pré-candidato à Presidência. Não é uma
              classificação ideológica genérica: reflete quem entrou na lista de apoiados pela campanha presidencial
              bolsonarista.
            </p>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-ink">Como aparece no radar:</h4>
              <ul className="list-inside list-disc space-y-1 text-xs leading-relaxed text-muted-foreground">
                <li>
                  <strong>Cards de senadores:</strong> badge verde nos candidatos em disputa em 2026
                </li>
                <li>
                  <strong>Minha Projeção:</strong> lista por estado para marcar vagas com apoiados de Flávio
                </li>
                <li>
                  <strong>Contagem:</strong> etiqueta sobre a Centro-Direita — não soma cadeira extra ao total de 81
                </li>
              </ul>
            </div>
            <div className="border-t border-line pt-3 text-xs text-muted-foreground">
              <strong>Critério da tag:</strong> candidatos incluídos na planilha de apoio direto de Flávio Bolsonaro
              para as eleições ao Senado em 2026 (coluna &quot;Alinhados&quot;).
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="campaign-panel">
        <CardHeader>
          <CardTitle>Estados-Chave para 2026</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="stat-tile p-4">
              <h4 className="mb-2 font-semibold text-right-soft">Favoráveis ao Centro-Direita</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• São Paulo — Maior colégio eleitoral</div>
                <div>• Rio de Janeiro — Influência nacional</div>
                <div>• Minas Gerais — Estado-pêndulo</div>
                <div>• Rio Grande do Sul — Base conservadora</div>
                <div>• Santa Catarina — Tendência direita</div>
              </div>
            </div>
            <div className="stat-tile p-4">
              <h4 className="mb-2 font-semibold text-left-soft">Favoráveis ao Centro-Esquerda</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Bahia — Maior estado nordestino</div>
                <div>• Pernambuco — Base histórica</div>
                <div>• Ceará — Liderança regional</div>
                <div>• Maranhão — Influência local</div>
                <div>• Pará — Norte estratégico</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StrategyCard({
  title,
  badge,
  description,
  detail,
}: {
  title: string
  badge: string
  description: string
  detail: string
}) {
  const [detailLabel, ...detailRest] = detail.split(":")

  return (
    <Card className="campaign-panel">
      <CardHeader>
        <CardTitle className={getBlocTextColor(title)}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Badge variant="outline" className={getBlocColor(title)}>
            {badge}
          </Badge>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          <div className="border-t border-line pt-3 text-xs text-muted-foreground">
            <strong className="text-ink">{detailLabel}:</strong>
            {detailRest.join(":")}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
