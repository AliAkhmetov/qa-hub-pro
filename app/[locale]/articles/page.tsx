import { redirect } from 'next/navigation'

interface ArticlesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params
  redirect(`/${locale}`)
}
