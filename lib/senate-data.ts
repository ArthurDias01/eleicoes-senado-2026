export interface Senator {
  name: string
  party: string
  state: string
  bloc: string
  termEnd: string
  upForReelection: boolean
}

export interface State {
  code: string
  name: string
  region: string
}

export const senateData = {
  states: [
    { code: "AC", name: "Acre", region: "Norte" },
    { code: "AL", name: "Alagoas", region: "Nordeste" },
    { code: "AP", name: "Amapá", region: "Norte" },
    { code: "AM", name: "Amazonas", region: "Norte" },
    { code: "BA", name: "Bahia", region: "Nordeste" },
    { code: "CE", name: "Ceará", region: "Nordeste" },
    { code: "DF", name: "Distrito Federal", region: "Centro-Oeste" },
    { code: "ES", name: "Espírito Santo", region: "Sudeste" },
    { code: "GO", name: "Goiás", region: "Centro-Oeste" },
    { code: "MA", name: "Maranhão", region: "Nordeste" },
    { code: "MT", name: "Mato Grosso", region: "Centro-Oeste" },
    { code: "MS", name: "Mato Grosso do Sul", region: "Centro-Oeste" },
    { code: "MG", name: "Minas Gerais", region: "Sudeste" },
    { code: "PA", name: "Pará", region: "Norte" },
    { code: "PB", name: "Paraíba", region: "Nordeste" },
    { code: "PR", name: "Paraná", region: "Sul" },
    { code: "PE", name: "Pernambuco", region: "Nordeste" },
    { code: "PI", name: "Piauí", region: "Nordeste" },
    { code: "RJ", name: "Rio de Janeiro", region: "Sudeste" },
    { code: "RN", name: "Rio Grande do Norte", region: "Nordeste" },
    { code: "RS", name: "Rio Grande do Sul", region: "Sul" },
    { code: "RO", name: "Rondônia", region: "Norte" },
    { code: "RR", name: "Roraima", region: "Norte" },
    { code: "SC", name: "Santa Catarina", region: "Sul" },
    { code: "SP", name: "São Paulo", region: "Sudeste" },
    { code: "SE", name: "Sergipe", region: "Nordeste" },
    { code: "TO", name: "Tocantins", region: "Norte" },
  ] as State[],

  senators: [
    // Acre
    { name: "ALAN RICK", party: "UNIÃO", state: "AC", bloc: "Centro-Direita", termEnd: "2031", upForReelection: false },
    {
      name: "MARCIO BITTAR",
      party: "UNIÃO",
      state: "AC",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
    },
    { name: "SÉRGIO PETECÃO", party: "PSD", state: "AC", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Alagoas
    { name: "RENAN FILHO", party: "MDB", state: "AL", bloc: "Centro", termEnd: "2031", upForReelection: false },
    { name: "RENAN CALHEIROS", party: "MDB", state: "AL", bloc: "Centro", termEnd: "2027", upForReelection: true },
    { name: "RODRIGO CUNHA", party: "PODE", state: "AL", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Amapá
    {
      name: "DAVI ALCOLUMBRE",
      party: "UNIÃO",
      state: "AP",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "LUCAS BARRETO", party: "PSD", state: "AP", bloc: "Centro", termEnd: "2027", upForReelection: true },
    {
      name: "RANDOLFE RODRIGUES",
      party: "PT",
      state: "AP",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
    },

    // Amazonas
    { name: "OMAR AZIZ", party: "PSD", state: "AM", bloc: "Centro", termEnd: "2031", upForReelection: false },
    { name: "EDUARDO BRAGA", party: "MDB", state: "AM", bloc: "Centro", termEnd: "2027", upForReelection: true },
    {
      name: "PLÍNIO VALÉRIO",
      party: "PSDB",
      state: "AM",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
    },

    // Bahia
    { name: "OTTO ALENCAR", party: "PSD", state: "BA", bloc: "Centro", termEnd: "2031", upForReelection: false },
    { name: "ANGELO CORONEL", party: "PSD", state: "BA", bloc: "Centro", termEnd: "2027", upForReelection: true },
    {
      name: "JACQUES WAGNER",
      party: "PT",
      state: "BA",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
    },

    // Ceará
    {
      name: "CAMILO SANTANA",
      party: "PT",
      state: "CE",
      bloc: "Centro-Esquerda",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "CID GOMES", party: "PSB", state: "CE", bloc: "Centro-Esquerda", termEnd: "2027", upForReelection: true },
    {
      name: "EDUARDO GIRÃO",
      party: "NOVO",
      state: "CE",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
    },

    // Distrito Federal
    {
      name: "DAMARES ALVES",
      party: "REP",
      state: "DF",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "IZALCI LUCAS", party: "PL", state: "DF", bloc: "Centro-Direita", termEnd: "2027", upForReelection: true },
    {
      name: "LEILA DO VOLEI",
      party: "PDT",
      state: "DF",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
    },

    // Espírito Santo
    { name: "MAGNO MALTA", party: "PL", state: "ES", bloc: "Centro-Direita", termEnd: "2031", upForReelection: false },
    { name: "MARCOS DO VAL", party: "PODE", state: "ES", bloc: "Centro", termEnd: "2027", upForReelection: true },
    {
      name: "FABIANO CONTARATO",
      party: "PT",
      state: "ES",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
    },

    // Goiás
    {
      name: "WILDER MORAIS",
      party: "PL",
      state: "GO",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    {
      name: "JORGE KAJURU",
      party: "PSB",
      state: "GO",
      bloc: "Centro-Esquerda",
      termEnd: "2027",
      upForReelection: true,
    },
    { name: "VANDERLAN CARDOSO", party: "PSD", state: "GO", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Maranhão
    {
      name: "ANA PAULA LOBATO",
      party: "PSB",
      state: "MA",
      bloc: "Centro-Esquerda",
      termEnd: "2031",
      upForReelection: false,
    },
    {
      name: "WEVERTON ROCHA",
      party: "PDT",
      state: "MA",
      bloc: "Centro-Esquerda",
      termEnd: "2027",
      upForReelection: true,
    },
    { name: "ELIZIAME GAMA", party: "PSD", state: "MA", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Mato Grosso
    {
      name: "WELLINGTON FAGUNDES",
      party: "PL",
      state: "MT",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "CARLOS FÁVARO", party: "PSD", state: "MT", bloc: "Centro", termEnd: "2027", upForReelection: true },
    {
      name: "JAYME CAMPOS",
      party: "UNIÃO",
      state: "MT",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
    },

    // Mato Grosso do Sul
    {
      name: "TEREZA CRISTINA",
      party: "PP",
      state: "MS",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "NELSINHO TRAD", party: "PSD", state: "MS", bloc: "Centro", termEnd: "2027", upForReelection: true },
    { name: "SORAYA THRONICKE", party: "PODE", state: "MS", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Minas Gerais
    {
      name: "CLEITINHO AZEVEDO",
      party: "REP",
      state: "MG",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "CARLOS VIANA", party: "PODE", state: "MG", bloc: "Centro", termEnd: "2027", upForReelection: true },
    { name: "RODRIGO PACHECO", party: "PSD", state: "MG", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Pará
    { name: "BETO FARO", party: "PT", state: "PA", bloc: "Centro-Esquerda", termEnd: "2031", upForReelection: false },
    { name: "JADER BARBALHO", party: "MDB", state: "PA", bloc: "Centro", termEnd: "2027", upForReelection: true },
    { name: "ZEQUINHA MARINHO", party: "PODE", state: "PA", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Paraíba
    {
      name: "EFRAIM FILHO",
      party: "UNIÃO",
      state: "PB",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "VENEZIANO REGO", party: "MDB", state: "PB", bloc: "Centro", termEnd: "2027", upForReelection: true },
    { name: "DANIELLE RIBEIRO", party: "PSD", state: "PB", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Paraná
    {
      name: "SÉRGIO MORO",
      party: "UNIÃO",
      state: "PR",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "FLAVIO ARNS", party: "PSB", state: "PR", bloc: "Centro-Esquerda", termEnd: "2027", upForReelection: true },
    {
      name: "ORIOVISTO GUIMARÃES",
      party: "PODE",
      state: "PR",
      bloc: "Centro",
      termEnd: "2029",
      upForReelection: false,
    },

    // Pernambuco
    {
      name: "TERESA LEITÃO",
      party: "PT",
      state: "PE",
      bloc: "Centro-Esquerda",
      termEnd: "2031",
      upForReelection: false,
    },
    {
      name: "HUMBERTO COSTA",
      party: "PT",
      state: "PE",
      bloc: "Centro-Esquerda",
      termEnd: "2027",
      upForReelection: true,
    },
    { name: "FERNANDO DUEIRE", party: "MDB", state: "PE", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Piauí
    {
      name: "WELLINGTON DIAS",
      party: "PT",
      state: "PI",
      bloc: "Centro-Esquerda",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "CIRO NOGUEIRA", party: "PP", state: "PI", bloc: "Centro-Direita", termEnd: "2027", upForReelection: true },
    { name: "MARCELO CASTRO", party: "MDB", state: "PI", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Rio de Janeiro
    { name: "ROMÁRIO", party: "PL", state: "RJ", bloc: "Centro-Direita", termEnd: "2031", upForReelection: false },
    {
      name: "FLÁVIO BOLSONARO",
      party: "PL",
      state: "RJ",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
    },
    {
      name: "CARLOS PORTINHO",
      party: "PL",
      state: "RJ",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
    },

    // Rio Grande do Norte
    {
      name: "ROGÉRIO MARINHO",
      party: "PL",
      state: "RN",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "STYVENSON VALENTIM", party: "PODE", state: "RN", bloc: "Centro", termEnd: "2027", upForReelection: true },
    { name: "ZENAIDE MAIA", party: "PSD", state: "RN", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Rio Grande do Sul
    {
      name: "HAMILTON MOURÃO",
      party: "REP",
      state: "RS",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    {
      name: "LUIS CARLOS HEINZE",
      party: "PP",
      state: "RS",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
    },
    { name: "PAULO PAIM", party: "PT", state: "RS", bloc: "Centro-Esquerda", termEnd: "2029", upForReelection: false },

    // Rondônia
    {
      name: "JAIME BAGATTOLI",
      party: "PL",
      state: "RO",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    {
      name: "MARCOS ROGÉRIO",
      party: "PL",
      state: "RO",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
    },
    { name: "CONFÚCIO MOURA", party: "MDB", state: "RO", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Roraima
    {
      name: "HIRAN GONÇALVES",
      party: "PP",
      state: "RR",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    {
      name: "MECIAS DE JESUS",
      party: "REP",
      state: "RR",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
    },
    {
      name: "CHICO RODRIGUES",
      party: "PSB",
      state: "RR",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
    },

    // Santa Catarina
    { name: "JORGE SEIF", party: "PL", state: "SC", bloc: "Centro-Direita", termEnd: "2031", upForReelection: false },
    {
      name: "ESPERIDIÃO AMIN",
      party: "PP",
      state: "SC",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
    },
    { name: "IVETE DA SILVEIRA", party: "MDB", state: "SC", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // São Paulo
    {
      name: "MARCOS PONTES",
      party: "PL",
      state: "SP",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "ALEXANDRE GIORDANO", party: "MDB", state: "SP", bloc: "Centro", termEnd: "2027", upForReelection: true },
    { name: "MARA GABRILLI", party: "PSD", state: "SP", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Sergipe
    {
      name: "LAÉRCIO OLIVEIRA",
      party: "PP",
      state: "SE",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    {
      name: "ROGÉRIO CARVALHO",
      party: "PT",
      state: "SE",
      bloc: "Centro-Esquerda",
      termEnd: "2027",
      upForReelection: true,
    },
    { name: "ALESSANDRO VIEIRA", party: "MDB", state: "SE", bloc: "Centro", termEnd: "2029", upForReelection: false },

    // Tocantins
    {
      name: "PROF.ª DORINHA",
      party: "UNIÃO",
      state: "TO",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
    },
    { name: "IRAJÁ ABREU", party: "PSD", state: "TO", bloc: "Centro", termEnd: "2027", upForReelection: true },
    {
      name: "EDUARDO GOMES",
      party: "PL",
      state: "TO",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
    },
  ] as Senator[],
}
