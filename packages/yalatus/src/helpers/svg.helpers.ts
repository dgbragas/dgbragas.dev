const ROOT_SIZE_ATTRIBUTE = /^(<svg\b[^>]*?)\s(?:width|height)="[^"]*"/i;
const PAINT_ATTRIBUTE = /\b(fill|stroke)="(?!none"|currentColor"|url\()[^"]*"/gi;

/**
 * Removes the fixed width and height from the root of an SVG so it scales with its container.
 * @param svg - Markup as exported from Figma
 * @returns The markup with only the viewBox defining its proportions
 * @example
 * stripSvgSize('<svg width="24" height="24" viewBox="0 0 24 24"/>') // '<svg viewBox="0 0 24 24"/>'
 */
export function stripSvgSize(svg: string): string {
  let root = svg;
  while (ROOT_SIZE_ATTRIBUTE.test(root)) root = root.replace(ROOT_SIZE_ATTRIBUTE, '$1');
  return root;
}

/**
 * Prepares a raw SVG for inline use: the root loses its fixed size and every painted fill or stroke becomes `currentColor`.
 * @param svg - Markup as exported from Figma
 * @returns The markup ready to inherit size and colour from the parent; an empty string stays empty
 * @example
 * sanitizeSvg('<svg width="24" height="24"><path fill="black"/></svg>')
 * // '<svg><path fill="currentColor"/></svg>'
 */
export function sanitizeSvg(svg: string): string {
  return stripSvgSize(svg).replace(PAINT_ATTRIBUTE, '$1="currentColor"');
}
