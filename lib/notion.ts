import type { Article, RichText } from './notion.types'

const NOTION_TOKEN = process.env.NOTION_TOKEN!
const databaseId = process.env.NOTION_DATABASE_ID!
const NOTION_VERSION = '2022-06-28'

interface NotionSelectOption {
  name: string
}

interface NotionTitleProperty {
  title?: RichText[]
}

interface NotionRichTextProperty {
  rich_text?: RichText[]
}

interface NotionSelectProperty {
  select?: NotionSelectOption | null
}

interface NotionMultiSelectProperty {
  multi_select?: NotionSelectOption[]
}

interface NotionNumberProperty {
  number?: number | null
}

interface NotionDateProperty {
  date?: { start: string } | null
}

interface NotionPageProperties {
  Title?: NotionTitleProperty
  Slug?: NotionRichTextProperty
  Path?: NotionRichTextProperty
  Category?: NotionSelectProperty
  Level?: NotionMultiSelectProperty
  Status?: NotionSelectProperty
  Language?: NotionSelectProperty
  ReadTime?: NotionNumberProperty
  UpdatedAt?: NotionDateProperty
  Description?: NotionRichTextProperty
}

interface NotionPage {
  id: string
  properties: NotionPageProperties
}

async function notionFetch(path: string, body?: object) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 60 },
  })
  return res.json()
}

export function extractPlainText(richTexts: RichText[]): string {
  return richTexts.map((rt) => rt.plain_text).join('')
}

export function transformArticle(page: NotionPage): Article {
  const props = page.properties

  return {
    id: page.id,
    title: extractPlainText(props.Title?.title ?? []),
    slug: extractPlainText(props.Slug?.rich_text ?? []),
    path: extractPlainText(props.Path?.rich_text ?? []),
    category: props.Category?.select?.name ?? '',
    level: (props.Level?.multi_select ?? []).map((option) => option.name),
    status: (props.Status?.select?.name as Article['status']) ?? 'Draft',
    language: (props.Language?.select?.name as Article['language']) ?? 'ru',
    readTime: props.ReadTime?.number ?? 0,
    updatedAt: props.UpdatedAt?.date?.start ?? '',
    description: extractPlainText(props.Description?.rich_text ?? []),
  }
}

function isKnowledgeArticle(article: Article): boolean {
  return Boolean(article.path && article.title)
}

function matchesLanguage(article: Article, language?: 'ru' | 'en'): boolean {
  return !language || article.language === language || article.language === 'both'
}

export async function getKnowledgeArticles(language?: 'ru' | 'en'): Promise<Article[]> {
  const data = await notionFetch(`databases/${databaseId}/query`, {
    filter: { property: 'Status', select: { equals: 'Published' } },
    sorts: [{ property: 'UpdatedAt', direction: 'descending' }],
  })

  return (data.results ?? [])
    .map((page: NotionPage) => transformArticle(page))
    .filter(isKnowledgeArticle)
    .filter((article: Article) => matchesLanguage(article, language))
}

export const getArticles = getKnowledgeArticles

export async function getArticleByPath(path: string): Promise<Article | null> {
  const data = await notionFetch(`databases/${databaseId}/query`, {
    filter: {
      and: [
        { property: 'Path', rich_text: { equals: path } },
        { property: 'Status', select: { equals: 'Published' } },
      ],
    },
  })

  if (!data.results?.length) return null
  return transformArticle(data.results[0] as NotionPage)
}

export async function getArticleBlocks(pageId: string) {
  const data = await notionFetch(`blocks/${pageId}/children`)
  return data.results ?? []
}
