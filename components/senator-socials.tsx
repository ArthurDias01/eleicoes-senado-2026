import { getSocialProfiles, SOCIAL_BASE_URL, type SocialNetwork } from "@/lib/senate-socials"
import { cn } from "@/lib/utils"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { memo } from "react"

interface SenatorSocialsProps {
  name: string
  state: string
}

const NETWORKS: { key: SocialNetwork; label: string; Icon: typeof Instagram }[] = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "x", label: "X", Icon: Twitter },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "youtube", label: "YouTube", Icon: Youtube },
]

export const SenatorSocials = memo(function SenatorSocials({ name, state }: SenatorSocialsProps) {
  const profiles = getSocialProfiles(state, name)
  const links = profiles
    ? NETWORKS.flatMap((network) => {
        const handle = profiles[network.key]
        return handle ? [{ ...network, handle }] : []
      })
    : []

  return links.length > 0 ? (
    <div className="flex items-center gap-1.5">
      {links.map(({ key, label, Icon, handle }) => (
        <a
          key={key}
          href={`${SOCIAL_BASE_URL[key]}${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          title={`${label}: @${handle}`}
          aria-label={`${label} de ${name}: @${handle}`}
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-full",
            "border border-line/70 bg-surface-2/50 text-muted-foreground",
            "transition-colors hover:border-gold/50 hover:bg-gold/15 hover:text-gold",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70",
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ))}
    </div>
  ) : null
})
