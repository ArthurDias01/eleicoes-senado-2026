import { changeToneClass } from "@/lib/bloc-utils"
import { Minus, TrendingDown, TrendingUp } from "lucide-react"

export function ChangeIndicator({
  change,
  className = "",
}: {
  change: number
  className?: string
}) {
  const Icon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus

  return (
    <span className={`inline-flex items-center font-bold tabular-nums ${changeToneClass(change)} ${className}`}>
      <Icon className="mr-1 h-4 w-4 shrink-0" aria-hidden="true" />
      {change > 0 ? "+" : ""}
      {change}
    </span>
  )
}
