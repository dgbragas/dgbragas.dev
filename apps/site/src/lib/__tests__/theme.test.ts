// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

import { applyTheme, onThemeChange, readTheme, resolveTheme, themeForHour } from '../theme';

describe('theme.ts', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('themeForHour()', () => {
    it('should be light from 6h until 18h and dark otherwise', () => {
      expect(themeForHour(6)).toBe('light');
      expect(themeForHour(17)).toBe('light');
      expect(themeForHour(18)).toBe('dark');
      expect(themeForHour(5)).toBe('dark');
      expect(themeForHour(0)).toBe('dark');
    });
  });

  describe('resolveTheme()', () => {
    describe('when a valid choice is stored', () => {
      it('should return the stored theme regardless of the hour', () => {
        expect(resolveTheme('dark', 9)).toBe('dark');
        expect(resolveTheme('light', 23)).toBe('light');
      });
    });

    describe('when nothing or garbage is stored', () => {
      it('should fall back to the hour', () => {
        expect(resolveTheme(null, 9)).toBe('light');
        expect(resolveTheme(undefined, 23)).toBe('dark');
        expect(resolveTheme('blue', 9)).toBe('light');
      });
    });
  });

  describe('readTheme()', () => {
    it('should read the attribute and default to dark', () => {
      expect(readTheme()).toBe('dark');
      document.documentElement.dataset.theme = 'light';
      expect(readTheme()).toBe('light');
    });
  });

  describe('applyTheme() and onThemeChange()', () => {
    it('should set the attribute, store the choice and notify listeners until unsubscribed', () => {
      const listener = vi.fn();
      const stop = onThemeChange(listener);

      applyTheme('light');

      expect(document.documentElement.dataset.theme).toBe('light');
      expect(localStorage.getItem('theme')).toBe('light');
      expect(listener).toHaveBeenCalledWith('light');

      stop();
      applyTheme('dark');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should still apply the theme when storage is blocked', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('blocked');
      });

      applyTheme('light');

      expect(document.documentElement.dataset.theme).toBe('light');
    });
  });
});
