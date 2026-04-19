'use client'

import { useState } from 'react'
import { ArticleSidebar } from './ArticleSidebar'
import { ArticleFilters } from './ArticleFilters'
import type { Article } from '@/lib/notion.types'

interface ArticlesLayoutProps {
  articles: Article[]
  locale: string
  isRu: boolean
}

export function ArticlesLayout({ articles, locale, isRu }: ArticlesLayoutProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeLevel, setActiveLevel] = useState('all')
  const [sortOrder, setSortOrder] = useState<'newest' | 'az'>('newest')

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      gap: '0 56px',
      alignItems: 'start',
    }}>
      <ArticleSidebar
        articles={articles}
        locale={locale}
        isRu={isRu}
        activeCategory={activeCategory}
        activeLevel={activeLevel}
        onCategoryChange={setActiveCategory}
        onLevelChange={setActiveLevel}
      />
      <ArticleFilters
        articles={articles}
        locale={locale}
        isRu={isRu}
        activeCategory={activeCategory}
        activeLevel={activeLevel}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
    </div>
  )
}
