/**
 * Central config for the whole site.
 *
 * The `repo` block is the important one: it powers the "Add your /brag page"
 * button. When someone submits the form, we build a GitHub "create new file"
 * URL pointing at THIS repo, with the new entry pre-filled. GitHub then walks
 * the contributor through forking + opening a PR — no backend, no auth, no bot.
 *
 * --> Set owner/name to wherever this repo actually lives before going live. <--
 */
export const SITE = {
  title: 'The Brag Directory',
  tagline: 'A directory of /brag pages',
  description:
    'A community directory of people who keep a /brag page — a running list of the work they are proud of. Add yours.',
  // Production URL — keep in sync with `site` in astro.config.mjs.
  url: 'https://brag.example.com',
  author: 'Aaron Francis',
};

export const REPO = {
  owner: 'rynallen',
  name: 'slashbrag',
  branch: 'main',
  // Folder (relative to repo root) where one JSON file per person lives.
  // Must match the `base` in src/content.config.ts.
  contentPath: 'src/content/brags',
};

/** Convenience: links used in the footer / header. */
export const LINKS = {
  github: `https://github.com/${REPO.owner}/${REPO.name}`,
  aaron: 'https://aaronfrancis.com',
};
