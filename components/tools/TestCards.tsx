'use client'

import { useState } from 'react'

interface TestCardsProps {
  isRu?: boolean
}

interface CardDef {
  brand: string
  number: string
  expiry: string
  cvc: string
  scenario: string
  scenarioRu: string
  color: string
}

const CARDS: CardDef[] = [
  // Stripe standard test cards
  { brand: 'Visa', number: '4242 4242 4242 4242', expiry: '12/34', cvc: '123', scenario: 'Successful payment', scenarioRu: 'Успешная оплата', color: '#1a1f71' },
  { brand: 'Visa', number: '4000 0566 5566 5556', expiry: '12/34', cvc: '123', scenario: 'Debit card', scenarioRu: 'Дебетовая карта', color: '#1a1f71' },
  { brand: 'Mastercard', number: '5555 5555 5555 4444', expiry: '12/34', cvc: '123', scenario: 'Successful payment', scenarioRu: 'Успешная оплата', color: '#eb001b' },
  { brand: 'Mastercard', number: '5200 8282 8282 8210', expiry: '12/34', cvc: '123', scenario: 'Debit card', scenarioRu: 'Дебетовая карта', color: '#eb001b' },
  { brand: 'Mastercard', number: '5105 1051 0510 5100', expiry: '12/34', cvc: '123', scenario: 'Prepaid card', scenarioRu: 'Предоплаченная карта', color: '#eb001b' },
  { brand: 'Amex', number: '3782 822463 10005', expiry: '12/34', cvc: '1234', scenario: 'Successful payment', scenarioRu: 'Успешная оплата', color: '#2e77b6' },
  { brand: 'Amex', number: '3714 496353 98431', expiry: '12/34', cvc: '1234', scenario: 'Successful payment', scenarioRu: 'Успешная оплата', color: '#2e77b6' },
  { brand: 'Discover', number: '6011 1111 1111 1117', expiry: '12/34', cvc: '123', scenario: 'Successful payment', scenarioRu: 'Успешная оплата', color: '#f76f20' },
  // 3DS
  { brand: 'Visa', number: '4000 0027 6000 3184', expiry: '12/34', cvc: '123', scenario: '3DS required', scenarioRu: '3DS — требует подтверждения', color: '#1a1f71' },
  { brand: 'Visa', number: '4000 0025 0000 3155', expiry: '12/34', cvc: '123', scenario: '3DS — optional', scenarioRu: '3DS — опциональный', color: '#1a1f71' },
  // Decline scenarios
  { brand: 'Visa', number: '4000 0000 0000 0002', expiry: '12/34', cvc: '123', scenario: 'Declined', scenarioRu: 'Отклонено', color: '#6b7280' },
  { brand: 'Visa', number: '4000 0000 0000 9995', expiry: '12/34', cvc: '123', scenario: 'Insufficient funds', scenarioRu: 'Недостаточно средств', color: '#6b7280' },
  { brand: 'Visa', number: '4000 0000 0000 0069', expiry: '12/34', cvc: '123', scenario: 'Expired card', scenarioRu: 'Карта просрочена', color: '#6b7280' },
  { brand: 'Visa', number: '4000 0000 0000 0127', expiry: '12/34', cvc: '126', scenario: 'Incorrect CVC', scenarioRu: 'Неверный CVC', color: '#6b7280' },
  { brand: 'Visa', number: '4000 0000 0000 0119', expiry: '12/34', cvc: '123', scenario: 'Processing error', scenarioRu: 'Ошибка процессинга', color: '#6b7280' },
]

const SCENARIO_GROUPS = [
  { label: 'All', labelRu: 'Все', filter: null },
  { label: 'Success', labelRu: 'Успешные', filter: 'success' },
  { label: '3DS', labelRu: '3DS', filter: '3ds' },
  { label: 'Decline', labelRu: 'Отказы', filter: 'decline' },
]

function getGroup(card: CardDef): string {
  const s = card.scenario.toLowerCase()
  if (s.includes('3ds') || s.includes('3d')) return '3ds'
  if (s.includes('declined') || s.includes('insufficient') || s.includes('expired') || s.includes('incorrect') || s.includes('processing')) return 'decline'
  return 'success'
}

export function TestCards({ isRu }: TestCardsProps) {
  const [filter, setFilter] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = filter ? CARDS.filter((c) => getGroup(c) === filter) : CARDS

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''))
    setCopied(key)
    setTimeout(() => setCopied(null), 1800)
  }

  const scenarioColor = (group: string) => {
    if (group === 'success') return 'var(--success)'
    if (group === '3ds') return '#f59e0b'
    return 'var(--danger)'
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {SCENARIO_GROUPS.map((g) => (
          <button
            key={g.label}
            onClick={() => setFilter(g.filter)}
            style={{
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid var(--line)',
              background: filter === g.filter ? 'var(--accent)' : 'none',
              color: filter === g.filter ? 'var(--accent-ink)' : 'var(--fg-soft)',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              cursor: 'pointer', transition: '.15s',
            }}
          >
            {isRu ? g.labelRu : g.label}
          </button>
        ))}
      </div>

      {/* Cards table */}
      <div style={{ border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '80px 190px 80px 60px 1fr auto',
          gap: 12, padding: '8px 16px',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em',
          color: 'var(--muted)', textTransform: 'uppercase',
          borderBottom: '1px solid var(--line)', background: 'var(--bg-elev)',
        }}>
          <span>{isRu ? 'Платёжная' : 'Brand'}</span>
          <span>{isRu ? 'Номер' : 'Number'}</span>
          <span>{isRu ? 'Срок' : 'Expiry'}</span>
          <span>CVC</span>
          <span>{isRu ? 'Сценарий' : 'Scenario'}</span>
          <span></span>
        </div>

        {filtered.map((card, i) => {
          const group = getGroup(card)
          return (
            <div
              key={i}
              style={{
                display: 'grid', gridTemplateColumns: '80px 190px 80px 60px 1fr auto',
                gap: 12, padding: '11px 16px', alignItems: 'center',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                color: card.color, letterSpacing: '.05em',
              }}>
                {card.brand}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '.08em', color: 'var(--fg)' }}>
                {card.number}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-soft)' }}>{card.expiry}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-soft)' }}>{card.cvc}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: scenarioColor(group) }}>
                {isRu ? card.scenarioRu : card.scenario}
              </div>
              <button
                onClick={() => copy(card.number, `${i}-num`)}
                style={{
                  padding: '4px 10px', borderRadius: 6,
                  border: '1px solid var(--line)', background: 'none',
                  color: copied === `${i}-num` ? 'var(--success)' : 'var(--muted)',
                  fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {copied === `${i}-num` ? '✓' : 'COPY'}
              </button>
            </div>
          )
        })}
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
        {isRu
          ? 'Тест-карты Stripe. Работают только в тестовом режиме (Test mode). Для 3DS-карт используй любой 6-значный код подтверждения.'
          : 'Stripe test cards. Work only in test mode. For 3DS cards use any 6-digit confirmation code.'}
      </div>
    </div>
  )
}
