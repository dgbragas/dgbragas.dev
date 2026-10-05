# Plano de reconstrução — dgbragas.dev

> Documento vivo. Consolidado em 2026-10-04 a partir do repositório atual, das regras do `castanha-ai`, do backup do `website-content-manager`, dos arquivos do Figma (`-dgbragas-yalatus` e `-dgbragas-ui`) e do vídeo de referência de transições.

## 1. Decisões fechadas

| Tema              | Decisão                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gerenciador       | Yarn 4 (Berry) com `nodeLinker: node-modules`, binário pinado em `.yarn/releases` e commitado. Sem corepack, sem PnP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Estrutura         | Monorepo com workspaces: `packages/yalatus` (o mini design system chama **Yalatus**, pacote `@dgbragas/yalatus`, prefixo CSS `yl-`) e `apps/site` (Astro).                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Framework         | Astro 7 + React 19 para ilhas. Node 22+. TypeScript fica em 5.9 até typescript-eslint e `astro check` suportarem a API do TypeScript 7.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Fluxo git         | Trabalho direto na `main`. Primeiro commit é só o cleanup do site antigo, os seguintes são features.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Render            | 100% estático. Busca, filtros e "carregar mais" rodam no cliente sobre JSON gerado no build.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Host              | Cloudflare Workers com static assets. DNS de `dgbragas.dev` migra para a Cloudflare. Storybook do Yalatus em `yalatus.dgbragas.dev`, em Worker separado e com `noindex`, para não disputar crawl nem diluir o domínio principal.                                                                                                                                                                                                                                                                                                                                                                             |
| Conteúdo          | Content Collections locais (Content Layer API). Migração a partir de `website-content-manager/exports/content`. Strapi e `admin.dgbragas.dev` deixam de existir.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Páginas removidas | `/daily-ui` e `/whatt-if`. As 3 entradas de Daily UI entram no portfólio como itens normais. `/ui-kits` não será construída.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Animação          | GSAP + ScrollTrigger + Lenis (pacote `lenis`). Transição de página pelo `ClientRouter` do Astro.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Lint              | Config local: ESLint 9 flat, Prettier 3, Stylelint, Husky, lint-staged, commitlint. Sem `@whatt-if`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Tema por hora     | Hora local do visitante. Light das 6h às 18h, dark no restante. Escolha manual fica memorizada; o marcador de hora sempre volta para a hora corrente no reload.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Cases             | Collection `cases` com schema completo e 1 case de exemplo em draft.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| RSS               | `/rss.xml` geral (blog + portfólio + cases) mais `/blog/rss.xml` e `/portfolio/rss.xml`. Autodiscovery no `<head>`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Relacionados      | Campo opcional `related` no frontmatter. Sem ele, fallback por tags em comum e recência, excluindo o item atual.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Idioma            | i18n com pt-BR como base (sem prefixo) e `/en/` em inglês, via `i18n` nativo do Astro com `fallback: { en: 'pt-BR' }` e `fallbackType: 'rewrite'`: cada página existe uma vez em `src/pages` e o build gera `/en/*` a partir dela, inclusive rotas dinâmicas. Layout e páginas leem `Astro.currentLocale` e `Astro.originPathname` (não `Astro.url`) e pegam a cópia no dicionário de `src/lib/i18n.ts` ou no campo `locale` da collection. Um arquivo em `src/pages/en/` só quando uma página em inglês precisar de estrutura diferente. O globo da Nav Bar troca o idioma. Objetivo: SEO nas duas línguas. |
| Contato           | Página `/contato` (e `/en/contact`) própria. Nesta fase nasce só com título e layout base. 'Contato' na Nav Bar e o CTA 'Fim do telefone-sem-fio' apontam para ela.                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## 2. Fontes consultadas

