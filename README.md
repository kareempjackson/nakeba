- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content (Sanity CMS)

Every piece of copy, every photo, the navigation, the booking link and the SEO/share metadata are edited in Sanity. The Studio is embedded at **[/studio](http://localhost:3000/studio)**.

The content is two documents:

- **Home page** — one tab per section, in page order.
- **Site settings** — name, role, email, booking link, navigation, socials, capabilities, the pitch, SEO and share image, and the footer.

The code still controls the logo artwork, the colours and type, the layout and animation, and the `/brand` guide, because that guide documents the design tokens in `app/(site)/globals.css`.

### How it fits together

| Path | What it is |
| --- | --- |
| `sanity/schemaTypes/` | The document schemas the Studio edits |
| `sanity/content/defaults.ts` | The site's copy before the CMS existed. It's used for any empty field, or for everything when Sanity is unreachable, and it's what the seed script writes |
| `sanity/lib/fetch.ts` | `getContent()`: reads both documents, turns images into CDN URLs and fills gaps from the defaults |
| `sanity.config.ts` | The Studio: singleton structure, Presentation (live preview) and Vision |
| `app/(site)/` | The website, with its own root layout |
| `app/(studio)/` | The Studio route, with its own bare root layout |
| `app/api/revalidate` | Webhook target that makes a publish go live immediately |
| `app/api/draft-mode/*` | Turns preview on and off for the Presentation tool |

Published content is cached and revalidated every 5 minutes. The webhook below makes updates immediate.

### Environment variables

| Variable | Needed for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Everything | `rt14psjl`. Without it the site renders the defaults and `/studio` explains what's missing |
| `NEXT_PUBLIC_SANITY_DATASET` | Everything | `production` |
| `SANITY_API_READ_TOKEN` | Live preview of drafts in the Studio | A **Viewer** token from sanity.io/manage → API → Tokens |
| `SANITY_REVALIDATE_SECRET` | Instant publishing | Any long random string; the webhook must be given the same one |

Set these in `.env.local` for development and in the Vercel project for deployments.

### First-time setup

1. **Seed the dataset** with the site's current copy and photos. This needs a CLI login that has write access to the project:

   ```bash
   npx sanity login
   npx sanity exec scripts/seed-sanity.ts --with-user-token
   ```

   It refuses to run if the documents already exist. Add `-- --replace` to reset them, which discards Studio edits.

2. **Allow the Studio's origins** (sanity.io/manage → API → CORS origins, with credentials): `http://localhost:3000`, plus the production and preview domains.

3. **Add the publish webhook** (sanity.io/manage → API → Webhooks):
   - URL: `https://www.nakebamason.com/api/revalidate`
   - Dataset: `production`, trigger on create, update and delete
   - Filter: `_type in ["homePage", "siteSettings"]`
   - Projection: `{_type}`
   - Secret: the value of `SANITY_REVALIDATE_SECRET`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
