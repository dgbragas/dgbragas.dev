import { describe, expect, it } from 'vitest';

import { sectionAtLine, sectionTheme } from '../sectionTheme';

const box = (top: number, bottom: number) =>
  ({ getBoundingClientRect: () => ({ top, bottom }) }) as unknown as Element;

describe('sectionTheme.ts', () => {
  describe('sectionTheme()', () => {
    it('should keep the document theme without scope', () => {
      expect(sectionTheme('dark', null)).toBe('dark');
      expect(sectionTheme('light', undefined)).toBe('light');
    });

    it('should flip the document theme for inverse scopes', () => {
      expect(sectionTheme('dark', 'inverse')).toBe('light');
      expect(sectionTheme('light', 'inverse')).toBe('dark');
    });

    it('should honour a fixed scope', () => {
      expect(sectionTheme('dark', 'light')).toBe('light');
      expect(sectionTheme('light', 'dark')).toBe('dark');
    });
  });

  describe('sectionAtLine()', () => {
    it('should return the section whose box contains the line', () => {
      const first = box(-100, 40);
      const second = box(40, 900);

      expect(sectionAtLine([first, second], 20)).toBe(first);
      expect(sectionAtLine([first, second], 40)).toBe(second);
    });

    it('should return undefined when no section crosses the line', () => {
      expect(sectionAtLine([box(100, 200)], 20)).toBeUndefined();
    });
  });
});
