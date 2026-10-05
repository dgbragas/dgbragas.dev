import type { IconName } from '@dgbragas/yalatus';

import type { Locale } from '../i18n';
import type { WorkFilter } from '../work';

/** Fragment of a sentence; `accent` paints a brand colour and `strong` raises the weight. */
export type TextPart = { text: string; accent?: 'signal' | 'trace'; strong?: boolean };

export const GRID_IMAGES = [
  'og-hero',
  'ghinsights-login',
  'casa1-hero',
  'whylace-hero',
  'zup-hero',
  'donato-hero',
  'mooc-hero',
  'iolkaida-hero',
  'cc-hero',
  'chat-home',
  'community-login',
  'dchall-hero',
] as const;

export type GridImage = (typeof GRID_IMAGES)[number];

export const COMPANIES = ['digisystem', 'studos', 'caju', 'arco', 'cosmobots', 'semantix'] as const;

export const COMPANY_NAMES: Record<(typeof COMPANIES)[number], string> = {
  digisystem: 'Digisystem',
  studos: 'Studos',
  caju: 'Caju',
  arco: 'Arco',
  cosmobots: 'Cosmobots',
  semantix: 'Semantix AI',
};

/** Technologies and topics scrolled by the marquee; plate colours are the brands' own. */
export const MARQUEE_ITEMS: { icon: IconName; label: string; color: string }[] = [
  { icon: 'ai', label: 'AI Prompts', color: '#CC785C' },
  { icon: 'mcp', label: 'MCP', color: 'surface-inverse' },
  { icon: 'code', label: 'Code Connect', color: '#03BFF1' },
  { icon: 'figma', label: 'Figma', color: '#A259FF' },
  { icon: 'design-system', label: 'Design System', color: '#E2328A' },
  { icon: 'accessibility', label: 'a11y', color: '#005A9C' },
  { icon: 'react', label: 'React', color: '#61DAFB' },
  { icon: 'typescript', label: 'TypeScript', color: '#3178C6' },
  { icon: 'token', label: 'Design Tokens', color: '#FFB347' },
  { icon: 'flutter', label: 'Flutter', color: '#0553B1' },
];

type HomeCopy = {
  title: TextPart[][];
  description: TextPart[];
  cases: string;
  about: string;
  trusted: string;
  gridLabel: string;
  gridAlt: Record<GridImage, string>;
  aboutTag: string;
  aboutHint: string;
  aboutTitle: string;
  aboutText: TextPart[];
  building: string;
  buildingTags: string[];
  meLabel: string;
  meAlt: string;
  marqueeLabel: string;
  workTag: string;
  workTitle: string;
  shapesLabel: string;
  shapesHint: string;
  tabs: Record<WorkFilter, string>;
  tabsLabel: string;
  workList: string;
  previous: string;
  next: string;
  viewAll: string;
  empty: string;
};

