import { describe, expect, it } from 'vitest';

import { SITE } from '../site';

describe('site.ts', () => {
  describe('SITE', () => {
    it('should expose absolute https addresses for the site and every social profile', () => {
      expect(SITE.url).toMatch(/^https:\/\//);
      expect(SITE.designSystemUrl).toMatch(/^https:\/\//);
      Object.values(SITE.socials).forEach(url => expect(url).toMatch(/^https:\/\//));
    });

    it('should carry a valid e-mail and a founding year before today', () => {
      expect(SITE.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
      expect(SITE.foundedYear).toBeLessThan(new Date().getFullYear());
    });
  });
});
