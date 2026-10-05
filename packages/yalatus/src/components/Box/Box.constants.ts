import { resolveColor, resolveRadius, resolveSpace, type Breakpoint } from './Box.resolvers';

type Resolver = (value: unknown) => string | undefined;

const identity: Resolver = value =>
  typeof value === 'number' ? `${value}` : (value as string | undefined);
const space: Resolver = value => resolveSpace(value as never);
const color: Resolver = value => resolveColor(value as never);
const radius: Resolver = value => resolveRadius(value as never);

/** Style props: CSS properties each one writes and how its value is resolved. */
export const STYLE_PROPS = {
  m: { css: ['margin'], resolve: space },
  mt: { css: ['marginBlockStart'], resolve: space },
  mb: { css: ['marginBlockEnd'], resolve: space },
  ml: { css: ['marginInlineStart'], resolve: space },
  mr: { css: ['marginInlineEnd'], resolve: space },
  mx: { css: ['marginInline'], resolve: space },
  my: { css: ['marginBlock'], resolve: space },
  p: { css: ['padding'], resolve: space },
  pt: { css: ['paddingBlockStart'], resolve: space },
  pb: { css: ['paddingBlockEnd'], resolve: space },
  pl: { css: ['paddingInlineStart'], resolve: space },
  pr: { css: ['paddingInlineEnd'], resolve: space },
  px: { css: ['paddingInline'], resolve: space },
  py: { css: ['paddingBlock'], resolve: space },
  gap: { css: ['gap'], resolve: space },
  width: { css: ['width'], resolve: space },
  minWidth: { css: ['minWidth'], resolve: space },
  maxWidth: { css: ['maxWidth'], resolve: space },
  height: { css: ['height'], resolve: space },
  minHeight: { css: ['minHeight'], resolve: space },
  maxHeight: { css: ['maxHeight'], resolve: space },
  display: { css: ['display'], resolve: identity },
  flexDirection: { css: ['flexDirection'], resolve: identity },
  alignItems: { css: ['alignItems'], resolve: identity },
  justifyContent: { css: ['justifyContent'], resolve: identity },
  flexWrap: { css: ['flexWrap'], resolve: identity },
  flex: { css: ['flex'], resolve: identity },
  flexGrow: { css: ['flexGrow'], resolve: identity },
  flexShrink: { css: ['flexShrink'], resolve: identity },
  position: { css: ['position'], resolve: identity },
  zIndex: { css: ['zIndex'], resolve: identity },
  overflow: { css: ['overflow'], resolve: identity },
  textAlign: { css: ['textAlign'], resolve: identity },
  bg: { css: ['backgroundColor'], resolve: color },
  color: { css: ['color'], resolve: color },
  borderRadius: { css: ['borderRadius'], resolve: radius },
} as const satisfies Record<string, { css: readonly string[]; resolve: Resolver }>;

export type StylePropName = keyof typeof STYLE_PROPS;

/** Suffix each breakpoint adds to the responsive CSS variable name. */
export const BREAKPOINT_SUFFIX: Record<Breakpoint, string> = {
  base: '',
  tablet: '-tablet',
  web: '-web',
};
