import { baseUrl } from '@/constants';

const getRepos = async () => {
  const response = await fetch(`${baseUrl}/orgs/whatt-if/repos`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
  });

  return await response.json();
};

export { getRepos };
