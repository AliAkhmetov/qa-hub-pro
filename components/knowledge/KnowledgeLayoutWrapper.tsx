'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { KnowledgeSidebar } from './KnowledgeSidebar'
import { isSidebarRoute } from '@/lib/sidebar'

interface KnowledgeLayoutWrapperProps {
  locale: string
  children: React.ReactNode
}

export function KnowledgeLayoutWrapper({ locale, children }: KnowledgeLayoutWrapperProps) {
  const pathname = usePathname() ?? ''
  const isKnowledge = pathname === `/${locale}` || isSidebarRoute(locale, pathname)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Non-knowledge pages (tools, roadmap, about) — no sidebar
  if (!isKnowledge) {
    return <main className="flex-1">{children}</main>
  }

  return (
    <div className="knowledge-shell" style={{ flex: '1 1 0%' }}>
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Persistent sidebar — never unmounts on knowledge navigation */}
      <KnowledgeSidebar
        locale={locale}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="knowledge-main">
        {/* Mobile hamburger — CSS hides on desktop */}
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Открыть навигацию"
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <rect width="14" height="1.5" rx=".75" fill="currentColor" />
            <rect y="5.25" width="10" height="1.5" rx=".75" fill="currentColor" />
            <rect y="10.5" width="14" height="1.5" rx=".75" fill="currentColor" />
          </svg>
          Разделы
        </button>

        {children}
      </main>
    </div>
  )
}
