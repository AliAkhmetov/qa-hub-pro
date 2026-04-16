'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Article } from '@/lib/notion.types'

interface SidebarProps {
  articles: Article[]
  locale: string
  currentSlug?: string
}

const CATEGORIES = [
  { key: 'Теория тестирования', en: 'Testing Theory' },
  { key: 'API тестирование', en: 'API Testing' },
  { key: 'Автоматизация', en: 'Automation' },
  { key: 'SQL для QA', en: 'SQL for QA' },
  { key: 'Fintech QA', en: 'Fintech QA' },
  { key: 'Карьера в QA', en: 'QA Career' },
]

export function Sidebar({ articles, locale, currentSlug }: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(CATEGORIES.map((c) => c.key))
  )
  const [search, setSearch] = useState('')

  const toggleCategory = (key: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const filteredArticles = search
    ? articles.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    : articles

  return (
    <aside
      className="w-60 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 flex flex-col overflow-y-auto"
      style={{ borderRight: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
    >
      {/* Search */}
      <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <input
          type="text"
          placeholder={locale === 'ru' ? 'Поиск...' : 'Search...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 text-sm rounded-md focus:outline-none"
          style={{
            backgroundColor: 'var(--surface2)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Categories */}
      <nav className="flex-1 py-2">
        {CATEGORIES.map(({ key, en }) => {
          const categoryArticles = filteredArticles.filter((a) => a.category === key)
          const isOpen = openCategories.has(key)
          const label = locale === 'ru' ? key : en

          return (
            <div key={key}>
              <button
                onClick={() => toggleCategory(key)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.backgroundColor = 'var(--surface2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <span>{label}</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: 'var(--text-hint)' }}>{categoryArticles.length}</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <ul>
                  {categoryArticles.map((article) => (
                    <li key={article.id}>
                      <Link
                        href={`/${locale}/articles/${article.slug}`}
                        className="block px-6 py-1.5 text-sm transition-colors"
                        style={{
                          color: currentSlug === article.slug ? 'var(--accent)' : 'var(--text-muted)',
                          borderRight: currentSlug === article.slug ? '2px solid var(--accent)' : 'none',
                          backgroundColor: currentSlug === article.slug ? 'var(--surface2)' : 'transparent',
                        }}
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
