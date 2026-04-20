'use client'

import { useState } from 'react'
import { KnowledgeSidebar } from './KnowledgeSidebar'

interface KnowledgeShellProps {
  children: React.ReactNode
  locale: string
}

export function KnowledgeShell({ children, locale }: KnowledgeShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="knowledge-shell">
      {/* Overlay backdrop on mobile */}
      {sidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <KnowledgeSidebar
        locale={locale}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="knowledge-main">
        {/* Mobile menu toggle — visible only on mobile via CSS */}
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Открыть навигацию"
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <rect width="14" height="1.5" rx=".75" fill="currentColor"/>
            <rect y="5.25" width="10" height="1.5" rx=".75" fill="currentColor"/>
            <rect y="10.5" width="14" height="1.5" rx=".75" fill="currentColor"/>
          </svg>
          Разделы
        </button>

        {children}
      </main>
    </div>
  )
}
