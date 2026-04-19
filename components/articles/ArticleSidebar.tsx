'use client'

import Link from 'next/link'
import type { Article } from '@/lib/notion.types'

interface ArticleSidebarProps {
  articles: Article[]
  locale: string
  isRu: boolean
  activeCategory: string
  activeLevel: string
  onCategoryChange: (cat: string) => void
  onLevelChange: (level: string) => void
}

export function ArticleSidebar({
  articles, locale, isRu,
  activeCategory, activeLevel,
  onCategoryChange, onLevelChange,
}: ArticleSidebarProps) {

  // Category counts
  const categoryCounts = articles.reduce<Record<string, number>>((acc, a) => {
    const cat = a.category || (isRu ? 'Без категории' : 'Uncategorised')
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {})

  // Level counts
  const levels = ['Junior', 'Middle', 'Senior']
  const levelCounts = levels.reduce<Record<string, number>>((acc, lvl) => {
    acc[lvl] = articles.filter(a => a.level?.includes(lvl)).length
    return acc
  }, {})

  const sectionLabel: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '.2em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    padding: '0 0 8px',
    borderBottom: '1px solid var(--line)',
    marginBottom: 4,
  }

  const item = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '100%',
    background: 'none',
    border: 0,
    padding: '7px 0',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    lineHeight: 1.3,
    color: isActive ? 'var(--fg)' : 'var(--fg-soft)',
    fontWeight: isActive ? 500 : 400,
    textAlign: 'left',
    transition: 'color .15s',
    textDecoration: 'none',
  })

  const num: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--muted)',
    flexShrink: 0,
    marginLeft: 8,
  }

  return (
    <aside style={{
      position: 'sticky',
      top: 72,
      maxHeight: 'calc(100vh - 96px)',
      overflowY: 'auto',
      paddingRight: 28,
      borderRight: '1px solid var(--line)',
      scrollbarWidth: 'none',
    }}>

      {/* КАТЕГОРИИ */}
      <div style={{ marginBottom: 32 }}>
        <span style={sectionLabel}>{isRu ? 'КАТЕГОРИИ' : 'CATEGORIES'}</span>
        <button style={item(activeCategory === 'all')} onClick={() => onCategoryChange('all')}>
          <span>{isRu ? 'Все' : 'All'}</span>
          <span style={num}>{articles.length}</span>
        </button>
        {Object.entries(categoryCounts).map(([cat, count]) => (
          <button key={cat} style={item(activeCategory === cat)} onClick={() => onCategoryChange(cat)}>
            <span>{cat}</span>
            <span style={num}>{count}</span>
          </button>
        ))}
      </div>

      {/* ПО УРОВНЮ */}
      {levels.some(l => levelCounts[l] > 0) && (
        <div style={{ marginBottom: 32 }}>
          <span style={sectionLabel}>{isRu ? 'ПО УРОВНЮ' : 'BY LEVEL'}</span>
          {levels.filter(l => levelCounts[l] > 0).map(lvl => (
            <button
              key={lvl}
              style={item(activeLevel === lvl)}
              onClick={() => onLevelChange(activeLevel === lvl ? 'all' : lvl)}
            >
              <span>{lvl}</span>
              <span style={num}>{levelCounts[lvl]}</span>
            </button>
          ))}
        </div>
      )}

      {/* ПОДПИСАТЬСЯ */}
      <div>
        <span style={sectionLabel}>{isRu ? 'ПОДПИСАТЬСЯ' : 'SUBSCRIBE'}</span>
        <a
          href="/rss.xml"
          style={{ ...item(false), display: 'flex' }}
        >
          <span>RSS</span>
          <span style={{ ...num, color: 'var(--muted)' }}>↗</span>
        </a>
        <a
          href="https://t.me/qa_hub_pro"
          target="_blank"
          rel="noreferrer"
          style={{ ...item(false), display: 'flex' }}
        >
          <span>Telegram</span>
          <span style={{ ...num, color: 'var(--muted)' }}>↗</span>
        </a>
      </div>
    </aside>
  )
}
