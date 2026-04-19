'use client'

import { useState } from 'react'
import type { Article } from '@/lib/notion.types'

interface ArticleShareProps {
  article: Article
  isRu: boolean
}

export function ArticleShare({ article, isRu }: ArticleShareProps) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.title)}`
  const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`

  const btnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 14px', border: '1px solid var(--line)', borderRadius: 10,
    fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--fg-soft)',
    letterSpacing: '.1em', transition: '.2s', cursor: 'pointer',
    background: 'none', width: '100%', textDecoration: 'none',
  }

  return (
    <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 8 }}>
        {isRu ? 'ПОДЕЛИТЬСЯ' : 'SHARE'}
      </div>

      <button onClick={copyLink} style={btnStyle}>
        <span>{copied ? (isRu ? 'СКОПИРОВАНО ✓' : 'COPIED ✓') : (isRu ? 'СКОПИРОВАТЬ' : 'COPY LINK')}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
      </button>

      <a href={tgUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
        <span>TELEGRAM</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.46 13.28l-2.974-.924c-.647-.204-.66-.647.136-.958l11.57-4.461c.537-.194 1.006.131.702.284z"/>
        </svg>
      </a>

      <a href={twUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
        <span>TWITTER / X</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      {/* Divider + Meta */}
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {article.readTime > 0 && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>
            {article.readTime} {isRu ? 'МИН' : 'MIN'}
          </div>
        )}
        {article.level.map(lvl => (
          <div key={lvl} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.1em' }}>
            {lvl.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  )
}
