import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QA Hub — Ali Akhmetov',
  description: 'Открытая база знаний по QA от Ali Akhmetov, QA Team Lead в Alatau City Bank',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
