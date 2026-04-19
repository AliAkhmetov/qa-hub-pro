'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const t = useTranslations('codeBlock')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="relative my-4 rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface2)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs transition-colors"
          style={{ color: copied ? 'var(--accent)' : 'var(--text-muted)' }}
        >
          {copied ? t('copied') : t('copy')}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed" style={{ color: 'var(--text-primary)' }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
