'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LangToggleProps {
  locale: string
}

export function LangToggle({ locale }: LangToggleProps) {
  const pathname = usePathname()
  const otherLocale = locale === 'ru' ? 'en' : 'ru'
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <div className="flex items-center gap-1 text-sm font-mono">
      <span style={{ color: locale === 'ru' ? 'var(--accent)' : 'var(--text-muted)', fontWeight: locale === 'ru' ? 500 : 400 }}>RU</span>
      <span style={{ color: 'var(--text-hint)' }}>/</span>
      <Link
        href={newPath}
        style={{ color: locale === 'en' ? 'var(--accent)' : 'var(--text-muted)', fontWeight: locale === 'en' ? 500 : 400 }}
        className="hover:opacity-80 transition-opacity"
      >
        EN
      </Link>
    </div>
  )
}
