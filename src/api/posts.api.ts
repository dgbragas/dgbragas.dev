import { marked } from 'marked';

import { baseUrl } from '@/constants';
import { limitWords, plainText } from '@/utils';

type Post = {
  banner: {
    alternativeText: string;
    caption: string;
    url: string;
  };
  content: string;
  documentId: string;
  intro: Array<{
    children: Array<{
      text: string;
    }>;
  }>;
  publishedAt: string;
  read_time: number;
  section: string;
  tags: string[];
  title: string;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR').format(date);

const getPosts = async () => {
  const response = await fetch(`${baseUrl.server}/posts?populate=*`);
  const json = await response.json();

  const rawPosts = json.data as Post[];

  const formattedData = await Promise.all(
    rawPosts.map(async post => {
      const {
        banner,
        content: postContent,
        read_time: readTime,
        tags,
        title,
      } = post;

      const markedIntro = await marked(post.intro[0].children[0].text);
      const intro = plainText(markedIntro);

      const markedContent = await marked(postContent);
      const content = limitWords(plainText(markedContent), 30);

      const publishedAt = formatDate(new Date(post.publishedAt));

      return {
        banner,
        content,
        intro,
        publishedAt,
        readTime,
        tags,
        title,
      };
    }),
  );

  const tags = [...new Set(rawPosts.flatMap(({ tags }) => tags))];

  return { posts: formattedData, tags };
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
