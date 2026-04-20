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
  width: '100%', minHeight: 220, padding: 18, background: 'transparent',
  border: 0, outline: 0, fontFamily: 'var(--font-mono)', fontSize: 13,
  lineHeight: 1.6, color: 'var(--fg)', resize: 'vertical', display: 'block',
}

export function JsonFormatter({ isRu }: { isRu: boolean }) {
  const [input, setInput] = useState('{"name":"ali","skills":["qa","api"]}')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  function format() {
    if (!input.trim()) { setOutput(''); setStatus(null); return }
    try {
      const pretty = JSON.stringify(JSON.parse(input), null, 2)
      setOutput(pretty)
      setStatus({ ok: true, msg: isRu ? 'OK · ВАЛИДНЫЙ JSON' : 'OK · VALID JSON' })
    } catch (e) {
      setStatus({ ok: false, msg: 'ERR · ' + String(e) })
      setOutput('')
    }
  }

  function minify() {
    if (!input.trim()) { setOutput(''); setStatus(null); return }
    try {
      setOutput(JSON.stringify(JSON.parse(input)))
      setStatus({ ok: true, msg: isRu ? 'OK · МИНИФИЦИРОВАН' : 'OK · MINIFIED' })
    } catch (e) {
      setStatus({ ok: false, msg: 'ERR · ' + String(e) })
    }
  }

  function copy() {
    if (output) navigator.clipboard.writeText(output)
  }

  return (
    <>
      <div className="tool-two-col">
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span>INPUT</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={monoBtn} onClick={format}>{isRu ? 'Форматировать' : 'Format'}</button>
              <button style={monoBtn} onClick={minify}>{isRu ? 'Минифицировать' : 'Minify'}</button>
            </div>
          </div>
          <textarea
            data-testid="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            spellCheck={false}
            placeholder='{"name":"ali","skills":["qa","api"]}'
            style={taStyle}
          />
        </div>
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span>OUTPUT</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={monoBtn} onClick={copy}>{isRu ? 'Копировать' : 'Copy'}</button>
            </div>
          </div>
          <textarea
            data-testid="json-output"
            value={output}
            readOnly
            spellCheck={false}
            style={{ ...taStyle, color: output ? 'var(--fg)' : 'var(--muted)' }}
          />
        </div>
      </div>
      {status && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em',
          marginTop: 10, color: status.ok ? 'var(--success)' : 'var(--danger)',
        }}>
          {status.msg}
        </div>
      )}
    </>
  )
}
