import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { BlogNavigation } from '..';

const props = {
  href: '/blog/react-native',
  title: 'React Native: nunca vi, nem comi, eu só ouço falar',
  date: '18 set 2019',
  dateTime: '2019-09-18',
};

describe('BlogNavigation.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(BlogNavigation).toBeDefined();
  });

  describe('when render', () => {
    it('should render a link announced as next with date and title', () => {
      render(<BlogNavigation {...props} />);

      const link = screen.getByRole('link', { name: `Próximo: 18 set 2019 ${props.title}` });
      expect(link).toHaveAttribute('href', '/blog/react-native');
      expect(link).toHaveClass('yl-blog-navigation', 'yl-blog-navigation--next');
      expect(screen.getByText('18 set 2019')).toHaveAttribute('datetime', '2019-09-18');
    });
  });

  describe('when receive props', () => {
    describe('direction and label props', () => {
      it('should announce the previous post with the given word', () => {
        render(<BlogNavigation {...props} direction="previous" previousLabel="Previous" />);

        expect(screen.getByRole('link', { name: /^Previous:/ })).toHaveClass(
          'yl-blog-navigation--previous'
        );
      });

      it('should announce the next post with the given word', () => {
        render(<BlogNavigation {...props} nextLabel="Next" />);

        expect(screen.getByRole('link', { name: /^Next:/ })).toBeInTheDocument();
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<BlogNavigation {...props} className="custom" />);

        expect(screen.getByRole('link')).toHaveClass('yl-blog-navigation', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<BlogNavigation {...props} />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});
