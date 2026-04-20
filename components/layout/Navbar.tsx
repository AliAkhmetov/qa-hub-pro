'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { LangToggle } from '@/components/ui/LangToggle'
import { isSidebarRoute } from '@/lib/sidebar'
import { FIRST_TOOL } from '@/config/tools'

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname()
  const base = `/${locale}`
  const isKnowledgeActive = pathname === base || pathname.startsWith(`${base}/articles`) || isSidebarRoute(locale, pathname)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: base, label: locale === 'ru' ? 'База знаний' : 'Knowledge', forceActive: isKnowledgeActive },
    { href: `${base}/roadmap`, label: 'Roadmap', matchPrefixes: [] },
    { href: `/${locale}/tools/${FIRST_TOOL.slug}`, label: locale === 'ru' ? 'Инструменты' : 'Tools', matchPrefixes: [`${base}/tools`] },
    { href: `${base}/about`, label: locale === 'ru' ? 'Об авторе' : 'About', matchPrefixes: [] },
  ]

  return (
    <nav
      className="sticky top-0 z-40"
      style={{
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--line)',
        position: 'relative',
      }}
    >
      <div className="max-w-[1360px] mx-auto px-8 h-14 flex items-center gap-8">
        {/* Brand */}
        <Link href={base} className="flex items-baseline gap-3 shrink-0" onClick={() => setMenuOpen(false)}>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '26px', fontStyle: 'italic', letterSpacing: '-.02em', color: 'var(--fg)' }}>
            QA Hub
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            est. 2026
          </span>
        </Link>

        {/* Nav links — desktop row / mobile dropdown */}
        <div className={`nav-links${menuOpen ? ' is-open' : ''}`} style={{ alignItems: 'center', gap: 2 }}>
          {links.map(({ href, label, matchPrefixes = [], forceActive = false }) => {
            const isActive = forceActive || pathname === href || matchPrefixes.some(p => pathname.startsWith(p))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-3.5 py-2 rounded-full text-sm transition-colors"
                style={{
                  color: isActive ? 'var(--fg)' : 'var(--fg-soft)',
                  background: isActive ? 'var(--bg-soft)' : 'transparent',
                }}
              >
                {isActive && <span style={{ color: 'var(--accent)', marginRight: '6px' }}>·</span>}
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-1.5">
          <LangToggle locale={locale} />
          <ThemeSwitcher />
          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 8,
              border: '1px solid var(--line)',
              background: 'none',
              color: 'var(--fg-soft)',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect width="16" height="1.5" rx=".75" fill="currentColor"/>
                <rect y="5.25" width="12" height="1.5" rx=".75" fill="currentColor"/>
                <rect y="10.5" width="16" height="1.5" rx=".75" fill="currentColor"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
