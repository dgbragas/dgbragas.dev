import type { Locale } from '../i18n';

export const HINTS = ['horizon', 'livestreams', 'gym'] as const;
export type HintName = (typeof HINTS)[number];

/** Fragment of the bio; `hint` names the image that follows the pointer over the fragment. */
export type BioPart = { text: string; strong?: boolean; hint?: HintName };

export const COMPANY_IDS = [
  'caju',
  'arco',
  'studos',
  'semantix',
  'cosmobots',
  'digisystem',
] as const;
export type CompanyId = (typeof COMPANY_IDS)[number];

/** Brand colour of each company plate, taken from the brands themselves. */
export const COMPANY_COLORS: Record<CompanyId, string> = {
  caju: '#E80837',
  arco: '#F05A41',
  studos: '#349DF7',
  semantix: '#8938FD',
  cosmobots: '#6B3FA0',
  digisystem: '#22397D',
};

type Company = { id: CompanyId; name: string; position: string; period: string };

type Metric = { value: number; prefix?: string; suffix?: string; label: string };

type Service = { title: string; description: string; detail: string };

type AboutCopy = {
  title: string;
  description: string;
  heroWord: string;
  heroAlt: { left: string; right: string };
  numbers: Metric[];
  tag: string;
  heading: string;
  bio: BioPart[][];
  hints: Record<HintName, string>;
  portraitAlt: string;
  experience: string;
  companies: Company[];
  workflowTag: string;
  workflowTitle: string[];
  solutions: string;
  premise: string;
  services: Service[];
};

