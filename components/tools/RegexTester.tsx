'use client'

import { useState, useCallback } from 'react'

const panelStyle: React.CSSProperties = {
  border: '1px solid var(--line)', borderRadius: 16,
  background: 'var(--bg-elev)', overflow: 'hidden',
}
const panelHeaderStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '14px 18px', borderBottom: '1px solid var(--line)',
  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em',
}
const monoBtn: React.CSSProperties = {
  padding: '4px 10px', borderRadius: 999, border: '1px solid var(--line)',
  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-soft)', letterSpacing: '.1em',
  cursor: 'pointer', transition: '.2s', background: 'none',
}

function escHtml(s: string) {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] ?? c))
}

function applyRegex(pattern: string, flags: string, text: string): { html: string; count: number; error?: string } {
  if (!pattern) return { html: escHtml(text), count: 0 }
  try {
    const safeFlags = flags.includes('g') ? flags : flags + 'g'
    let count = 0
    const html = escHtml(text).replace(
      new RegExp(escHtml(pattern).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'), safeFlags),
      (m: string) => { count++; return `<mark style="background:color-mix(in oklab,var(--accent) 40%,transparent);color:var(--fg);padding:1px 2px;border-radius:2px">${m}</mark>` }
    )
    return { html, count }
  } catch (e) {
    return { html: escHtml(text), count: 0, error: String(e) }
  }
}

export function RegexTester({ isRu }: { isRu: boolean }) {
  const [pattern, setPattern] = useState('\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b')
  const [flags, setFlags] = useState('gi')
  const [text, setText] = useState('Contact ali@qa-hub.dev or support+bug@alatau.kz. Invalid: not@mail')

  const result = useCallback(() => applyRegex(pattern, flags, text), [pattern, flags, text])()

  function sample() {
    setPattern('\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b')
    setFlags('gi')
    setText('Contact ali@qa-hub.dev or support+bug@alatau.kz. Invalid: not@mail')
  }

  return (
    <>
      {/* Pattern panel */}
      <div style={{ ...panelStyle, marginTop: 24 }}>
        <div style={panelHeaderStyle}>
          <span>PATTERN</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={monoBtn} onClick={sample}>{isRu ? 'Пример' : 'Sample'}</button>
          </div>
        </div>
        <div style={{ padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)' }}>
          <span>/</span>
          <input
            data-testid="regex-pattern"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="\\b[\\w.+-]+@…"
            style={{ flex: 1, background: 'transparent', border: 0, color: 'var(--fg)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 0 }}
          />
          <span>/</span>
          <input
            data-testid="regex-flags"
            value={flags}
            onChange={e => setFlags(e.target.value)}
            placeholder="gi"
            style={{ width: 80, background: 'transparent', border: '1px solid var(--line)', color: 'var(--fg)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 0, padding: '6px 10px', borderRadius: 6 }}
          />
        </div>
      </div>

      {/* Test string panel */}
      <div style={{ ...panelStyle, marginTop: 12 }}>
        <div style={panelHeaderStyle}>
          <span>TEST STRING</span>
          <span style={{ color: result.error ? 'var(--danger)' : 'var(--muted)' }}>
            {result.error ? 'INVALID REGEX' : `${result.count} ${isRu ? 'СОВПАДЕНИЙ' : 'MATCHES'}`}
          </span>
        </div>
        <textarea
          data-testid="regex-text"
          value={text}
          onChange={e => setText(e.target.value)}
          spellCheck={false}
          placeholder={isRu ? 'Введите текст для проверки…' : 'Enter test string…'}
          style={{ width: '100%', minHeight: 120, padding: 18, background: 'transparent', border: 0, outline: 0, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.6, color: 'var(--fg)', resize: 'vertical', display: 'block' }}
        />
        {text && (
          <div
            style={{ padding: '16px 18px', borderTop: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: result.html || '—' }}
          />
        )}
      </div>
    </>
  )
}