- Repositório atual: Astro 5.2, React 19, `output: 'server'` na Vercel, pnpm, `@studio-freight/lenis` (deprecado), AOS, `@whatt-if/*` via GitHub Packages. Tokens em variáveis Sass. Sem testes, sem stories. O `TopMenu` já lê `--theme` da seção visível, base do header reativo.
- `castanha-ai`: regras de autoria em `/Users/diego.silva/Documents/www/castanha/castanha-ai/base/react/authoring/` (`00-architecture` a `08-registry`, `g-accessibility`, `g-comments-jsdoc`, `g-imports`, `g-responsiveness`) e exemplos reais em `castanha/packages/castanha-react/src/components/{Button,Badge}`.
- `website-content-manager`: Strapi 5.3. HEAD é o backup de 30/09/2026: 4 posts (série a11y, corpo em Markdown, intro em blocks), 13 cards de portfólio (sem corpo, 2 privados), 3 daily-ui (1 draft), 146 mídias com `manifest.json`.
- Figma `-dgbragas-ui`, página Draft (`1:1279`): 9 telas de 1440 (`~/`, `~/is`, `~/ui-kits`, `~/portfolio`, `~/portfolio/[hash]`, `~/case/[hash]`, `~/blog`, `~/blog/[hash]`, `~/404`), 3 grids, Nav Bar flutuante 592x64, Footer 1440x669, Tooltip simples e 30 famílias de componentes.
- Figma `-dgbragas-yalatus`, página Cores (`1:1272`): frames `Primitive Colors` (substrate, signal, trace, status red/green/amber, gradient, base) e `Alias Colors` (background, surface, foreground, on, action, border, com sub-tabelas de states, contextual e focus).
- Vídeo `Screen Recording 2026-10-04 at 21.31.49.mov` (10,5 s): cortina escura subindo na troca de página, título revelado por máscara, parágrafos ganhando contraste palavra a palavra, BigNumbers contando, grid de logos com fade escalonado, seção dark entre seções light.

## 3. Estrutura do repositório

```
dgbragas.dev/
├── .yarnrc.yml                 # nodeLinker: node-modules
├── .yarn/releases/             # yarn-4.x.cjs commitado
├── package.json                # workspaces: packages/*, apps/*
├── docs/                       # este plano e decisões
├── CLAUDE.md                   # regras de autoria adaptadas do castanha-ai
├── packages/
│   └── ds/                     # @dgbragas/ds
│       ├── src/
│       │   ├── tokens/         # JSON exportado do Figma + build para CSS custom properties
│       │   ├── styles/         # reset, base, mixins (focus-ring, motion, breakpoints, grid)
│       │   ├── components/     # um diretório por componente (anatomia abaixo)
│       │   ├── hooks/          # useBreakpoint, useReducedMotion, useTheme, useCountUp…
│       │   ├── helpers/        # types.helpers (MergeProps), clsx wrappers, formatters
│       │   └── index.ts
│       ├── .storybook/         # Storybook 10 react-vite + addon-a11y + addon-vitest
│       ├── vitest.config.ts    # coverage 100% em branches/functions/lines/statements
│       └── package.json
└── apps/
    └── site/                   # @dgbragas/site
        ├── astro.config.mjs
        ├── src/
        │   ├── content.config.ts
        │   ├── content/        # posts/, portfolio/, cases/ (Markdown + imagens co-localizadas)
        │   ├── layouts/
        │   ├── components/     # composições do site (Header, Footer, seções)
        │   ├── pages/
        │   ├── lib/            # related, search index, rss, theme script
        │   └── styles/
        ├── scripts/
        │   └── migrate-strapi.ts   # exports/content → content collections
        ├── e2e/                # Playwright + axe
        └── package.json
```

Fronteira: `apps/site` importa de `@dgbragas/ds`. O DS nunca importa do site. Regra verificada por ESLint (`import-x/no-restricted-paths`).

## 4. Stack alvo

| Camada    | Escolha                                                                                                                                                                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build     | Astro 7 (Vite 8, compilador Rust, Markdown por Sätteri), TypeScript 5.9, Sass. Fonts API do Astro para Inter, Heebo e Fira Code locais.                                                                                                                                         |
| UI        | React 19 só em ilhas. Radix UI Primitives onde houver overlay ou roving focus.                                                                                                                                                                                                  |
| Motion    | GSAP + ScrollTrigger, Lenis, ClientRouter do Astro. Mixins de motion com fallback de `prefers-reduced-motion`.                                                                                                                                                                  |
| Conteúdo  | Content Layer com `glob()`, `image()` no schema, `astro:assets` para `<Image>`/`<Picture>`. MDX só se o blog pedir componentes dentro do texto.                                                                                                                                 |
| Testes    | Vitest + Testing Library + `vitest-axe` para React. Container API do Astro para `.astro`. Storybook 10 com addon-vitest (browser mode) e addon-a11y. Playwright + `@axe-core/playwright` para e2e em light e dark.                                                              |
| Qualidade | ESLint 10 flat (typescript-eslint, react, react-hooks, jsx-a11y, import-x, astro), Prettier 3 + plugin-astro, Stylelint 17 (scss standard + order), Husky, lint-staged, commitlint conventional com escopo obrigatório (`yalatus`, `site`, `content`, `tooling`, `ci`, `docs`). |
| CI/CD     | GitHub Actions: lint, `astro check`, testes com cobertura, build do site, build do Storybook, Playwright. Deploy do site e do Storybook por `wrangler` na Cloudflare.                                                                                                           |

