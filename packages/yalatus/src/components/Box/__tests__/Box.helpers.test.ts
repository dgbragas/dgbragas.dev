import { describe, expect, it } from 'vitest';

import { buildBox, splitBoxProps } from '../Box.helpers';

describe('Box.helpers.ts', () => {
  describe('splitBoxProps()', () => {
    describe('when props mix style props and HTML attributes', () => {
      it('should separate them', () => {
        const { styleProps, rest } = splitBoxProps({ p: 'space-8', id: 'root', gap: 4 });

        expect(styleProps).toEqual({ p: 'space-8', gap: 4 });
        expect(rest).toEqual({ id: 'root' });
      });
    });

    describe('when props are empty', () => {
      it('should return empty objects', () => {
        expect(splitBoxProps({})).toEqual({ styleProps: {}, rest: {} });
      });
    });
  });

  describe('buildBox()', () => {
    describe('when receiving scalar props', () => {
      it('should write resolved CSS properties', () => {
        const { className, style } = buildBox({
          p: 'space-16',
          bg: 'surface-default',
          borderRadius: 'radius-4',
          flexGrow: 1,
          display: 'flex',
        });

        expect(className).toBe('yl-box');
        expect(style).toEqual({
          padding: 'var(--yl-space-16)',
          backgroundColor: 'var(--yl-color-surface-default)',
          borderRadius: 'var(--yl-radius-4)',
          flexGrow: '1',
          display: 'flex',
        });
      });

      it('should skip undefined values', () => {
        expect(buildBox({ p: undefined })).toEqual({ className: 'yl-box', style: undefined });
      });
    });

    describe('when receiving responsive props', () => {
      it('should add the responsive class and one variable per breakpoint given', () => {
        const { className, style } = buildBox({ px: { base: 'space-16', web: 'space-112' } });

        expect(className).toBe('yl-box yl-box--r-px');
        expect(style).toEqual({
          '--yl-r-px': 'var(--yl-space-16)',
          '--yl-r-px-web': 'var(--yl-space-112)',
        });
      });
    });

    describe('when receiving className and inline style', () => {
      it('should append the class and let inline style win', () => {
        const { className, style } = buildBox({ p: 8 }, 'custom', { padding: '0' });

        expect(className).toBe('yl-box custom');
        expect(style).toEqual({ padding: '0' });
      });
    });
  });
});
