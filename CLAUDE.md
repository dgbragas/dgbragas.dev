# dgbragas.dev

Personal site of Diego "Dg" Braga (blog, portfolio, cases) built as a Yarn 4 monorepo: `packages/yalatus` is the design system (React 19, SCSS, Storybook, Vitest) and `apps/site` is the Astro 7 site that consumes it. The plan, decisions and page behaviours live in `docs/rebuild-plan.md`; read it before changing scope.

## Commands

```bash
yarn dev                 # astro dev for apps/site
yarn storybook           # Storybook for packages/yalatus
yarn test                # vitest in every workspace
yarn test:coverage       # vitest with the 100% thresholds
yarn lint                # eslint + stylelint + prettier --check
yarn typecheck           # tsc for yalatus, astro check for the site
yarn new:component       # plop generator for a Yalatus component
yarn workspace @dgbragas/yalatus tokens:build   # regenerates src/tokens/tokens.css
```

## Boundaries

- `apps/site` imports from `@dgbragas/yalatus`. Yalatus never imports from the site (ESLint `import-x/no-restricted-paths` enforces it).
- `packages/yalatus/tokens/yalatus.tokens.json` is the only token source. `src/tokens/tokens.css` is generated; never edit it by hand.
- TypeScript stays on 5.9 until typescript-eslint and `astro check` support the TypeScript 7 API.
- Content lives in `apps/site/src/content` as Content Collections. There is no CMS.
- Dependencies are added at their current latest version. Nothing legacy enters without a stated reason in the commit body.

## Language

- Prose inside code (JSDoc, comments, commit messages, story descriptions) is **English**.
- UI copy and content are **pt-BR** by default, with `/en/` as the second locale.
- Identifiers are English. CSS classes use BEM with the `yl-` prefix in Yalatus and `site-` in the site.

## Component anatomy (Yalatus)

Generate with `yarn new:component`; write by hand only what the generator does not cover.

```
src/components/<Name>/
  <Name>.component.tsx       # forwardRef, clsx before return, JSDoc with @example
  <Name>.types.ts            # <Name>Element, Yalatus<Name>, <Name>Props = MergeProps<...>
  <Name>.styles.scss         # BEM, tokens only, alphabetical properties
  index.ts                   # export * from component + export type props
  __tests__/<Name>.component.test.tsx
  docs/<Name>.stories.tsx
  docs/<Name>.mdx
  (optional) <Name>.helpers.ts, .constants.ts, .hooks.ts, .context.tsx, assets/
```

Register every component in `src/components/index.ts` (the generator does it).

### Props

- `Yalatus<Name>` is the internal type and includes `BaseComponentProps`; the public type is `<Name>Props = MergeProps<Yalatus<Name>, HTMLAttributes<Element>>` with the real root element.
- Naming: `appearance` (visual), `kind` (semantic), `size`, `orientation`, `leadIcon`, `trailingIcon`, `trailingItem`, `open`, `active`, `selected`, `error: boolean`, `supportingMessage`, `label`, `disabled`. Never `variant`, `type`, `color`, `isX`, `leftIcon`, `helperText`.
- A variation axis is an enum, never a new boolean per case. Props that only make sense together become a discriminated union.
- Controlled and uncontrolled from the start (`value`/`defaultValue`, `checked`/`defaultChecked`).
- Every rendered string is a prop with a default, including accessible names.
- Declaration order: plain, plain with default, renamed, renamed with default, alphabetical within each group. Destructuring follows the same order. Defaults live in the destructuring.
- Every prop has a one-line JSDoc that does not repeat its name; `@default` on its own line when there is a default; callbacks say when they fire and what they receive.

### Component body order

hooks → derived values → `const styles = clsx(...)` → `accessibilityProps` → `conditionalProps` → handlers → return. Two or more conditional attributes leave the JSX for a named object with `undefined` on inactive keys. Never a ternary that returns `{}`.

### Styles

