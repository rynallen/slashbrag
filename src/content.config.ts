import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The `brags` collection: one JSON file per person, living in src/content/brags/.
 *
 * One-file-per-person is deliberate. It means every contribution PR adds exactly
 * one new file — zero merge conflicts as the directory grows, and a one-file diff
 * is trivial to review.
 *
 * The Zod schema below is enforced at BUILD TIME. A malformed entry (missing
 * field, bad URL, description over 200 chars) fails `astro build`, which is what
 * the PR validation workflow runs. So bad data can never reach production.
 */
const brags = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/brags' }),
  schema: z.object({
    name: z.string().min(1, 'name is required').max(80),
    url: z.string().url('url must be a valid URL, e.g. https://you.com/brag'),
    description: z
      .string()
      .min(1, 'description is required')
      .max(200, 'description must be 200 characters or fewer'),
    avatar: z.string().url().optional(),
    tags: z.array(z.string().max(30)).max(5).optional(),
  }),
});

export const collections = { brags };
