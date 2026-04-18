import Link from 'next/link'
import { getArticles } from '@/lib/notion'
import type { Article } from '@/lib/notion.types'

interface ArticlesPageProps {
  params: Promise<{ locale: string }>
}

function formatDate(dateStr: string, isRu: boolean): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr.slice(0, 10)
  const monthsRu = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const months = isRu ? monthsRu : monthsEn
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
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

  const featured = articles[0] ?? null
  const rest = articles.slice(1)

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 32px' }}>

      {/* ── PAGE HEADER ── */}
      <section style={{ paddingTop: 56 }}>

        {/* Eyebrow / kicker bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBottom: 28,
          borderBottom: '1px solid var(--line)',
          marginBottom: 56,
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
          }}>
            {isRu ? 'БАЗА ЗНАНИЙ' : 'KNOWLEDGE BASE'}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '.2em',
          }}>
            {articles.length > 0
              ? `${articles.length} ${isRu ? 'СТАТЕЙ' : 'ARTICLES'}`
              : isRu ? 'QA HUB PRO' : 'QA HUB PRO'}
          </span>
        </div>

        {/* Big serif heading */}
        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          fontSize: 'clamp(56px, 8vw, 120px)',
          lineHeight: 0.9,
          letterSpacing: '-.035em',
          margin: '0 0 80px',
          color: 'var(--fg)',
        }}>
          {isRu ? (
            <>
              <span style={{ display: 'block' }}>База</span>
              <span style={{ display: 'block', color: 'var(--muted)', fontStyle: 'italic' }}>знаний</span>
            </>
          ) : (
            <>
              <span style={{ display: 'block' }}>Knowledge</span>
              <span style={{ display: 'block', color: 'var(--muted)', fontStyle: 'italic' }}>Base</span>
            </>
          )}
        </h1>

        {/* ── ARTICLE LIST ── */}
        {articles.length === 0 ? (
          /* Empty state placeholder */
          <div style={{
            padding: '80px 0',
            textAlign: 'center',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--accent)',
              letterSpacing: '.2em',
              marginBottom: 24,
            }}>
              {isRu ? 'СТАТЬИ СКОРО ПОЯВЯТСЯ' : 'ARTICLES COMING SOON'}
            </div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: 40,
              letterSpacing: '-.02em',
              color: 'var(--fg-soft)',
              margin: '0 0 16px',
            }}>
              {isRu ? 'Контент в процессе добавления' : 'Content is being added'}
            </h2>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--muted)',
              maxWidth: '42ch',
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              {isRu
                ? 'Статьи публикуются из Notion. Пока ни одна статья не помечена как Published — возвращайтесь позже.'
                : 'Articles are published from Notion. No articles are marked Published yet — check back soon.'}
            </p>
          </div>
        ) : (
          <div>
            {/* ── FEATURED ARTICLE (first) ── */}
            {featured && (
              <Link
                href={`/${locale}/articles/${featured.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 48,
                  alignItems: 'end',
                  padding: '0 0 56px',
                  borderBottom: '1px solid var(--line)',
                  marginBottom: 0,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {/* Featured image placeholder */}
                <div style={{
                  aspectRatio: '16 / 9',
                  background: 'var(--bg-elev)',
                  borderRadius: 20,
                  border: '1px solid var(--line)',
                  display: 'grid',
                  placeItems: 'center',
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: 'var(--muted)',
                    letterSpacing: '.15em',
                  }}>
                    FIGURE 01 · FEATURED
                  </span>
                </div>

                {/* Featured meta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: 'var(--accent)',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                  }}>
                    {featured.category || (isRu ? 'БЕЗ КАТЕГОРИИ' : 'UNCATEGORISED')}
                  </span>

                  <h2 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontSize: 'clamp(32px, 4vw, 56px)',
                    lineHeight: 1.0,
                    letterSpacing: '-.025em',
                    margin: 0,
                    color: 'var(--fg)',
                  }}>
                    {featured.title}
                  </h2>

                  {featured.description && (
                    <p style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: 'var(--fg-soft)',
                      margin: 0,
                      maxWidth: '48ch',
                    }}>
                      {featured.description}
                    </p>
                  )}

                  <div style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: 'var(--muted)',
                    letterSpacing: '.1em',
                  }}>
                    {featured.readTime > 0 && (
                      <span>{featured.readTime} {isRu ? 'мин чтения' : 'min read'}</span>
                    )}
                    {featured.readTime > 0 && featured.updatedAt && <span>·</span>}
                    {featured.updatedAt && (
                      <span>{formatDate(featured.updatedAt, isRu)}</span>
                    )}
                    {featured.level?.length > 0 && (
                      <>
                        <span>·</span>
                        <span>{featured.level.join(', ')}</span>
                      </>
                    )}
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: 'var(--accent)',
                    letterSpacing: '.15em',
                    marginTop: 8,
                  }}>
                    {isRu ? 'ЧИТАТЬ СТАТЬЮ' : 'READ ARTICLE'} →
                  </div>
                </div>
              </Link>
            )}

            {/* ── REST OF ARTICLES LIST ── */}
            {rest.map((article, idx) => (
              <Link
                key={article.id}
                href={`/${locale}/articles/${article.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 32,
                  alignItems: 'baseline',
                  padding: '32px 0',
                  borderBottom: '1px solid var(--line)',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {/* Left: category + title + desc */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: 'var(--accent)',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                  }}>
                    {article.category || (isRu ? 'БЕЗ КАТЕГОРИИ' : 'UNCATEGORISED')}
                  </span>

                  <h3 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontSize: 30,
                    lineHeight: 1.05,
                    letterSpacing: '-.02em',
                    margin: 0,
                    color: 'var(--fg)',
                  }}>
                    {article.title}
                  </h3>

                  {article.description && (
                    <p style={{
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: 'var(--fg-soft)',
                      margin: 0,
                      maxWidth: '64ch',
                    }}>
                      {article.description}
                    </p>
                  )}
                </div>

                {/* Right: meta */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 8,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'var(--muted)',
                  letterSpacing: '.1em',
                  whiteSpace: 'nowrap',
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: 'var(--muted)',
                    letterSpacing: '.15em',
                  }}>
                    {String(idx + 2).padStart(2, '0')}
                  </span>
                  {article.readTime > 0 && (
                    <span>{article.readTime} {isRu ? 'мин' : 'min'}</span>
                  )}
                  {article.updatedAt && (
                    <span>{formatDate(article.updatedAt, isRu)}</span>
                  )}
                  {article.level?.length > 0 && (
                    <span style={{ color: 'var(--fg-soft)' }}>{article.level[0]}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

      </section>
    </div>
  )
}
