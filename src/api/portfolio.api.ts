import { baseUrl } from '@/constants/baseUrl.constants';

type PortfolioPost = {
  description: string;
  id: number;
  image: {
    alternativeText: string;
    caption: string;
    url: string;
  };
  private: boolean;
  tags: string[];
  title: string;
  url: string;
};

type PortfolioProject = {
  description: string;
  name: string;
  html_url: string;
};

const getPortfolioPosts = async () => {
  const response = await fetch(`${baseUrl.server}/portfolios?populate=image`);
  const json = await response.json();

  const rawPosts = json.data as PortfolioPost[];

  const { privatePosts, publicPosts } = rawPosts.reduce(
    (accumulator, currentValue) => {
      if (currentValue.private) {
        accumulator.privatePosts.push(currentValue);
      } else {
        accumulator.publicPosts.push(currentValue);
      }

      return accumulator;
    },
    {
      privatePosts: [] as PortfolioPost[],
      publicPosts: [] as PortfolioPost[],
    },
  );
  const tags = [...new Set(rawPosts.flatMap(({ tags }) => tags))];

  return { privatePosts, publicPosts, tags };
};

const getPortfolioProjects = async () => {
  const response = await fetch(`${baseUrl.github}/users/dgbragas/repos`);
  return (await response.json()) as PortfolioProject[];
};

export { getPortfolioPosts, getPortfolioProjects };
