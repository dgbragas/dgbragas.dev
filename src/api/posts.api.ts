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
  read_time: number;
  related_posts: Array<{
    id: number;
    title: string;
    url: string;
  }>;
  released_at: string;
  section: string;
  tags: string[];
  title: string;
};

type StrapiPostBlock = Array<{
  type: 'paragraph' | 'list';
  format?: 'unordered' | 'ordered';
  children: Array<{
    text: string;
    type?: 'list-item';
    children?: Array<{
      text: string;
    }>;
  }>;
}>;

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR').format(date);

const getPosts = async (limit?: number) => {
  const params = [`populate=*`];

  if (limit) {
    params.push(`pagination[limit]=${limit}`);
  }

  const response = await fetch(`${baseUrl.server}/posts?${params.join('&')}`);
  const json = await response.json();

  const rawPosts = json.data as Post[];

  const formattedData = await Promise.all(
    rawPosts.map(async post => {
      const {
        banner,
        documentId,
        tags,
        title,
        content: postContent,
        read_time: readTime,
        related_posts: relatedPosts,
      } = post;

      const markedIntro = await marked(post.intro[0].children[0].text);
      const intro = plainText(markedIntro);
      const introElementsCount = post.intro.length;

      const markedContent = await marked(postContent);
      const content = limitWords(plainText(markedContent), 30);

      const releasedAt = formatDate(new Date(post.released_at));

      return {
        banner,
        content,
        documentId,
        intro,
        introElementsCount,
        readTime,
        relatedPosts,
        tags,
        title,
        releasedAt,
      };
    }),
  );

  const tags = [...new Set(rawPosts.flatMap(({ tags }) => tags))];

  return { posts: formattedData, tags };
};

const findOnePost = async (documentId: string) => {
  const response = await fetch(
    `${baseUrl.server}/posts/${documentId}?populate=*`,
  );
  const json = await response.json();

  const post = json.data as Post;

  const content = marked(post.content);
  const releasedAt = formatDate(new Date(post.released_at));

  const rawIntro = post.intro as StrapiPostBlock;

  const markdownIntro = rawIntro
    .flatMap(block => {
      if (block.type === 'paragraph') {
        return block.children.map(child => child.text);
      }

      if (block.type === 'list') {
        return block.children.map(item =>
          item.children?.map(child => `- ${child.text}`).join(''),
        );
      }

      return [];
    })
    .join('\n\n');
  const intro = marked(markdownIntro);

  return {
    ...post,
    content,
    intro,
    releasedAt,
  };
};

export { findOnePost, getPosts };
