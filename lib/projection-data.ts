import { getBlocHexColor } from "@/lib/bloc-utils"
import { senateData } from "@/lib/senate-data"

export const NOT_UP_FOR_REELECTION_TERM = "2027"

export const STATES_WITH_ELECTIONS = senateData.states.map((state) => state.code).sort()

export const BLOCS = ["Centro-Esquerda", "Centro", "Centro-Direita"] as const
export type Bloc = (typeof BLOCS)[number]
export type SeatChoice = Bloc | "Bolsonarista"
export type SeatPair = [SeatChoice | "", SeatChoice | ""]
export type UserProjections = Partial<Record<string, SeatPair>>

export type BlocComposition = Record<Bloc, number>

export type TaggedComposition = BlocComposition & {
  Bolsonarista: number
}

export const CURRENT_COMPOSITION: BlocComposition = {
  "Centro-Esquerda": 27,
  Centro: 25,
  "Centro-Direita": 29,
}

export const PROJECTED_COMPOSITION: BlocComposition = {
  "Centro-Esquerda": 17,
  Centro: 10,
  "Centro-Direita": 54,
}

export const COMPOSITION_CHANGES: BlocComposition = {
  "Centro-Esquerda": PROJECTED_COMPOSITION["Centro-Esquerda"] - CURRENT_COMPOSITION["Centro-Esquerda"],
  Centro: PROJECTED_COMPOSITION.Centro - CURRENT_COMPOSITION.Centro,
  "Centro-Direita": PROJECTED_COMPOSITION["Centro-Direita"] - CURRENT_COMPOSITION["Centro-Direita"],
}

export const BASE_PROJECTIONS: Record<string, [Bloc, Bloc]> = {
  AC: ["Centro-Direita", "Centro-Direita"],
  AL: ["Centro-Esquerda", "Centro"],
  AP: ["Centro-Esquerda", "Centro"],
  AM: ["Centro-Direita", "Centro"],
  BA: ["Centro-Esquerda", "Centro"],
  CE: ["Centro-Esquerda", "Centro-Esquerda"],
  DF: ["Centro-Direita", "Centro-Direita"],
  ES: ["Centro-Direita", "Centro"],
  GO: ["Centro-Direita", "Centro-Esquerda"],
  MA: ["Centro-Esquerda", "Centro-Esquerda"],
  MT: ["Centro-Direita", "Centro"],
  MS: ["Centro-Direita", "Centro"],
  MG: ["Centro-Direita", "Centro"],
  PA: ["Centro-Esquerda", "Centro"],
  PB: ["Centro-Esquerda", "Centro"],
  PR: ["Centro-Direita", "Centro-Esquerda"],
  PE: ["Centro-Esquerda", "Centro"],
  PI: ["Centro-Direita", "Centro"],
  RJ: ["Centro-Direita", "Centro-Direita"],
  RN: ["Centro-Direita", "Centro"],
  RS: ["Centro-Direita", "Centro-Direita"],
  RO: ["Centro-Direita", "Centro"],
  RR: ["Centro-Direita", "Centro-Direita"],
  SC: ["Centro-Direita", "Centro"],
  SP: ["Centro-Direita", "Centro"],
  SE: ["Centro-Esquerda", "Centro"],
  TO: ["Centro-Esquerda", "Centro"],
}

/** Map display: first projected seat; tie-break when the two seats differ. */
export function dominantBlocForState(code: string): Bloc {
  return BASE_PROJECTIONS[code][0]
}

export function compositionPieSlices(composition: BlocComposition) {
  return BLOCS.map((bloc) => ({
    label: bloc,
    value: composition[bloc],
    color: getBlocHexColor(bloc),
  }))
}

const EMPTY_TAGGED: TaggedComposition = {
  "Centro-Esquerda": 0,
  Centro: 0,
  "Centro-Direita": 0,
  Bolsonarista: 0,
}

function emptyTagged(): TaggedComposition {
  return { ...EMPTY_TAGGED }
}

function isBloc(value: string): value is Bloc {
  return BLOCS.includes(value as Bloc)
}

/** Bolsonarista = direct Flávio Bolsonaro support; seat still counts as Centro-Direita for the 81-seat total. */
function seatToBloc(choice: string): Bloc | null {
  if (choice === "Bolsonarista") return "Centro-Direita"
  if (isBloc(choice)) return choice
  return null
}

export function calculateAggregates(userProjections: UserProjections) {
  const senatorsNotUpForReelection = emptyTagged()

  for (const senator of senateData.senators) {
    if (senator.termEnd === NOT_UP_FOR_REELECTION_TERM) continue
    if (!isBloc(senator.bloc)) continue
    senatorsNotUpForReelection[senator.bloc] += 1
    if (senator.bolsonaroAligned) {
      senatorsNotUpForReelection.Bolsonarista += 1
    }
  }

  const userProjectedSeats = emptyTagged()

  for (const projections of Object.values(userProjections)) {
    if (!projections) continue
    for (const choice of projections) {
      const bloc = seatToBloc(choice)
      if (!bloc) continue
      userProjectedSeats[bloc] += 1
      if (choice === "Bolsonarista") {
        userProjectedSeats.Bolsonarista += 1
      }
    }
  }

  const finalComposition: TaggedComposition = {
    "Centro-Esquerda": senatorsNotUpForReelection["Centro-Esquerda"] + userProjectedSeats["Centro-Esquerda"],
    Centro: senatorsNotUpForReelection.Centro + userProjectedSeats.Centro,
    "Centro-Direita": senatorsNotUpForReelection["Centro-Direita"] + userProjectedSeats["Centro-Direita"],
    Bolsonarista: senatorsNotUpForReelection.Bolsonarista + userProjectedSeats.Bolsonarista,
  }

  const currentTagged: TaggedComposition = {
    ...CURRENT_COMPOSITION,
    Bolsonarista: 0,
  }

  return {
    current: currentTagged,
    senatorsNotUpForReelection,
    userProjectedSeats,
    finalComposition,
    changes: {
      "Centro-Esquerda": finalComposition["Centro-Esquerda"] - CURRENT_COMPOSITION["Centro-Esquerda"],
      Centro: finalComposition.Centro - CURRENT_COMPOSITION.Centro,
      "Centro-Direita": finalComposition["Centro-Direita"] - CURRENT_COMPOSITION["Centro-Direita"],
      Bolsonarista: finalComposition.Bolsonarista,
    },
    totalUserSeats:
      userProjectedSeats["Centro-Esquerda"] + userProjectedSeats.Centro + userProjectedSeats["Centro-Direita"],
    totalFinalSeats:
      finalComposition["Centro-Esquerda"] + finalComposition.Centro + finalComposition["Centro-Direita"],
  }
}

export function createBolsonaristaByState() {
  const map = new Map<string, typeof senateData.senators>()
  for (const senator of senateData.senators) {
    if (!senator.bolsonaroAligned || !senator.upForReelection) continue
    const list = map.get(senator.state)
    if (list) {
      list.push(senator)
    } else {
      map.set(senator.state, [senator])
    }
  }
  return map
}
