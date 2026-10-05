/** build-tokens — writes src/tokens/tokens.css from tokens/yalatus.tokens.json. Exits 1 when the JSON is missing or an alias points to an unknown primitive. Env: none. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url);
const SOURCE = new URL('tokens/yalatus.tokens.json', ROOT);
const TARGET = new URL('src/tokens/tokens.css', ROOT);
const PREFIX = 'yl';

const FONT_STACKS = {
  display: '"Bricolage Grotesque", "Helvetica Neue", Arial, sans-serif',
  body: '"Mona Sans", "Helvetica Neue", Arial, sans-serif',
  mono: '"Spline Sans Mono", ui-monospace, "SFMono-Regular", Menlo, monospace',
};

const tokens = JSON.parse(await readFile(SOURCE, 'utf8'));

// ─── Primitives ───

function primitiveVar(name) {
  const [group, step] = name.split(/-(?=[^-]+$)/);
  if (!tokens.primitives.color[group]?.[step]) throw new Error(`unknown primitive "${name}"`);
  return `var(--${PREFIX}-color-${group}-${step})`;
}

function opacityValue(name) {
  const step = name.replace('opacity-', '');
  const value = tokens.primitives.opacity[step];
  if (value === undefined) throw new Error(`unknown opacity "${name}"`);
  return `${value}%`;
}

function primitiveDeclarations() {
  const lines = [];
  for (const [group, steps] of Object.entries(tokens.primitives.color)) {
    for (const [step, hex] of Object.entries(steps))
      lines.push(`--${PREFIX}-color-${group}-${step}: ${hex};`);
  }
  for (const space of tokens.primitives.space)
    lines.push(`--${PREFIX}-space-${space}: ${space}px;`);
  for (const [name, px] of Object.entries(tokens.primitives.borderWidth))
    lines.push(`--${PREFIX}-border-width-${name}: ${px}px;`);
  for (const [name, px] of Object.entries(tokens.primitives.borderRadius))
    lines.push(`--${PREFIX}-radius-${name}: ${px}px;`);
  for (const [name, pct] of Object.entries(tokens.primitives.opacity))
    lines.push(`--${PREFIX}-opacity-${name}: ${pct}%;`);
  for (const [name, px] of Object.entries(tokens.primitives.fontSize))
    lines.push(`--${PREFIX}-font-size-${name}: ${px}px;`);
  for (const [name, stack] of Object.entries(FONT_STACKS))
    lines.push(`--${PREFIX}-font-family-${name}: ${stack};`);
  for (const [name, weight] of Object.entries(tokens.primitives.fontWeight))
    lines.push(`--${PREFIX}-font-weight-${name}: ${weight};`);
  for (const [name, grid] of Object.entries(tokens.grid)) {
    lines.push(`--${PREFIX}-grid-${name}-columns: ${grid.columns};`);
    lines.push(`--${PREFIX}-grid-${name}-gutter: ${grid.gutter}px;`);
    lines.push(`--${PREFIX}-grid-${name}-margin: ${grid.margin}px;`);
    if (grid.content) lines.push(`--${PREFIX}-grid-${name}-content: ${grid.content}px;`);
  }
  return lines;
}

// ─── Typography ───

function typographyDeclarations() {
  const lines = [];
  for (const [name, style] of Object.entries(tokens.typography)) {
    const weight = `var(--${PREFIX}-font-weight-${style.weight})`;
    const size = `var(--${PREFIX}-font-size-${style.size})`;
    const family = `var(--${PREFIX}-font-family-${style.family})`;
    lines.push(`--${PREFIX}-text-${name}: ${weight} ${size} / ${style.lineHeight}px ${family};`);
    lines.push(
      `--${PREFIX}-text-${name}-tracking: ${style.letterSpacing === '0%' ? '0' : `${parseFloat(style.letterSpacing) / 100}em`};`
    );
    if (style.textTransform)
      lines.push(`--${PREFIX}-text-${name}-transform: ${style.textTransform};`);
    if (style.paragraphSpacing)
      lines.push(`--${PREFIX}-text-${name}-paragraph: ${style.paragraphSpacing}px;`);
  }
  return lines;
}

// ─── Theme modes ───

function aliasValue(value) {
  if (typeof value === 'string') return primitiveVar(value);
  return `color-mix(in srgb, ${primitiveVar(value.color)} ${opacityValue(value.opacity)}, transparent)`;
}

function shadow(spec) {
  const hex = spec.color.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `${spec.x}px ${spec.y}px ${spec.blur}px ${spec.spread}px rgb(${r} ${g} ${b} / ${Math.round(spec.alpha * 100)}%)`;
}

function gradient(spec) {
  return `linear-gradient(135deg, ${spec.stops.map(([hex, pos]) => `${hex} ${pos}%`).join(', ')})`;
}

function modeDeclarations(mode) {
  const lines = [`--${PREFIX}-theme: ${mode};`];
  for (const [name, modes] of Object.entries(tokens.alias))
    lines.push(`--${PREFIX}-color-${name}: ${aliasValue(modes[mode])};`);
  for (const level of ['shadow-1', 'shadow-2', 'shadow-3'])
    lines.push(`--${PREFIX}-${level}: ${shadow(tokens.effects[level][mode])};`);
  lines.push(
    `--${PREFIX}-gradient-brand-subtle: ${gradient(tokens.gradients['brand-subtle'][mode])};`
  );
  return lines;
}

function sharedEffectDeclarations() {
  const [offset, ring] = tokens.effects['focus-default'];
  return [
    `--${PREFIX}-focus-ring: ${shadow({ ...offset, alpha: 1 })}, 0 0 0 ${ring.spread}px var(--${PREFIX}-color-focus-ring);`,
    `--${PREFIX}-gradient-brand: ${gradient(tokens.gradients.brand)};`,
  ];
}

// ─── Output ───

const block = (selector, lines) =>
  `${selector} {\n${lines.map(line => `  ${line}`).join('\n')}\n}\n`;

const css = [
  '/* Generated by scripts/build-tokens.mjs from tokens/yalatus.tokens.json. Do not edit. */',
  block(':root', [
    ...primitiveDeclarations(),
    ...typographyDeclarations(),
    ...sharedEffectDeclarations(),
  ]),
  block(
    `:root, :root[data-theme="dark"], :root[data-theme="light"] .${PREFIX}-theme-inverse`,
    modeDeclarations('dark')
  ),
  block(
    `:root[data-theme="light"], :root[data-theme="dark"] .${PREFIX}-theme-inverse`,
    modeDeclarations('light')
  ),
].join('\n');

const names = [
  '/* Generated by scripts/build-tokens.mjs from tokens/yalatus.tokens.json. Do not edit. */',
  '',
  `export const COLOR_KEYS = ${JSON.stringify(Object.keys(tokens.alias))} as const;`,
  `export const SPACE_KEYS = ${JSON.stringify(tokens.primitives.space.map(space => `space-${space}`))} as const;`,
  `export const RADIUS_KEYS = ${JSON.stringify(Object.keys(tokens.primitives.borderRadius).map(name => `radius-${name}`))} as const;`,
  `export const TEXT_KEYS = ${JSON.stringify(Object.keys(tokens.typography))} as const;`,
  '',
  'export type ColorKey = (typeof COLOR_KEYS)[number];',
  'export type SpaceKey = (typeof SPACE_KEYS)[number];',
  'export type RadiusKey = (typeof RADIUS_KEYS)[number];',
  'export type TextKey = (typeof TEXT_KEYS)[number];',
  '',
].join('\n');

await mkdir(new URL('src/tokens/', ROOT), { recursive: true });
await writeFile(TARGET, css);
await writeFile(new URL('src/tokens/tokens.names.ts', ROOT), names);
console.log(`tokens.css written (${css.split('\n').length} lines), tokens.names.ts written`);
