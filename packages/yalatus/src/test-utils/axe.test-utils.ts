import { run, type AxeResults, type RunOptions } from 'axe-core';

/**
 * Runs axe against a rendered container; colour-contrast is disabled because jsdom has no layout engine.
 * @param container - Element returned by Testing Library's `render`
 * @param options - Extra axe options merged over the defaults
 * @returns The axe results to pass to `toHaveNoViolations`
 * @example
 * expect(await runAxe(container)).toHaveNoViolations();
 */
export async function runAxe(container: Element, options: RunOptions = {}): Promise<AxeResults> {
  return run(container, {
    rules: { 'color-contrast': { enabled: false } },
    ...options,
  });
}