Versões no registry em 2026-10-04: astro 7.3.5, @astrojs/react 7.0.0, @astrojs/cloudflare 14.3.3, @astrojs/rss 4.0.19, @astrojs/sitemap 3.7.4, react 19.3.0, lenis 1.3.26, gsap 3.15.0, sass 1.105.1, vitest 5.0.3, storybook 10.6.1, eslint 10.12.0, prettier 3.9.9, stylelint 17.16.0, @playwright/test 1.63.0, radix-ui 1.6.7, embla-carousel-react 8.6.0. TypeScript latest é 7.0.2, mas fica pinado em 5.9.x. Pacotes substituídos: `@studio-freight/lenis` → `lenis`, `aos` → GSAP/ScrollTrigger, `highlight.js` + `marked` → Shiki nativo do Astro, `@astrojs/vercel` → `@astrojs/cloudflare` apenas se surgir rota dinâmica.

## 5. Convenções de componente (adaptadas do castanha-ai)

Anatomia:

```
components/<Nome>/
  <Nome>.component.tsx
  <Nome>.types.ts
  <Nome>.styles.scss
  index.ts
  __tests__/<Nome>.component.test.tsx
  docs/<Nome>.stories.tsx
  docs/<Nome>.mdx
  (opcionais) <Nome>.helpers.ts, .constants.ts, .hooks.ts, .context.tsx, assets/
```

- Tipos: interno `Dg<Nome>` com `BaseComponentProps`; público `<Nome>Props = MergeProps<Dg<Nome>, HTMLAttributes<Elemento real>>`.
- Taxonomia de props: `appearance`, `kind`, `size`, `orientation`, `leadIcon`, `trailingIcon`, `trailingItem`, `open`, `active`, `selected`, `error: boolean`, `supportingMessage`, `label`, `disabled`. Eixo de variação é enum, nunca boolean nova. Props que só fazem sentido juntas viram discriminated union. Controlled e uncontrolled desde o início. JSDoc em toda prop, com `@default`.
- Estilo: SCSS global BEM com prefixo `dg-`, `clsx` antes do `return`, layout por primitives (`Box`, `Stack`, `Grid`) e não no SCSS, só `var(--dg-*)`, marca `// TOKEN:` quando faltar token, `:focus-visible` com mixin `focus-ring`, propriedades em ordem alfabética com `transition`/`animation` por último.
- Motion: componentes não escrevem tempo. Usam `@include motion-transition(prop, duração-da-escala, easing-da-escala)`. Keyframes documentados em linha. Saída de overlay com `isExiting` e `prefersReducedMotion() ? 0 : DURATION`.
- Testes: `describe('<Nome>.component')` com `when render`, `when receive props`, `when handling actions`, `when handling edge cases`, `when validating accessibility`. `userEvent`, `toHaveFocus`, `axe` em todo componente, teste de dependência circular, sem warnings de `act()`.
- Stories: `Basic` primeiro, argTypes em MODIFICADORES, ATRIBUTOS, COMPORTAMENTO, MENSAGENS, EVENTOS, AVANÇADO. `parameters.design` aponta para o node do Figma.
- Registro: `src/index.ts` e `component-stories.json`. Sem size-limit nesta fase.
- Gerador: `yarn new:component` com Plop, templates copiados e adaptados do castanha-react.

Normalização de nomes vindos do Figma: `apperance` → `appearance`, `presed` → `pressed`, `convertion` → `conversion`, `inverse`/`inverted` → `inverse`.

## 6. Tokens e theming

- Fonte: variáveis do Figma yalatus exportadas em JSON (plugin), mais text styles e effects lidos pela REST API.
- Build: script em `packages/ds/src/tokens/` gera `tokens.css` com três camadas: primitivas (`--dg-color-substrate-100`), alias por modo (`--dg-color-background`, `--dg-color-foreground`, `--dg-color-action`, `--dg-color-border`, `--dg-color-focus`…) e contextuais.
- Modos: `html[data-theme="light" | "dark"]`. Definidos por mixins `theme-light` e `theme-dark`.
- Inversão por seção: `.yl-theme-inverse` reaplica o mixin oposto ao tema do `html`. É isso que faz seções alternarem e o hero da home começar invertido.
- Sem flash de tema: script inline no `<head>` lê `localStorage.theme`; se ausente, calcula pela hora local (6h–18h light). O `ClientRouter` reexecuta esse script a cada navegação.
- Header reativo: lê `data-theme-scope` da seção sob o header via ScrollTrigger e troca a própria classe. Glass: `backdrop-filter: blur()` sobre `--dg-color-surface-glass` (cor + alpha token) e borda `--dg-color-border-glass`, com fallback para `prefers-reduced-transparency` e para navegadores sem `backdrop-filter`.
- Focus ring global: `:focus-visible { outline: 2px solid var(--dg-color-focus); outline-offset: 2px }` com contraste 3:1 validado nos dois temas. Elementos sticky recebem `scroll-margin-top` igual à altura do header mais o respiro.
- Links: `text-decoration: none` e `::after` de 1px em `--dg-color-border-strong` posicionado logo abaixo da linha. Hover e focus animam a largura.
- Tipografia: text styles do Figma viram `--dg-font-*` e mixins `typography(<nome>)`. Fira Code para código.
- Grids: `Grid Web`, `Grid Tablet` e `Grid Mobile` definem container (1216 de conteúdo em 1440), gutters e spacing. Conteúdo nunca passa do grid web.

