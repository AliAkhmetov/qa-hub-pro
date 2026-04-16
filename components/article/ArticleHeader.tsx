import type { Article } from '@/lib/notion.types'

interface ArticleHeaderProps {
  article: Article
  locale: string
}

export function ArticleHeader({ article, locale }: ArticleHeaderProps) {
  const updatedLabel = locale === 'ru' ? 'Обновлено' : 'Updated'
  const readTimeLabel = locale === 'ru' ? 'мин' : 'min'
  const kbLabel = locale === 'ru' ? 'База знаний' : 'Knowledge Base'

  const formattedDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString(
        locale === 'ru' ? 'ru-RU' : 'en-US',
        { day: 'numeric', month: 'short', year: 'numeric' }
      )
    : ''

  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        <span>{kbLabel}</span>
        <span style={{ color: 'var(--text-hint)' }}>›</span>
        <span>{article.category}</span>
        <span style={{ color: 'var(--text-hint)' }}>›</span>
        <span style={{ color: 'var(--text-primary)' }}>{article.title}</span>
      </nav>

      {/* Title */}
      <h1 className="font-mono mb-4" style={{ color: 'var(--text-primary)' }}>{article.title}</h1>

      {/* Meta row */}
      <div className="flex items-center flex-wrap gap-3">
        {article.level.map((lvl) => {
          const colors: Record<string, { bg: string; color: string; borderColor: string }> = {
            Junior: { bg: 'rgba(110,231,183,0.1)', color: '#6ee7b7', borderColor: 'rgba(110,231,183,0.2)' },
            Middle: { bg: 'rgba(96,165,250,0.1)', color: '#60a5fa', borderColor: 'rgba(96,165,250,0.2)' },
            Senior: { bg: 'rgba(167,139,250,0.1)', color: '#a78bfa', borderColor: 'rgba(167,139,250,0.2)' },
            Lead: { bg: 'rgba(251,146,60,0.1)', color: '#fb923c', borderColor: 'rgba(251,146,60,0.2)' },
          }
          const c = colors[lvl] ?? { bg: 'var(--surface2)', color: 'var(--text-muted)', borderColor: 'var(--border)' }
          return (
            <span
              key={lvl}
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ backgroundColor: c.bg, color: c.color, border: `1px solid ${c.borderColor}` }}
            >
              {lvl}
            </span>
          )
        })}

        <span
          className="text-xs px-2.5 py-1 rounded-full"
          style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          {article.category}
        </span>

        {formattedDate && (
          <>
            <span style={{ color: 'var(--text-hint)' }}>·</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {updatedLabel}: {formattedDate}
            </span>
          </>
        )}

        {article.readTime > 0 && (
          <>
            <span style={{ color: 'var(--text-hint)' }}>·</span>
            <span className="text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {article.readTime} {readTimeLabel}
            </span>
          </>
        )}
      </div>

      <hr className="mt-6" style={{ borderColor: 'var(--border)' }} />
    </header>
  )
}
