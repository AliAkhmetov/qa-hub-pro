'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { LangToggle } from '@/components/ui/LangToggle'

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname()
  const base = `/${locale}`

  const links = [
    { href: base, label: locale === 'ru' ? 'Главная' : 'Home' },
    { href: `${base}/articles`, label: locale === 'ru' ? 'База знаний' : 'Knowledge' },
    { href: `${base}/roadmap`, label: 'Roadmap' },
    { href: `${base}/tools`, label: locale === 'ru' ? 'Инструменты' : 'Tools' },
    { href: `${base}/about`, label: locale === 'ru' ? 'Об авторе' : 'About' },
  ]

  return (
    <nav
      className="sticky top-0 z-40"
      style={{
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="max-w-[1360px] mx-auto px-8 h-14 flex items-center gap-8">
        {/* Brand */}
        <Link href={base} className="flex items-baseline gap-3 shrink-0">
          <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '26px', fontStyle: 'italic', letterSpacing: '-.02em', color: 'var(--fg)' }}>
            QA Hub
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            est. 2026
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-0.5 ml-6">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || (href !== base && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
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
          <Link
            href={`${base}/about#services`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-px"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {locale === 'ru' ? 'Консультация' : 'Consult'}
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
