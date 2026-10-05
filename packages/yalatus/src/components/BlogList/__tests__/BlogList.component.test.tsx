import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { BlogList } from '..';

describe('BlogList.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(BlogList).toBeDefined();
  });

  describe('when render', () => {
    it('should render an unordered list with one item per entry', () => {
      render(<BlogList items={['Um', 'Dois']} />);

      const list = screen.getByRole('list');
      expect(list.tagName).toBe('UL');
      expect(list).toHaveClass('yl-blog-list');
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });

  describe('when receive props', () => {
    describe('ordered prop', () => {
      it('should render an ordered list with the modifier', () => {
        render(<BlogList items={['Um']} ordered />);

        const list = screen.getByRole('list');
        expect(list.tagName).toBe('OL');
        expect(list).toHaveClass('yl-blog-list--ordered');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<BlogList items={['Um']} className="custom" />);

        expect(screen.getByRole('list')).toHaveClass('yl-blog-list', 'custom');
      });
    });
  });

  describe('when handling edge cases', () => {
    it('should render an empty list without items', () => {
      render(<BlogList items={[]} />);

      expect(screen.getByRole('list')).toBeEmptyDOMElement();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<BlogList items={['Um', <strong key="b">Dois</strong>]} />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});
