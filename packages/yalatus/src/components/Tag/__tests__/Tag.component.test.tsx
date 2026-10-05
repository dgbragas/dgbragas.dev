import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Tag } from '..';

describe('Tag.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Tag).toBeDefined();
  });

  describe('when render', () => {
    it('should render a span with the label and default classes', () => {
      render(<Tag>Design</Tag>);

      const tag = screen.getByText('Design');
      expect(tag.tagName).toBe('SPAN');
      expect(tag).toHaveClass('yl-tag', 'yl-tag--brand', 'yl-tag--outline');
    });
  });

  describe('when receive props', () => {
    describe('appearance prop', () => {
      it.each(['neutral', 'danger', 'warning', 'success', 'informative', 'inverse'] as const)(
        'should apply the %s class',
        appearance => {
          render(<Tag appearance={appearance}>Label</Tag>);

          expect(screen.getByText('Label')).toHaveClass(`yl-tag--${appearance}`);
        }
      );
    });

    describe('kind prop', () => {
      it('should apply the filled class', () => {
        render(<Tag kind="filled">Label</Tag>);

        expect(screen.getByText('Label')).toHaveClass('yl-tag--filled');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Tag className="custom">Label</Tag>);

        expect(screen.getByText('Label')).toHaveClass('yl-tag', 'custom');
      });
    });
  });

  describe('when handling edge cases', () => {
    it.each([null, false, undefined])('should render without children (%s)', children => {
      render(<Tag data-testid="tag">{children}</Tag>);

      expect(screen.getByTestId('tag')).toBeEmptyDOMElement();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Tag>Design</Tag>);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});
