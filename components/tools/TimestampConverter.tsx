'use client'

import { useState, useCallback } from 'react'

interface TimestampConverterProps {
  isRu?: boolean
}

const TIMEZONES = [
  'UTC',
  'Europe/Moscow',
  'Asia/Almaty',
  'Asia/Tashkent',
  'Asia/Tbilisi',
  'Europe/London',
  'Europe/Paris',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Tokyo',
]

const FIELD = {
  padding: '10px 14px',
  background: 'var(--bg-elev)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  color: 'var(--fg)',
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  outline: 'none',
  width: '100%',
}

const LABEL = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted)',
  marginBottom: 6,
}

function tsToIso(ts: number, tz: string): string {
  try {
    return new Date(ts * 1000).toLocaleString('sv-SE', { timeZone: tz, hour12: false }).replace(' ', 'T')
  } catch {
    return ''
  }
}

function isoToTs(iso: string): number | null {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return null
  return Math.floor(d.getTime() / 1000)
}

export function TimestampConverter({ isRu }: TimestampConverterProps) {
  const now = Math.floor(Date.now() / 1000)
  const [unix, setUnix] = useState(String(now))
  const [iso, setIso] = useState(tsToIso(now, 'UTC'))
  const [tz, setTz] = useState('UTC')

  const fromUnix = useCallback((val: string) => {
    setUnix(val)
    const ts = parseInt(val)
    if (!isNaN(ts)) setIso(tsToIso(ts, tz))
  }, [tz])

  const fromIso = useCallback((val: string) => {
    setIso(val)
    const ts = isoToTs(val)
    if (ts !== null) setUnix(String(ts))
  }, [])

  const onTzChange = useCallback((newTz: string) => {
    setTz(newTz)
    const ts = parseInt(unix)
    if (!isNaN(ts)) setIso(tsToIso(ts, newTz))
  }, [unix])

  const setNow = () => {
    const ts = Math.floor(Date.now() / 1000)
    setUnix(String(ts))
    setIso(tsToIso(ts, tz))
  }

  const ts = parseInt(unix)
  const date = !isNaN(ts) ? new Date(ts * 1000) : null

  const formats = date ? [
    { label: 'UTC ISO 8601', value: date.toISOString() },
    { label: 'RFC 2822', value: date.toUTCString() },
    { label: isRu ? 'Локальная (ru-RU)' : 'Local (ru-RU)', value: date.toLocaleString('ru-RU') },
    { label: isRu ? 'Только дата' : 'Date only', value: date.toISOString().split('T')[0] },
    { label: isRu ? 'Только время (UTC)' : 'Time only (UTC)', value: date.toISOString().split('T')[1].replace('Z', '') },
    { label: 'Milliseconds', value: String(ts * 1000) },
  ] : []

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' }}>
        {/* Unix */}
        <div>
          <div style={LABEL}>Unix timestamp</div>
          <input
            type="text"
            value={unix}
            onChange={(e) => fromUnix(e.target.value)}
            placeholder="1713614400"
            style={FIELD}
            spellCheck={false}
          />
        </div>
        {/* ISO */}
        <div>
          <div style={LABEL}>ISO / Human</div>
          <input
            type="text"
            value={iso}
            onChange={(e) => fromIso(e.target.value)}
            placeholder="2024-04-20T10:00:00"
            style={FIELD}
            spellCheck={false}
          />
        </div>
        {/* Now button */}
        <button
          onClick={setNow}
          style={{
            padding: '10px 16px',
            borderRadius: 10,
            border: '1px solid var(--line)',
            background: 'var(--bg-elev)',
            color: 'var(--fg-soft)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            letterSpacing: '.1em',
          }}
        >
          NOW
        </button>
      </div>

      {/* Timezone */}
      <div>
        <div style={LABEL}>{isRu ? 'Временная зона' : 'Timezone'}</div>
        <select
          value={tz}
          onChange={(e) => onTzChange(e.target.value)}
          style={{ ...FIELD, cursor: 'pointer' }}
        >
          {TIMEZONES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Formats table */}
      {formats.length > 0 && (
        <div
          style={{
            border: '1px solid var(--line)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {formats.map(({ label, value }, i) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr auto',
                gap: 12,
                alignItems: 'center',
                padding: '10px 16px',
                borderBottom: i < formats.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.08em' }}>
                {label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg)' }}>
                {value}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(value)}
                style={{
                  padding: '3px 8px', borderRadius: 4,
                  border: '1px solid var(--line)', background: 'none',
                  color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 10,
                  cursor: 'pointer',
                }}
              >
                COPY
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
