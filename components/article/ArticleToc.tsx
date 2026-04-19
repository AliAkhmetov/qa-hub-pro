'use client'

import { useEffect, useRef, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface ArticleTocProps {
  items: TocItem[]
  isRu: boolean
}

export function ArticleToc({ items, isRu }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string>('')
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!items.length) return
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-10% 0% -80% 0%' }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.current?.observe(el)
    })
    return () => observer.current?.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 16 }}>
        {isRu ? 'СОДЕРЖАНИЕ' : 'CONTENTS'}
      </div>
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            style={{
              display: 'block',
              paddingLeft: item.level === 3 ? 12 : 0,
              paddingTop: 6,
              paddingBottom: 6,
              borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'var(--line)'}`,
              paddingInlineStart: 12,
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              lineHeight: 1.4,
              color: isActive ? 'var(--fg)' : 'var(--muted)',
              transition: 'color .2s, border-color .2s',
              textDecoration: 'none',
            }}
          >
            {item.text}
          </a>
        )
      })}
    </nav>
  )
}
