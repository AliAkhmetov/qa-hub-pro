'use client'

import { useState, useEffect } from 'react'
import SparkMD5 from 'spark-md5'

interface HashCalculatorProps {
  isRu?: boolean
}

type Encoding = 'utf8' | 'hex' | 'base64'

async function sha(algo: string, data: string): Promise<string> {
  const enc = new TextEncoder()
  const buf = await crypto.subtle.digest(algo, enc.encode(data))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function hmacSha(algo: string, data: string, key: string): Promise<string> {
  const enc = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw', enc.encode(key),
    { name: 'HMAC', hash: algo },
    false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(data))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

interface HashRow {
  label: string
  value: string
  loading: boolean
}

export function HashCalculator({ isRu }: HashCalculatorProps) {
  const [input, setInput] = useState('')
  const [hmacKey, setHmacKey] = useState('')
  const [encoding] = useState<Encoding>('utf8')
  const [hashes, setHashes] = useState<HashRow[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!input) {
      setHashes([])
      return
    }

    const compute = async () => {
      const md5 = SparkMD5.hash(input)
      const [sha1, sha256, sha512] = await Promise.all([
        sha('SHA-1', input),
        sha('SHA-256', input),
        sha('SHA-512', input),
      ])

      const rows: HashRow[] = [
        { label: 'MD5', value: md5, loading: false },
        { label: 'SHA-1', value: sha1, loading: false },
        { label: 'SHA-256', value: sha256, loading: false },
        { label: 'SHA-512', value: sha512, loading: false },
      ]

      if (hmacKey) {
        const [h256, h512] = await Promise.all([
          hmacSha('SHA-256', input, hmacKey),
          hmacSha('SHA-512', input, hmacKey),
        ])
        rows.push(
          { label: 'HMAC-SHA256', value: h256, loading: false },
          { label: 'HMAC-SHA512', value: h512, loading: false },
        )
      }

      setHashes(rows)
    }

    compute()
  }, [input, hmacKey, encoding])

  const copy = (label: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1800)
  }

  const FIELD = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--bg-elev)',
    border: '1px solid var(--line)',
    borderRadius: 10,
    color: 'var(--fg)',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    outline: 'none',
  }

  const LABEL = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '.14em',
    textTransform: 'uppercase' as const,
    color: 'var(--muted)',
    marginBottom: 6,
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <div style={LABEL}>{isRu ? 'Входные данные' : 'Input'}</div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isRu ? 'Введи текст для хэширования...' : 'Enter text to hash...'}
          rows={4}
          style={{ ...FIELD, resize: 'vertical' as const, lineHeight: 1.6 }}
          spellCheck={false}
        />
      </div>

      <div>
        <div style={LABEL}>HMAC {isRu ? 'ключ (опционально)' : 'key (optional)'}</div>
        <input
          type="text"
          value={hmacKey}
          onChange={(e) => setHmacKey(e.target.value)}
          placeholder={isRu ? 'Ключ для HMAC (оставь пустым чтобы пропустить)' : 'HMAC secret key (leave empty to skip)'}
          style={FIELD}
          spellCheck={false}
        />
      </div>

      {hashes.length > 0 && (
        <div style={{ border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
          {hashes.map((h, i) => (
            <div
              key={h.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '130px 1fr auto',
                gap: 12, padding: '11px 16px', alignItems: 'center',
                borderBottom: i < hashes.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>
                {h.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg)',
                wordBreak: 'break-all', lineHeight: 1.4,
              }}>
                {h.value}
              </div>
              <button
                onClick={() => copy(h.label, h.value)}
                style={{
                  padding: '4px 10px', borderRadius: 6,
                  border: '1px solid var(--line)', background: 'none',
                  color: copied === h.label ? 'var(--success)' : 'var(--muted)',
                  fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {copied === h.label ? '✓' : 'COPY'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
