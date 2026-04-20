'use client'

import { useState, useCallback } from 'react'

interface FakeDataGeneratorProps {
  isRu?: boolean
}

type Locale = 'kz' | 'ru' | 'us' | 'eu'

// ── helpers ─────────────────────────────────────────────────────────────────
function rnd(arr: string[]): string { return arr[Math.floor(Math.random() * arr.length)] }
function rndInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min }
function pad(n: number, len = 2): string { return String(n).padStart(len, '0') }

// KZ IIN: YYMMDDCNNNNK
function genIin(): string {
  const year = rndInt(70, 4)
  const month = rndInt(1, 12)
  const day = rndInt(1, 28)
  const century = year >= 0 && year <= 24 ? rndInt(5, 6) : rndInt(3, 4) // 3/4=1900s, 5/6=2000s
  const seq = rndInt(100, 999)
  const base = `${pad(year)}${pad(month)}${pad(day)}${century}${seq}`
  // Luhn-like checksum for IIN
  const w1 = [1,2,3,4,5,6,7,8,9,10,11]
  const w2 = [3,4,5,6,7,8,9,10,11,1,2]
  const digits = base.split('').map(Number)
  let sum = digits.reduce((acc, d, i) => acc + d * w1[i], 0)
  let check = sum % 11
  if (check === 10) {
    sum = digits.reduce((acc, d, i) => acc + d * w2[i], 0)
    check = sum % 11
  }
  return base + (check === 10 ? '0' : check)
}

function genBirthday(): string {
  const y = rndInt(1970, 2003)
  const m = rndInt(1, 12)
  const d = rndInt(1, 28)
  return `${y}-${pad(m)}-${pad(d)}`
}

