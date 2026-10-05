import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Marquee } from '..';

import type { MarqueeItem } from '../Marquee.types';

const items: MarqueeItem[] = [
  { icon: 'react', label: 'React' },
  { icon: 'figma', label: 'Figma', color: 'surface-info' },
];

describe('Marquee.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Marquee).toBeDefined();
  });

  describe('when render', () => {
    it('should render a labelled section with one visible list and a hidden duplicate', () => {
      render(<Marquee items={items} />);

      const section = screen.getByRole('region', { name: 'Tecnologias e temas' });
      expect(section).toHaveClass('yl-marquee');
      expect(screen.getAllByRole('list')).toHaveLength(1);
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      expect(section.querySelectorAll('.yl-marquee__track')).toHaveLength(2);
      expect(section.querySelectorAll('[aria-hidden="true"] .yl-marquee__item')).toHaveLength(2);
    });

    it('should colour each plate with its token or the default', () => {
      render(<Marquee items={items} />);

      const plates = screen.getByRole('list').querySelectorAll('.yl-marquee__plate');
      expect(plates[0]).toHaveStyle({ backgroundColor: 'var(--yl-color-surface-accent-subtle)' });
      expect(plates[1]).toHaveStyle({ backgroundColor: 'var(--yl-color-surface-info)' });
    });
  });

  describe('when receive props', () => {
    describe('label prop', () => {
      it('should change the accessible name', () => {
        render(<Marquee items={items} label="Stack" />);

        expect(screen.getByRole('region', { name: 'Stack' })).toBeInTheDocument();
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Marquee items={items} className="custom" />);

        expect(screen.getByRole('region')).toHaveClass('yl-marquee', 'custom');
      });
    });
  });

  describe('when handling edge cases', () => {
    it('should render empty tracks without items', () => {
      render(<Marquee items={[]} />);

      expect(screen.getByRole('list')).toBeEmptyDOMElement();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Marquee items={items} />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});