## 7. Conteúdo

### Collections

| Collection  | Origem                                     | Campos principais                                                                                                                                                                                                             |
| ----------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `posts`     | `exports/content/posts`                    | `title`, `slug`, `description` (intro convertida), `tags`, `section`, `readTime`, `cover` (`image()`), `publishedAt`, `updatedAt`, `related` (slugs), `draft`. Corpo em Markdown com imagens reescritas para arquivos locais. |
| `portfolio` | `exports/content/portfolios` + `daily-uis` | `title`, `slug`, `description`, `kind: 'project' \| 'daily-ui'`, `tags`, `cover`, `gallery`, `url` externa, `private`, `publishedAt`, `related`, `draft`.                                                                     |
| `cases`     | novo                                       | `title`, `slug`, `client`, `role`, `period`, `summary`, `cover`, `results` (lista de `{ value, suffix, label }` para BigNumber), `sections`, `tags`, `related`, `draft`.                                                      |

### Migração

`apps/site/scripts/migrate-strapi.ts` lê `exports/content/index.json`, converte `intro` (blocks) em Markdown, reescreve URLs `*.media.strapiapp.com` usando `manifest.json`, copia mídias para `src/content/<collection>/<slug>/`, gera frontmatter tipado e marca drafts. Script idempotente e testado com fixtures.

### Listagens e busca

- Build gera `/_data/<collection>.json` com campos leves para busca e paginação no cliente.
- Blog: o post mais recente é o destaque (Blog Card expandido).
- Portfólio e blog carregam em lotes (ex.: 9 itens) com botão "Carregar mais" e prefetch por IntersectionObserver. Sem infinite scroll puro, para manter o footer alcançável.
- Busca: IconButton de search expande para input de 312px dentro do bloco de navegação. Filtra o JSON local. Mensagem "Nenhum resultado para essa busca" em região `aria-live="polite"`.

## 8. Páginas e comportamentos