// ── name data ────────────────────────────────────────────────────────────────
const DATA = {
  kz: {
    firstM:  ['Аслан', 'Нурсултан', 'Дамир', 'Ерлан', 'Алибек', 'Бекзат', 'Санжар', 'Азамат', 'Тимур', 'Арман'],
    firstF:  ['Айгерим', 'Назгуль', 'Диана', 'Айнур', 'Гульнара', 'Зарина', 'Малика', 'Асель', 'Динара', 'Меруерт'],
    last:    ['Ахметов', 'Бекова', 'Нурмагамбетов', 'Сейткали', 'Жаксыбеков', 'Қасымов', 'Дюсенов', 'Байжанов'],
    suffix:  ['ов', 'ова', 'ев', 'ева', 'ұлы', 'қызы'],
    city:    ['Алматы', 'Астана', 'Шымкент', 'Қарағанды', 'Актобе'],
    street:  ['Абай', 'Назарбаев', 'Аль-Фараби', 'Сатпаев', 'Байтурсынов'],
    phone:   () => `+7 (7${rndInt(10,99)}) ${rndInt(100,999)}-${rndInt(10,99)}-${rndInt(10,99)}`,
    domain:  ['mail.ru', 'gmail.com', 'yandex.kz', 'inbox.ru'],
  },
  ru: {
    firstM:  ['Александр', 'Дмитрий', 'Иван', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Михаил', 'Артём', 'Роман'],
    firstF:  ['Анастасия', 'Екатерина', 'Мария', 'Наталья', 'Ольга', 'Юлия', 'Дарья', 'Татьяна', 'Виктория', 'Анна'],
    last:    ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков'],
    suffix:  ['ов', 'ова', 'ев', 'ева', 'ин', 'ина'],
    city:    ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Краснодар'],
    street:  ['Ленина', 'Мира', 'Советская', 'Пушкина', 'Гагарина'],
    phone:   () => `+7 (9${rndInt(10,99)}) ${rndInt(100,999)}-${rndInt(10,99)}-${rndInt(10,99)}`,
    domain:  ['mail.ru', 'gmail.com', 'yandex.ru', 'inbox.ru'],
  },
  us: {
    firstM:  ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'],
    firstF:  ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Lisa'],
    last:    ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Taylor'],
    suffix:  [],
    city:    ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    street:  ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Blvd', 'Park Rd'],
    phone:   () => `+1 (${rndInt(200,999)}) ${rndInt(200,999)}-${rndInt(1000,9999)}`,
    domain:  ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'],
  },
  eu: {
    firstM:  ['Luca', 'Thomas', 'Lukas', 'Hugo', 'Noah', 'Leon', 'Elias', 'Julian', 'Felix', 'Paul'],
    firstF:  ['Emma', 'Sophie', 'Mia', 'Hannah', 'Laura', 'Lena', 'Julia', 'Anna', 'Marie', 'Lisa'],
    last:    ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz'],
    suffix:  [],
    city:    ['Berlin', 'Paris', 'Amsterdam', 'Vienna', 'Prague'],
    street:  ['Hauptstraße', 'Rue de la Paix', 'Kurfürstendamm', 'Via Roma', 'Gran Via'],
    phone:   () => `+4${rndInt(1,9)} ${rndInt(100,999)} ${rndInt(100,999)} ${rndInt(1000,9999)}`,
    domain:  ['gmail.com', 'gmx.de', 'web.de', 'yahoo.fr'],
  },
}

function genPerson(locale: Locale) {
  const d = DATA[locale]
  const isMale = Math.random() > 0.5
  const first = rnd(isMale ? d.firstM : d.firstF)
  const last = rnd(d.last)
  const fullName = locale === 'kz' || locale === 'ru'
    ? `${last} ${first}`
    : `${first} ${last}`
  const slug = (first + last).toLowerCase().replace(/[^a-zа-яё]/gi, '')
  const email = `${slug}${rndInt(10,99)}@${rnd(d.domain)}`
  const phone = d.phone()
  const city = rnd(d.city)
  const street = rnd(d.street)
  const house = rndInt(1, 120)
  const address = locale === 'us'
    ? `${house} ${street}, ${city}`
    : `${city}, ${locale === 'eu' ? street : 'ул. ' + street} ${house}`
  const birthday = genBirthday()
  const iin = locale === 'kz' ? genIin() : null
  const zip = locale === 'us' ? String(rndInt(10000, 99999)) : locale === 'eu' ? String(rndInt(10000, 99999)) : String(rndInt(100000, 999999))

  return { fullName, email, phone, address, birthday, iin, zip }
}

const FIELD = {
  padding: '8px 12px',
  background: 'var(--bg)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  color: 'var(--fg)',
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  cursor: 'pointer',
  transition: '.15s',
}

export function FakeDataGenerator({ isRu }: FakeDataGeneratorProps) {
  const [locale, setLocale] = useState<Locale>('kz')
  const [count, setCount] = useState(5)
  const [people, setPeople] = useState<ReturnType<typeof genPerson>[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const generate = useCallback(() => {
    setPeople(Array.from({ length: count }, () => genPerson(locale)))
  }, [locale, count])

  const copy = (i: number) => {
    const p = people[i]
    const lines = [
      p.fullName,
      p.email,
      p.phone,
      p.address,
      p.birthday,
      p.iin ? `IIN: ${p.iin}` : null,
      `ZIP: ${p.zip}`,
    ].filter(Boolean).join('\n')
    navigator.clipboard.writeText(lines)
    setCopied(i)
    setTimeout(() => setCopied(null), 1800)
  }

  const copyAll = () => {
    const rows = people.map((p) =>
      [p.fullName, p.email, p.phone, p.address, p.birthday, p.iin ?? '', p.zip].join('\t')
    )
    navigator.clipboard.writeText(['Name\tEmail\tPhone\tAddress\tBirthday\tIIN\tZIP', ...rows].join('\n'))
    setCopied(-1)
    setTimeout(() => setCopied(null), 1800)
  }

  const LOCALES: { id: Locale; label: string }[] = [
    { id: 'kz', label: 'KZ 🇰🇿' },
    { id: 'ru', label: 'RU 🇷🇺' },
    { id: 'us', label: 'US 🇺🇸' },
    { id: 'eu', label: 'EU 🇪🇺' },
  ]

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {LOCALES.map((l) => (
            <button
              key={l.id}
              onClick={() => setLocale(l.id)}
              style={{
                padding: '6px 14px', borderRadius: 999,
                border: '1px solid var(--line)',
                background: locale === l.id ? 'var(--accent)' : 'none',
                color: locale === l.id ? 'var(--accent-ink)' : 'var(--fg-soft)',
                fontFamily: 'var(--font-mono)', fontSize: 12,
                cursor: 'pointer', transition: '.15s',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ ...FIELD, width: 90 }}
        >
          {[1,5,10,20,50].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <button
          onClick={generate}
          style={{
            padding: '8px 20px', borderRadius: 999,
            background: 'var(--accent)', color: 'var(--accent-ink)',
            border: 0, fontFamily: 'var(--font-mono)', fontSize: 12,
            cursor: 'pointer', letterSpacing: '.08em',
          }}
        >
          {isRu ? 'ГЕНЕРИРОВАТЬ' : 'GENERATE'}
        </button>
        {people.length > 0 && (
          <button
            onClick={copyAll}
            style={{
              padding: '8px 16px', borderRadius: 999,
              border: '1px solid var(--line)', background: 'none',
              color: copied === -1 ? 'var(--success)' : 'var(--fg-soft)',
              fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
            }}
          >
            {copied === -1 ? '✓ COPIED TSV' : 'COPY TSV'}
          </button>
        )}
      </div>

      {/* Table */}
      {people.length > 0 && (
        <div style={{ border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
          {people.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                gap: 12,
                padding: '12px 16px',
                borderBottom: i < people.length - 1 ? '1px solid var(--line)' : 'none',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>NAME</div>
                <div style={{ fontSize: 13, color: 'var(--fg)' }}>{p.fullName}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>EMAIL</div>
                <div style={{ fontSize: 12, color: 'var(--fg-soft)', fontFamily: 'var(--font-mono)' }}>{p.email}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>PHONE</div>
                <div style={{ fontSize: 12, color: 'var(--fg-soft)', fontFamily: 'var(--font-mono)' }}>{p.phone}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>
                  {p.iin ? 'IIN / BIRTHDAY' : 'BIRTHDAY'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-soft)', fontFamily: 'var(--font-mono)' }}>
                  {p.iin ?? p.birthday}
                </div>
              </div>
              <button
                onClick={() => copy(i)}
                style={{
                  padding: '4px 10px', borderRadius: 6,
                  border: '1px solid var(--line)', background: 'none',
                  color: copied === i ? 'var(--success)' : 'var(--muted)',
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  cursor: 'pointer',
                }}
              >
                {copied === i ? '✓' : 'COPY'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
