import { describe, expect, it } from 'vitest';

import { COMPANIES, COMPANY_NAMES, GRID_IMAGES, HOME, MARQUEE_ITEMS } from '../copy/home';

describe('copy/home.ts', () => {
  describe('HOME', () => {
    it('should give both locales the same keys', () => {
      expect(Object.keys(HOME.en).sort()).toEqual(Object.keys(HOME['pt-BR']).sort());
    });

    it('should describe every grid image in both locales', () => {
      GRID_IMAGES.forEach(name => {
        expect(HOME['pt-BR'].gridAlt[name]).not.toBe('');
        expect(HOME.en.gridAlt[name]).not.toBe('');
      });
    });

    it('should paint design and code with different accents', () => {
      const accents = HOME['pt-BR'].title.flat().flatMap(part => part.accent ?? []);
      expect(accents).toEqual(['trace', 'signal']);
    });
  });

  describe('COMPANY_NAMES and MARQUEE_ITEMS', () => {
    it('should name every company and keep marquee labels unique', () => {
      COMPANIES.forEach(company => expect(COMPANY_NAMES[company]).not.toBe(''));
      expect(new Set(MARQUEE_ITEMS.map(item => item.label)).size).toBe(MARQUEE_ITEMS.length);
    });
  });
});
