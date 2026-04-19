'use client'

import { useState } from 'react'

function uuidV4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = [...b].map(x => x.toString(16).padStart(2, '0'))
  return `${h.slice(0,4).join('')}-${h.slice(4,6).join('')}-${h.slice(6,8).join('')}-${h.slice(8,10).join('')}-${h.slice(10,16).join('')}`
}

export function UuidGenerator({ isRu }: { isRu: boolean }) {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  function generate() {
    const n = Math.max(1, Math.min(100, count))
    setUuids(Array.from({ length: n }, uuidV4))
    setCopied(null)
  }

  function copyOne(i: number) {
    navigator.clipboard.writeText(uuids[i])
    setCopied(i)
    setTimeout(() => setCopied(null), 1200)
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join('\n'))
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginTop: 24, alignItems: 'center' }}>
        <input
          type="number"
          value={count}
          min={1}
          max={100}
          onChange={e => setCount(Number(e.target.value))}
          style={{
            width: 100, padding: '12px 16px', border: '1px solid var(--line)', borderRadius: 10,
            background: 'var(--bg-soft)', color: 'var(--fg)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none',
          }}
        />
        <button
          onClick={generate}
          style={{
            padding: '12px 20px', borderRadius: 999, background: 'var(--accent)',
            color: 'var(--accent-ink)', fontWeight: 500, fontSize: 13, cursor: 'pointer',
            border: 0, whiteSpace: 'nowrap',
          }}
        >
          {isRu ? 'Сгенерировать' : 'Generate'}
        </button>
        {uuids.length > 1 && (
          <button
            onClick={copyAll}
            style={{
              padding: '12px 16px', borderRadius: 999, border: '1px solid var(--line)',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-soft)', cursor: 'pointer',
              background: 'none', letterSpacing: '.1em',
            }}
          >
            {isRu ? 'КОПИРОВАТЬ ВСЕ' : 'COPY ALL'}
          </button>
        )}
      </div>

      {uuids.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          {uuids.map((uuid, i) => (
            <div key={i} style={{
              padding: '10px 14px', border: '1px solid var(--line)', borderRadius: 8,
              background: 'var(--bg-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ color: 'var(--fg)' }}>{uuid}</span>
              <button
                onClick={() => copyOne(i)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: copied === i ? 'var(--success)' : 'var(--muted)', letterSpacing: '.1em', cursor: 'pointer', background: 'none', border: 0 }}
              >
                {copied === i ? (isRu ? 'СКОПИРОВАНО ✓' : 'COPIED ✓') : 'COPY'}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
