import { describe, expect, it } from 'vitest';

import { sanitizeSvg, stripSvgSize } from '../svg.helpers';

describe('svg.helpers.ts', () => {
  describe('stripSvgSize()', () => {
    describe('when the root carries width and height', () => {
      it('should remove both and keep the viewBox', () => {
        expect(
          stripSvgSize('<svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0"/></svg>')
        ).toBe('<svg viewBox="0 0 24 24"><path d="M0 0"/></svg>');
      });
    });

    describe('when the root has no size', () => {
      it('should return the markup unchanged', () => {
        expect(stripSvgSize('<svg viewBox="0 0 8 8"/>')).toBe('<svg viewBox="0 0 8 8"/>');
      });
    });
  });

  describe('sanitizeSvg()', () => {
    describe('when shapes are painted with literal colours', () => {
      it('should strip the size and replace fills and strokes with currentColor', () => {
        expect(
          sanitizeSvg(
            '<svg width="24"><path fill="black"/><path stroke="#FCFCFC" fill="#0D0D0D"/></svg>'
          )
        ).toBe(
          '<svg><path fill="currentColor"/><path stroke="currentColor" fill="currentColor"/></svg>'
        );
      });

      it('should leave none, currentColor and url paints untouched', () => {
        const svg = '<svg fill="none"><path fill="currentColor"/><rect fill="url(#g)"/></svg>';

        expect(sanitizeSvg(svg)).toBe(svg);
      });
    });

    describe('when the markup is empty', () => {
      it('should return an empty string', () => {
        expect(sanitizeSvg('')).toBe('');
      });
    });
  });
});
