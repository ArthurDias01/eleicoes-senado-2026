/**
 * Bloc identity styling. Every bloc maps to one token family (left/center/right/bolso)
 * so charts, badges and buttons stay in sync with the theme in app/globals.css.
 */

type BlocStyle = {
  badge: string
  surface: string
  text: string
  hex: string
  fill: string
  selectedButton: string
}

const FALLBACK: BlocStyle = {
  badge: "border-line/60 bg-surface-2/50 text-ink",
  surface: "border-line/60 bg-surface-2/50",
  text: "text-muted-foreground",
  hex: "#94a5bb",
  fill: "bg-muted-foreground",
  selectedButton: "bg-muted-foreground text-navy-deep",
}

const BLOC_STYLES: Record<string, BlocStyle> = {
  "Centro-Esquerda": {
    badge: "border-left/50 bg-left/20 text-left-soft",
    surface: "border-left/50 bg-left/20",
    text: "text-left-soft",
    hex: "#e4574f",
    fill: "bg-left",
    selectedButton: "bg-left text-navy-deep hover:bg-left-soft",
  },
  Centro: {
    badge: "border-center/50 bg-center/20 text-gold-soft",
    surface: "border-center/50 bg-center/20",
    text: "text-gold-soft",
    hex: "#e6b84f",
    fill: "bg-center",
    selectedButton: "bg-center text-navy-deep hover:bg-center-soft",
  },
  "Centro-Direita": {
    badge: "border-right/50 bg-right/20 text-right-soft",
    surface: "border-right/50 bg-right/20",
    text: "text-right-soft",
    hex: "#4d94e0",
    fill: "bg-right",
    selectedButton: "bg-right text-navy-deep hover:bg-right-soft",
  },
  Bolsonarista: {
    badge: "border-bolso/50 bg-bolso/20 text-bolso-soft",
    surface: "border-bolso/50 bg-bolso/20",
    text: "text-bolso-soft",
    hex: "#2fae72",
    fill: "bg-bolso",
    selectedButton: "bg-bolso text-navy-deep hover:bg-bolso-soft",
  },
}

function styleFor(bloc: string): BlocStyle {
  return BLOC_STYLES[bloc] ?? FALLBACK
}

export function getBlocColor(bloc: string): string {
  return styleFor(bloc).badge
}

export function getBlocSurfaceClass(bloc: string): string {
  return styleFor(bloc).surface
}

export function changeToneClass(change: number): string {
  if (change > 0) return "text-bolso-soft"
  if (change < 0) return "text-left-soft"
  return "text-muted-foreground"
}

export function changePanelClass(change: number): string {
  if (change > 0) return "border-bolso/35 bg-bolso/12 text-bolso-soft"
  if (change < 0) return "border-left/35 bg-left/12 text-left-soft"
  return "border-line bg-ink/5 text-muted-foreground"
}

export function getBlocTextColor(bloc: string): string {
  return styleFor(bloc).text
}

export function getBlocHexColor(bloc: string): string {
  return styleFor(bloc).hex
}

export function getBlocBgColor(bloc: string): string {
  return styleFor(bloc).fill
}

export function getBlocSelectedButtonClass(bloc: string): string {
  return styleFor(bloc).selectedButton
}
