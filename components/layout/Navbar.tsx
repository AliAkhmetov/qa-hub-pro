import Link from 'next/link'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { LangToggle } from '@/components/ui/LangToggle'

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const basePath = `/${locale}`

  return (
    <nav
      className="sticky top-0 z-40 h-14 flex items-center px-6 gap-6"
      style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
    >
      {/* Logo */}
      <Link href={basePath} className="font-mono font-medium shrink-0" style={{ color: 'var(--text-primary)' }}>
        <span style={{ color: 'var(--accent)' }}>QA</span>
        {' Knowledge'}
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-4 flex-1">
        <Link
          href={basePath}
          className="text-sm transition-colors hover:opacity-80"
          style={{ color: 'var(--text-muted)' }}
        >
          {locale === 'ru' ? 'База знаний' : 'Knowledge Base'}
        </Link>
        <Link
          href={`${basePath}/about`}
          className="text-sm transition-colors hover:opacity-80"
          style={{ color: 'var(--text-muted)' }}
        >
          {locale === 'ru' ? 'Об авторе' : 'About'}
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <LangToggle locale={locale} />
      </div>
    </nav>
  )
}
