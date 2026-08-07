"use client"

import {
    AnalysisPanel,
    CurrentPanel,
    OverviewPanel,
    ProjectionsPanel,
    SenatorsPanel,
} from "@/components/dashboard-panels"
import { MyProjection } from "@/components/my-projection"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    COMPOSITION_CHANGES,
    CURRENT_COMPOSITION,
    type UserProjections,
} from "@/lib/projection-data"
import { GithubIcon, TrendingDown, TrendingUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const TAB_VALUES = [
  "overview",
  "current",
  "projections",
  "my-projection",
  "senators",
  "analysis",
] as const

type TabValue = (typeof TAB_VALUES)[number]

function isTabValue(value: string | null): value is TabValue {
  return TAB_VALUES.includes(value as TabValue)
}

export function SenateDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userProjections, setUserProjections] = useState<UserProjections>({})

  const tabParam = searchParams.get("tab")
  const activeTab: TabValue = isTabValue(tabParam) ? tabParam : "overview"

  const selectTab = (tab: string) => {
    if (!isTabValue(tab)) return
    const params = new URLSearchParams(window.location.search)
    if (tab === "overview") {
      params.delete("tab")
    } else {
      params.set("tab", tab)
    }
    const query = params.toString()
    const pathname = window.location.pathname
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const jumpToTab = (tab: TabValue) => {
    selectTab(tab)
    document.getElementById("analysis-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="campaign-page">
      <a className="skip-link" href="#dashboard-content">
        Pular para conteúdo
      </a>
      <div className="campaign-shell">
        <header className="hero-shell">
          <div className="hero-copy">
            <p className="hero-kicker">Radar político brasileiro · eleições 2026</p>
            <h1 className="hero-brand">
              SENADO <span>26</span>
            </h1>
            <h2 className="hero-title">O mapa de poder antes da urna.</h2>
            <p className="hero-description">
              Uma leitura visual dos blocos, estados e candidaturas que podem redesenhar o Senado Federal.
            </p>
            <div className="hero-actions">
              <Button
                size="lg"
                className="bg-gold text-navy-deep hover:bg-gold-soft"
                onClick={() => jumpToTab("my-projection")}
              >
                Montar minha projeção
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-ink/25 bg-ink/5 text-ink hover:bg-ink/12 hover:text-ink"
                onClick={() => jumpToTab("senators")}
              >
                Explorar senadores
              </Button>
            </div>
            <p className="hero-source">
              Feito por{" "}
              <a href="https://github.com/ArthurDias01" target="_blank" rel="noopener noreferrer">
                Arthur Dias
              </a>
              {" · "}
              <a
                href="https://github.com/ArthurDias01/eleicoes-senado-2026/blob/main/lib/senate-data.ts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir dados dos senadores no GitHub"
              >
                dados abertos <GithubIcon className="ml-1 inline h-3 w-3" aria-hidden="true" />
              </a>
            </p>
          </div>
        </header>

        <main id="dashboard-content">
          <section className="dashboard-intro" aria-labelledby="dashboard-heading">
            <div>
              <p className="section-kicker">Leitura de cenário</p>
              <h2 id="dashboard-heading">Decisões, blocos e nomes que movem 2026.</h2>
            </div>
            <p>
              Compare composição atual, projeções e candidaturas. Use os dados como briefing para entender onde cada
              cadeira está em disputa.
            </p>
          </section>

          <section className="readout-strip" aria-label="Resumo da eleição">
            <div className="readout-item">
              <span className="readout-label">Cadeiras</span>
              <strong className="readout-value">81</strong>
              <span className="readout-note">Senado completo</span>
            </div>
            <div className="readout-item">
              <span className="readout-label">Em disputa</span>
              <strong className="readout-value">54</strong>
              <span className="readout-note">2 por estado</span>
            </div>
            <div className="readout-item">
              <span className="readout-label">Centro-direita</span>
              <strong className="readout-value">{CURRENT_COMPOSITION["Centro-Direita"]}</strong>
              <span className="readout-note">
                <TrendingUp className="h-3 w-3" aria-hidden="true" /> +
                {COMPOSITION_CHANGES["Centro-Direita"]} projetado
              </span>
            </div>
            <div className="readout-item">
              <span className="readout-label">Centro-esquerda</span>
              <strong className="readout-value">{CURRENT_COMPOSITION["Centro-Esquerda"]}</strong>
              <span className="readout-note">
                <TrendingDown className="h-3 w-3" aria-hidden="true" /> {COMPOSITION_CHANGES["Centro-Esquerda"]}{" "}
                projetado
              </span>
            </div>
          </section>

          <Tabs id="analysis-tabs" value={activeTab} onValueChange={selectTab} className="space-y-8 pt-10">
            <TabsList className="campaign-tabs flex w-full" aria-label="Seções do radar">
              <TabsTrigger className="campaign-tab" value="overview">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger className="campaign-tab" value="current">
                Composição Atual
              </TabsTrigger>
              <TabsTrigger className="campaign-tab" value="projections">
                Projeções 2026
              </TabsTrigger>
              <TabsTrigger className="campaign-tab" value="my-projection">
                Minha Projeção
              </TabsTrigger>
              <TabsTrigger className="campaign-tab" value="senators">
                Senadores
              </TabsTrigger>
              <TabsTrigger className="campaign-tab" value="analysis">
                Análise
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="tab-panel">
              <OverviewPanel />
            </TabsContent>
            <TabsContent value="current" className="tab-panel">
              <CurrentPanel />
            </TabsContent>
            <TabsContent value="projections" className="tab-panel">
              <ProjectionsPanel />
            </TabsContent>
            <TabsContent value="my-projection" className="tab-panel">
              <MyProjection userProjections={userProjections} setUserProjections={setUserProjections} />
            </TabsContent>
            <TabsContent value="senators" className="tab-panel">
              <SenatorsPanel />
            </TabsContent>
            <TabsContent value="analysis" className="tab-panel">
              <AnalysisPanel />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
