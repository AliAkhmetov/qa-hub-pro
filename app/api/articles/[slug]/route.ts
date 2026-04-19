import { getArticleBySlug, getArticleBlocks } from '@/lib/notion'
import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const article = await getArticleBySlug(slug)
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const blocks = await getArticleBlocks(article.id)
    return NextResponse.json({ article, blocks })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