| Item                   | Comportamento                                                                                                              | Abordagem técnica                                                                                                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0 Seções opostas       | Seções alternam dark/light e o inverso muda com o tema                                                                     | `.yl-theme-inverse` por seção + `data-theme-scope` para o header                                                                                                                                                                                                   |
| 0.1 Grids              | Container até o grid web                                                                                                   | Mixins de container e spacing gerados dos 3 grids                                                                                                                                                                                                                  |
| 0.2 Footer 24h         | Barra em 24 partes, extremidades dark, meio light, hora corrente marcada, clique troca tema                                | Ilha React `ThemeDial`: `role="radiogroup"` com 2 opções (light/dark) e os 24 segmentos como visual, marcador posicionado por `Date` local, persistência em `localStorage`                                                                                         |
| 0.3 Conteúdo           | Local                                                                                                                      | Seção 7                                                                                                                                                                                                                                                            |
| 0.4 Header glass       | Bordas corretas, bg + alpha token                                                                                          | Seção 6                                                                                                                                                                                                                                                            |
| 0.4.1 Header reativo   | Dark sobre dark, light sobre light                                                                                         | ScrollTrigger por seção com `onToggle`                                                                                                                                                                                                                             |
| 1 Home hero            | Grid ocupa 100% da tela, encolhe até o container com o scroll; tema invertido até um ponto do scroll                       | ScrollTrigger com `scrub` animando `--hero-scale` e `--hero-radius`; segundo trigger troca `.yl-theme-inverse`; sem scroll-jacking, só CSS variables                                                                                                               |
| 1.1 Tooltip flutuante  | Segue o mouse com conteúdo extra                                                                                           | Componente `CursorHint` (`kind: 'text' \| 'image'`), posicionado por `requestAnimationFrame` com `translate3d`; no toque e no teclado vira tooltip ancorado acessível (`aria-describedby`)                                                                         |
| 1.1.1 "o dg do ds"     | Hover mostra "desenvolvedor & designer de interfaces de são paulo — grande ABC"                                            | `CursorHint kind="text"`                                                                                                                                                                                                                                           |
| 1.2 "clica aqui"       | Shape gira aleatório a cada clique                                                                                         | Botão com `aria-label`, GSAP `rotate`/`rotateY` sorteados (90/180/270/360, eixo X/Y/Z), nunca repete o anterior, reduced-motion aplica o estado final sem animar                                                                                                   |
| 1.2.1 Arrows           | Lista horizontal navega para esquerda/direita                                                                              | `Carousel` com Embla ou scroll-snap nativo + botões, `aria-roledescription="carousel"`                                                                                                                                                                             |
| 2 Sobre                | Imagens sobrepostas se separam com o scroll, fade sutil no texto, conteúdo sticky, bounce infinito em "soluções completas" | ScrollTrigger `scrub` para o split, `position: sticky` com `scroll-margin`, keyframe `yl-bounce` com fallback reduced-motion                                                                                                                                       |
| 2.1 BigNumber          | Contador sobe ao revelar, sem layout shift, com símbolos                                                                   | `BigNumber` parseia prefixo/sufixo (`+`, `%`, `k`), usa `Intl.NumberFormat`, `font-variant-numeric: tabular-nums`, reserva largura com o valor final invisível, `aria-hidden` no animado e valor final em texto para leitor de tela, reduced-motion mostra o final |
| 2.2 Hint com imagem    | Horizon, livestreams, academia mostram imagem que segue o mouse                                                            | `CursorHint kind="image"` com `loading="lazy"` e `decoding="async"`                                                                                                                                                                                                |
| 3 Portfólio            | Filtro com busca expansível e feedback                                                                                     | Seção 7                                                                                                                                                                                                                                                            |
| 3.1 RSS e carregamento | Feeds e lotes                                                                                                              | `@astrojs/rss`, três feeds, "Carregar mais"                                                                                                                                                                                                                        |
| 4 Portfólio item       | Apresentação de imagens e "veja outros" relacionado                                                                        | Collection `portfolio`, `getRelated()` testado                                                                                                                                                                                                                     |
| 5 Case                 | Resultado com BigNumber e sticky                                                                                           | Collection `cases`                                                                                                                                                                                                                                                 |
| 5.1 Sticky e header    | Respiro suficiente                                                                                                         | `--yl-header-offset` aplicado em `top` e `scroll-margin-top`                                                                                                                                                                                                       |
| 6 Blog                 | Último post em destaque                                                                                                    | Ordenação por `publishedAt` desc                                                                                                                                                                                                                                   |
| 6.1 Blog Post          | Coluna de 720px centralizada, marcadores de lista e blockquote fora do fluxo                                               | `max-width: 720px` (dentro dos 80ch), `::before` com `position: absolute` e `inset-inline-start` negativo, sem reservar espaço                                                                                                                                     |
| 7 404                  | Imagem + redirecionamento                                                                                                  | Página estática, imagem placeholder                                                                                                                                                                                                                                |
| Transição de página    | Cortina subindo, suave                                                                                                     | `ClientRouter` + `transition:animate` custom (`yl-curtain`), `transition:persist` no header, no Lenis e no `ThemeDial`, `prefers-reduced-motion` reduz para fade                                                                                                   |
| Glass inferior fixo    | Barra translúcida fixa no rodapé da viewport                                                                               | Elemento `aria-hidden` com `backdrop-filter`, `pointer-events: none`, altura por token                                                                                                                                                                             |
| Smooth scroll          | Manter                                                                                                                     | `lenis` atual com `autoRaf` e integração `ScrollTrigger.scrollerProxy`; desligado quando `prefers-reduced-motion`                                                                                                                                                  |
| Reveals                | Títulos por máscara, parágrafos ganhando contraste, grids escalonados                                                      | ScrollTrigger `batch` e `SplitText` do GSAP (agora gratuito), com `aria-hidden` nos fragmentos e texto íntegro para leitor de tela                                                                                                                                 |

Imagens que não existem usam `placehold.co` até a arte final.

## 9. Acessibilidade (WCAG 2.2, alvo AA completo e AAA onde o DS pede)

- Skip link para `main` em todas as páginas. Landmarks únicos por página.
- Alvo de clique 48x48 (2.5.8 pede 24, DS pede 48). Foco visível 2px e 3:1 (2.4.11, 2.4.13). Nada oculto sob header sticky (2.4.11).
- Arraste sempre com alternativa de ponteiro único (2.5.7). Carousel navegável por teclado e pausável.
- Help consistente: links de contato na mesma posição em todas as páginas (3.2.6).
- `prefers-reduced-motion` respeitado em todo motion, inclusive Lenis, contadores e transição de página.
- `CursorHint` nunca é a única forma de obter a informação: conteúdo também vai para `aria-describedby`.
- Contraste validado nos dois temas por teste automatizado (axe em Storybook, Vitest e Playwright) mais checagem manual com VoiceOver antes de fechar cada página.
- Live regions para busca e "carregar mais". Títulos de página únicos. `lang="pt-BR"`.

