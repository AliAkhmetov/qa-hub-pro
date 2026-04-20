import Link from 'next/link'
import { KnowledgeShell } from '@/components/knowledge/KnowledgeShell'
import { getFirstSidebarLeaf, getSidebarLeafEntries, getSidebarSections } from '@/lib/sidebar'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  if (!isRu) {
    return (
      <div style={{ maxWidth: 640, margin: '120px auto', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.2em', marginBottom: 20 }}>
          KNOWLEDGE BASE
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 48, margin: '0 0 16px', letterSpacing: '-.02em' }}>
          Articles coming soon
        </h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          Russian knowledge structure is already connected at `/ru`
        </p>
      </div>
    )
  }

  const sectionsCount = getSidebarSections(locale).length
  const pageCount = getSidebarLeafEntries(locale).length
  const firstLeaf = getFirstSidebarLeaf(locale)

  return (
    <KnowledgeShell locale={locale}>
      <section style={{ paddingTop: 52 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--accent)',
            letterSpacing: '.2em',
            marginBottom: 24,
            textTransform: 'uppercase',
          }}
        >
          <span>QA HUB</span>
          <span style={{ color: 'var(--line)' }}>·</span>
          <span>Sidebar v2</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(42px, 6vw, 72px)',
            lineHeight: 1,
            letterSpacing: '-.03em',
            margin: '0 0 20px',
            maxWidth: '12ch',
          }}
        >
          Новая карта знаний по QA.
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--fg-soft)', margin: '0 0 28px', maxWidth: '56ch' }}>
          Sidebar и маршруты теперь зафиксированы отдельной структурой. Это даёт стабильные пути, предсказуемый порядок разделов и
          аккуратные заглушки для материалов, которые ещё не написаны или не подключены из Notion.
        </p>

        <div className="stats-grid">
          {[
            { label: 'Разделов', value: String(sectionsCount) },
            { label: 'Страниц', value: String(pageCount) },
            { label: 'Локаль', value: '/ru' },
          ].map((item) => (
            <div key={item.label} style={{ border: '1px solid var(--line)', borderRadius: 16, padding: '18px 20px', background: 'var(--bg-elev)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                {item.label}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 40, lineHeight: .95, letterSpacing: '-.02em' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {firstLeaf && (
          <Link
            href={firstLeaf.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '11px 18px',
              borderRadius: 999,
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Открыть первый материал
            <span>→</span>
          </Link>
        )}
      </section>
    </KnowledgeShell>
  )
}
