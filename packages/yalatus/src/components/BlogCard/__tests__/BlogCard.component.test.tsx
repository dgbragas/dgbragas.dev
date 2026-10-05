import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { BlogCard } from '..';

const props = {
  href: '/blog/post',
  title: 'Introducing Loops',
  description: 'Describe a recurring job in plain language.',
  date: '27 jul 2026',
  dateTime: '2026-07-27',
};

describe('BlogCard.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(BlogCard).toBeDefined();
  });

  describe('when render', () => {
    it('should render a link with title, description and date', () => {
      render(<BlogCard {...props} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/blog/post');
      expect(link).toHaveClass('yl-blog-card');
      expect(
        screen.getByRole('heading', { level: 3, name: 'Introducing Loops' })
      ).toBeInTheDocument();
      expect(screen.getByText('27 jul 2026')).toHaveAttribute('datetime', '2026-07-27');
      expect(link.querySelector('.yl-blog-card__cover')).not.toBeInTheDocument();
    });
  });

  describe('when receive props', () => {
    describe('category prop', () => {
      it('should show the category after the date', () => {
        render(<BlogCard {...props} category="Security" />);

        expect(screen.getByText('Security')).toHaveClass('yl-blog-card__category');
      });
    });

    describe('expanded and cover props', () => {
      it('should add the modifier and render the cover slot', () => {
        render(<BlogCard {...props} expanded cover={<img alt="" src="/cover.png" />} />);

        const link = screen.getByRole('link');
        expect(link).toHaveClass('yl-blog-card--expanded');
        expect(link.querySelector('.yl-blog-card__cover img')).toHaveAttribute('src', '/cover.png');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<BlogCard {...props} className="custom" />);

        expect(screen.getByRole('link')).toHaveClass('yl-blog-card', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<BlogCard {...props} category="Security" />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});