export const ABOUT: Record<Locale, AboutCopy> = {
  'pt-BR': {
    title: 'Sobre',
    description:
      'Design Engineer do Grande ABC, com mais de 8 anos entre Front-end, UI Design, Design Systems e AI Systems.',
    heroWord: 'Sobre',
    heroAlt: {
      left: 'Diego em preto e branco, de camiseta escura, encostado em uma parede com a mão no bolso',
      right: 'Diego em preto e branco, de boné, segurando o celular em frente a um espelho',
    },
    numbers: [
      { value: 92, suffix: '%', label: 'de adoção média design systems' },
      { value: 4, prefix: '+', suffix: 'M', label: 'usuários impactados' },
      { value: 16, prefix: '+', label: 'marcas atendidas nos projetos' },
      { value: 8, prefix: '+', label: 'anos no mercado de tecnologia' },
      { value: 6, prefix: '+', label: 'empresas trabalhadas' },
    ],
    tag: 'Diego ‘Dg’ Braga',
    heading: 'Design Engineer focado em construir Design Systems e AI Systems',
    bio: [
      [
        { text: 'Natural da região do ' },
        { text: 'Grande ABC', strong: true },
        { text: ', em São Paulo, iniciei minha jornada em tecnologia ao me formar em ' },
        { text: 'Análise e Desenvolvimento de Sistemas', strong: true },
        { text: ' pela SPTech.' },
      ],
      [
        { text: 'Com mais de ' },
        { text: '08 anos de experiência', strong: true },
        { text: ' no mercado, atuei como ' },
        { text: 'Front-end Developer', strong: true },
        { text: ' e ' },
        { text: 'UI Designer', strong: true },
        {
          text: ' em diferentes segmentos, incluindo Consultoria, Chatbots, Desenvolvimento de PaaS/SaaS, Big Data, EdTech e HRTech. Hoje, atuo em ',
        },
        { text: 'Design Systems', strong: true },
        { text: ' e ' },
        { text: 'AI Systems', strong: true },
        { text: ', entregando soluções que unem Design, Código e Inteligência Artificial.' },
      ],
      [
        { text: 'Apaixonado por games (carinho especial por ' },
        { text: 'Horizon', hint: 'horizon' },
        { text: '), ' },
        { text: 'livestreams', hint: 'livestreams' },
        { text: ' e frequentador de ' },
        { text: 'academia', hint: 'gym' },
        { text: '.' },
      ],
    ],
    hints: {
      horizon: 'Aloy em uma paisagem de Horizon',
      livestreams: 'Diego ao vivo em uma livestream',
      gym: 'Diego na academia',
    },
    portraitAlt: 'Diego sentado em uma poltrona laranja, recortado em uma forma orgânica',
    experience: 'Experiência',
    companies: [
      {
        id: 'caju',
        name: 'Caju Benefícios',
        position: 'Senior Front-end Developer',
        period: 'Agosto 2025 → Atualmente',
      },
      {
        id: 'arco',
        name: '‘Arcotech’ by Arco Educação',
        position: 'Remote Software Engineer',
        period: 'Setembro 2021 → Janeiro 2025',
      },
      {
        id: 'studos',
        name: 'Studos',
        position: 'Remote Front-end Engineer',
        period: 'Janeiro 2021 → Setembro 2021',
      },
      {
        id: 'semantix',
        name: 'Semantix',
        position: 'Programador Front-end',
        period: 'Novembro 2019 → Janeiro 2021',
      },
      {
        id: 'cosmobots',
        name: 'CosmoBots',
        position: 'Desenvolvedor Front-end',
        period: 'Agosto 2019 → Novembro 2019',
      },
      {
        id: 'digisystem',
        name: 'Digisystem',
        position: 'Estagiário em desenvolvimento frontend',
        period: 'Julho 2018 → Julho 2019',
      },
    ],
    workflowTag: 'Workflow',
    workflowTitle: ['O que eu faço?', 'Veja minhas premissas'],
    solutions: 'Soluções completas do design ao código',
    premise:
      'Construindo código com base em design. Escalando soluções através de estruturas IA-Based',
    services: [
      {
        title: 'Design',
        description: 'Qualidade code-ready na construção das UIs',
        detail: 'Tokens organizados, componentes adaptativos e estrutura MCP-ready',
      },
      {
        title: 'Código',
        description: 'Código seguindo padrões acessíveis e de clean code',
        detail: 'WCAG 2.2 com piso AA e organização escalável para evoluções médio-longo prazo',
      },
      {
        title: 'AI System',
        description: 'Regras de design, código e conteúdo aplicadas para IA',
        detail: 'Skills, AI Prompts e AI Review, da criação de tela até a revisão do seu código',
      },
    ],
  },
  en: {
    title: 'About',
    description:
      'Design Engineer from Greater ABC, São Paulo, with over 8 years across Front-end, UI Design, Design Systems and AI Systems.',
    heroWord: 'About',
    heroAlt: {
      left: 'Diego in black and white, in a dark t-shirt, leaning on a wall with a hand in his pocket',
      right: 'Diego in black and white, wearing a cap, holding his phone in front of a mirror',
    },
    numbers: [
      { value: 92, suffix: '%', label: 'average design system adoption' },
      { value: 4, prefix: '+', suffix: 'M', label: 'users reached' },
      { value: 16, prefix: '+', label: 'brands served across projects' },
      { value: 8, prefix: '+', label: 'years in the tech industry' },
      { value: 6, prefix: '+', label: 'companies worked at' },
    ],
    tag: 'Diego ‘Dg’ Braga',
    heading: 'Design Engineer focused on building Design Systems and AI Systems',
    bio: [
      [
        { text: 'Born in the ' },
        { text: 'Greater ABC', strong: true },
        { text: ' region of São Paulo, I started in tech with a degree in ' },
        { text: 'Systems Analysis and Development', strong: true },
        { text: ' from SPTech.' },
      ],
      [
        { text: 'With over ' },
        { text: '8 years of experience', strong: true },
        { text: ', I have worked as a ' },
        { text: 'Front-end Developer', strong: true },
        { text: ' and ' },
        { text: 'UI Designer', strong: true },
        {
          text: ' across Consulting, Chatbots, PaaS/SaaS, Big Data, EdTech and HRTech. Today I work on ',
        },
        { text: 'Design Systems', strong: true },
        { text: ' and ' },
        { text: 'AI Systems', strong: true },
        {
          text: ', shipping solutions that bring Design, Code and Artificial Intelligence together.',
        },
      ],
      [
        { text: 'Passionate about games (with a soft spot for ' },
        { text: 'Horizon', hint: 'horizon' },
        { text: '), ' },
        { text: 'livestreams', hint: 'livestreams' },
        { text: ' and a regular at the ' },
        { text: 'gym', hint: 'gym' },
        { text: '.' },
      ],
    ],
    hints: {
      horizon: 'Aloy in a Horizon landscape',
      livestreams: 'Diego live on a stream',
      gym: 'Diego at the gym',
    },
    portraitAlt: 'Diego sitting in an orange armchair, cut out in an organic shape',
    experience: 'Experience',
    companies: [
      {
        id: 'caju',
        name: 'Caju Benefícios',
        position: 'Senior Front-end Developer',
        period: 'August 2025 → Present',
      },
      {
        id: 'arco',
        name: '‘Arcotech’ by Arco Educação',
        position: 'Remote Software Engineer',
        period: 'September 2021 → January 2025',
      },
      {
        id: 'studos',
        name: 'Studos',
        position: 'Remote Front-end Engineer',
        period: 'January 2021 → September 2021',
      },
      {
        id: 'semantix',
        name: 'Semantix',
        position: 'Front-end Developer',
        period: 'November 2019 → January 2021',
      },
      {
        id: 'cosmobots',
        name: 'CosmoBots',
        position: 'Front-end Developer',
        period: 'August 2019 → November 2019',
      },
      {
        id: 'digisystem',
        name: 'Digisystem',
        position: 'Front-end development intern',
        period: 'July 2018 → July 2019',
      },
    ],
    workflowTag: 'Workflow',
    workflowTitle: ['What do I do?', 'Here are my premises'],
    solutions: 'End-to-end solutions from design to code',
    premise: 'Building code grounded in design. Scaling solutions through AI-based structures',
    services: [
      {
        title: 'Design',
        description: 'Code-ready quality when building UIs',
        detail: 'Organised tokens, adaptive components and an MCP-ready structure',
      },
      {
        title: 'Code',
        description: 'Code that follows accessibility and clean code standards',
        detail:
          'WCAG 2.2 with AA as the floor and a scalable structure for mid and long-term growth',
      },
      {
        title: 'AI System',
        description: 'Design, code and content rules applied to AI',
        detail:
          'Skills, AI Prompts and AI Review, from the first screen to the review of your code',
      },
    ],
  },
};
