import { SenateDashboard } from "@/components/senate-dashboard"
import { Suspense } from "react"

// SPA route has no server-rendered segment for Instant Navigation to validate.
export const instant = false

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SenateDashboard />
    </Suspense>
  )
}
