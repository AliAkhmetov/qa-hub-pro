'use client'

import { useState } from 'react'
import type { Article } from '@/lib/notion.types'

interface KnowledgeSidebarProps {
  articles: Article[]
  locale: string
  isRu: boolean
  activeSlug: string
  onSelect: (slug: string) => void
}

export function KnowledgeSidebar({ articles, locale, isRu, activeSlug, onSelect }: KnowledgeSidebarProps) {
  // Group by category
  const grouped = articles.reduce<Record<string, Article[]>>((acc, a) => {
    const cat = a.category || (isRu ? 'Без категории' : 'Uncategorised')
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(a)
    return acc
  }, {})

  // All categories open by default
  const [open, setOpen] = useState<Set<string>>(new Set(Object.keys(grouped)))

  const toggle = (cat: string) =>
    setOpen(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })

  return (
    <aside style={{
      position: 'sticky',
      top: 56,
      height: 'calc(100vh - 56px)',
      overflowY: 'auto',
      borderRight: '1px solid var(--line)',
      scrollbarWidth: 'none',
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 20px 14px',
        borderBottom: '1px solid var(--line)',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.2em',
        color: 'var(--muted)',
        textTransform: 'uppercase',
      }}>
        {isRu ? 'База знаний' : 'Knowledge Base'}
        <span style={{ float: 'right', letterSpacing: 0 }}>{articles.length}</span>
      </div>

      {/* Category tree */}
      <nav style={{ padding: '8px 0 40px' }}>
        {Object.entries(grouped).map(([cat, arts]) => {
          const isOpen = open.has(cat)
          return (
            <div key={cat}>
              {/* Category folder */}
              <button
                onClick={() => toggle(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  width: '100%',
                  padding: '7px 20px',
                  background: 'none',
                  border: 0,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: 10,
                  textAlign: 'center',
                  transition: 'transform .15s',
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  fontSize: 8,
                }}>▶</span>
                <span style={{ flex: 1 }}>{cat}</span>
                <span style={{ letterSpacing: 0 }}>{arts.length}</span>
              </button>

              {/* Articles */}
              {isOpen && (
                <ul style={{ listStyle: 'none', padding: '2px 0 6px', margin: 0 }}>
                  {arts.map(article => {
                    const isActive = article.slug === activeSlug
                    return (
                      <li key={article.slug}>
                        <button
                          onClick={() => onSelect(article.slug)}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '6px 20px 6px 34px',
                            background: isActive ? 'color-mix(in oklab, var(--accent) 8%, transparent)' : 'none',
                            border: 0,
                            borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                            cursor: 'pointer',
                            fontFamily: 'var(--font-sans)',
                            fontSize: 13,
                            lineHeight: 1.4,
                            color: isActive ? 'var(--fg)' : 'var(--fg-soft)',
                            textAlign: 'left',
                            transition: 'color .12s, background .12s',
                          }}
                          onMouseEnter={e => {
                            if (!isActive) {
                              e.currentTarget.style.color = 'var(--fg)'
                              e.currentTarget.style.background = 'var(--bg-soft)'
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isActive) {
                              e.currentTarget.style.color = 'var(--fg-soft)'
                              e.currentTarget.style.background = 'none'
                            }
                          }}
                        >
                          {article.title}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
