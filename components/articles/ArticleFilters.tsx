'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import type { Article } from '@/lib/notion.types'

interface ArticleFiltersProps {
  articles: Article[]
  locale: string
  isRu: boolean
  activeCategory: string
  activeLevel: string
  sortOrder: 'newest' | 'az'
  onSortChange: (s: 'newest' | 'az') => void
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

export function ArticleFilters({
  articles, locale, isRu,
  activeCategory, activeLevel,
  sortOrder, onSortChange,
}: ArticleFiltersProps) {

  const filtered = useMemo(() => {
    let list = articles
    if (activeCategory !== 'all') list = list.filter(a => a.category === activeCategory)
    if (activeLevel !== 'all') list = list.filter(a => a.level?.includes(activeLevel))
    if (sortOrder === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title, isRu ? 'ru' : 'en'))
    if (sortOrder === 'newest') list = [...list].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    return list
  }, [articles, activeCategory, activeLevel, sortOrder, isRu])

  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  const sortBtn = (key: 'newest' | 'az', label: string) => (
    <button
      key={key}
      onClick={() => onSortChange(key)}
      style={{
        background: 'none', border: 0, cursor: 'pointer',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.2em',
        color: sortOrder === key ? 'var(--fg)' : 'var(--muted)',
        fontWeight: sortOrder === key ? 600 : 400,
        padding: 0,
        transition: 'color .15s',
      }}
    >
      {label}
    </button>
  )

  return (
    <div>
      {/* Top bar: count + sort */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        marginBottom: 48,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.15em' }}>
          {articles.length} {isRu ? 'МАТЕРИАЛОВ' : 'ARTICLES'}
          {filtered.length !== articles.length && ` · ${isRu ? 'ОТОБРАЖЕНО' : 'SHOWING'} ${filtered.length}`}
        </span>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {sortBtn('newest', isRu ? 'НОВЫЕ' : 'NEWEST')}
          <span style={{ color: 'var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10 }}>·</span>
          {sortBtn('az', isRu ? 'А–Я' : 'A–Z')}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: '80px 0', textAlign: 'center', borderTop: '1px solid var(--line)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em' }}>
            {isRu ? 'СТАТЕЙ НЕ НАЙДЕНО' : 'NO ARTICLES FOUND'}
          </div>
        </div>
      ) : (
        <div>
          {/* Featured article */}
          {featured && (
            <Link
              href={`/${locale}/articles/${featured.slug}`}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
                alignItems: 'end', padding: '0 0 56px', borderBottom: '1px solid var(--line)',
                color: 'inherit', textDecoration: 'none',
                marginBottom: 0,
              }}
            >
              {/* Cover placeholder */}
              <div style={{
                aspectRatio: '4/3',
                background: 'color-mix(in oklab, var(--accent) 15%, var(--bg-elev))',
                borderRadius: 16,
                border: '1px solid var(--line)',
                display: 'grid', placeItems: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in oklab, var(--fg) 4%, transparent) 14px 15px)',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.15em', position: 'relative' }}>
                  FIGURE · FEATURED
                </span>
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {featured.category && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
                      {featured.category}
                    </span>
                  )}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.15em' }}>
                    · FEATURED
                  </span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 400,
                  fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-.025em',
                  margin: 0,
                }}>
                  {featured.title}
                </h2>
                {featured.description && (
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-soft)', margin: 0, maxWidth: '46ch' }}>
                    {featured.description}
                  </p>
                )}
                <div style={{
                  display: 'flex', gap: 12, alignItems: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em',
                }}>
                  {featured.readTime > 0 && (
                    <span>{featured.readTime} {isRu ? 'МИН' : 'MIN'}</span>
                  )}
                  {featured.updatedAt && (
                    <><span>·</span><span>{formatDate(featured.updatedAt, isRu).toUpperCase()}</span></>
                  )}
                  {featured.level?.length > 0 && (
                    <><span>·</span><span style={{ color: 'var(--fg-soft)' }}>{featured.level[0]}</span></>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '.2em', marginTop: 4 }}>
                  {isRu ? 'ЧИТАТЬ СТАТЬЮ' : 'READ ARTICLE'} →
                </div>
              </div>
            </Link>
          )}

          {/* Article list */}
          {rest.map((article, idx) => (
            <Link
              key={article.id}
              href={`/${locale}/articles/${article.slug}`}
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 32,
                alignItems: 'baseline', padding: '28px 0', borderBottom: '1px solid var(--line)',
                color: 'inherit', textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {article.category && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
                    {article.category}
                  </span>
                )}
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 400,
                  fontSize: 28, lineHeight: 1.08, letterSpacing: '-.02em', margin: 0,
                }}>
                  {article.title}
                </h3>
                {article.description && (
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-soft)', margin: 0, maxWidth: '60ch' }}>
                    {article.description}
                  </p>
                )}
              </div>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em',
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: 13, color: 'var(--line)' }}>{String(idx + 2).padStart(2, '0')}</span>
                {article.readTime > 0 && <span>{article.readTime} {isRu ? 'МИН' : 'MIN'}</span>}
                {article.updatedAt && <span>{formatDate(article.updatedAt, isRu)}</span>}
                {article.level?.length > 0 && (
                  <span style={{ color: 'var(--fg-soft)' }}>{article.level[0]}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
