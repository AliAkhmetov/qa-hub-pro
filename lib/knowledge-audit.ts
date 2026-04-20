import { getKnowledgeArticles } from '@/lib/notion'
import type { Article } from '@/lib/notion.types'
import { getSidebarLeafEntries, normalizeSidebarHref } from '@/lib/sidebar'

interface AuditSidebarPage {
  title: string
  path: string
}

interface AuditArticleIssue {
  id: string
  title: string
  path: string
}

interface AuditDuplicateIssue extends AuditArticleIssue {
  duplicateIds: string[]
}

function normalizeArticlePath(article: Article): string {
  return normalizeSidebarHref(article.path)
}

export async function getKnowledgeContentAudit(locale: 'ru' | 'en') {
  const sidebarEntries = getSidebarLeafEntries(locale)
  const sidebarPages: AuditSidebarPage[] = sidebarEntries.map((entry) => ({
    title: entry.item.title,
    path: entry.item.href,
  }))

  const publishedArticles = (await getKnowledgeArticles(locale)).map((article) => ({
    ...article,
    path: normalizeArticlePath(article),
  }))

  const articleGroups = new Map<string, Article[]>()

  for (const article of publishedArticles) {
    const existing = articleGroups.get(article.path) ?? []
    existing.push(article)
    articleGroups.set(article.path, existing)
  }

  const sidebarPaths = new Set(sidebarPages.map((page) => page.path))

  const missingInNotion = sidebarPages.filter((page) => !articleGroups.has(page.path))

  const orphanedInNotion: AuditArticleIssue[] = publishedArticles
    .filter((article) => article.path && !sidebarPaths.has(article.path))
    .map((article) => ({
      id: article.id,
      title: article.title,
      path: article.path,
    }))

  const duplicates: AuditDuplicateIssue[] = Array.from(articleGroups.entries())
    .filter(([, articles]) => articles.length > 1)
    .map(([path, articles]) => ({
      id: articles[0].id,
      title: articles[0].title,
      path,
      duplicateIds: articles.map((article) => article.id),
    }))

  const incompleteMetadata: AuditArticleIssue[] = publishedArticles
    .filter((article) => !article.description || !article.updatedAt)
    .map((article) => ({
      id: article.id,
      title: article.title,
      path: article.path,
    }))

  const matchedPages = sidebarPages.length - missingInNotion.length

  return {
    locale,
    generatedAt: new Date().toISOString(),
    summary: {
      sidebarPages: sidebarPages.length,
      matchedPages,
      missingInNotion: missingInNotion.length,
      publishedArticles: publishedArticles.length,
      orphanedInNotion: orphanedInNotion.length,
      duplicatePaths: duplicates.length,
      incompleteMetadata: incompleteMetadata.length,
    },
    missingInNotion,
    orphanedInNotion,
    duplicates,
    incompleteMetadata,
  }
}
