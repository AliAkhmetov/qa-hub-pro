'use client'

import { useState, useMemo } from 'react'
import * as Diff from 'diff'

interface JsonDiffProps {
  isRu?: boolean
}

function tryFormat(s: string): string {
  try {
    return JSON.stringify(JSON.parse(s), null, 2)
  } catch {
    return s
  }
}

const TEXTAREA = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--bg-elev)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  color: 'var(--fg)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  lineHeight: 1.6,
  resize: 'vertical' as const,
  outline: 'none',
  minHeight: 200,
}

const LABEL = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted)',
  marginBottom: 6,
}

export function JsonDiff({ isRu }: JsonDiffProps) {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [mode, setMode] = useState<'lines' | 'json'>('lines')

  const diff = useMemo(() => {
    if (!left.trim() && !right.trim()) return []
    const a = mode === 'json' ? tryFormat(left) : left
    const b = mode === 'json' ? tryFormat(right) : right
    return Diff.diffLines(a, b)
  }, [left, right, mode])

  const stats = useMemo(() => {
    let added = 0, removed = 0
    for (const part of diff) {
      const lines = (part.value.match(/\n/g) || []).length
      if (part.added) added += lines
      else if (part.removed) removed += lines
    }
    return { added, removed, same: diff.filter((p) => !p.added && !p.removed).length }
  }, [diff])

  const hasDiff = diff.some((p) => p.added || p.removed)

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(['lines', 'json'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid var(--line)',
              background: mode === m ? 'var(--accent)' : 'none',
              color: mode === m ? 'var(--accent-ink)' : 'var(--fg-soft)',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              cursor: 'pointer', transition: '.15s',
            }}
          >
            {m === 'lines' ? 'Text diff' : 'JSON diff'}
          </button>
        ))}
      </div>

      {/* Two textareas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={LABEL}>{isRu ? 'Оригинал' : 'Original'}</div>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder={isRu ? 'Вставь исходный текст...' : 'Paste original...'}
            style={TEXTAREA}
            spellCheck={false}
          />
        </div>
        <div>
          <div style={LABEL}>{isRu ? 'Изменённый' : 'Modified'}</div>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder={isRu ? 'Вставь изменённый текст...' : 'Paste modified...'}
            style={TEXTAREA}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Stats */}
      {(left || right) && (
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4ade80' }}>
            +{stats.added} {isRu ? 'добавлено' : 'added'}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f87171' }}>
            −{stats.removed} {isRu ? 'удалено' : 'removed'}
          </span>
          {!hasDiff && left && right && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--success)' }}>
              ✓ {isRu ? 'Идентично' : 'Identical'}
            </span>
          )}
        </div>
      )}

      {/* Diff output */}
      {diff.length > 0 && hasDiff && (
        <div
          style={{
            border: '1px solid var(--line)',
            borderRadius: 10,
            overflow: 'auto',
            maxHeight: 480,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          {diff.map((part, i) => {
            const bg = part.added ? 'rgba(74,222,128,.1)' : part.removed ? 'rgba(248,113,113,.1)' : 'transparent'
            const color = part.added ? '#4ade80' : part.removed ? '#f87171' : 'var(--fg-soft)'
            const prefix = part.added ? '+ ' : part.removed ? '- ' : '  '
            return (
              <div key={i} style={{ background: bg }}>
                {part.value.split('\n').filter((_, j, arr) => j < arr.length - 1 || part.value.endsWith('\n') || j === 0).map((line, j) => (
                  <div key={j} style={{ padding: '0 16px', color, whiteSpace: 'pre' }}>
                    {prefix}{line}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
