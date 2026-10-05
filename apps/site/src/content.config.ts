import { defineCollection, type ImageFunction } from 'astro:content';

import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locales = z.enum(['pt-BR', 'en']).default('pt-BR');

const figure = (image: ImageFunction) =>
  z.object({
    /** Image file relative to the entry folder. */
    src: image(),
    /** Alternative text read by assistive technology; empty when decorative. */
    alt: z.string(),
    /** Longer description shown under the image when present. */
    caption: z.string().optional(),
  });

const posts = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      intro: z.string().optional(),
      section: z.string(),
      tags: z.array(z.string()).default([]),
      readTime: z.number().int().positive(),
      cover: figure(image),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      related: z.array(z.string()).default([]),
      lang: locales,
      draft: z.boolean().default(false),
    }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      kind: z.enum(['project', 'daily-ui']).default('project'),
      category: z.enum(['landing', 'portfolio']).default('portfolio'),
      tags: z.array(z.string()).default([]),
      cover: figure(image).optional(),
      gallery: z.array(figure(image)).default([]),
      url: z.url().optional(),
      private: z.boolean().default(false),
      publishedAt: z.coerce.date(),
      related: z.array(z.string()).default([]),
      lang: locales,
      draft: z.boolean().default(false),
    }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      client: z.string(),
      role: z.string(),
      period: z.object({ start: z.string(), end: z.string().optional() }),
      usedBy: z.string().optional(),
      stack: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      cover: figure(image).optional(),
      gallery: z.array(figure(image)).default([]),
      results: z
        .array(
          z.object({
            /** Number the counter animates to. */
            value: z.number(),
            /** Text before the number, such as a currency symbol. */
            prefix: z.string().optional(),
            /** Text after the number, such as % or +. */
            suffix: z.string().optional(),
            /** What the number measures. */
            label: z.string(),
          })
        )
        .default([]),
      publishedAt: z.coerce.date(),
      related: z.array(z.string()).default([]),
      lang: locales,
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts, portfolio, cases };
