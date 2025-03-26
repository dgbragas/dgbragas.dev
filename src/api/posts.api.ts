import { marked } from 'marked';

import { baseUrl } from '@/constants/baseUrl.constants';

type Post = {
  content: string;
  intro: Array<{
    children: Array<{
      text: string;
    }>;
  }>;
  publishedAt: string;
  readTime: number;
  section: string;
  tags: string[];
  title: string;
};

const getPosts = async () => {
  const response = await fetch(`${baseUrl.server}/posts`);
  const json = await response.json();

  const rawPosts = json.data as Post[];

  const formattedData = rawPosts.map(post => {
    const date = new Date(post.publishedAt);

    const content = marked(post.content);
    const intro = marked(post.intro[0].children[0].text);
    const publishedAt = new Intl.DateTimeFormat('pt-BR').format(date);

    return {
      ...post,
      content,
      intro,
      publishedAt,
    };
  });

  return formattedData;
};

export { getPosts };
