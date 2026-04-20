'use client'

import { usePathname } from 'next/navigation'

interface LangToggleProps {
  locale: string
}

export function LangToggle({ locale }: LangToggleProps) {
  const pathname = usePathname()
  const otherLocale = locale === 'ru' ? 'en' : 'ru'
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <button
      onClick={() => { window.location.href = newPath }}
      className="px-3 py-2 rounded-full text-sm transition-colors hover:opacity-80"
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        letterSpacing: '.15em',
        border: '1px solid var(--line)',
        color: 'var(--fg-soft)',
      }}
    >
      {locale === 'ru' ? 'RU' : 'EN'}
    </button>
  )
}
