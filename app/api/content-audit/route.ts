import { NextResponse } from 'next/server'
import { getKnowledgeContentAudit } from '@/lib/knowledge-audit'

const SUPPORTED_LOCALES = new Set(['ru', 'en'])

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') ?? 'ru'

  if (!SUPPORTED_LOCALES.has(locale)) {
    return NextResponse.json(
      { message: 'Unsupported locale. Use ru or en.' },
      { status: 400 }
    )
  }

  try {
    const audit = await getKnowledgeContentAudit(locale as 'ru' | 'en')
    return NextResponse.json(audit)
  } catch {
    return NextResponse.json(
      { message: 'Failed to audit knowledge content.' },
      { status: 500 }
    )
  }
}
