import { richText } from './notion/lib/article-builders.mjs'
import { articles } from './notion/content/index.mjs'

const NOTION_TOKEN = process.env.NOTION_TOKEN
const DATABASE_ID = process.env.NOTION_DATABASE_ID
const NOTION_VERSION = '2022-06-28'

if (!NOTION_TOKEN || !DATABASE_ID) {
  throw new Error('NOTION_TOKEN and NOTION_DATABASE_ID are required')
}

function printUsage() {
  console.log(`
Usage:
  node --env-file=.env.local scripts/seed-first-10-articles.mjs --path <article-path>
  node --env-file=.env.local scripts/seed-first-10-articles.mjs --section <section-slug>
  node --env-file=.env.local scripts/seed-first-10-articles.mjs --all
  node --env-file=.env.local scripts/seed-first-10-articles.mjs --path <article-path> --dry-run

Examples:
  node --env-file=.env.local scripts/seed-first-10-articles.mjs --path /ru/backend-api/what-is-api
  node --env-file=.env.local scripts/seed-first-10-articles.mjs --section backend-api
  node --env-file=.env.local scripts/seed-first-10-articles.mjs --all
`)
}

function parseArgs(argv) {
  const options = {
    mode: null,
    path: null,
    section: null,
    dryRun: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === '--help' || arg === '-h') {
      printUsage()
      process.exit(0)
    }

    if (arg === '--dry-run') {
      options.dryRun = true
      continue
    }

    if (arg === '--all') {
      options.mode = 'all'
      continue
    }

    if (arg === '--path') {
      options.mode = 'path'
      options.path = argv[index + 1] ?? null
      index += 1
      continue
    }

    if (arg === '--section') {
      options.mode = 'section'
      options.section = argv[index + 1] ?? null
      index += 1
      continue
    }

    throw new Error(`Unknown argument: ${arg}`)
  }

  if (!options.mode) {
    throw new Error('Publish mode is required. Use --path, --section or --all.')
  }

  if (options.mode === 'path' && !options.path) {
    throw new Error('Missing value for --path')
  }

  if (options.mode === 'section' && !options.section) {
    throw new Error('Missing value for --section')
  }

  return options
}

function getSectionSlug(path) {
  return path.split('/').filter(Boolean)[1] ?? ''
}

function selectArticles(options) {
  if (options.mode === 'all') {
    return articles
  }

  if (options.mode === 'path') {
    return articles.filter((item) => item.path === options.path)
  }

  if (options.mode === 'section') {
    return articles.filter((item) => getSectionSlug(item.path) === options.section)
  }

  return []
}

async function notionRequest(path, { method = 'GET', body } = {}) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(`https://api.notion.com/v1${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      const shouldRetry = response.status === 429 || response.status >= 500

      if (shouldRetry && attempt < 5) {
        const delayMs = attempt * 2000
        console.warn(`Retrying ${method} ${path} after ${response.status} (${attempt}/5)...`)
        await new Promise((resolve) => setTimeout(resolve, delayMs))
        continue
      }

      throw new Error(`${method} ${path} failed: ${response.status} ${errorText}`)
    }

    if (response.status === 204) {
      return null
    }

    return response.json()
  }

  throw new Error(`${method} ${path} failed after retries`)
}

async function getDatabaseSchema() {
  return notionRequest(`/databases/${DATABASE_ID}`)
}

async function ensurePathProperty() {
  const schema = await getDatabaseSchema()

  if (schema.properties?.Path) {
    return
  }

  await notionRequest(`/databases/${DATABASE_ID}`, {
    method: 'PATCH',
    body: {
      properties: {
        Path: { rich_text: {} },
      },
    },
  })
}

function buildProperties(item) {
  return {
    Title: { title: richText(item.title) },
    Slug: { rich_text: richText(item.slug) },
    Path: { rich_text: richText(item.path) },
    Category: { select: { name: item.category } },
    Level: { multi_select: item.level.map((name) => ({ name })) },
    Status: { select: { name: item.status } },
    Language: { select: { name: item.language } },
    ReadTime: { number: item.readTime },
    UpdatedAt: { date: { start: item.updatedAt } },
    Description: { rich_text: richText(item.description) },
  }
}

async function findPageByPath(path) {
  const data = await notionRequest(`/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    body: {
      page_size: 10,
      filter: {
        property: 'Path',
        rich_text: { equals: path },
      },
    },
  })

  return data.results ?? []
}

async function listChildBlocks(blockId) {
  const data = await notionRequest(`/blocks/${blockId}/children?page_size=100`)
  return data.results ?? []
}

async function clearPageContent(pageId) {
  const children = await listChildBlocks(pageId)

  for (const child of children) {
    try {
      await notionRequest(`/blocks/${child.id}`, { method: 'DELETE' })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)

      if (message.includes("Can't edit block that is archived")) {
        console.warn(`Skipping already archived block ${child.id}`)
        continue
      }

      throw error
    }
  }
}

async function appendChildren(blockId, children) {
  for (let index = 0; index < children.length; index += 50) {
    await notionRequest(`/blocks/${blockId}/children`, {
      method: 'PATCH',
      body: { children: children.slice(index, index + 50) },
    })
  }
}

async function createArticlePage(item) {
  await notionRequest('/pages', {
    method: 'POST',
    body: {
      parent: { database_id: DATABASE_ID },
      properties: buildProperties(item),
      children: item.children,
    },
  })
}

async function updateArticlePage(pageId, item) {
  await notionRequest(`/pages/${pageId}`, {
    method: 'PATCH',
    body: {
      properties: buildProperties(item),
    },
  })

  await clearPageContent(pageId)
  await appendChildren(pageId, item.children)
}

async function upsertArticle(item) {
  const existingPages = await findPageByPath(item.path)

  if (existingPages.length > 1) {
    throw new Error(`Multiple pages found for path ${item.path}. Resolve duplicates before importing.`)
  }

  if (existingPages.length === 0) {
    await createArticlePage(item)
    return 'created'
  }

  await updateArticlePage(existingPages[0].id, item)
  return 'updated'
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const selectedArticles = selectArticles(options)

  if (!selectedArticles.length) {
    throw new Error(
      options.mode === 'path'
        ? `No article found for path ${options.path}`
        : `No articles found for section ${options.section}`
    )
  }

  await ensurePathProperty()
  console.log(
    options.mode === 'all'
      ? `Publishing all ${selectedArticles.length} articles to Notion...`
      : `Publishing ${selectedArticles.length} article(s) to Notion in mode "${options.mode}"...`
  )

  if (options.dryRun) {
    for (const item of selectedArticles) {
      console.log(`DRY RUN ${item.path}`)
    }
    console.log('Dry run completed.')
    return
  }

  for (const item of selectedArticles) {
    const result = await upsertArticle(item)
    console.log(`${result.toUpperCase()} ${item.path}`)
  }

  console.log('Done.')
}

main().catch((error) => {
  console.error(error.message)
  printUsage()
  process.exit(1)
})
