'use client'

import { useState, useMemo } from 'react'
import cronstrue from 'cronstrue/i18n'

interface CronParserProps {
  isRu?: boolean
}

function getNextRuns(expr: string, count = 7): Date[] | null {
  try {
    // manual next-run calculation without external lib
    const parts = expr.trim().split(/\s+/)
    if (parts.length !== 5) return null

    const [minuteP, hourP, domP, monthP, dowP] = parts

    const matchField = (field: string, value: number, min: number, max: number): boolean => {
      if (field === '*') return true
      if (field.includes('/')) {
        const [, step] = field.split('/')
        return (value - min) % parseInt(step) === 0
      }
      if (field.includes('-')) {
        const [lo, hi] = field.split('-').map(Number)
        return value >= lo && value <= hi
      }
      if (field.includes(',')) {
        return field.split(',').map(Number).includes(value)
      }
      return parseInt(field) === value
    }

    const results: Date[] = []
    const start = new Date()
    start.setSeconds(0, 0)
    start.setMinutes(start.getMinutes() + 1)

    for (let i = 0; results.length < count && i < 525600; i++) {
      const d = new Date(start.getTime() + i * 60000)
      if (
        matchField(monthP, d.getMonth() + 1, 1, 12) &&
        matchField(domP, d.getDate(), 1, 31) &&
        matchField(dowP, d.getDay(), 0, 6) &&
        matchField(hourP, d.getHours(), 0, 23) &&
        matchField(minuteP, d.getMinutes(), 0, 59)
      ) {
        results.push(d)
      }
    }
    return results
  } catch {
    return null
  }
}

const EXAMPLES = [
  { expr: '* * * * *',      labelRu: 'Каждую минуту',          labelEn: 'Every minute' },
  { expr: '0 * * * *',      labelRu: 'Каждый час',             labelEn: 'Every hour' },
  { expr: '0 9 * * 1-5',    labelRu: 'Будни в 9:00',           labelEn: 'Weekdays at 9am' },
  { expr: '*/15 * * * *',   labelRu: 'Каждые 15 минут',        labelEn: 'Every 15 minutes' },
  { expr: '0 0 * * *',      labelRu: 'Каждый день в полночь',  labelEn: 'Daily at midnight' },
  { expr: '0 0 1 * *',      labelRu: '1-го числа каждого месяца', labelEn: '1st of each month' },
  { expr: '0 0 * * 0',      labelRu: 'Каждое воскресенье',     labelEn: 'Every Sunday' },
]

export function CronParser({ isRu }: CronParserProps) {
  const [expr, setExpr] = useState('*/15 * * * *')

  const { description, nextRuns, error } = useMemo(() => {
    if (!expr.trim()) return { description: '', nextRuns: [], error: null }
    try {
      const desc = cronstrue.toString(expr, { locale: isRu ? 'ru' : 'en', throwExceptionOnParseError: true })
      const runs = getNextRuns(expr) ?? []
      return { description: desc, nextRuns: runs, error: null }
    } catch (e) {
      return { description: '', nextRuns: [], error: String(e).replace('Error: ', '') }
    }
  }, [expr, isRu])

  const FIELD = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--bg-elev)',
    border: '1px solid var(--line)',
    borderRadius: 10,
    color: 'var(--fg)',
    fontFamily: 'var(--font-mono)',
    fontSize: 16,
    letterSpacing: '.08em',
    outline: 'none',
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* Input */}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
          Cron expression
        </div>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="*/15 * * * *"
          style={{ ...FIELD, borderColor: error ? 'var(--danger)' : 'var(--line)' }}
          spellCheck={false}
        />

        {/* Field hints */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginTop: 8 }}>
          {[
            { label: isRu ? 'минута' : 'minute', hint: '0-59' },
            { label: isRu ? 'час' : 'hour', hint: '0-23' },
            { label: isRu ? 'день' : 'day', hint: '1-31' },
            { label: isRu ? 'месяц' : 'month', hint: '1-12' },
            { label: isRu ? 'дн.нед' : 'weekday', hint: '0-6' },
          ].map((f) => (
            <div key={f.label} style={{ textAlign: 'center', padding: '4px 6px', background: 'var(--bg-elev)', borderRadius: 6, border: '1px solid var(--line)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '.1em' }}>{f.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-soft)' }}>{f.hint}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div style={{
          padding: '14px 18px',
          background: 'color-mix(in oklab, var(--success) 8%, transparent)',
          border: '1px solid color-mix(in oklab, var(--success) 25%, transparent)',
          borderRadius: 10,
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          color: 'var(--fg)',
        }}>
          {description}
        </div>
      )}

      {error && (
        <div style={{ padding: '12px 16px', background: 'color-mix(in oklab, var(--danger) 8%, transparent)', border: '1px solid color-mix(in oklab, var(--danger) 25%, transparent)', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--danger)' }}>
          {error}
        </div>
      )}

      {/* Next runs */}
      {nextRuns.length > 0 && (
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
            {isRu ? 'Следующие запуски' : 'Next runs'}
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
            {nextRuns.map((d, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '24px 1fr',
                gap: 12, padding: '8px 16px', alignItems: 'center',
                borderBottom: i < nextRuns.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{i + 1}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg)' }}>
                  {d.toLocaleString(isRu ? 'ru-RU' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
          {isRu ? 'Примеры' : 'Examples'}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {EXAMPLES.map((e) => (
            <button
              key={e.expr}
              onClick={() => setExpr(e.expr)}
              style={{
                padding: '6px 12px', borderRadius: 8,
                border: '1px solid var(--line)', background: expr === e.expr ? 'var(--bg-elev)' : 'none',
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.06em' }}>{e.expr}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{isRu ? e.labelRu : e.labelEn}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
