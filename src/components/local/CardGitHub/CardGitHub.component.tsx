import GithubIcon from '@/assets/icons/github.svg?raw';

import './CardGitHub.styles.scss';
import { Text } from '@/components/lib';

type CardGitHubProps = React.HTMLAttributes<HTMLAnchorElement> & {
  className?: string;
  description: string;
  repoUrl: string;
  title: string;
  variant?: 'boxed' | 'extended';
};

const CardGitHub = ({
  className,
  description,
  repoUrl,
  title,
  ...rest
}: CardGitHubProps) => (
  <a
    {...rest}
    className={`card-github ${className ?? ''}`.trim()}
    href={repoUrl}
    target='_blank'
  >
    <div className='card-github__header'>
      <span aria-hidden dangerouslySetInnerHTML={{ __html: GithubIcon }} />
      <header>
        <Text element='h2' variant='intro-highlight'>
          {title}
        </Text>
      </header>
    </div>
    <Text element='p'>{description}</Text>
  </a>
);

export { CardGitHub };