## 10. Testes e qualidade

- `packages/yalatus`: cobertura 100% obrigatória (branches, functions, lines, statements) via Vitest + jsdom. Stories rodam como testes de interação e a11y pelo addon-vitest.
- `apps/site`: funções de `lib/` com 100% (related, search, rss, theme por hora, parsing de BigNumber). Componentes `.astro` pelo Container API. Playwright cobre as 8 páginas em light e dark, com axe e snapshots de teclado.
- Pre-commit: lint-staged (eslint, prettier, stylelint). Commit: commitlint. PR: título conventional, template com checklist de a11y, Figma e stories.

## 11. Fases de execução

| Fase         | Entrega                                                                                                                                                                                                                                        | Depende de                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 0 Fundação   | Yarn 4, workspaces, tooling, CI, `CLAUDE.md`, gerador Plop, Storybook vazio rodando                                                                                                                                                            | nada                                |
| 1 Tokens     | JSON do Figma → `tokens.css`, mixins de tema, tipografia, focus ring, motion scale                                                                                                                                                             | export de variáveis e token REST    |
| 2 DS core    | Button, IconButton, Icon, Link, Tag, Filter Chip, Input Chip, Tabs, Divider, Logo, BigNumber, Marquee, CursorHint, Blockquote, BlogList, Figure, Cards (Blog, Portfolio, Company, Service), ViewMore, BlogNavigation, Container/Box/Stack/Grid | fase 1 + leitura dos component sets |
| 3 Conteúdo   | Conversão única do export (fora do repo), collections, imagens locais, feeds RSS, índice de busca                                                                                                                                              | nada                                |
| 4 Casca      | Layout base, Header glass reativo, Footer com ThemeDial, script de tema, transição de página, Lenis, glass inferior                                                                                                                            | fases 1 e 2                         |
| 5 Páginas    | Home, Sobre, Portfólio, Portfólio item, Case, Blog, Post, 404                                                                                                                                                                                  | fases 2, 3 e 4                      |
| 6 Motion     | Hero scale, split de imagens, reveals, easter eggs, contadores                                                                                                                                                                                 | fase 5                              |
| 7 Fechamento | Auditoria WCAG, Playwright completo, performance, deploy Cloudflare, DNS, Storybook publicado                                                                                                                                                  | tudo                                |

Fases 0 e 3 podem começar antes do Figma. Fase 1 em diante depende das leituras abaixo.

### Estado (2026-10-04)

