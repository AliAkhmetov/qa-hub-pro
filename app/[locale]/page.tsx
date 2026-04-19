import { getArticles, getArticleBySlug, getArticleBlocks } from '@/lib/notion'
import { KnowledgeBase } from '@/components/knowledge/KnowledgeBase'
import type { Article } from '@/lib/notion.types'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  let articles: Article[] = []
  try {
    articles = await getArticles(locale as 'ru' | 'en')
  } catch {
    // graceful degradation
  }

  if (!articles.length) {
    return (
      <div style={{ maxWidth: 640, margin: '120px auto', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.2em', marginBottom: 20 }}>
          {isRu ? 'БАЗА ЗНАНИЙ' : 'KNOWLEDGE BASE'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 48, margin: '0 0 16px', letterSpacing: '-.02em' }}>
          {isRu ? 'Статьи скоро появятся' : 'Articles coming soon'}
        </h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          {isRu ? 'Публикуется из Notion' : 'Published from Notion'}
        </p>
      </div>
    )
  }

  // Fetch first article content server-side (no loading flash)
  const firstArticle = articles[0]
  let initialArticle: Article = firstArticle
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initialBlocks: Record<string, any>[] = []

  try {
    const fetched = await getArticleBySlug(firstArticle.slug)
    if (fetched) {
      initialArticle = fetched
      initialBlocks = await getArticleBlocks(fetched.id)
    }
  } catch {
    // use article without blocks
  }

  return (
    <KnowledgeBase
      articles={articles}
      locale={locale}
      isRu={isRu}
      initialSlug={firstArticle.slug}
      initialArticle={initialArticle}
      initialBlocks={initialBlocks}
    />
  )
}
