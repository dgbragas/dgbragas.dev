import type { Theme } from './theme';

export type SectionTheme = Theme | 'inverse';

/**
 * Resolves the theme a section shows given the document theme: `inverse` sections flip it.
 * @param documentTheme - Theme applied to the root element
 * @param scope - Value of the section's `data-theme-scope`, or null when the section has none
 * @returns The theme the section is painted with
 * @example
 * sectionTheme('dark', 'inverse') // 'light'
 */
export function sectionTheme(documentTheme: Theme, scope: string | null | undefined): Theme {
  if (scope === 'light' || scope === 'dark') return scope;
  if (scope === 'inverse') return documentTheme === 'dark' ? 'light' : 'dark';
  return documentTheme;
}

/**
 * Picks, among the sections crossing a horizontal line, the one that should drive the header theme.
 * @param sections - Elements marked with `data-theme-scope`, in document order
 * @param line - Distance from the top of the viewport to the line, in px
 * @returns The section whose box contains the line, or undefined when none does
 */
export function sectionAtLine<T extends Element>(sections: T[], line: number): T | undefined {
  return sections.find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= line && rect.bottom > line;
  });
}
