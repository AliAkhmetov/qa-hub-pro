import { getArticles } from '@/lib/notion'
import { ArticlesLayout } from '@/components/articles/ArticlesLayout'
import type { Article } from '@/lib/notion.types'

interface ArticlesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  let articles: Article[] = []
  try {
    articles = await getArticles(locale as 'ru' | 'en')
  } catch {
    // graceful degradation
  }

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 32px 120px' }}>

      {/* Kicker bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        paddingTop: 56, paddingBottom: 28,
        borderBottom: '1px solid var(--line)', marginBottom: 48,
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em',
      }}>
        <span>{isRu ? 'БАЗА ЗНАНИЙ' : 'KNOWLEDGE BASE'}</span>
        <span>{articles.length} {isRu ? 'СТАТЕЙ' : 'ARTICLES'}</span>
      </div>

      {/* Big serif heading */}
      <h1 style={{
        fontFamily: 'var(--font-serif)', fontWeight: 400,
        fontSize: 'clamp(56px, 8vw, 120px)', lineHeight: .9,
        letterSpacing: '-.035em', margin: '0 0 64px',
      }}>
        <span style={{ display: 'block' }}>{isRu ? 'База' : 'Knowledge'}</span>
        <span style={{ display: 'block', color: 'var(--muted)', fontStyle: 'italic' }}>
          {isRu ? 'знаний' : 'Base'}
        </span>
      </h1>

      {articles.length === 0 ? (
        <div style={{ padding: '80px 0', textAlign: 'center', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.2em', marginBottom: 24 }}>
            {isRu ? 'СТАТЬИ СКОРО ПОЯВЯТСЯ' : 'ARTICLES COMING SOON'}
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 40, letterSpacing: '-.02em', color: 'var(--fg-soft)', margin: '0 0 16px' }}>
            {isRu ? 'Контент в процессе добавления' : 'Content is being added'}
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', maxWidth: '42ch', margin: '0 auto', lineHeight: 1.6 }}>
            {isRu
              ? 'Статьи публикуются из Notion. Пока ни одна статья не помечена как Published.'
              : 'Articles are published from Notion. No articles marked Published yet — check back soon.'}
          </p>
        </div>
      ) : (
        <ArticlesLayout articles={articles} locale={locale} isRu={isRu} />
      )}

    </div>
  )
}
