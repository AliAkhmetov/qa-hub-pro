'use client'

import { useState } from 'react'

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaSBBa2htZXRvdiIsImlhdCI6MTcxMzQ1MTIwMCwiZXhwIjoxNzEzNTM3NjAwfQ.J4kZU5s3t4G0fK2I9Y6p-B6Xp8wLpZ0O-v7Z8xY9qEk'

function b64urlDecode(s: string): string {
  s = s.replace(/-/g, '+').replace(/_/g, '/')
  while (s.length % 4) s += '='
  try {
    return decodeURIComponent(
      atob(s).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    )
  } catch {
    return atob(s)
  }
}

interface Decoded {
  header: string
  payload: string
  signature: string
  error?: string
}

function decode(token: string): Decoded {
  const parts = token.split('.')
  if (parts.length !== 3) return { header: '', payload: '', signature: '', error: 'JWT must have exactly 3 parts separated by dots' }
  try {
    const header = JSON.stringify(JSON.parse(b64urlDecode(parts[0])), null, 2)
    const payload = JSON.stringify(JSON.parse(b64urlDecode(parts[1])), null, 2)
    return { header, payload, signature: parts[2] }
  } catch (e) {
    return { header: '', payload: '', signature: '', error: String(e) }
  }
}

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

export function JwtDecoder({ isRu }: { isRu: boolean }) {
  const [input, setInput] = useState('')
  const decoded = input.trim() ? decode(input.trim()) : null

  function handleSample() {
    setInput(SAMPLE_JWT)
  }

  function handleCopy() {
    if (decoded?.payload) navigator.clipboard.writeText('// PAYLOAD\n' + decoded.payload)
  }

  return (
    <div className="tool-two-col">
      <div style={panelStyle}>
        <div style={panelHeaderStyle}>
          <span>INPUT · JWT</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={monoBtn} onClick={handleSample}>{isRu ? 'Пример' : 'Sample'}</button>
            <button style={monoBtn} onClick={() => setInput('')}>{isRu ? 'Очистить' : 'Clear'}</button>
          </div>
        </div>
        <textarea
          data-testid="jwt-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          spellCheck={false}
          placeholder="eyJhbGciOi..."
          style={{
            width: '100%', minHeight: 220, padding: 18, background: 'transparent',
            border: 0, outline: 0, fontFamily: 'var(--font-mono)', fontSize: 13,
            lineHeight: 1.6, color: 'var(--fg)', resize: 'vertical', display: 'block',
          }}
        />
      </div>
      <div style={panelStyle}>
        <div style={panelHeaderStyle}>
          <span>DECODED</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={monoBtn} onClick={handleCopy}>{isRu ? 'Копировать payload' : 'Copy payload'}</button>
          </div>
        </div>
        <div data-testid="jwt-output" style={{ padding: 18, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.6, minHeight: 220, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {decoded?.error ? (
            <span style={{ color: 'var(--danger)', fontSize: 12, letterSpacing: '.1em' }}>ERR · {decoded.error}</span>
          ) : decoded ? (
            <>
              <div style={{ color: '#d98a7a' }}>{'// HEADER\n'}{decoded.header}</div>
              <div style={{ color: '#8fb88a', marginTop: 12 }}>{'// PAYLOAD\n'}{decoded.payload}</div>
              <div style={{ color: 'var(--accent)', marginTop: 12 }}>{'// SIGNATURE (base64url)\n'}{decoded.signature}</div>
            </>
          ) : (
            <span style={{ color: 'var(--muted)' }}>{isRu ? 'Вставьте JWT выше…' : 'Paste a JWT above…'}</span>
          )}
        </div>
      </div>
    </div>
  )
}
