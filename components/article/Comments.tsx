import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getServerSession } from 'next-auth/next'
import { CommentForm } from '@/components/article/CommentForm'
import { authOptions, isAuthConfigured } from '@/lib/auth'
import { listCommentsBySlug } from '@/lib/comments'
import { isSupabaseConfigured } from '@/lib/supabase'

interface CommentsProps {
  articleSlug: string
  locale: string
}

function formatCommentDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export async function Comments({ articleSlug, locale }: CommentsProps) {
  const t = await getTranslations({ locale, namespace: 'comments' })
  const comments = await listCommentsBySlug(articleSlug)
  const session = isAuthConfigured() ? await getServerSession(authOptions) : null
  const configured = isSupabaseConfigured() && isAuthConfigured()

  return (
    <section className="mt-12 space-y-5">
      <div>
        <h2 style={{ color: 'var(--text-primary)' }}>{t('title')}</h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
      </div>

      {!configured && (
        <div
          className="rounded-2xl p-4"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
        >
          <p style={{ color: 'var(--text-muted)' }}>{t('unavailable')}</p>
        </div>
      )}

      {configured && !session && (
        <div
          className="rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
        >
          <p style={{ color: 'var(--text-muted)' }}>{t('loginPrompt')}</p>
          <Link
            href="/api/auth/signin/github"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
            style={{ backgroundColor: 'var(--surface2)', color: 'var(--text-primary)' }}
          >
            {t('signIn')}
          </Link>
        </div>
      )}

      {configured && session && <CommentForm articleSlug={articleSlug} />}

      <div className="space-y-3">
        {comments.length === 0 ? (
          <div
            className="rounded-2xl p-4"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
          >
            <p style={{ color: 'var(--text-muted)' }}>{t('empty')}</p>
          </div>
        ) : (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-2xl p-4"
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {comment.user_name || comment.user_github_login}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-hint)' }}>
                    @{comment.user_github_login}
                  </p>
                </div>
                <time className="text-xs" style={{ color: 'var(--text-hint)' }}>
                  {formatCommentDate(comment.created_at, locale)}
                </time>
              </div>
              <p className="mt-3 text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                {comment.content}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
