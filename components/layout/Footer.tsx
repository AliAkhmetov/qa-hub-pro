import Link from 'next/link'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const isRu = locale === 'ru'
  const base = `/${locale}`

  return (
    <footer
      className="mt-40 max-w-[1360px] mx-auto px-8 pb-12"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <div className="grid grid-cols-4 gap-10 pt-12">
        <div>
          <div
            style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: '48px',
              lineHeight: '.9',
              letterSpacing: '-.02em',
              marginBottom: '16px',
              color: 'var(--fg)',
            }}
          >
            QA Hub<span style={{ color: 'var(--muted)' }}>.</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
            {isRu ? 'Открытая база знаний по QA от Ali Akhmetov' : 'Open QA knowledge base by Ali Akhmetov'}
          </p>
        </div>

        <div>
          <h4
            className="mb-4 font-normal"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.2em', textTransform: 'uppercase' }}
          >
            Content
          </h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { href: base, label: isRu ? 'База знаний' : 'Knowledge' },
              { href: `${base}/roadmap`, label: 'Roadmap' },
              { href: `${base}/tools`, label: isRu ? 'Инструменты' : 'Tools' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--fg-soft)' }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className="mb-4 font-normal"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.2em', textTransform: 'uppercase' }}
          >
            Author
          </h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { href: `${base}/about`, label: isRu ? 'Об авторе' : 'About' },
              { href: `${base}/about#services`, label: isRu ? 'Консультация' : 'Consultation' },
              { href: 'https://t.me/tacousti', label: 'Telegram ↗' },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--fg-soft)' }}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className="mb-4 font-normal"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.2em', textTransform: 'uppercase' }}
          >
            Contact
          </h4>
          <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
            Ali Akhmetov<br />
            QA Team Lead<br />
            Alatau City Bank<br />
            {isRu ? 'Алматы, Казахстан' : 'Almaty, Kazakhstan'}
          </p>
        </div>
      </div>

      <div
        className="flex justify-between items-center mt-12 pt-6"
        style={{
          borderTop: '1px solid var(--line)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: 'var(--muted)',
          letterSpacing: '.1em',
        }}
      >
        <span>© 2026 ALI AKHMETOV · ALMATY</span>
        <span>NO TRACKERS · NO ADS</span>
      </div>
    </footer>
  )
}
