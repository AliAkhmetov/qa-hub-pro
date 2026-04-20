import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { KnowledgeLayoutWrapper } from '@/components/knowledge/KnowledgeLayoutWrapper'

const LOCALES = ['ru', 'en']

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!LOCALES.includes(locale)) notFound()

  let messages = {}
  try {
    messages = await getMessages()
  } catch {
    // fallback
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
        <Navbar locale={locale} />
        <KnowledgeLayoutWrapper locale={locale}>
          {children}
        </KnowledgeLayoutWrapper>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}
