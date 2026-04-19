'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface CommentFormProps {
  articleSlug: string
}

export function CommentForm({ articleSlug }: CommentFormProps) {
  const t = useTranslations('comments')
  const router = useRouter()
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = content.trim()
    if (!trimmed) return

    setStatus('sending')

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleSlug,
        content: trimmed,
      }),
    })

    if (!response.ok) {
      setStatus('error')
      return
    }

    setContent('')
    setStatus('success')
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-4 space-y-3"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
    >
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={t('textarea')}
        className="min-h-28 w-full rounded-xl p-3 text-sm focus:outline-none"
        style={{
          border: '1px solid var(--border)',
          backgroundColor: 'var(--surface2)',
          color: 'var(--text-primary)',
        }}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm" style={{ color: status === 'error' ? '#ef4444' : 'var(--text-muted)' }}>
          {status === 'success' ? t('success') : status === 'error' ? t('error') : ' '}
        </p>
        <button
          type="submit"
          disabled={status === 'sending' || content.trim().length === 0}
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-opacity disabled:opacity-50"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
        >
          {status === 'sending' ? t('sending') : t('submit')}
        </button>
      </div>
    </form>
  )
}
