import { marked } from 'marked';

import { baseUrl } from '@/constants/baseUrl.constants';

type Post = {
  content: string;
  documentId: string;
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

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR').format(date);

const getPosts = async () => {
  const response = await fetch(`${baseUrl.server}/posts`);
  const json = await response.json();

  const rawPosts = json.data as Post[];

  const formattedData = rawPosts.map(post => {
    const { readTime, tags, title } = post;

    const intro = marked(post.intro[0].children[0].text);
    const publishedAt = formatDate(new Date(post.publishedAt));

    return {
      intro,
      publishedAt,
      readTime,
      tags,
      title,
    };
  });

  return formattedData;
};

const findOnePost = async (documentId: string) => {
  const response = await fetch(`${baseUrl.server}/posts/${documentId}`);
  const json = await response.json();

  const post = json.data as Post;

  const content = marked(post.content);
  const intro = marked(post.intro[0].children[0].text);
  const publishedAt = formatDate(new Date(post.publishedAt));

  return {
    ...post,
    content,
    intro,
    publishedAt,
  };
};

export { findOnePost, getPosts };
