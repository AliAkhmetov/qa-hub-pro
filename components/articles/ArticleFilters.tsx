'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Article } from '@/lib/notion.types'

interface ArticleFiltersProps {
  articles: Article[]
  locale: string
  isRu: boolean
}

function formatDate(dateStr: string, isRu: boolean): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr.slice(0, 10)
  const months = isRu
    ? ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export function ArticleFilters({ articles, locale, isRu }: ArticleFiltersProps) {
  const [active, setActive] = useState('all')

  // Collect unique categories
  const categories = useMemo(() => {
    const seen = new Set<string>()
    for (const a of articles) if (a.category) seen.add(a.category)
    return [...seen]
  }, [articles])

  const filtered = active === 'all' ? articles : articles.filter(a => a.category === active)
  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  const tabStyle = (key: string): React.CSSProperties => ({
    padding: '8px 18px',
    borderRadius: 999,
    border: '1px solid ' + (active === key ? 'var(--accent)' : 'var(--line)'),
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '.12em',
    color: active === key ? 'var(--accent)' : 'var(--muted)',
    cursor: 'pointer',
    background: 'none',
    transition: '.2s',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <div>
      {/* Category tabs */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap',
        padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        marginBottom: 56,
      }}>
        <button style={tabStyle('all')} onClick={() => setActive('all')}>
          {isRu ? 'ВСЕ' : 'ALL'} · {articles.length}
        </button>
        {categories.map(cat => (
          <button key={cat} style={tabStyle(cat)} onClick={() => setActive(cat)}>
            {cat.toUpperCase()} · {articles.filter(a => a.category === cat).length}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.15em' }}>
          {isRu ? 'СТАТЕЙ В ЭТОЙ КАТЕГОРИИ НЕТ' : 'NO ARTICLES IN THIS CATEGORY'}
        </div>
      ) : (
        <div>
          {/* Featured (first) */}
          {featured && (
            <Link
              href={`/${locale}/articles/${featured.slug}`}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
                alignItems: 'end', padding: '0 0 56px', borderBottom: '1px solid var(--line)',
                color: 'inherit', textDecoration: 'none',
              }}
            >
              {/* Image placeholder */}
              <div style={{
                aspectRatio: '16/9', background: 'var(--bg-elev)', borderRadius: 20,
                border: '1px solid var(--line)', display: 'grid', placeItems: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in oklab, var(--fg) 4%, transparent) 14px 15px)',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.15em', position: 'relative' }}>
                  FIGURE 01 · FEATURED
                </span>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.2em', textTransform: 'uppercase' as const }}>
                  {featured.category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(32px,4vw,56px)', lineHeight: 1, letterSpacing: '-.025em', margin: 0 }}>
                  {featured.title}
                </h2>
                {featured.description && (
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-soft)', margin: 0, maxWidth: '48ch' }}>
                    {featured.description}
                  </p>
                )}
                <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', alignItems: 'center' }}>
                  {featured.readTime > 0 && <span>{featured.readTime} {isRu ? 'мин' : 'min'}</span>}
                  {featured.updatedAt && <><span>·</span><span>{formatDate(featured.updatedAt, isRu)}</span></>}
                  {featured.level?.length > 0 && <><span>·</span><span>{featured.level.join(', ')}</span></>}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.15em', marginTop: 4 }}>
                  {isRu ? 'ЧИТАТЬ СТАТЬЮ' : 'READ ARTICLE'} →
                </div>
              </div>
            </Link>
          )}

          {/* Rest */}
          {rest.map((article, idx) => (
            <Link
              key={article.id}
              href={`/${locale}/articles/${article.slug}`}
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 32,
                alignItems: 'baseline', padding: '32px 0', borderBottom: '1px solid var(--line)',
                color: 'inherit', textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '.2em', textTransform: 'uppercase' as const }}>
                  {article.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 30, lineHeight: 1.05, letterSpacing: '-.02em', margin: 0 }}>
                  {article.title}
                </h3>
                {article.description && (
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-soft)', margin: 0, maxWidth: '64ch' }}>
                    {article.description}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', whiteSpace: 'nowrap' }}>
                <span>{String(idx + 2).padStart(2, '0')}</span>
                {article.readTime > 0 && <span>{article.readTime} {isRu ? 'мин' : 'min'}</span>}
                {article.updatedAt && <span>{formatDate(article.updatedAt, isRu)}</span>}
                {article.level?.length > 0 && <span style={{ color: 'var(--fg-soft)' }}>{article.level[0]}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
