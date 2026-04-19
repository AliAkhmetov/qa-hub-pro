'use client'

import { useState } from 'react'

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
const taStyle: React.CSSProperties = {
  width: '100%', minHeight: 180, padding: 18, background: 'transparent',
  border: 0, outline: 0, fontFamily: 'var(--font-mono)', fontSize: 13,
  lineHeight: 1.6, color: 'var(--fg)', resize: 'vertical', display: 'block',
}

export function Base64Tool({ isRu }: { isRu: boolean }) {
  const [plain, setPlain] = useState('')
  const [encoded, setEncoded] = useState('')
  const [error, setError] = useState('')

  function encode() {
    setError('')
    try {
      setEncoded(btoa(unescape(encodeURIComponent(plain))))
    } catch (e) {
      setError('ERR · ' + String(e))
    }
  }

  function decodeBs64() {
    setError('')
    try {
      setPlain(decodeURIComponent(escape(atob(encoded))))
    } catch {
      setError(isRu ? 'ERR · невалидный base64' : 'ERR · invalid base64')
    }
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span>PLAIN TEXT</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={monoBtn} onClick={encode}>→ ENCODE</button>
            </div>
          </div>
          <textarea
            value={plain}
            onChange={e => setPlain(e.target.value)}
            spellCheck={false}
            placeholder="Ali Akhmetov"
            style={taStyle}
          />
        </div>
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span>BASE64</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={monoBtn} onClick={decodeBs64}>← DECODE</button>
            </div>
          </div>
          <textarea
            value={encoded}
            onChange={e => setEncoded(e.target.value)}
            spellCheck={false}
            placeholder="QWxpIEFraG1ldG92"
            style={taStyle}
          />
        </div>
      </div>
      {error && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--danger)', marginTop: 10, letterSpacing: '.1em' }}>
          {error}
        </div>
      )}
    </>
  )
}
