import { redirect } from 'next/navigation'
import { FIRST_TOOL } from '@/config/tools'

interface ToolsPageProps {
  params: Promise<{ locale: string }>
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = await params
  redirect(`/${locale}/tools/${FIRST_TOOL.slug}`)
}
