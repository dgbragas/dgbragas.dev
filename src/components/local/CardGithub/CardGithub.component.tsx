import GithubIcon from '@/assets/icons/github.svg?raw';

import './CardGithub.styles.scss';
import { Text } from '@/components/lib';

type CardGithubProps = {
  description: string;
  repoUrl: string;
  title: string;
};

const CardGithub = ({ description, repoUrl, title }: CardGithubProps) => (
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

export { CardGithub };
