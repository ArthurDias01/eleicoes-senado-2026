import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getBlocColor } from "@/lib/bloc-utils"
import type { Senator } from "@/lib/senate-data"
import Image from "next/image"
import { memo } from "react"

interface SenatorCardProps {
  senator: Senator
}

export const SenatorCard = memo(function SenatorCard({ senator }: SenatorCardProps) {
  return (
    <Card
      className={`senator-card campaign-panel overflow-hidden ${
        senator.bolsonaroAligned ? "border-bolso/45" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Image
            src={senator.image}
            alt={senator.name}
            width={64}
            height={64}
            loading="lazy"
            unoptimized
            loader={({ src }) => src}
            className="h-16 w-16 shrink-0 rounded-full border border-line object-cover"
            onError={(event) => {
              const target = event.target as HTMLImageElement
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                senator.name,
              )}&background=16294a&color=f5f0e6&size=64`
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg leading-tight">{senator.name}</h3>
                <p className="text-sm text-muted-foreground">{senator.state}</p>
              </div>
              <Badge variant="outline" className="shrink-0 border-line/70 bg-surface-2/50 text-xs text-ink">
                {senator.party}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className={`text-xs ${getBlocColor(senator.bloc)}`}>
            {senator.bloc}
          </Badge>

          {senator.bolsonaroAligned ? (
            <Badge variant="outline" className={`text-xs tracking-wide ${getBlocColor("Bolsonarista")}`}>
              BOLSONARISTA
            </Badge>
          ) : null}

          {senator.upForReelection ? (
            <Badge variant="outline" className="border-gold/50 bg-gold/15 text-xs text-gold">
              Disputa 2026
            </Badge>
          ) : null}
        </div>

        <p className="mt-3 border-t border-line pt-3 text-xs text-muted-foreground">
          Mandato até {senator.termEnd}
        </p>
      </CardContent>
    </Card>
  )
})