- SCSS per component, imported as a side effect. BEM: `.yl-name`, `.yl-name--mod`, `.yl-name__elem`, `.yl-name__elem--mod`. No empty blocks.
- Only tokens: `var(--yl-*)`. No hex, rgb or px literal for colour, spacing or type. A value without a token gets a `// TOKEN: <what is missing>.` line above it; a value the design fixes outside the scale gets `// FIGMA: <what it fixes>.`
- Layout belongs to primitives (`Box`, `Stack`, `Grid`) in JSX, not to the component SCSS.
- Disabled look comes from the `--disabled` class, not from `:disabled`. Focus uses `&:focus-visible { @include focus-ring; }`; never `outline: none` without a replacement.
- Properties alphabetical, `transition` and `animation` last.
- Motion only through `motion-transition` and `motion-animation` from `styles/_motion.scss`; they emit the reduced-motion fallback. Hand-written `transition:` or `animation:` does not exist in components. Timing constants in TS carry `/** MOTION: <state>, <column> = <value>. */`.

### Tests (100% branches, functions, lines, statements)

```
describe('<Name>.component')
  it('should be defined (no circular dependency)')
  describe('when render')
  describe('when receive props') → describe('<prop> prop')
  describe('when handling actions')
  describe('when handling edge cases')      # children null/false/undefined, empty arrays, out-of-range props
  describe('when validating accessibility') # expect(await runAxe(container)).toHaveNoViolations()
```

Use `userEvent`, `toHaveFocus`, and test Enter and Space separately. `disabled` blocks click and keyboard. Setup in `beforeEach`/`afterEach`, never inline. No `act()` warnings. `istanbul ignore` only for code jsdom cannot reach.

### Stories

- `Meta<Props>`, `Basic` is the first export with no args beyond defaults.
- `argTypes` carry `table.category` (component name) and `subcategory` in this order: MODIFIERS, ATTRIBUTES, BEHAVIOUR, MESSAGES, EVENTS, ADVANCED. Each has `description`, `type.summary` and `defaultValue` when there is one.
- Events use `action('🔥 onX')` in `meta.args`, never in `argTypes`.
- Extra stories only for a distinct render; `Disabled` and `WithLabel` are covered by controls. Controlled stories use `render` with `useState`; no JSX in `args`.
- `parameters.design` points to the Figma node.

## Comments

Taken from the Castanha authoring rules, applied in English:

- JSDoc describes behaviour in the present tense: what it does, receives, returns, when to use. No history, no alternatives, no "we chose".
- An inline comment survives only if it says **what breaks without that line**. Naming the feature a line uses, paraphrasing the identifier, or section dividers like `// Handlers` are noise and do not exist.
- A provisional comment carries its exit condition or it is removed.
- Scripts start with `/** name — what it does */`; scripts that touch disk, git or network add the failure contract and an `Env:` list in the same block. Sections inside scripts use `// ─── Title ───`.
- Origin marks: `MOTION:`, `FIGMA:`, `TOKEN:`.

## Accessibility (WCAG 2.2 AA everywhere, AAA where the DS asks)

- Native semantics first. Never a `div` or `span` for an interactive element.
- ARIA complements, never duplicates. Prefer `aria-labelledby` over `aria-label` when a visible label exists.
- Keyboard: Tab, Enter/Space, arrows with roving tabindex where the pattern asks, Esc closes overlays, no traps.
- Click target 48×48 even when the visual is smaller. Focus ring 2px with 3:1 contrast, never hidden under the sticky header (`scroll-margin-top`).
- Contrast 7:1 for text, 4.5:1 for large text, 3:1 for UI, validated in both themes. Fix with a token, never a literal.
- `prefers-reduced-motion` respected in every animation, counter, Lenis and page transition. Reduced motion never removes function.
- Decorative icons `aria-hidden`; live regions exist in the DOM before they change; drag always has a single-pointer alternative.

## Git

- Work on `main`. Conventional commits with a mandatory scope from `yalatus`, `site`, `content`, `tooling`, `ci`, `docs`, `deps`. Subject in English imperative, lower case, ≤100 chars; body in English present tense, two or three sentences of prose.
- Pre-commit runs lint-staged; commit-msg runs commitlint.
