import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Senator } from "@/lib/senate-data"

interface SenatorCardProps {
  senator: Senator
}

const getBlocColor = (bloc: string) => {
  switch (bloc) {
    case "Centro-Esquerda":
      return "bg-red-100 text-red-800 border-red-200"
    case "Centro":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Centro-Direita":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function SenatorCard({ senator }: SenatorCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{senator.name}</h3>
            <p className="text-sm text-gray-600">{senator.state}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {senator.party}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <Badge className={`text-xs ${getBlocColor(senator.bloc)}`}>{senator.bloc}</Badge>

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
}
