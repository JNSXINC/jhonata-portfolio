export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  gallery: { file: string; title: string }[];
  features: { title: string; description: string }[];
  extraTitle?: string;
  extraParagraphs?: string[];
  website?: string;
};

export const projects: Project[] = [
  {
    id: "gamelabs",
    number: "01",
    name: "GameLabs",
    category: "Desktop Application",
    description:
      "Launcher de jogos para PC com integração a emuladores, suporte a controles, biblioteca centralizada e sistema de licenciamento.",
    stack: ["React", "TypeScript", "Electron"],
    image: "/images/Gamelabs.png",
    gallery: [
      { file: "biblioteca.png", title: "Biblioteca de jogos" },
      { file: "emuladores.png", title: "Gerenciamento de emuladores" },
      { file: "bios.png", title: "BIOS Manager" },
      { file: "desempenho.png", title: "Desempenho e controles" },
      { file: "perfil.png", title: "Perfil do jogador" },
      { file: "licencas.png", title: "Administração de licenças" },
      { file: "ativacao.png", title: "Ativação do GameLabs" },
    ],
    features: [
      {
        title: "Biblioteca centralizada",
        description:
          "Organização de jogos, favoritos, pesquisa e acesso rápido aos títulos.",
      },
      {
        title: "Integração com emuladores",
        description:
          "Configuração de PCSX2, PPSSPP, DuckStation, RetroArch e Dolphin.",
      },
      {
        title: "BIOS Manager",
        description: "Gerenciamento de arquivos BIOS dos sistemas compatíveis.",
      },
      {
        title: "Suporte a controles",
        description:
          "Navegação com gamepad, teclado e integração com DS4Windows.",
      },
      {
        title: "Perfis de desempenho",
        description: "Detecção de hardware e opções de configuração.",
      },
      {
        title: "Perfil do jogador",
        description: "Personalização de avatar, biblioteca e favoritos.",
      },
    ],
    extraTitle: "Sistema de licenciamento",
    extraParagraphs: [
      "O GameLabs possui um sistema próprio de licenciamento, com ativação vinculada ao dispositivo por identificação digital (fingerprint), validação de licença e período de experimentação.",
      "O painel administrativo permite emitir licenças, consultar registros, acompanhar estados e executar ações de revogação e reativação.",
    ],
  },
  {
    id: "azevedo-calcados",
    number: "02",
    name: "Azevedo Calçados",
    category: "E-commerce & Admin",
    description:
      "Loja virtual de calçados com catálogo interativo, filtros, carrinho de compras, pedidos via WhatsApp e painel administrativo.",
    stack: ["React", "TypeScript", "Supabase"],
    image: "/projects/azevedo-calcados/home.png",
    website: "https://674a3d61.azevedo-calcados.pages.dev/",
    gallery: [
      { file: "home.png", title: "Página inicial" },
      { file: "destaques.png", title: "Produtos em destaque" },
      { file: "catalogo.png", title: "Catálogo e filtros" },
      { file: "produto.png", title: "Detalhes do produto" },
      { file: "carrinho.png", title: "Carrinho de compras" },
      { file: "checkout.png", title: "Finalização de pedido" },
      { file: "admin-dashboard.png", title: "Dashboard administrativo" },
      { file: "admin-produtos.png", title: "Gerenciamento de produtos" },
      { file: "admin-cadastro.png", title: "Cadastro de produtos" },
      { file: "admin-pedidos.png", title: "Gerenciamento de pedidos" },
    ],
    features: [
      {
        title: "Catálogo interativo",
        description: "Busca, filtros por categoria e seleção de produtos.",
      },
      {
        title: "Carrinho de compras",
        description: "Seleção de numeração, quantidades e resumo do pedido.",
      },
      {
        title: "Finalização via WhatsApp",
        description:
          "Formulário de pedido com encaminhamento para atendimento.",
      },
      {
        title: "Painel administrativo",
        description: "Interface separada para gerenciar produtos e estoque.",
      },
      {
        title: "Gerenciamento de pedidos",
        description: "Consulta e acompanhamento dos pedidos registrados.",
      },
      {
        title: "Integração com Supabase",
        description: "Autenticação e persistência de dados da aplicação.",
      },
    ],
  },
  {
    id: "mazinho-oliver",
    number: "03",
    name: "Mazinho Oliver",
    category: "Photography Portfolio",
    description:
      "Portfólio fotográfico com galerias por categoria, visualização de imagens, serviços e integração com WhatsApp.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    image: "/projects/mazinho-oliver/home.png",
    website: "https://mazinho-oliver-fotografia.pages.dev/",
    gallery: [
      { file: "home.png", title: "Página inicial" },
      { file: "sobre.png", title: "Apresentação do fotógrafo" },
      { file: "galeria.png", title: "Galeria de projetos" },
      { file: "categorias.png", title: "Categorias fotográficas" },
      { file: "servicos.png", title: "Serviços e pacotes" },
      { file: "servicos-extras.png", title: "Serviços adicionais" },
      { file: "contato.png", title: "Contato e orçamento" },
    ],
    features: [
      {
        title: "Galerias fotográficas",
        description: "Projetos organizados por categorias e eventos.",
      },
      {
        title: "Filtros interativos",
        description: "Navegação entre diferentes tipos de ensaios.",
      },
      {
        title: "Visualizador de imagens",
        description: "Ampliação e navegação pelas fotografias.",
      },
      {
        title: "Catálogo de serviços",
        description: "Pacotes fotográficos e informações de investimento.",
      },
      {
        title: "Integração com WhatsApp",
        description: "Solicitação de orçamentos diretamente pelo site.",
      },
      {
        title: "Design responsivo",
        description: "Interface adaptada a computadores e dispositivos móveis.",
      },
    ],
  },
];