export const HOME: Record<Locale, HomeCopy> = {
  'pt-BR': {
    title: [
      [{ text: 'Soluciono problemas' }],
      [
        { text: 'através de ' },
        { text: 'design', accent: 'trace' },
        { text: ' e ' },
        { text: 'código', accent: 'signal' },
      ],
    ],
    description: [
      { text: 'Design Engineer especializado em ' },
      { text: 'Design Systems', strong: true },
      { text: ' e ' },
      { text: 'AI Systems', strong: true },
      { text: ', com mais de 08 anos de experiência em ' },
      { text: 'Front-end', strong: true },
      { text: ' e ' },
      { text: 'UI Design', strong: true },
      {
        text: '. Em minha trajetória, entreguei soluções digitais para empresas focadas em consultoria, chatbots, big data, edtech, hrtech entre outros setores.',
      },
    ],
    cases: 'Veja meus cases',
    about: 'Quem sou',
    trusted: '‘Confiado por times de design em’',
    gridLabel: 'Amostra de interfaces que desenhei e construí',
    gridAlt: {
      'og-hero': 'Hero da OpenGalaxy, a primeira plataforma de dados Data Centric',
      'ghinsights-login': 'Tela de login do GitHub Insights em roxo',
      'casa1-hero': 'Hero da Casa 1 com fotografia e chamada para doação',
      'whylace-hero': 'Hero da Whylace sobre temáticas futurísticas',
      'zup-hero': 'Hero da Zup Innovation com oferta de carreira',
      'donato-hero': 'Hero do portfólio de Danilo Donato, engenheiro de dados',
      'mooc-hero': 'Hero da Agência MOOC reconfigurando o mercado criativo',
      'iolkaida-hero': 'Hero da Iolkaida com produtos de cuidado pessoal',
      'cc-hero': 'Hero do Code Commander ensinando a codar de maneira definitiva',
      'chat-home': 'Tela inicial de um chatbot em tons escuros',
      'community-login': 'Tela de boas-vindas à comunidade com formulário de cadastro',
      'dchall-hero': 'Capa dos Design Challenges em magenta',
    },
    aboutTag: '‘O Dg do DS’',
    aboutHint: 'desenvolvedor & designer de interfaces de são paulo — grande ABC',
    aboutTitle: 'Acredito que design é a base fundamental do código',
    aboutText: [
      { text: 'Atuando como ' },
      { text: 'Design Engineer', strong: true },
      {
        text: ', busco sempre entregar o melhor código aliado a interfaces consistentes e surpreendentes aos usuários. Para isso, ofereço serviços para ',
      },
      { text: 'Design de Interfaces', strong: true },
      { text: ', ' },
      { text: 'Construção Completa de Design Systems', strong: true },
      { text: ', ' },
      { text: 'Desenvolvimento de Interfaces Web ou Mobile', strong: true },
      { text: ' e ' },
      { text: 'Construção de AI Systems', strong: true },
      { text: '.' },
    ],
    building: 'Construindo',
    buildingTags: ['Design Systems', 'AI Systems', 'Aplicações', 'Dashboards'],
    meLabel: 'Diego ‘Dg’ Braga',
    meAlt:
      'Diego sentado em uma poltrona laranja em formato de concha, de óculos e roupa escura, olhando para o lado',
    marqueeLabel: 'Tecnologias e temas',
    workTag: 'Um trabalho constante de Evolução. Criação.',
    workTitle: 'Construindo interfaces que (realmente) causam impacto',
    shapesLabel: 'Clica aqui *',
    shapesHint: 'Gira as formas em uma direção aleatória',
    tabs: { all: 'Todos', cases: 'Cases', landing: 'Landings', portfolio: 'Portfólios' },
    tabsLabel: 'Filtrar trabalhos',
    workList: 'Trabalhos em destaque',
    previous: 'Trabalhos anteriores',
    next: 'Próximos trabalhos',
    viewAll: 'Ver todos',
    empty: 'Nenhum trabalho nesta categoria ainda.',
  },
  en: {
    title: [
      [{ text: 'I solve problems' }],
      [
        { text: 'through ' },
        { text: 'design', accent: 'trace' },
        { text: ' and ' },
        { text: 'code', accent: 'signal' },
      ],
    ],
    description: [
      { text: 'Design Engineer specialised in ' },
      { text: 'Design Systems', strong: true },
      { text: ' and ' },
      { text: 'AI Systems', strong: true },
      { text: ', with over 8 years of experience in ' },
      { text: 'Front-end', strong: true },
      { text: ' and ' },
      { text: 'UI Design', strong: true },
      {
        text: '. Along the way I have shipped digital products for companies in consulting, chatbots, big data, edtech, hrtech and other sectors.',
      },
    ],
    cases: 'See my cases',
    about: 'Who I am',
    trusted: '‘Trusted by design teams at’',
    gridLabel: 'A sample of interfaces I designed and built',
    gridAlt: {
      'og-hero': 'OpenGalaxy hero, the first Data Centric data platform',
      'ghinsights-login': 'GitHub Insights login screen in purple',
      'casa1-hero': 'Casa 1 hero with a photograph and a donation call',
      'whylace-hero': 'Whylace hero about futuristic themes',
      'zup-hero': 'Zup Innovation hero with a career offer',
      'donato-hero': 'Portfolio hero of Danilo Donato, data engineer',
      'mooc-hero': 'MOOC agency hero reshaping the creative market',
      'iolkaida-hero': 'Iolkaida hero with personal care products',
      'cc-hero': 'Code Commander hero teaching how to code for good',
      'chat-home': 'Home screen of a chatbot in dark tones',
      'community-login': 'Community welcome screen with a sign-up form',
      'dchall-hero': 'Design Challenges cover in magenta',
    },
    aboutTag: '‘The DS guy’',
    aboutHint: 'developer & interface designer from são paulo — greater ABC',
    aboutTitle: 'I believe design is the foundation of code',
    aboutText: [
      { text: 'Working as a ' },
      { text: 'Design Engineer', strong: true },
      {
        text: ', I aim to ship the best code paired with consistent, delightful interfaces. To do so, I offer ',
      },
      { text: 'Interface Design', strong: true },
      { text: ', ' },
      { text: 'End-to-end Design Systems', strong: true },
      { text: ', ' },
      { text: 'Web and Mobile Interface Development', strong: true },
      { text: ' and ' },
      { text: 'AI Systems', strong: true },
      { text: '.' },
    ],
    building: 'Building',
    buildingTags: ['Design Systems', 'AI Systems', 'Applications', 'Dashboards'],
    meLabel: 'Diego ‘Dg’ Braga',
    meAlt:
      'Diego sitting in an orange shell-shaped armchair, wearing glasses and dark clothes, looking to the side',
    marqueeLabel: 'Technologies and topics',
    workTag: 'A constant work of Evolution. Creation.',
    workTitle: 'Building interfaces that (really) make an impact',
    shapesLabel: 'Click here *',
    shapesHint: 'Spins the shapes in a random direction',
    tabs: { all: 'All', cases: 'Cases', landing: 'Landings', portfolio: 'Portfolios' },
    tabsLabel: 'Filter work',
    workList: 'Featured work',
    previous: 'Previous work',
    next: 'Next work',
    viewAll: 'View all',
    empty: 'Nothing in this category yet.',
  },
};
