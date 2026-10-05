export const LOCALES = ['pt-BR', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt-BR';

const PREFIX: Record<Locale, string> = { 'pt-BR': '', en: '/en' };

export const UI = {
  'pt-BR': {
    'nav.portfolio': 'Portfólio',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    'nav.about': 'Sobre',
    'nav.home': 'Página inicial',
    'nav.main': 'Navegação principal',
    'nav.yalatus': 'Yalatus, o design system',
    'nav.language': 'Switch to English',
    'theme.toggle': 'Tema escuro',
    'theme.hour': 'Hora atual',
    skip: 'Pular para o conteúdo',
    'footer.tagline': 'Design Engineer — Design Systems & AI Systems',
    'footer.explore': 'Explore',
    'footer.contact': 'Contate-me',
    'footer.follow': 'Acompanhe',
    'footer.email': 'E-mail',
    'footer.rights': 'Todos os direitos reservados',
    'footer.ds': 'Design System',
    'footer.coffee': 'Buy a Coffee',
    'cta.kicker': '[ já que chegou até aqui ]',
    'cta.title': 'Antes de você ir',
    'cta.blog': 'Se interessa por conteúdos sobre design, código, acessibilidade, AI Systems e DS?',
    'cta.blogLink': 'Dê uma olhada no meu blog',
    'cta.recent': 'Post recente',
    'cta.quote': 'Consultoria em Design Systems e AI Systems.',
    'cta.start': 'Vamos começar',
    'cta.closing': 'Fim do telefone-sem-fio. Bora criar algo juntos?',
    'cta.send': 'Enviar e-mail',
    'cta.copy': 'Copiar e-mail',
    'cta.copied': 'E-mail copiado',
  },
  en: {
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'nav.home': 'Home page',
    'nav.main': 'Main navigation',
    'nav.yalatus': 'Yalatus, the design system',
    'nav.language': 'Mudar para português',
    'theme.toggle': 'Dark theme',
    'theme.hour': 'Current hour',
    skip: 'Skip to content',
    'footer.tagline': 'Design Engineer — Design Systems & AI Systems',
    'footer.explore': 'Explore',
    'footer.contact': 'Contact me',
    'footer.follow': 'Follow',
    'footer.email': 'E-mail',
    'footer.rights': 'All rights reserved',
    'footer.ds': 'Design System',
    'footer.coffee': 'Buy a Coffee',
    'cta.kicker': '[ since you made it this far ]',
    'cta.title': 'Before you go',
    'cta.blog': 'Into design, code, accessibility, AI Systems and DS?',
    'cta.blogLink': 'Take a look at my blog',
    'cta.recent': 'Latest post',
    'cta.quote': 'Design Systems and AI Systems consulting.',
    'cta.start': "Let's start",
    'cta.closing': "No more broken telephone. Let's build something together?",
    'cta.send': 'Send e-mail',
    'cta.copy': 'Copy e-mail',
    'cta.copied': 'E-mail copied',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof UI)['pt-BR'];

/**
 * Reads the locale from the first path segment.
 * @param pathname - Path of the current URL
 * @returns `en` for paths under `/en`, the default locale otherwise
 * @example
 * getLocale('/en/blog') // 'en'
 */
export function getLocale(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LOCALE;
}

/**
 * Returns the UI string for a key in a locale, falling back to the default locale.
 * @param locale - Locale to translate into
 * @returns A function that maps a key to its text
 * @example
 * t('en')('nav.blog') // 'Blog'
 */
export function t(locale: Locale): (key: UiKey) => string {
  return key => UI[locale][key] ?? UI[DEFAULT_LOCALE][key];
}

/**
 * Builds a path for a locale, adding or removing the `/en` prefix.
 * @param locale - Target locale
 * @param path - Path without locale prefix, starting with `/`
 * @returns The localised path without trailing slash
 * @example
 * localizePath('en', '/blog') // '/en/blog'
 * localizePath('pt-BR', '/') // '/'
 */
export function localizePath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return `${PREFIX[locale]}${clean}` || '/';
}

/**
 * Strips the locale prefix from a path so the same page can be addressed in another locale.
 * @param pathname - Path of the current URL
 * @returns The path without `/en`, always starting with `/`
 * @example
 * stripLocale('/en/blog') // '/blog'
 */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '');
  return stripped || '/';
}

/**
 * Gives the other locale of the site.
 * @param locale - Current locale
 * @returns The locale the language switch leads to
 * @example
 * alternateLocale('pt-BR') // 'en'
 */
export function alternateLocale(locale: Locale): Locale {
  return locale === 'en' ? DEFAULT_LOCALE : 'en';
}
