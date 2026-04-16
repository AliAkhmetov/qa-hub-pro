import { Client } from '@notionhq/client'
import type { Article, RichText } from './notion.types'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID!

export function extractPlainText(richTexts: RichText[]): string {
  return richTexts.map((rt) => rt.plain_text).join('')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformArticle(page: Record<string, any>): Article {
  const props = page.properties as Record<string, any>

  return {
    id: page.id as string,
    title: extractPlainText((props.Title as { title: RichText[] }).title ?? []),
    slug: extractPlainText((props.Slug as { rich_text: RichText[] }).rich_text ?? []),
    category: (props.Category as { select: { name: string } | null })?.select?.name ?? '',
    level: ((props.Level as { multi_select: { name: string }[] })?.multi_select ?? []).map((s) => s.name),
    status: ((props.Status as { select: { name: string } | null })?.select?.name as Article['status']) ?? 'Draft',
    language: ((props.Language as { select: { name: string } | null })?.select?.name as Article['language']) ?? 'ru',
    readTime: (props.ReadTime as { number: number | null })?.number ?? 0,
    updatedAt: (props.UpdatedAt as { date: { start: string } | null })?.date?.start ?? '',
    description: extractPlainText((props.Description as { rich_text: RichText[] })?.rich_text ?? []),
  }
}

export async function getArticles(language?: 'ru' | 'en'): Promise<Article[]> {
  const response = await notion.dataSources.query({
    data_source_id: databaseId,
    filter: {
      property: 'Status',
      select: { equals: 'Published' },
    } as never,
  })

  return response.results
    .map((page) => transformArticle(page as never))
    .filter((a) => !language || a.language === language || a.language === 'both')
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const response = await notion.dataSources.query({
    data_source_id: databaseId,
    filter: {
      property: 'Slug',
      rich_text: { equals: slug },
    } as never,
  })

  if (response.results.length === 0) return null
  return transformArticle(response.results[0] as never)
}

export async function getArticleBlocks(pageId: string) {
  const blocks = await notion.blocks.children.list({ block_id: pageId })
  return blocks.results
}
