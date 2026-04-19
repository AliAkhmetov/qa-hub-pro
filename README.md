# QA Knowledge

QA Knowledge is a bilingual QA knowledge base built with Next.js App Router.

## Current Scope

- knowledge base home page
- article pages powered by Notion
- dark/light themes
- RU/EN routing via `next-intl`
- about page
- roadmap page
- comments/auth foundation via Supabase + NextAuth

## Getting Started

Run the development server:

```bash
npm run dev
```

The root route redirects to `http://localhost:3000/ru`.

## Environment

Copy `.env.local.example` to `.env.local` and fill in:

- Notion CMS credentials
- GitHub OAuth credentials
- NextAuth secret and URL
- Supabase URL, publishable key, and server-side service role key

## Comments Setup

Comments require:

1. configured GitHub OAuth in `.env.local`
2. configured Supabase public and service-role keys in `.env.local`
3. a `comments` table in Supabase

Use the SQL in `supabase/comments.sql` to create the table and policies.

## Quality Checks

```bash
npm run lint
npm test -- --runInBand
```

## Notes

- Comments/auth foundation is implemented, but real posting requires working external credentials.
- `SUPABASE_SERVICE_ROLE_KEY` must stay server-only and must never be exposed in client-side code.
- The project currently targets Next.js `16.2.4`.
