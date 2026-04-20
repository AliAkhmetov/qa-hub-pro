import { redirect } from 'next/navigation'

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale } = await params
  redirect(`/${locale}`)
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { locale } = await params
  return {
    title: `Knowledge Base | QA Hub`,
    description: `Legacy article route redirects to the new knowledge base structure at /${locale}.`,
    robots: { index: false, follow: true },
  }
}
