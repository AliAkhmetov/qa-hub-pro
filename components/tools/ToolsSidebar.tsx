'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { TOOLS_CONFIG, ALL_TOOLS } from '@/config/tools'

interface ToolsSidebarProps {
  mobileOpen?: boolean
  onClose?: () => void
}

export function ToolsSidebar({ mobileOpen = false, onClose }: ToolsSidebarProps) {
  const pathname = usePathname() ?? ''
  const activeLiRef = useRef<HTMLLIElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!activeLiRef.current) return
    activeLiRef.current.scrollIntoView({
      block: 'center',
      behavior: isFirstRender.current ? 'auto' : 'smooth',
    })
    isFirstRender.current = false
  }, [pathname])

  return (
    <aside className={`knowledge-sidebar-inner${mobileOpen ? ' is-open' : ''}`}>
      {mobileOpen && onClose && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button
            onClick={onClose}
            aria-label="Закрыть меню"
            style={{
              padding: '6px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--muted)',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              letterSpacing: '.1em',
            }}
          >
            ✕ ЗАКРЫТЬ
          </button>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          padding: '12px 20px 14px',
          borderBottom: '1px solid var(--line)',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '.2em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}
      >
        Tools
        <span style={{ float: 'right', letterSpacing: 0 }}>{ALL_TOOLS.length}</span>
      </div>

      <nav style={{ padding: '8px 0 40px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {TOOLS_CONFIG.map((category) => {
            const hasActive = category.items.some((t) => pathname === t.href)
            return (
              <li key={category.title}>
                {/* Category label — not clickable, always visible */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    width: '100%',
                    padding: '7px 20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '.15em',
                    textTransform: 'uppercase',
                    color: hasActive ? 'var(--fg)' : 'var(--muted)',
                  }}
                >
                  <span style={{ flex: 1 }}>{category.title}</span>
                  <span style={{ letterSpacing: 0, fontSize: 10 }}>{category.items.length}</span>
                </div>

                <ul style={{ listStyle: 'none', padding: '2px 0 6px', margin: 0 }}>
                  {category.items.map((tool) => {
                    const isActive = pathname === tool.href
                    return (
                      <li key={tool.slug} ref={isActive ? activeLiRef : undefined}>
                        <Link
                          href={tool.href}
                          onClick={onClose}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '6px 20px 6px 50px',
                            background: isActive
                              ? 'color-mix(in oklab, var(--accent) 10%, transparent)'
                              : 'none',
                            borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                            fontFamily: 'var(--font-sans)',
                            fontSize: 13,
                            lineHeight: 1.4,
                            fontWeight: isActive ? 500 : 400,
                            color: isActive ? 'var(--fg)' : 'var(--fg-soft)',
                            textAlign: 'left',
                            textDecoration: 'none',
                            transition: 'color .12s, background .12s',
                          }}
                        >
                          {tool.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
