import GithubIcon from '@/assets/icons/github.svg?raw';

import './CardGitHub.styles.scss';
import { Text } from '@/components/lib';

type CardGitHubProps = {
  description: string;
  repoUrl: string;
  title: string;
};

const CardGitHub = ({ description, repoUrl, title }: CardGitHubProps) => (
  <a className='card-github' href={repoUrl} target='_blank'>
    <div className='card-github__header'>
      <span aria-hidden dangerouslySetInnerHTML={{ __html: GithubIcon }} />
      <header>
        <Text element='h3' variant='intro-highlight'>
          {title}
        </Text>
      </header>
    </div>
    <Text element='p'>{description}</Text>
  </a>
);

export { CardGitHub };