- Fase 0 concluída: Yarn 4.18, workspaces, ESLint 10, Prettier, Stylelint, Husky, lint-staged, commitlint, Plop, Storybook e Vitest configurados; `yarn lint`, `yarn typecheck`, `yarn test` e `astro build` passam. O workflow de CI está em `docs/ci.workflow.yml` para ser copiado para `.github/workflows/ci.yml`.
- Fase 1 concluída na parte de tokens: `packages/yalatus/tokens/yalatus.tokens.json` gera `src/tokens/tokens.css` (primitivas, alias por modo com `.yl-theme-inverse`, tipografia, sombras, gradientes e grids). Mixins de breakpoint, tipografia, focus ring e motion em `src/styles`.
- Fase 3 concluída na conversão: 4 posts e 16 entradas de portfólio (13 projetos e 3 Daily UI) em `apps/site/src/content`, com imagens ao lado de cada entrada e relacionados resolvidos. A conversão foi feita uma única vez por script descartável; nada de Strapi fica no repositório. Feeds RSS e índice de busca ficam para a fase 5.
- Fase 2 concluída: 26 componentes em `packages/yalatus/src/components` (primitivos `Box`, `Stack`, `Text`, `Icon`, `Container`; `Button`, `IconButton`, `Link`, `Tag`, `Divider`, `FilterChip`, `InputChip`, `Tabs`, `Logo`, `BigNumber`, `Marquee`, `CursorHint`, `Blockquote`, `BlogList`, `Figure`, `BlogCard`, `PortfolioCard`, `CompanyCard`, `ServiceCard`, `ViewMore`, `BlogNavigation`) e os hooks `useReducedMotion`, `useInView` e `useCountUp`, cada um com tipos, SCSS por tokens, testes (281 testes, 100% de cobertura), stories com `parameters.design` e MDX. Imports internos usam o self-reference do pacote (`@dgbragas/yalatus/helpers`, `/hooks`, `/constants`, `/components`, `/test-utils`) ou `'..'` para irmãos. `yarn storybook` abre a bancada; `yarn workspace @dgbragas/yalatus icons:build` regenera os nomes quando os SVGs forem trocados.
- Fase 4 concluída (2026-10-05): `apps/site/src/layouts/Base.layout.astro` com `<ClientRouter />`, Fonts API (`fontProviders.google()` servindo Bricolage Grotesque, Mona Sans e Spline Sans Mono localmente, variáveis `--font-*` ligadas a `--yl-font-family-*` em `src/styles/global.scss`), script inline de tema sem flash reexecutado a cada navegação (`data-astro-rerun`), skip link, hreflang por locale, cortina de transição (saída 160ms, entrada 320ms subindo) e barra de vidro fixa no rodapé. Ilhas React com `transition:persist`: `Header` (pílula 592px glass, logo, badge do Yalatus, links, switch de tema `role="switch"`, globo de idioma; lê `data-theme-scope` da seção sob a barra e inverte com `.yl-theme-inverse`) e `ThemeDial` (24 ticks, marcador na hora local, alterna e persiste em `localStorage.theme`). `Footer.astro` e `CallToAction.astro` (post mais recente da collection, `CopyButton` com live region) seguem o Figma. Lenis em `src/lib/smoothScroll.ts`, desligado com reduced motion. Dicionário pt-BR/en em `src/lib/i18n.ts`, constantes em `src/lib/site.ts`, utilitários de tema e datas em `src/lib`; tudo em `src/lib` com 100% de cobertura (25 testes). Páginas provisórias `/`, `/contato` e `404` só para validar a casca; `/en/*` nasce do fallback rewrite.
- Fase 5 em andamento (2026-10-05), Home concluída: `src/pages/index.astro` compõe `components/home/Hero.astro` (relógio de São Paulo na ilha `LocalTime`, título display com acentos `trace`/`signal`, botões, logos das empresas como SVG inline com `currentColor`, grade 4×3 com as 12 imagens exportadas do Figma via `<Image>`), `About.astro` (Tag dentro de `CursorHint`, foto, tags "Construindo", `Marquee` com 10 tecnologias) e `Showcase.astro` (Tag + título, easter egg `ShapeToy` com giro aleatório sem repetir o anterior, ilha `WorkShowcase` com `Tabs` por tipo, trilha com scroll-snap e setas, "Ver todos"). Cópia pt-BR/en em `src/lib/copy/home.ts`; helpers puros `clock`, `work` e `spin` em `src/lib` com testes (38 testes, 100%). Assets em `src/assets/home`. Conferência visual feita por Playwright nos dois temas em 1440 e 390px, comparada ao frame do Figma. Faltam: Sobre, Portfólio, Portfólio item, Case, Blog, Post, 404 e `/contato` localizados.
- Pendente: reexportar os SVGs de ícones e cursores (o export via REST veio com desenhos errados); `cases` ainda sem exemplo; endereços de e-mail e redes em `src/lib/site.ts` precisam de confirmação; nenhum commit foi feito, tudo está no working tree por decisão do Diego.

## 12. O que falta ler do Figma e como obter

| Necessidade                                                                | Via REST API com token                                                                      | Via export manual                                                           |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Variáveis (primitivas, alias, modos light/dark)                            | Não. `GET /v1/files/:key/variables/local` é só Enterprise.                                  | Sim. Plugin "Export/Import Variables" ou Tokens Studio → JSON em Downloads. |
| Text styles e effects                                                      | Sim. `GET /v1/files/:key/styles` (publicados) e `GET /v1/files/:key/nodes` para os valores. | Opcional.                                                                   |
| Tabelas de documentação da página Cores (nomes e valores em texto)         | Sim. `GET /v1/files/:key/nodes?ids=2360:595,2004:1717`.                                     | Não precisa.                                                                |
| Estrutura das 9 telas, Nav Bar, Footer, grids e 30 famílias de componentes | Sim. `GET /v1/files/:key/nodes?ids=…&depth=…` com os ids já mapeados.                       | Não precisa.                                                                |
| Screenshots de telas e componentes                                         | Sim. `GET /v1/images/:key?ids=…&format=png&scale=2`.                                        | Não precisa.                                                                |
| Imagens de fill (fotos, mockups)                                           | Sim. `GET /v1/files/:key/images`.                                                           | Não precisa.                                                                |
| Motion/prototype de componentes                                            | Parcial. Interações de protótipo vêm no JSON do node.                                       | Vídeo de referência já recebido.                                            |

