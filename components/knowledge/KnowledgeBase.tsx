'use client'

import { useState, useCallback } from 'react'
import type { Article } from '@/lib/notion.types'
import { KnowledgeSidebar } from './KnowledgeSidebar'
import { ArticleContent } from '@/components/article/ArticleContent'

interface KnowledgeBaseProps {
  articles: Article[]
  locale: string
  isRu: boolean
  initialSlug: string
  initialArticle: Article
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialBlocks: Record<string, any>[]
}

function ArticleHeader({ article, isRu }: { article: Article; isRu: boolean }) {
  const date = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString(
        isRu ? 'ru-RU' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    : ''

  return (
    <header style={{ paddingTop: 52, marginBottom: 48, borderBottom: '1px solid var(--line)', paddingBottom: 36 }}>
      {/* Kicker */}
      <div style={{
        display: 'flex', gap: 10, alignItems: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.2em',
        marginBottom: 24,
      }}>
        {article.category && (
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase' }}>{article.category}</span>
        )}
        {article.level?.length > 0 && (
          <>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ color: 'var(--muted)', textTransform: 'uppercase' }}>{article.level[0]}</span>
          </>
        )}
        {article.readTime > 0 && (
          <>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>{article.readTime} {isRu ? 'МИН' : 'MIN'}</span>
          </>
        )}
      </div>

      <h1 style={{
        fontFamily: 'var(--font-serif)', fontWeight: 400,
        fontSize: 'clamp(36px, 4vw, 64px)', lineHeight: 1.02,
        letterSpacing: '-.03em', margin: '0 0 20px',
      }}>
        {article.title}
      </h1>

      {article.description && (
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--fg-soft)', margin: '0 0 20px', maxWidth: '56ch' }}>
          {article.description}
        </p>
      )}

      {date && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em' }}>
          {date}
          <span style={{ margin: '0 10px', color: 'var(--line)' }}>—</span>
          Ali Akhmetov
        </div>
      )}
    </header>
  )
}

export function KnowledgeBase({
  articles, locale, isRu,
  initialSlug, initialArticle, initialBlocks,
}: KnowledgeBaseProps) {
  const [activeSlug, setActiveSlug] = useState(initialSlug)
  const [article, setArticle] = useState<Article>(initialArticle)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blocks, setBlocks] = useState<Record<string, any>[]>(initialBlocks)
  const [loading, setLoading] = useState(false)

  const handleSelect = useCallback(async (slug: string) => {
    if (slug === activeSlug) return
    setLoading(true)
    // Scroll content to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    try {
      const res = await fetch(`/api/articles/${slug}`)
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setArticle(data.article)
      setBlocks(data.blocks)
      setActiveSlug(slug)
      // Update URL without full navigation
      window.history.pushState({}, '', `/${locale}/articles/${slug}`)
    } catch (e) {
      console.error('Failed to load article', e)
    } finally {
      setLoading(false)
    }
  }, [activeSlug, locale])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', alignItems: 'start' }}>

      {/* LEFT SIDEBAR */}
      <KnowledgeSidebar
        articles={articles}
        locale={locale}
        isRu={isRu}
        activeSlug={activeSlug}
        onSelect={handleSelect}
      />

      {/* RIGHT CONTENT */}
      <main style={{
        minHeight: 'calc(100vh - 56px)',
        padding: '0 56px 120px',
        maxWidth: 840,
      }}>
        {loading ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 300,
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--muted)', letterSpacing: '.2em',
          }}>
            {isRu ? 'ЗАГРУЗКА...' : 'LOADING...'}
          </div>
        ) : (
          <>
            <ArticleHeader article={article} isRu={isRu} />
            <ArticleContent
              blocks={blocks}
              labels={{
                emptyContent: isRu ? 'Содержимое статьи пока не добавлено.' : 'No content yet.',
                imageAlt: isRu ? 'Изображение' : 'Image',
              }}
            />
          </>
        )}
      </main>
    </div>
  )
}
