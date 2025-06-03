import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
