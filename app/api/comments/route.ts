import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions, isAuthConfigured } from '@/lib/auth'
import { createComment, listCommentsBySlug } from '@/lib/comments'
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const articleSlug = searchParams.get('articleSlug') ?? ''

  const comments = await listCommentsBySlug(articleSlug)

  return NextResponse.json({
    comments,
    configured: isSupabaseConfigured() && isAuthConfigured(),
  })
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !isSupabaseAdminConfigured() || !isAuthConfigured()) {
    return NextResponse.json({ message: 'Comments are not configured' }, { status: 503 })
  }

  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as { articleSlug?: string; content?: string }
  const articleSlug = body.articleSlug?.trim()
  const content = body.content?.trim()

  if (!articleSlug || !content) {
    return NextResponse.json({ message: 'articleSlug and content are required' }, { status: 400 })
  }

  const user = session.user as {
    name?: string | null
    image?: string | null
    email?: string | null
    login?: string
  }

  const result = await createComment({
    articleSlug,
    content,
    userGithubLogin: user.login || user.email || user.name || 'github-user',
    userAvatar: user.image ?? null,
    userName: user.name ?? null,
  })

  if (!result.ok) {
    return NextResponse.json({ message: result.message ?? result.reason }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
