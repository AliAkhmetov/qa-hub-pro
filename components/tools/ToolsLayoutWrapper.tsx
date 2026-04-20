'use client'

import { useState } from 'react'
import { ToolsSidebar } from './ToolsSidebar'

interface ToolsLayoutWrapperProps {
  children: React.ReactNode
}

export function ToolsLayoutWrapper({ children }: ToolsLayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="knowledge-shell" style={{ flex: '1 1 0%' }}>
      {sidebarOpen && (
        <div className="mobile-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <ToolsSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="knowledge-main">
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Открыть меню инструментов"
          style={{
            display: 'none',
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 50,
            padding: '10px 16px',
            borderRadius: 999,
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            border: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '.1em',
            cursor: 'pointer',
          }}
        >
          TOOLS ☰
        </button>
        {children}
      </main>
    </div>
  )
}
