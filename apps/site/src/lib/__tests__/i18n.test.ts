import { describe, expect, it } from 'vitest';

import { alternateLocale, getLocale, localizePath, stripLocale, t } from '../i18n';

describe('i18n.ts', () => {
  describe('getLocale()', () => {
    describe('when the path starts with /en', () => {
      it('should return en for the root and nested paths', () => {
        expect(getLocale('/en')).toBe('en');
        expect(getLocale('/en/blog')).toBe('en');
      });
    });

    describe('when the path has no prefix or a similar prefix', () => {
      it('should return the default locale', () => {
        expect(getLocale('/')).toBe('pt-BR');
        expect(getLocale('/blog')).toBe('pt-BR');
        expect(getLocale('/english')).toBe('pt-BR');
      });
    });
  });

  describe('t()', () => {
    describe('when the key exists in the locale', () => {
      it('should return the translated text', () => {
        expect(t('en')('nav.blog')).toBe('Blog');
        expect(t('pt-BR')('nav.contact')).toBe('Contato');
      });
    });

    describe('when the key is missing in the locale', () => {
      it('should fall back to the default locale', () => {
        expect(t('en')('missing' as never)).toBeUndefined();
      });
    });
  });

  describe('localizePath()', () => {
    describe('when the locale is the default', () => {
      it('should keep the path without prefix and without trailing slash', () => {
        expect(localizePath('pt-BR', '/')).toBe('/');
        expect(localizePath('pt-BR', '/blog/')).toBe('/blog');
      });
    });

    describe('when the locale is en', () => {
      it('should add the prefix', () => {
        expect(localizePath('en', '/')).toBe('/en');
        expect(localizePath('en', '/blog')).toBe('/en/blog');
      });
    });
  });

  describe('stripLocale()', () => {
    it('should remove the en prefix and keep other paths untouched', () => {
      expect(stripLocale('/en')).toBe('/');
      expect(stripLocale('/en/blog')).toBe('/blog');
      expect(stripLocale('/blog')).toBe('/blog');
      expect(stripLocale('/english')).toBe('/english');
    });
  });

  describe('alternateLocale()', () => {
    it('should swap between the two locales', () => {
      expect(alternateLocale('pt-BR')).toBe('en');
      expect(alternateLocale('en')).toBe('pt-BR');
    });
  });
});
