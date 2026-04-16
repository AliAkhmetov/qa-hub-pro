import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticleBlocks } from '@/lib/notion'
import { ArticleHeader } from '@/components/article/ArticleHeader'
import { ArticleContent } from '@/components/article/ArticleContent'

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params

  const [article, blocks] = await Promise.all([
    getArticleBySlug(slug).catch(() => null),
    getArticleBlocks(slug).catch(() => []),
  ])

  if (!article) notFound()

  return (
    <div className="max-w-3xl mx-auto">
      <ArticleHeader article={article} locale={locale} />
      <ArticleContent blocks={blocks as never} />
    </div>
  )
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug).catch(() => null)
  if (!article) return {}
  return {
    title: `${article.title} | QA Knowledge`,
    description: article.description,
  }
}