Token temporário em `FIGMA_TOKEN_CLAUDE` no `~/.zshrc` (validado em 2026-10-04, `GET /v1/me` 200). A Variables API respondeu 403, como previsto. Páginas descobertas pela API: yalatus tem `Cores` (1:1272), `Typography` (1:1273) e `Layout & Effects` (2229:3043); ui tem `Draft` (1:1279), `Cursors` (4027:1363), `Icons` (4027:1362), `[ Component ]` (1:1274), `Sitemap` (2009:1126) e `Handoff` (2010:460).

### Tokens extraídos (2026-10-04, Plugin API nas cópias dentro da org Caju)

Fonte de verdade em `packages/yalatus/tokens/yalatus.tokens.json`. Resumo:

- Primitivas: `substrate` 100–950, `signal` 100–700, `trace` 100–500, `red`/`green`/`amber` 100–400, `base` black/white. `space` 4–256 (17 passos), `border-width` 1 e 2, `border-radius` 2, 4 e 20, `opacity` 8%–64% (8 passos), `font-size` 12–72 (13 passos).
- Alias com modos `dark` e `light`: `bg-*`, `surface-*`, `fg-*`, `on-*`, `action-*`, `border-*`, `focus-ring`, `focus-offset`. Bordas sutis usam branco ou preto com opacidade token.
- Famílias: **Bricolage Grotesque** (display, 700 e 800), **Mona Sans** (corpo, 400 a 600) e **Spline Sans Mono** (código). Todas open source, servidas localmente pela Fonts API.
- 17 text styles (`display` 72/80 até `caption` 12/16, `numeral-lg` 64/72 para BigNumber, `code` e `value` mono 14/20).
- Effects: `focus-default` (sombra 0 1 2 + anel 4px `#03BFF1`), `shadow-1..3` com variantes light e dark.
- Gradientes: `brand` (signal-400 → #6397FF → trace-300) e `brand-subtle` por modo.
- Grids (frames `Grid Web/Tablet/Mobile` do arquivo de UI): web 1440 com 12 colunas de 72, gutter 32, centrado, conteúdo 1216 e margem 112; tablet 744 com 6 colunas stretch, gutter 24, margem 24; mobile com 4 colunas stretch, gutter 16, margem 16. O container do site trava em 1216 e os breakpoints nascem desses três frames.
- Cópias para leitura pelo MCP: ui `kuaKPD8I2HRkpFuq5robtc`, yalatus `gut1tjMeGCiHoS3PAVmgQT`. Os ids de nós são os mesmos dos originais.

### Lido até agora via REST (2026-10-04)

- Cores: 38 primitivas (`substrate` 100–950, `signal` 100–700, `trace` 100–500, `red`/`green`/`amber` 100–400, `gradient` brand e brand-subtle, `base` black/white) e 47 aliases (`bg`, `surface`, `fg`, `on`, `action`, `border`, `focus`). Os swatches resolvem apenas o modo dark. A coluna "Valor (light/dark)" da documentação está desatualizada (rampas antigas `dusk`/`aurora`/`flare` e 33 divergências), então os valores light dependem das variáveis. Dados em `scratchpad/figma/extracted.colors.json` desta sessão.
- Estilos publicados: 17 text styles (`font-display`, `font-title`, `font-heading-1…5`, `font-prose`, `font-body-lg`, `font-body`, `font-label-uppercase`, `font-label`, `font-caption`, `font-numeral-lg`, `font-numeral`, `font-value`, `font-code`), 7 effects (`Focus/focus-default`, `Shadows/{light,dark}/shadow-1…3`), 3 fills (gradientes brand e brand-subtle light/dark).
- Telas: screenshots das 9 telas, Nav Bar, Footer, grids, tooltip e BigNumber. Árvores completas das 8 telas construídas (via a cópia na org Caju) e dos símbolos.
- Erros a corrigir no Figma: `red/green/amber 300` duplicado (o segundo é o 400), `$border-subtle` e `$border-default` apontam para a variável de `$bg-inverse` e usam fill em vez de stroke, textos de valor com rampas renomeadas.

## 13. Pendências

- [ ] Token temporário do Figma e export de variáveis em JSON.
- [ ] Como usar a segunda conta do Figma no conector (a dona do time Dg). Hoje o limite vem do plano Starter do time, não do seat.
- [ ] Confirmar o nome do componente que segue o cursor (`CursorHint` proposto).
- [ ] Confirmar o subdomínio do Storybook (`ds.dgbragas.dev` proposto).
- [ ] Definir quais imagens do Sobre (Horizon, livestreams, academia) e do hero existem ou ficam em placeholder.
