import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { TelegramFAB } from '@/components/layout/TelegramFAB'
import { getArticles } from '@/lib/notion'

const LOCALES = ['ru', 'en']

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!LOCALES.includes(locale)) notFound()

  const [articles, messages] = await Promise.all([
    getArticles(locale as 'ru' | 'en').catch(() => []),
    getMessages().catch(() => ({})),
  ])

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
        <Navbar locale={locale} />
        <div className="flex flex-1">
          <Sidebar articles={articles} locale={locale} />
          <main className="flex-1 min-w-0 p-8">
            {children}
          </main>
        </div>
        <TelegramFAB />
      </div>
    </NextIntlClientProvider>
  )
}
