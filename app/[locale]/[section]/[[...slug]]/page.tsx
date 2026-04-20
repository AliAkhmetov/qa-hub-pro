import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/article/ArticleContent'
import { getArticleBlocks, getArticleByPath } from '@/lib/notion'
import {
  getAdjacentSidebarLeafEntries,
  getSidebarBreadcrumbs,
  getSidebarHrefFromSegments,
  getSidebarLeafEntries,
  getSidebarLeafEntryByHref,
} from '@/lib/sidebar'
import { extractToc } from '@/components/article/ArticleContent'

interface KnowledgeRoutePageProps {
  params: Promise<{ locale: string; section: string; slug?: string[] }>
}

function buildDescription(title: string, href: string) {
  return `Материал «${title}» уже закреплён в структуре базы знаний. Маршрут ${href} готов для подключения контента из Notion.`
}

async function loadKnowledgeContent(href: string) {
  try {
    const article = await getArticleByPath(href)
    if (!article) return null

    const blocks = await getArticleBlocks(article.id).catch(() => [])
    return { article, blocks }
  } catch {
    return null
  }
}

export default async function KnowledgeRoutePage({ params }: KnowledgeRoutePageProps) {
  const { locale, section, slug } = await params

  if (locale !== 'ru') {
    notFound()
  }

  const href = getSidebarHrefFromSegments(locale, [section, ...(slug ?? [])])
  const entry = getSidebarLeafEntryByHref(locale, href)

  if (!entry) {
    notFound()
  }

  const breadcrumbs = getSidebarBreadcrumbs(locale, href)
  const content = await loadKnowledgeContent(href)
  const toc = content ? extractToc(content.blocks) : []
  const { previous, next } = getAdjacentSidebarLeafEntries(locale, href)
  const description = content?.article.description || buildDescription(entry.item.title, href)

  return (
    <section style={{ paddingTop: 52 }}>
        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            alignItems: 'center',
            marginBottom: 24,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
          }}
        >
          <Link href={`/${locale}`} style={{ color: 'var(--muted)' }}>
            База знаний
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.title}-${index}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <span>·</span>
              <span style={{ color: crumb.kind === 'page' ? 'var(--accent)' : 'var(--muted)' }}>{crumb.title}</span>
            </span>
          ))}
        </nav>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(40px, 5vw, 68px)',
            lineHeight: 1.02,
            letterSpacing: '-.03em',
            margin: '0 0 20px',
            maxWidth: '14ch',
          }}
        >
          {content?.article.title || entry.item.title}
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--fg-soft)', margin: '0 0 28px', maxWidth: '56ch' }}>
          {description}
        </p>

        {toc.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              border: '1px solid var(--line)',
              borderRadius: 20,
              background: 'var(--bg-elev)',
              marginBottom: 28,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--muted)',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              Содержание
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    color: 'var(--fg-soft)',
                    textDecoration: 'none',
                    paddingLeft: item.level === 3 ? 14 : 0,
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        )}

        {content ? (
          <ArticleContent
            blocks={content.blocks}
            labels={{
              emptyContent: 'Содержимое статьи пока не добавлено.',
              imageAlt: 'Изображение',
            }}
          />
        ) : (
          <div
            style={{
              padding: '22px 24px',
              border: '1px solid var(--line)',
              borderRadius: 20,
              background: 'var(--bg-elev)',
              marginBottom: 24,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 12 }}>
              Stub page
            </div>
            <p style={{ margin: '0 0 12px', color: 'var(--fg-soft)', lineHeight: 1.65 }}>
              Эта страница уже участвует в новой sidebar-структуре и имеет постоянный URL. Чтобы здесь появился реальный материал,
              добавь в Notion запись с полем <code>Path</code> и значением <code>{href}</code>, затем переведи её в <code>Published</code>.
            </p>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{href}</p>
          </div>
        )}

        {(previous || next) && (
          <nav
            aria-label="Article navigation"
            style={{
              display: 'grid',
              gap: 12,
              marginTop: 40,
              paddingTop: 28,
              borderTop: '1px solid var(--line)',
            }}
          >
            {previous && (
              <Link
                href={previous.item.href}
                style={{
                  display: 'block',
                  padding: '16px 18px',
                  border: '1px solid var(--line)',
                  borderRadius: 18,
                  background: 'var(--bg-elev)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Предыдущая страница
                </div>
                <div style={{ color: 'var(--fg)', fontSize: 16, lineHeight: 1.45 }}>{previous.item.title}</div>
              </Link>
            )}

            {next && (
              <Link
                href={next.item.href}
                style={{
                  display: 'block',
                  padding: '16px 18px',
                  border: '1px solid var(--line)',
                  borderRadius: 18,
                  background: 'var(--bg-elev)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Следующая страница
                </div>
                <div style={{ color: 'var(--fg)', fontSize: 16, lineHeight: 1.45 }}>{next.item.title}</div>
              </Link>
            )}
          </nav>
        )}
    </section>
  )
}

export async function generateMetadata({ params }: KnowledgeRoutePageProps) {
  const { locale, section, slug } = await params
  const href = getSidebarHrefFromSegments(locale, [section, ...(slug ?? [])])
  const entry = getSidebarLeafEntryByHref(locale, href)

  if (!entry) {
    return {}
  }

  const content = await loadKnowledgeContent(href)

  return {
    title: `${content?.article.title || entry.item.title} | QA Hub`,
    description: content?.article.description || buildDescription(entry.item.title, href),
    alternates: {
      canonical: href,
    },
    openGraph: {
      title: content?.article.title || entry.item.title,
      description: content?.article.description || buildDescription(entry.item.title, href),
      locale,
      url: href,
    },
    robots: content
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}
