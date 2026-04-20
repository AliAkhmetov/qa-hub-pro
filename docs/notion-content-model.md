# Notion Content Model

`qa-knowledge` now treats the sidebar config as the source of truth for information architecture and routes. Notion is the source of truth for article content only.

## Required Notion Properties

- `Title`
  The public article title.
- `Path`
  Full route including locale, for example `/ru/test-design/overview`.
- `Status`
  Use `Draft` while writing and `Published` when the page is ready to appear on the site.
- `Language`
  Use `ru`, `en`, or `both`.
- `Description`
  Short summary used in page intro and SEO metadata.

## Recommended Properties

- `UpdatedAt`
  Last meaningful editorial update date.
- `ReadTime`
  Estimated read time in minutes.
- `Category`
  Optional editorial label.
- `Level`
  Optional audience level tags.

## Legacy Properties

- `Slug`
  Legacy field from the old `/articles/[slug]` model. New content does not need it.

## Editorial Workflow

1. Add or confirm the target route in `config/sidebar.ru.ts`.
2. Create a Notion page for that route.
3. Set `Path` to the exact sidebar route.
4. Fill `Title`, `Description`, `Language`, and article body.
5. Keep `Status = Draft` until the page is ready.
6. Switch to `Published` to make the article live on the site.

## Audit Endpoint

Use `GET /api/content-audit?locale=ru` to compare:

- pages present in the sidebar but missing in Notion
- published Notion pages that do not exist in the sidebar
- duplicate `Path` values
- published pages missing `Description` or `UpdatedAt`
