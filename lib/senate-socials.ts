// Perfis dos candidatos ao Senado em redes sociais.
// A chave e `UF|NOME`, casando exatamente com `state` e `name` de senate-data.ts.
// Handles extraidos da URL de destino de cada perfil, nao do texto da fonte:
// em 16 casos os dois divergiam (ex.: texto "@sanderson", link para "sandersonrs").
// Todos os 47 perfis foram verificados como existentes em 07/08/2026.

export type SocialNetwork = "instagram" | "x" | "facebook" | "youtube"

export type SocialProfiles = Partial<Record<SocialNetwork, string>>

export const SOCIAL_BASE_URL: Record<SocialNetwork, string> = {
  instagram: "https://www.instagram.com/",
  x: "https://x.com/",
  facebook: "https://www.facebook.com/",
  youtube: "https://www.youtube.com/@",
}

const SOCIAL_PROFILES: Record<string, SocialProfiles> = {
  "AC|MARA ROCHA": { instagram: "mararochaacre" },
  "AC|MARCIO BITTAR": { instagram: "marciobittar_" },
  "AL|ARTHUR LIRA": { instagram: "oficialarthurlira" },
  "AL|MARINA CÂNDIA": { instagram: "marina.candia" },
  "AM|CAPITÃO ALBERTO NETO": { instagram: "capitaoalbertoneto" },
  "AP|LUCAS BARRETO": { instagram: "lucasbarreto_ap" },
  "AP|RAYSSA FURLAN": { instagram: "rayssacfurlan" },
  "BA|ANGELO CORONEL": { instagram: "angelo.coronel" },
  "BA|JOÃO ROMA": { instagram: "joaoromaneto" },
  "CE|ALCIDES FERNANDES": { instagram: "alcidesfernandes" },
  "CE|CAPITÃO WAGNER": { instagram: "capitaowagnersousa" },
  "DF|BIA KICIS": { instagram: "biakicis" },
  "DF|MICHELLE BOLSONARO": { instagram: "michellebolsonaro" },
  "ES|EVAIR DE MELO": { instagram: "evair_de_melo" },
  "ES|MAGUINHA MALTA": { instagram: "maguinhamalta" },
  "GO|GUSTAVO GAYER": { instagram: "gusgayer" },
  "GO|OSÉIAS VARÃO": { instagram: "oseiasvarao" },
  "MA|CIDÔNIO GONÇALVES": { instagram: "cidoniogoncalves" },
  "MG|DOMINGOS SÁVIO": { instagram: "domingossaviomg" },
  "MS|CAPITÃO CONTAR": { instagram: "capitaocontar" },
  "MS|REINALDO AZAMBUJA": { instagram: "reinaldoazambuja" },
  "MT|JOSÉ MEDEIROS": { instagram: "josemedeirosmt" },
  "PA|DELEGADO ÉDER MAURO": { instagram: "edermauropa" },
  "PA|ZEQUINHA MARINHO": { instagram: "zequinhamarinhooficial" },
  "PB|MARCELO QUEIROGA": { instagram: "marceloqueiroga" },
  "PE|MENDONÇA FILHO": { instagram: "mendoncafilhope" },
  "PI|TIAGO JUNQUEIRA": { instagram: "tiago_junqueira_pi_" },
  "PR|DELTAN DALLAGNOL": { instagram: "deltandallagnol" },
  "PR|FILIPE BARROS": { instagram: "filipebarrosoficial" },
  "RJ|CARLOS JORDY": { instagram: "carlosjordy" },
  "RJ|CARLOS PORTINHO": { instagram: "carlosportinho" },
  "RN|CORONEL HÉLIO": { instagram: "coronelheliorn" },
  "RN|STYVENSON VALENTIM": { instagram: "senadorstyvensonvalentim" },
  "RO|BRUNO SCHEID": { instagram: "brunoscheid" },
  "RO|FERNANDO MÁXIMO": { instagram: "drfernandomaximo007" },
  "RR|HÉLIO LOPES": { instagram: "depheliolopes" },
  "RR|NICOLETTI": { instagram: "deputadonicoletti" },
  "RS|MARCEL VAN HATTEM": { instagram: "marcelvanhattem" },
  "RS|UBIRATAN SANDERSON": { instagram: "sandersonrs" },
  "SC|CARLOS BOLSONARO": { instagram: "carlosbolsonaro" },
  "SC|CAROLINE DE TONI": { instagram: "carolinedetoni" },
  "SE|CORONEL ROCHA": { instagram: "coronelrochase" },
  "SE|RODRIGO VALADARES": { instagram: "rodrigovaladares_" },
  "SP|ANDRÉ DO PRADO": { instagram: "andredopradosp" },
  "SP|GUILHERME DERRITE": { instagram: "guilhermederrite" },
  "TO|CARLOS GAGUIM": { instagram: "carlosgaguim" },
  "TO|EDUARDO GOMES": { instagram: "eduardogomestocantins" },
}

export function getSocialProfiles(state: string, name: string): SocialProfiles | undefined {
  return SOCIAL_PROFILES[`${state}|${name}`]
}
