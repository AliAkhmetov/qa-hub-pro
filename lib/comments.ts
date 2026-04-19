import {
  getSupabaseAdminClient,
  getSupabaseClient,
  isSupabaseAdminConfigured,
  type CommentRecord,
} from '@/lib/supabase'

interface CreateCommentInput {
  articleSlug: string
  content: string
  userGithubLogin: string
  userAvatar?: string | null
  userName?: string | null
}

export async function listCommentsBySlug(articleSlug: string): Promise<CommentRecord[]> {
  const supabase = getSupabaseClient()
  if (!supabase || !articleSlug) return []

  const { data, error } = await supabase
    .from('comments')
    .select('id, article_slug, user_github_login, user_avatar, user_name, content, created_at')
    .eq('article_slug', articleSlug)
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('Failed to load comments:', error.message)
    return []
  }

  return (data ?? []) as CommentRecord[]
}

export async function createComment(input: CreateCommentInput) {
  const supabase = getSupabaseAdminClient()
  if (!supabase || !isSupabaseAdminConfigured()) {
    return { ok: false, reason: 'not_configured' as const }
  }

  const { error } = await supabase.from('comments').insert({
    article_slug: input.articleSlug,
    user_github_login: input.userGithubLogin,
    user_avatar: input.userAvatar ?? null,
    user_name: input.userName ?? null,
    content: input.content,
  })

  if (error) {
    return { ok: false, reason: 'insert_failed' as const, message: error.message }
  }

  return { ok: true as const }
}
