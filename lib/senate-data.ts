export interface Senator {
  name: string
  party: string
  state: string
  bloc: string
  termEnd: string
  upForReelection: boolean
  image: string
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
    { name: "ALAN RICK", party: "UNIÃO", state: "AC", bloc: "Centro-Direita", termEnd: "2031", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Alan_Rick.jpg/120px-Alan_Rick.jpg' },
    {
      name: "MARCIO BITTAR",
      party: "UNIÃO",
      state: "AC",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Foto_oficial_de_Marcio_Bittar.jpg/330px-Foto_oficial_de_Marcio_Bittar.jpg"
    },
    { name: "SÉRGIO PETECÃO", party: "PSD", state: "AC", bloc: "Centro", termEnd: "2029", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Senadores_da_56%C2%AA_Legislatura_%2840052646353%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_%2840052646353%29.jpg' },

    // Alagoas
    { name: "RENAN FILHO", party: "MDB", state: "AL", bloc: "Centro", termEnd: "2031", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Senadores_da_57%C2%AA_Legislatura_%2852689452405%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689452405%29.jpg' },
    { name: "RENAN CALHEIROS", party: "MDB", state: "AL", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Senador_Renan_Calheiros_MDB_-_AL.jpg/250px-Senador_Renan_Calheiros_MDB_-_AL.jpg'},
    { name: "EUDÓCIA CALDAS", party: "PL", state: "AL", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Eud%C3%B3cia-Caldas.jpg/250px-Eud%C3%B3cia-Caldas.jpg' },

    // Amapá
    {
      name: "DAVI ALCOLUMBRE",
      party: "UNIÃO",
      state: "AP",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Foto_oficial_2_de_Davi_Alcolumbre_%28v._AgSen%29.jpg/250px-Foto_oficial_2_de_Davi_Alcolumbre_%28v._AgSen%29.jpg'
    },
    { name: "LUCAS BARRETO", party: "PSD", state: "AP", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Foto_oficial_de_Lucas_Barreto.jpg/250px-Foto_oficial_de_Lucas_Barreto.jpg' },
    {
      name: "RANDOLFE RODRIGUES",
      party: "PT",
      state: "AP",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Senadores_da_56%C2%AA_Legislatura_-_Randolfe_Rodrigues_%2846149534405%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_-_Randolfe_Rodrigues_%2846149534405%29.jpg'
    },

    // Amazonas
    { name: "OMAR AZIZ", party: "PSD", state: "AM", bloc: "Centro", termEnd: "2031", upForReelection: false , image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Senadores_da_56%C2%AA_Legislatura_-_Omar_Aziz_%2846293125674%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_-_Omar_Aziz_%2846293125674%29.jpg'},
    { name: "EDUARDO BRAGA", party: "MDB", state: "AM", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Foto_oficial_de_Eduardo_Braga.jpg/330px-Foto_oficial_de_Eduardo_Braga.jpg' },
    {
      name: "PLÍNIO VALÉRIO",
      party: "PSDB",
      state: "AM",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Pl%C3%ADnio_Val%C3%A9rio.jpg/250px-Pl%C3%ADnio_Val%C3%A9rio.jpg'
    },

    // Bahia
    { name: "OTTO ALENCAR", party: "PSD", state: "BA", bloc: "Centro", termEnd: "2031", upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Senador_Otto_Alencar_foto_2.jpg/330px-Senador_Otto_Alencar_foto_2.jpg'
     },
    { name: "ANGELO CORONEL", party: "PSD", state: "BA", bloc: "Centro", termEnd: "2027", upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Senadores_da_56%C2%AA_Legislatura_-_Angelo_Coronel_%2846293125174%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_-_Angelo_Coronel_%2846293125174%29.jpg'
     },
    {
      name: "JACQUES WAGNER",
      party: "PT",
      state: "BA",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Foto_oficial_de_Jaques_Wagner.jpg/250px-Foto_oficial_de_Jaques_Wagner.jpg'
    },

    // Ceará
    {
      name: "CAMILO SANTANA",
      party: "PT",
      state: "CE",
      bloc: "Centro-Esquerda",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Senador_Camilo_Santana.jpg/250px-Senador_Camilo_Santana.jpg',
    },
    { name: "CID GOMES", party: "PSB", state: "CE", bloc: "Centro-Esquerda", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Cid_Gomes_Senador.jpg/330px-Cid_Gomes_Senador.jpg' },
    {
      name: "EDUARDO GIRÃO",
      party: "NOVO",
      state: "CE",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Senador_Eduardo_Gir%C3%A3o.jpg/330px-Senador_Eduardo_Gir%C3%A3o.jpg',
    },

    // Distrito Federal
    {
      name: "DAMARES ALVES",
      party: "REP",
      state: "DF",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Senadores_da_57%C2%AA_Legislatura_%2852688507962%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852688507962%29.jpg',
    },
    { name: "IZALCI LUCAS", party: "PL", state: "DF", bloc: "Centro-Direita", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Senador_Izalci_Lucas.jpg/330px-Senador_Izalci_Lucas.jpg' },
    {
      name: "LEILA DO VOLEI",
      party: "PDT",
      state: "DF",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Senadora_Leila_Barros.jpg/330px-Senadora_Leila_Barros.jpg',
    },

    // Espírito Santo
    { name: "MAGNO MALTA", party: "PL", state: "ES", bloc: "Centro-Direita", termEnd: "2031", upForReelection: false, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Senadores_da_57%C2%AA_Legislatura_%2852688507917%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852688507917%29.jpg' },
    { name: "MARCOS DO VAL", party: "PODE", state: "ES", bloc: "Centro", termEnd: "2027", upForReelection: true, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Senador_Marcos_do_Val.jpg/330px-Senador_Marcos_do_Val.jpg' },
    {
      name: "FABIANO CONTARATO",
      party: "PT",
      state: "ES",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Senador_Fabiano_Contarato.jpg/330px-Senador_Fabiano_Contarato.jpg'
    },

    // Goiás
    {
      name: "WILDER MORAIS",
      party: "PL",
      state: "GO",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Senadores_da_57%C2%AA_Legislatura_%2852689032731%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689032731%29.jpg'
    },
    {
      name: "JORGE KAJURU",
      party: "PSB",
      state: "GO",
      bloc: "Centro-Esquerda",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Senador_Jorge_Kajuru.jpg/330px-Senador_Jorge_Kajuru.jpg'
    },
    { name: "VANDERLAN CARDOSO", party: "PSD", state: "GO", bloc: "Centro", termEnd: "2029", upForReelection: false , image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Senador_Vanderlan_Cardoso.jpg/330px-Senador_Vanderlan_Cardoso.jpg'},

    // Maranhão
    {
      name: "ANA PAULA LOBATO",
      party: "PSB",
      state: "MA",
      bloc: "Centro-Esquerda",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ana_Paula_Lobato.jpg/250px-Ana_Paula_Lobato.jpg'
    },
    {
      name: "WEVERTON ROCHA",
      party: "PDT",
      state: "MA",
      bloc: "Centro-Esquerda",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Senador_Weverton_%28MA%29.jpg/250px-Senador_Weverton_%28MA%29.jpg'
    },
    { name: "ELIZIAME GAMA", party: "PSD", state: "MA", bloc: "Centro", termEnd: "2029", upForReelection: false,image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Foto_oficial_de_Eliziane_Gama.jpg/330px-Foto_oficial_de_Eliziane_Gama.jpg' },

    // Mato Grosso
    {
      name: "WELLINGTON FAGUNDES",
      party: "PL",
      state: "MT",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Senador_Wellington_Fagundes.jpg/330px-Senador_Wellington_Fagundes.jpg'
    },
    { name: "CARLOS FÁVARO", party: "PSD", state: "MT", bloc: "Centro", termEnd: "2027", upForReelection: true },
    {
      name: "JAYME CAMPOS",
      party: "UNIÃO",
      state: "MT",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Senador_Jayme_Campos.jpg/330px-Senador_Jayme_Campos.jpg'
    },

    // Mato Grosso do Sul
    {
      name: "TEREZA CRISTINA",
      party: "PP",
      state: "MS",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Senadora_Tereza_Cristina.jpg/250px-Senadora_Tereza_Cristina.jpg',
    },
    { name: "NELSINHO TRAD", party: "PSD", state: "MS", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Senadores_da_56%C2%AA_Legislatura_-_Nelson_Trad_Filho_%2832121443227%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_-_Nelson_Trad_Filho_%2832121443227%29.jpg' },
    { name: "SORAYA THRONICKE", party: "PODE", state: "MS", bloc: "Centro", termEnd: "2029", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Senadores_da_57%C2%AA_Legislatura_%2852689032601%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689032601%29.jpg' },

    // Minas Gerais
    {
      name: "CLEITINHO AZEVEDO",
      party: "REP",
      state: "MG",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Senadores_da_57%C2%AA_Legislatura_%2852689522963%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689522963%29.jpg'
    },
    { name: "CARLOS VIANA", party: "PODE", state: "MG", bloc: "Centro", termEnd: "2027", upForReelection: true , image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Senador_Carlos_Viana.jpg/330px-Senador_Carlos_Viana.jpg'},
    { name: "RODRIGO PACHECO", party: "PSD", state: "MG", bloc: "Centro", termEnd: "2029", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Senador_Rodrigo_Pacheco.jpg/330px-Senador_Rodrigo_Pacheco.jpg' },

    // Pará
    { name: "BETO FARO", party: "PT", state: "PA", bloc: "Centro-Esquerda", termEnd: "2031", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Beto_Faro.jpg/250px-Beto_Faro.jpg' },
    { name: "JADER BARBALHO", party: "MDB", state: "PA", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Foto_oficial_de_Jader_Barbalho.jpg/250px-Foto_oficial_de_Jader_Barbalho.jpg' },
    { name: "ZEQUINHA MARINHO", party: "PODE", state: "PA", bloc: "Centro", termEnd: "2029", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Zequinha_marinho_oficial.jpg/330px-Zequinha_marinho_oficial.jpg' },

    // Paraíba
    {
      name: "EFRAIM FILHO",
      party: "UNIÃO",
      state: "PB",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Efraim_Filho_%28PB%29.jpg/330px-Efraim_Filho_%28PB%29.jpg',
    },
    { name: "VENEZIANO REGO", party: "MDB", state: "PB", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Senador_Veneziano_Vital_do_R%C3%AAgo.jpg/330px-Senador_Veneziano_Vital_do_R%C3%AAgo.jpg' },
    { name: "DANIELLE RIBEIRO", party: "PSD", state: "PB", bloc: "Centro", termEnd: "2029", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Senadora_Daniella_Ribeiro_jpg.jpg/330px-Senadora_Daniella_Ribeiro_jpg.jpg' },

    // Paraná
    {
      name: "SÉRGIO MORO",
      party: "UNIÃO",
      state: "PR",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Senadores_da_57%C2%AA_Legislatura_%2852689302414%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689302414%29.jpg'
    },
    { name: "FLAVIO ARNS", party: "PSB", state: "PR", bloc: "Centro-Esquerda", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Senador_Fl%C3%A1vio_Arns.jpg/330px-Senador_Fl%C3%A1vio_Arns.jpg' },
    {
      name: "ORIOVISTO GUIMARÃES",
      party: "PODE",
      state: "PR",
      bloc: "Centro",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Senador_Oriovisto_Guimar%C3%A3es.jpg/330px-Senador_Oriovisto_Guimar%C3%A3es.jpg'
    },

    // Pernambuco
    {
      name: "TERESA LEITÃO",
      party: "PT",
      state: "PE",
      bloc: "Centro-Esquerda",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Teresa_Leit%C3%A3o_%28PT-PE%29.jpg/330px-Teresa_Leit%C3%A3o_%28PT-PE%29.jpg'
    },
    {
      name: "HUMBERTO COSTA",
      party: "PT",
      state: "PE",
      bloc: "Centro-Esquerda",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Senadores_da_56%C2%AA_Legislatura_%2847017291821%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_%2847017291821%29.jpg'
    },
    { name: "FERNANDO DUEIRE", party: "MDB", state: "PE", bloc: "Centro", termEnd: "2029", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Senadores_da_56%C2%AA_Legislatura_-Fernando_Dueire_%2852689898768%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_-Fernando_Dueire_%2852689898768%29.jpg' },

    // Piauí
    {
      name: "WELLINGTON DIAS",
      party: "PT",
      state: "PI",
      bloc: "Centro-Esquerda",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Senadores_da_57%C2%AA_Legislatura_%2852689032501%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689032501%29.jpg'
    },
    { name: "CIRO NOGUEIRA", party: "PP", state: "PI", bloc: "Centro-Direita", termEnd: "2027", upForReelection: true ,image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Senador_Ciro_Nogueira_foto_oficial_2.jpg/250px-Senador_Ciro_Nogueira_foto_oficial_2.jpg'},
    { name: "MARCELO CASTRO", party: "MDB", state: "PI", bloc: "Centro", termEnd: "2029", upForReelection: false,image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Senador_Marcelo_Castro.jpg/330px-Senador_Marcelo_Castro.jpg' },

    // Rio de Janeiro
    { name: "ROMÁRIO", party: "PL", state: "RJ", bloc: "Centro-Direita", termEnd: "2031", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Senadores_da_57%C2%AA_Legislatura_%2852689451805%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689451805%29.jpg' },
    {
      name: "FLÁVIO BOLSONARO",
      party: "PL",
      state: "RJ",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Foto_oficial_de_Fl%C3%A1vio_Bolsonaro_%28v._AgSen%29.jpg/330px-Foto_oficial_de_Fl%C3%A1vio_Bolsonaro_%28v._AgSen%29.jpg'
    },
    {
      name: "CARLOS PORTINHO",
      party: "PL",
      state: "RJ",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Fotos_Oficiais_dos_Senadores_da_56%C2%AA_Legislatura_-_Carlos_Portinho_%2852261786075%29.jpg/330px-Fotos_Oficiais_dos_Senadores_da_56%C2%AA_Legislatura_-_Carlos_Portinho_%2852261786075%29.jpg'
    },

    // Rio Grande do Norte
    {
      name: "ROGÉRIO MARINHO",
      party: "PL",
      state: "RN",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Senadores_da_57%C2%AA_Legislatura_%2852689302344%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689302344%29.jpg'
    },
    { name: "STYVENSON VALENTIM", party: "PODE", state: "RN", bloc: "Centro", termEnd: "2027", upForReelection: true,image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Foto_oficial_de_Styvenson_Valentim.jpg/330px-Foto_oficial_de_Styvenson_Valentim.jpg' },
    { name: "ZENAIDE MAIA", party: "PSD", state: "RN", bloc: "Centro", termEnd: "2029", upForReelection: false,image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Foto_oficial_de_Zenaide_Maia.jpg/330px-Foto_oficial_de_Zenaide_Maia.jpg' },

    // Rio Grande do Sul
    {
      name: "HAMILTON MOURÃO",
      party: "REP",
      state: "RS",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Hamilton_Mour%C3%A3o.jpg/250px-Hamilton_Mour%C3%A3o.jpg',
    },
    {
      name: "LUIS CARLOS HEINZE",
      party: "PP",
      state: "RS",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Senador_Luis_Carlos_Heinze.jpg/330px-Senador_Luis_Carlos_Heinze.jpg',
    },
    { name: "PAULO PAIM", party: "PT", state: "RS", bloc: "Centro-Esquerda", termEnd: "2029", upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Senadores_da_56%C2%AA_Legislatura_%2833188030238%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_%2833188030238%29.jpg',
     },

    // Rondônia
    {
      name: "JAIME BAGATTOLI",
      party: "PL",
      state: "RO",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Jaime_Bagattoli.jpg/250px-Jaime_Bagattoli.jpg'
    },
    {
      name: "MARCOS ROGÉRIO",
      party: "PL",
      state: "RO",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Marcos_Rog%C3%A9rio_%28Rond%C3%B4nia%29.jpg/250px-Marcos_Rog%C3%A9rio_%28Rond%C3%B4nia%29.jpg'
    },
    { name: "CONFÚCIO MOURA", party: "MDB", state: "RO", bloc: "Centro", termEnd: "2029", upForReelection: false,image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Senador_Conf%C3%BAcio_Moura.jpg/330px-Senador_Conf%C3%BAcio_Moura.jpg' },

    // Roraima
    {
      name: "HIRAN GONÇALVES",
      party: "PP",
      state: "RR",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Hiran_Gon%C3%A7alves.jpg/250px-Hiran_Gon%C3%A7alves.jpg'
    },
    {
      name: "MECIAS DE JESUS",
      party: "REP",
      state: "RR",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Senador_Mecias_de_Jesus.jpg/330px-Senador_Mecias_de_Jesus.jpg'
    },
    {
      name: "CHICO RODRIGUES",
      party: "PSB",
      state: "RR",
      bloc: "Centro-Esquerda",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Senador_Chico_Rodrigues.jpg/330px-Senador_Chico_Rodrigues.jpg'
    },

    // Santa Catarina
    { name: "JORGE SEIF", party: "PL", state: "SC", bloc: "Centro-Direita", termEnd: "2031", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Senadores_da_57%C2%AA_Legislatura_%2852689452150%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689452150%29.jpg' },
    {
      name: "ESPERIDIÃO AMIN",
      party: "PP",
      state: "SC",
      bloc: "Centro-Direita",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Senador_Esperidi%C3%A3o_Amin.jpg/330px-Senador_Esperidi%C3%A3o_Amin.jpg'
    },
    { name: "IVETE DA SILVEIRA", party: "MDB", state: "SC", bloc: "Centro", termEnd: "2029", upForReelection: false,image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Senadores_da_56%C2%AA_Legislatura_%2852689186291%29.jpg/330px-Senadores_da_56%C2%AA_Legislatura_%2852689186291%29.jpg' },

    // São Paulo
    {
      name: "MARCOS PONTES",
      party: "PL",
      state: "SP",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Senadores_da_57%C2%AA_Legislatura_%2852689302869%29.jpg/330px-Senadores_da_57%C2%AA_Legislatura_%2852689302869%29.jpg'
    },
    { name: "ALEXANDRE GIORDANO", party: "MDB", state: "SP", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Foto_Oficial_de_Giordano_como_Senador_por_S%C3%A3o_Paulo.jpg/250px-Foto_Oficial_de_Giordano_como_Senador_por_S%C3%A3o_Paulo.jpg'},
    { name: "MARA GABRILLI", party: "PSD", state: "SP", bloc: "Centro", termEnd: "2029", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Senadora_Mara_Gabrilli.jpg/250px-Senadora_Mara_Gabrilli.jpg' },

    // Sergipe
    {
      name: "LAÉRCIO OLIVEIRA",
      party: "PP",
      state: "SE",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/La%C3%A9rcio_Oliveira.jpg/250px-La%C3%A9rcio_Oliveira.jpg',
    },
    {
      name: "ROGÉRIO CARVALHO",
      party: "PT",
      state: "SE",
      bloc: "Centro-Esquerda",
      termEnd: "2027",
      upForReelection: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Senador_Rog%C3%A9rio_Carvalho.jpg/330px-Senador_Rog%C3%A9rio_Carvalho.jpg',
    },
    { name: "ALESSANDRO VIEIRA", party: "MDB", state: "SE", bloc: "Centro", termEnd: "2029", upForReelection: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Senador_Alessandro_Vieira.jpg/250px-Senador_Alessandro_Vieira.jpg' },

    // Tocantins
    {
      name: "PROF.ª DORINHA",
      party: "UNIÃO",
      state: "TO",
      bloc: "Centro-Direita",
      termEnd: "2031",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Dorinha_Rezende.jpg/250px-Dorinha_Rezende.jpg'
    },
    { name: "IRAJÁ ABREU", party: "PSD", state: "TO", bloc: "Centro", termEnd: "2027", upForReelection: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Senadores_da_56%C2%AA_Legislatura_-_Iraj%C3%A1_Abreu_%2846293120454%29.jpg/250px-Senadores_da_56%C2%AA_Legislatura_-_Iraj%C3%A1_Abreu_%2846293120454%29.jpg' },
    {
      name: "EDUARDO GOMES",
      party: "PL",
      state: "TO",
      bloc: "Centro-Direita",
      termEnd: "2029",
      upForReelection: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Senador_Eduardo_Gomes.jpg/250px-Senador_Eduardo_Gomes.jpg'
    },
  ] as Senator[],
}
