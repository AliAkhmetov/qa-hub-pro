import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TelegramFAB } from '@/components/layout/TelegramFAB'

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
        <main className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <TelegramFAB />
      </div>
    </NextIntlClientProvider>
  )
}
