import Link from 'next/link'
import type { Article } from '@/lib/notion.types'

interface ArticleHeaderProps {
  article: Article
  locale: string
  labels: {
    knowledgeBase: string
    updatedAt: string
    readTime: string
  }
}

export function ArticleHeader({ article, locale, labels }: ArticleHeaderProps) {
  const formattedDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString(
        locale === 'ru' ? 'ru-RU' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    : ''

  return (
    <header style={{ paddingTop: 48, marginBottom: 56 }}>
      {/* Kicker */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 20, borderBottom: '1px solid var(--line)', marginBottom: 36, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em' }}>
        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href={`/${locale}/articles`} style={{ color: 'var(--muted)' }}>{labels.knowledgeBase}</Link>
          <span>·</span>
          <span style={{ color: 'var(--accent)' }}>{article.category.toUpperCase()}</span>
        </nav>
        <div style={{ display: 'flex', gap: 16 }}>
          {article.level.map(lvl => (
            <span key={lvl}>{lvl.toUpperCase()}</span>
          ))}
          {article.readTime > 0 && (
            <span>{article.readTime} {labels.readTime.toUpperCase()}</span>
          )}
        </div>
      </div>

      {/* Big serif title */}
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 400,
        fontSize: 'clamp(40px, 6vw, 80px)',
        lineHeight: 1,
        letterSpacing: '-.03em',
        margin: '0 0 24px',
        maxWidth: '18ch',
      }}>
        {article.title}
      </h1>

      {/* Description */}
      {article.description && (
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg-soft)', margin: '0 0 24px', maxWidth: '52ch' }}>
          {article.description}
        </p>
      )}

      {/* Meta row */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>
        {formattedDate && <span>{formattedDate}</span>}
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 24, height: 1, background: 'var(--line)', display: 'inline-block' }} />
          Ali Akhmetov
        </span>
      </div>
    </header>
  )
}
