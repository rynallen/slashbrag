# The Brag Directory

A static directory of people who keep a **`/brag` page** — a running list of the
work they're proud of. Anyone can add themselves by opening a pull request, which
the site pre-fills for them. No database, no backend, no auth to manage.

Built with [Astro](https://astro.build) · deploys as static assets to Cloudflare.

---

## How it works

- Every person is **one JSON file** in `src/content/brags/`.
- A [content collection](https://docs.astro.build/en/guides/content-collections/)
  loads those files and validates each one against a Zod schema **at build time**.
- The homepage renders them as a searchable grid.
- The **Add your /brag page** form builds a new entry and opens a pre-filled
  GitHub "new file" page — the contributor just commits, and GitHub walks them
  through opening a PR.

### The entry schema

Each file in `src/content/brags/<slug>.json`:

```json
{
  "name": "Your Name",
  "url": "https://yoursite.com/brag",
  "description": "One or two sentences — 200 characters max."
}
```

| Field         | Rule                                  |
| ------------- | ------------------------------------- |
| `name`        | required, 1–80 chars                  |
| `url`         | required, valid URL                   |
| `description` | required, **200 characters or fewer** |

The schema lives in [`src/content.config.ts`](src/content.config.ts). An invalid
entry **fails the build**, which is what the PR check runs — so bad data can't be
merged. (Verified: a bad URL or an over-length description stops `npm run build`.)

---

## Adding yourself

You don't need to clone anything. Open the site, go to **Add your /brag page**,
fill in the three fields, and click the button. It opens GitHub with your file
written for you; commit it and GitHub will offer to fork the repo and open a PR.

Prefer to do it by hand? Add a file at `src/content/brags/your-name.json` matching
the schema above and open a PR.

A maintainer reviews each PR (real person, sensible link, not spam) and merges.
Merging triggers a deploy and you appear in the directory.

---

## Configuration

One file controls the wiring: [`src/config.ts`](src/config.ts).

```ts
export const REPO = {
  owner: 'aarondfrancis', // where this repo lives — powers the PR links
  name: 'brag-directory',
  branch: 'main',
  contentPath: 'src/content/brags',
};
```

**Set `owner` / `name` to the real repo before going live** — the "Add" button
points its pull requests there. `SITE` in the same file holds the title, tagline,
and production URL (keep that URL in sync with `site` in `astro.config.mjs`).

### Theming

All visual design is centralized in [`src/styles/tokens.css`](src/styles/tokens.css)
— colors, type scale, spacing, radii. Drop a styleguide in by editing those
variables; you shouldn't need to touch the components. Fonts are loaded via a
`<link>` in [`src/layouts/Base.astro`](src/layouts/Base.astro) — swap the families
there. The current look (warm editorial, Fraunces + Hanken Grotesk) is a
placeholder meant to be replaced.

---

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/ (also validates all entries)
npm run preview  # preview the built site
```

Requires Node 20+ (CI uses Node 22).

---

## Deploy to Cloudflare

This is a fully static site (`output: 'static'`, no adapter), so it serves as
plain static assets.

1. Push the repo to GitHub.
2. In the Cloudflare dashboard → **Workers & Pages** → create a project from your
   GitHub repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. Every push to `main` redeploys automatically.

> Note: Cloudflare now steers new projects toward Workers (static assets) rather
> than Pages; either serves this fine. Do **not** add `@astrojs/cloudflare` — for
> a purely static build it isn't needed and can flip Astro into server mode.

---

## Project layout

```
src/
  config.ts            ← site + repo config (edit the REPO block)
  content.config.ts    ← collection schema (Zod validation)
  content/brags/*.json ← one file per person
  styles/tokens.css    ← all design tokens (edit to retheme)
  styles/global.css    ← base styles built on the tokens
  layouts/Base.astro   ← shell: head, header, footer, fonts
  components/BragCard.astro
  pages/index.astro    ← directory + search
  pages/add.astro      ← the pre-filled-PR form
.github/workflows/validate.yml  ← PR validation (runs the build)
```

The entries currently in `src/content/brags/` are samples — keep Aaron's if you
like, delete the `example.com` placeholders.
