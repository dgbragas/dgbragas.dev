import { baseUrl } from '@/constants';

type Repo = {
  description: string;
  html_url: string;
  name: string;
};

const getRepos = async () => {
  const response = await fetch(`${baseUrl.github}/orgs/whatt-if/repos`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
  });

  return (await response.json()) as Repo[];
};

export { getRepos };
