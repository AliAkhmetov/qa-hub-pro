import { notFound } from 'next/navigation'
import { ALL_TOOLS, FIRST_TOOL, findToolBySlug } from '@/config/tools'
import { ToolShell } from '@/components/tools/ToolShell'
import { JwtDecoder } from '@/components/tools/JwtDecoder'
import { JsonFormatter } from '@/components/tools/JsonFormatter'
import { RegexTester } from '@/components/tools/RegexTester'
import { Base64Tool } from '@/components/tools/Base64Tool'
import { UuidGenerator } from '@/components/tools/UuidGenerator'
import { CurlConverter } from '@/components/tools/CurlConverter'
import { UrlParser } from '@/components/tools/UrlParser'
import { TimestampConverter } from '@/components/tools/TimestampConverter'
import { JsonDiff } from '@/components/tools/JsonDiff'
import { SelectorTester } from '@/components/tools/SelectorTester'
import { FakeDataGenerator } from '@/components/tools/FakeDataGenerator'
import { TestCards } from '@/components/tools/TestCards'
import { HashCalculator } from '@/components/tools/HashCalculator'
import { HttpStatusCodes } from '@/components/tools/HttpStatusCodes'
import { CronParser } from '@/components/tools/CronParser'
import { QrGenerator } from '@/components/tools/QrGenerator'

interface ToolPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { locale, slug } = await params
  const isRu = locale === 'ru'

  const tool = findToolBySlug(slug)
  if (!tool) notFound()

  const idx = ALL_TOOLS.findIndex((t) => t.slug === slug)
  const num = idx + 1
  const total = ALL_TOOLS.length

  return (
    <ToolShell num={num} total={total} title={tool.title} description={tool.description}>
      {slug === 'jwt'            && <JwtDecoder isRu={isRu} />}
      {slug === 'json'           && <JsonFormatter isRu={isRu} />}
      {slug === 'regex'          && <RegexTester isRu={isRu} />}
      {slug === 'base64'         && <Base64Tool isRu={isRu} />}
      {slug === 'uuid'           && <UuidGenerator isRu={isRu} />}
      {slug === 'curl-converter' && <CurlConverter isRu={isRu} />}
      {slug === 'url-parser'     && <UrlParser isRu={isRu} />}
      {slug === 'timestamp'      && <TimestampConverter isRu={isRu} />}
      {slug === 'json-diff'      && <JsonDiff isRu={isRu} />}
      {slug === 'selector'       && <SelectorTester isRu={isRu} />}
      {slug === 'fake-data'      && <FakeDataGenerator isRu={isRu} />}
      {slug === 'test-cards'     && <TestCards isRu={isRu} />}
      {slug === 'hash'           && <HashCalculator isRu={isRu} />}
      {slug === 'http-status'    && <HttpStatusCodes isRu={isRu} />}
      {slug === 'cron'           && <CronParser isRu={isRu} />}
      {slug === 'qr'             && <QrGenerator isRu={isRu} />}
    </ToolShell>
  )
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = findToolBySlug(slug)
  if (!tool) return {}
  return {
    title: `${tool.title} | QA Hub Tools`,
    description: tool.description,
  }
}

export function generateStaticParams() {
  return ALL_TOOLS.map((t) => ({ slug: t.slug }))
}
