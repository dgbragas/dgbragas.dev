import { createElement } from 'react';

import { act, renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useReducedMotion } from '../useReducedMotion.hooks';

type Listener = () => void;

function Probe() {
  return createElement('span', null, String(useReducedMotion()));
}

describe('useReducedMotion.hooks.ts', () => {
  let matches = false;
  let listeners: Listener[] = [];

  beforeEach(() => {
    listeners = [];
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        get matches() {
          return matches;
        },
        addEventListener: (_: string, listener: Listener) => listeners.push(listener),
        removeEventListener: (_: string, listener: Listener) => {
          listeners = listeners.filter(item => item !== listener);
        },
      }))
    );
  });

  afterEach(() => {
    matches = false;
    vi.unstubAllGlobals();
  });

  describe('useReducedMotion()', () => {
    describe('when the preference is off', () => {
      it('should return false', () => {
        const { result } = renderHook(() => useReducedMotion());

        expect(result.current).toBe(false);
      });
    });

    describe('when the preference changes', () => {
      it('should re-render with the new value and unsubscribe on unmount', () => {
        const { result, unmount } = renderHook(() => useReducedMotion());

        act(() => {
          matches = true;
          listeners.forEach(listener => listener());
        });

        expect(result.current).toBe(true);
        unmount();
        expect(listeners).toHaveLength(0);
      });
    });

    describe('when rendered on the server', () => {
      it('should return false without touching matchMedia', () => {
        matches = true;

        expect(renderToString(createElement(Probe))).toBe('<span>false</span>');
      });
    });
  });
});
