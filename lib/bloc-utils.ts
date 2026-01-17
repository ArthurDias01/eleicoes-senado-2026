/**
 * Shared utility functions for bloc-related styling and colors
 */

export function getBlocColor(bloc: string): string {
  switch (bloc) {
    case "Centro-Esquerda":
      return "bg-red-100 text-red-800 border-red-200"
    case "Centro":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Centro-Direita":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Bolsonarista":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function getBlocTextColor(bloc: string): string {
  switch (bloc) {
    case "Centro-Esquerda":
      return "text-red-700"
    case "Centro":
      return "text-yellow-700"
    case "Centro-Direita":
      return "text-blue-700"
    case "Bolsonarista":
      return "text-green-700"
    default:
      return "text-gray-700"
  }
}

export function getBlocHexColor(bloc: string): string {
  switch (bloc) {
    case "Centro-Esquerda":
      return "#ef4444"
    case "Centro":
      return "#eab308"
    case "Centro-Direita":
      return "#3b82f6"
    case "Bolsonarista":
      return "#22c55e"
    default:
      return "#6b7280"
  }
}

export function getBlocBgColor(bloc: string): string {
  switch (bloc) {
    case "Centro-Esquerda":
      return "bg-red-500"
    case "Centro":
      return "bg-yellow-500"
    case "Centro-Direita":
      return "bg-blue-500"
    default:
      return "bg-gray-300"
  }
}

