import { describe, expect, it } from 'vitest';

import { ABOUT, COMPANY_COLORS, COMPANY_IDS, HINTS } from '../copy/about';

describe('copy/about.ts', () => {
  describe('ABOUT', () => {
    it('should give both locales the same keys and the same number of entries', () => {
      expect(Object.keys(ABOUT.en).sort()).toEqual(Object.keys(ABOUT['pt-BR']).sort());
      expect(ABOUT.en.numbers).toHaveLength(ABOUT['pt-BR'].numbers.length);
      expect(ABOUT.en.companies).toHaveLength(ABOUT['pt-BR'].companies.length);
      expect(ABOUT.en.services).toHaveLength(ABOUT['pt-BR'].services.length);
    });

    it('should use every hint once in the bio of each locale', () => {
      (['pt-BR', 'en'] as const).forEach(locale => {
        const used = ABOUT[locale].bio.flat().flatMap(part => part.hint ?? []);
        expect(used.sort()).toEqual([...HINTS].sort());
      });
    });

    it('should list the companies in the order of the plates', () => {
      expect(ABOUT['pt-BR'].companies.map(company => company.id)).toEqual([...COMPANY_IDS]);
      COMPANY_IDS.forEach(id => expect(COMPANY_COLORS[id]).toMatch(/^#[0-9A-F]{6}$/));
    });
  });
});
