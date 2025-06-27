class EventModel {
  constructor() {
    this.eventData = {
      name: "The Last Dance",
      date: "26 de Junho de 2025",
      eventDate: "2025-06-24 18:00:00",
      location: "Spotify Camp Nou, Barcelona - Espanha",
      capacity: "99.354 espectadores",
      duration: "Aproximadamente 8 horas",
      ticketPrice: "A partir de R$ 150,00",
      description:
        "Um evento histórico que marca o último encontro entre duas lendas do futebol mundial.",
      highlights: [
        "Última partida entre Messi e Cristiano Ronaldo",
        "Evento 100% beneficente",
        "Show musical no intervalo",
        "Sessão de autógrafos exclusiva",
        "Jantar beneficente com leilão",
        "Transmissão mundial ao vivo",
      ],
      teams: {
        team1: "Time de Messi - Seleção de Estrelas da América do Sul",
        team2: "Time de Ronaldo - Seleção de Estrelas da Europa",
      },
      schedule: [
        {
          time: "14:00 - 15:00",
          activity: "Abertura dos Portões e Recepção dos Torcedores",
        },
        {
          time: "15:00 - 15:30",
          activity: "Cerimônia de Abertura com Homenagens",
        },
        {
          time: "15:30 - 16:00",
          activity: "Apresentação das Equipes e Aquecimento",
        },
        {
          time: "16:00 - 17:45",
          activity: "Partida Principal: The Last Dance",
        },
        { time: "17:45 - 18:15", activity: "Intervalo com Show Musical" },
        {
          time: "18:15 - 19:00",
          activity: "Premiação e Discursos de Messi e Ronaldo",
        },
        {
          time: "19:00 - 20:00",
          activity: "Sessão de Autógrafos e Fotos com Jogadores",
        },
        {
          time: "20:00 - 22:00",
          activity: "Jantar Beneficente e Leilão de Itens Especiais",
        },
      ],
      aboutContent: {
        title: "Sobre o evento",
        subtitle:
          "Prepare-se para testemunhar um momento que entrará para a história.",
        paragraphs: [
          '"The Last Dance" é muito mais do que um jogo: é uma celebração grandiosa e inesquecível da arte do futebol. Neste evento lendário, Lionel Messi e Cristiano Ronaldo — dois dos maiores ícones que já pisaram em um gramado — se encontram pela última vez em campo, encerrando com maestria uma rivalidade que definiu uma geração inteira de fãs ao redor do mundo.',
          'Mais do que apenas um duelo entre gigantes, "The Last Dance" é um evento beneficente que une paixão, solidariedade e legado. Todo o espetáculo é dedicado a causas humanitárias, com a arrecadação sendo destinada a projetos sociais que utilizam o esporte como ferramenta de transformação de vidas em comunidades carentes. A genialidade de Messi, a força incansável de Ronaldo e a magia do futebol se unem por um propósito maior: deixar um impacto positivo que vá muito além das quatro linhas.',
          "Com uma atmosfera eletrizante, torcidas vibrando em uníssono, jogadas inesquecíveis e momentos de pura emoção, o evento promete ser um hino à grandeza, ao respeito e à esperança. Cada toque na bola, cada drible genial e cada gol espetacular será uma homenagem ao poder do esporte de unir povos, inspirar sonhos e mudar destinos.",
          "Prepare-se para presenciar o último capítulo de uma história épica — uma noite em que lendas se encontram, não apenas para competir, mas para deixar um legado eterno. The Last Dance: onde o futebol encontra seu propósito mais nobre.",
        ],
      },
    };

    this.playersData = {
      messi: {
        name: "Lionel Messi",
        logo: "M10",
        description: [
          "Lionel Messi, também conhecido como Leo Messi, é um jogador de futebol argentino amplamente considerado um dos maiores jogadores da história do esporte. Nascido em 24 de junho de 1987, em Rosário, Argentina, Messi começou sua carreira profissional no FC Barcelona, onde passou mais de 20 anos e se tornou o maior artilheiro da história do clube.",
          "Ele é conhecido por sua habilidade excepcional com a bola, visão de jogo, dribles impressionantes e capacidade de marcar gols. Messi ganhou numerosos prêmios individuais, incluindo múltiplas Bolas de Ouro, e conquistou muitos títulos com o Barcelona e a seleção argentina.",
        ],
        image:
          "https://s2-ge.glbimg.com/IegSwvonyRvdf0HsydbRpRAqgVs=/0x0:819x1024/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/m/0/TyvyVFRZCkXuqA062mqA/whatsapp-image-2022-11-26-at-20.20.59.jpeg",
      },
      cr7: {
        name: "Cristiano Ronaldo",
        logo: "CR7",
        description: [
          "Cristiano Ronaldo, frequentemente chamado de CR7, é um jogador de futebol português amplamente reconhecido como um dos melhores jogadores da história do esporte. Nascido em 5 de fevereiro de 1985, na Ilha da Madeira, Portugal, Ronaldo começou sua carreira profissional no Sporting CP antes de se transferir para o Manchester United, onde ganhou fama mundial.",
          "Ele é conhecido por sua velocidade, força física, habilidades de finalização e capacidade de marcar gols em diversas situações. Ao longo de sua carreira, Ronaldo conquistou vários prêmios individuais, incluindo múltiplas Bolas de Ouro, e teve sucesso em clubes como o Real Madrid e a Juventus, além de ser um ícone da seleção portuguesa.",
        ],
        image:
          "https://diariodorio.com/wp-content/uploads/2025/04/cristiano-ronaldo-2.jpg",
      },
    };

    this.navigationData = [
      { href: "#messi", text: "Messi" },
      { href: "#cr7", text: "Cristiano Ronaldo" },
      { href: "#about", text: "Sobre o evento" },
      { href: "#cron", text: "Cronograma" },
      { href: "#countdown", text: "Contagem Regressiva" },
      { href: "#subscription", text: "Inscrição" },
    ];

    this.socialLinks = [
      {
        href: "https://github.com/LuanRoger",
        title: "GitHub",
        svgPath:
          "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      },
    ];
  }

  getEventData() {
    return this.eventData;
  }

  getPlayersData() {
    return this.playersData;
  }

  getNavigationData() {
    return this.navigationData;
  }

  getSocialLinks() {
    return this.socialLinks;
  }

  getPlayerData(playerKey) {
    return this.playersData[playerKey] || null;
  }

  getScheduleData() {
    return this.eventData.schedule;
  }

  getAboutContent() {
    return this.eventData.aboutContent;
  }

  updateEventDate(newDate) {
    this.eventData.eventDate = newDate;
  }
}
