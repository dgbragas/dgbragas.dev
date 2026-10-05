import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

import type { AxeResults } from 'axe-core';

afterEach(() => {
  cleanup();
});

expect.extend({
  toHaveNoViolations(results: AxeResults) {
    const violations = results.violations.map(
      violation =>
        `${violation.id}: ${violation.help} (${violation.nodes.map(node => node.target.join(' ')).join(', ')})`
    );
    return {
      pass: violations.length === 0,
      message: () =>
        violations.length === 0
          ? 'Expected accessibility violations, found none'
          : `Expected no accessibility violations, found ${violations.length}:\n${violations.join('\n')}`,
    };
  },
});

/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-unused-vars -- vitest merges custom matchers through this interface, whose type parameters must repeat its own */
declare module 'vitest' {
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown> {
    toHaveNoViolations: () => R;
  }
}
/* eslint-enable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-unused-vars */
