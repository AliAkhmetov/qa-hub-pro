import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { getArticleBySlug, getArticleBlocks } from '@/lib/notion'
import { ArticleHeader } from '@/components/article/ArticleHeader'
import { ArticleContent, extractToc } from '@/components/article/ArticleContent'
import { ArticleToc } from '@/components/article/ArticleToc'
import { ArticleShare } from '@/components/article/ArticleShare'
import { Comments } from '@/components/article/Comments'

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  const isRu = locale === 'ru'
  const t = await getTranslations({ locale, namespace: 'article' })

  const article = await getArticleBySlug(slug).catch(() => null)
  if (!article) {
    return (
      <div style={{ maxWidth: 680, margin: '80px auto', padding: '0 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', marginBottom: 16 }}>
          404 · {isRu ? 'НЕ НАЙДЕНО' : 'NOT FOUND'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 48, margin: '0 0 16px' }}>
          {t('notFoundTitle')}
        </h1>
        <p style={{ color: 'var(--fg-soft)', marginBottom: 24 }}>{t('notFoundText')}</p>
        <Link href={`/${locale}/articles`} style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em' }}>
          ← {isRu ? 'БАЗА ЗНАНИЙ' : 'KNOWLEDGE BASE'}
        </Link>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks: Record<string, any>[] = await getArticleBlocks(article.id).catch(() => [])
  const toc = extractToc(blocks)

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 32px 120px' }}>
      {/* Article header: full width */}
      <ArticleHeader
        article={article}
        locale={locale}
        labels={{
          knowledgeBase: t('knowledgeBase'),
          updatedAt: t('updatedAt'),
          readTime: t('readTime'),
        }}
      />

      {/* 3-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr 160px',
        gap: '0 48px',
        alignItems: 'start',
      }}>
        {/* LEFT — Table of contents */}
        <div>
          <ArticleToc items={toc} isRu={isRu} />
        </div>

        {/* CENTER — Prose */}
        <div style={{ minWidth: 0, maxWidth: 720 }}>
          <ArticleContent
            blocks={blocks}
            labels={{
              emptyContent: t('emptyContent'),
              imageAlt: t('imageAlt'),
            }}
          />

          {/* Comments below prose */}
          <div style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid var(--line)' }}>
            <Comments articleSlug={article.slug} locale={locale} />
          </div>
        </div>

        {/* RIGHT — Share + meta */}
        <div>
          <ArticleShare article={article} isRu={isRu} />
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug, locale } = await params
  const article = await getArticleBySlug(slug).catch(() => null)
  if (!article) return {}
  return {
    title: `${article.title} | QA Hub`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      locale,
    },
  }
}
