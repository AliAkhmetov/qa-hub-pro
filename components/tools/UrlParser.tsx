'use client'

import { useState, useCallback } from 'react'

interface UrlParserProps {
  isRu?: boolean
}

interface QueryParam {
  key: string
  value: string
}

interface Parsed {
  protocol: string
  host: string
  pathname: string
  hash: string
  params: QueryParam[]
}

function parseUrl(raw: string): Parsed | null {
  try {
    const u = new URL(raw.trim())
    const params: QueryParam[] = []
    u.searchParams.forEach((v, k) => params.push({ key: k, value: v }))
    return {
      protocol: u.protocol,
      host: u.host,
      pathname: u.pathname,
      hash: u.hash,
      params,
    }
  } catch {
    return null
  }
}

function buildUrl(p: Parsed): string {
  const base = `${p.protocol}//${p.host}${p.pathname}`
  const qs = p.params.filter((x) => x.key).map((x) => `${encodeURIComponent(x.key)}=${encodeURIComponent(x.value)}`).join('&')
  return base + (qs ? '?' + qs : '') + p.hash
}

const FIELD_STYLE = {
  padding: '8px 12px',
  background: 'var(--bg-elev)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  color: 'var(--fg)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  outline: 'none',
  width: '100%',
}

const LABEL_STYLE = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted)',
  marginBottom: 6,
}

export function UrlParser({ isRu }: UrlParserProps) {
  const [raw, setRaw] = useState('')
  const [parsed, setParsed] = useState<Parsed | null>(null)
  const [copied, setCopied] = useState(false)

  const onInput = useCallback((val: string) => {
    setRaw(val)
    setParsed(parseUrl(val))
  }, [])

  const updateField = (field: keyof Omit<Parsed, 'params'>, val: string) => {
    if (!parsed) return
    const next = { ...parsed, [field]: val }
    setParsed(next)
    setRaw(buildUrl(next))
  }

  const updateParam = (idx: number, field: 'key' | 'value', val: string) => {
    if (!parsed) return
    const params = parsed.params.map((p, i) => i === idx ? { ...p, [field]: val } : p)
    const next = { ...parsed, params }
    setParsed(next)
    setRaw(buildUrl(next))
  }

  const addParam = () => {
    if (!parsed) return
    const next = { ...parsed, params: [...parsed.params, { key: '', value: '' }] }
    setParsed(next)
  }

  const removeParam = (idx: number) => {
    if (!parsed) return
    const next = { ...parsed, params: parsed.params.filter((_, i) => i !== idx) }
    setParsed(next)
    setRaw(buildUrl(next))
  }

  const copy = () => {
    navigator.clipboard.writeText(raw)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const isInvalid = raw.trim() && !parsed

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* Input */}
      <div style={{ position: 'relative' }}>
        <div style={LABEL_STYLE}>{isRu ? 'URL' : 'URL'}</div>
        <input
          type="text"
          value={raw}
          onChange={(e) => onInput(e.target.value)}
          placeholder="https://api.example.com/v2/users?page=1&limit=20"
          style={{
            ...FIELD_STYLE,
            borderColor: isInvalid ? 'var(--danger)' : 'var(--line)',
            paddingRight: 80,
          }}
          spellCheck={false}
        />
        {raw && (
          <button
            onClick={copy}
            style={{
              position: 'absolute', right: 8, top: 30,
              padding: '4px 10px', borderRadius: 6,
              border: '1px solid var(--line)',
              background: 'var(--bg-elev)',
              color: copied ? 'var(--success)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)', fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {copied ? '✓' : 'COPY'}
          </button>
        )}
      </div>

      {parsed && (
        <>
          {/* Parts grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { label: isRu ? 'Протокол' : 'Protocol', field: 'protocol' as const },
              { label: isRu ? 'Хост' : 'Host', field: 'host' as const },
              { label: isRu ? 'Путь' : 'Path', field: 'pathname' as const },
              { label: 'Hash', field: 'hash' as const },
            ].map(({ label, field }) => (
              <div key={field}>
                <div style={LABEL_STYLE}>{label}</div>
                <input
                  type="text"
                  value={parsed[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  style={FIELD_STYLE}
                  spellCheck={false}
                />
              </div>
            ))}
          </div>

          {/* Query params */}
          <div>
            <div style={{ ...LABEL_STYLE, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{isRu ? 'Query параметры' : 'Query params'}</span>
              <button
                onClick={addParam}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em',
                  color: 'var(--accent)', background: 'none', border: 0, cursor: 'pointer',
                }}
              >
                + {isRu ? 'добавить' : 'add'}
              </button>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {parsed.params.length === 0 && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', padding: '8px 0' }}>
                  {isRu ? 'нет параметров' : 'no params'}
                </div>
              )}
              {parsed.params.map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={p.key}
                    placeholder="key"
                    onChange={(e) => updateParam(i, 'key', e.target.value)}
                    style={FIELD_STYLE}
                    spellCheck={false}
                  />
                  <input
                    type="text"
                    value={p.value}
                    placeholder="value"
                    onChange={(e) => updateParam(i, 'value', e.target.value)}
                    style={FIELD_STYLE}
                    spellCheck={false}
                  />
                  <button
                    onClick={() => removeParam(i)}
                    style={{
                      width: 28, height: 28, borderRadius: 6, border: '1px solid var(--line)',
                      background: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
