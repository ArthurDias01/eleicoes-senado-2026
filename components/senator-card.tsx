import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getBlocColor } from "@/lib/bloc-utils"
import type { Senator } from "@/lib/senate-data"
import { memo } from "react"

interface SenatorCardProps {
  senator: Senator
}

export const SenatorCard = memo(function SenatorCard({ senator }: SenatorCardProps) {
  return (
    <Card className={`hover:shadow-md transition-shadow ${senator.bolsonaroAligned ? 'border-2 border-green-600' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={senator.image}
              alt={senator.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(senator.name)}&background=e5e7eb&color=374151&size=64`;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg leading-tight truncate">{senator.name}</h3>
                <p className="text-sm text-gray-600">{senator.state}</p>
              </div>
              <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                {senator.party}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <Badge className={`text-xs ${getBlocColor(senator.bloc)}`}>{senator.bloc}</Badge>

          {senator.bolsonaroAligned && (
            <Badge className="text-xs bg-green-600 text-white hover:bg-green-700">
              BOLSONARISTA
            </Badge>
          )}

          {senator.upForReelection && (
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
              Disputa 2026
            </Badge>
          )}

          <div className="text-xs text-gray-500 mt-2">
            <div>Mandato: {senator.termEnd}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
