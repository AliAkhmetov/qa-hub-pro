import { JwtDecoder } from '@/components/tools/JwtDecoder'
import { JsonFormatter } from '@/components/tools/JsonFormatter'
import { RegexTester } from '@/components/tools/RegexTester'
import { Base64Tool } from '@/components/tools/Base64Tool'
import { UuidGenerator } from '@/components/tools/UuidGenerator'

interface ToolsPageProps {
  params: Promise<{ locale: string }>
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  const TOOLS = [
    { id: 'jwt',    num: 'TOOL 01 / 05', titleRu: <>JWT <i style={{ color: 'var(--muted)' }}>decoder</i></>, titleEn: <>JWT <i style={{ color: 'var(--muted)' }}>decoder</i></>, descRu: 'Декодирует JWT: header, payload и подпись. Проверку подписи намеренно не делаю — подпись смотрим на бэке.', descEn: 'Decodes a JWT: header, payload and signature. Signature verification is intentionally omitted — verify server-side.' },
    { id: 'json',   num: 'TOOL 02 / 05', titleRu: <>JSON <i style={{ color: 'var(--muted)' }}>formatter</i></>, titleEn: <>JSON <i style={{ color: 'var(--muted)' }}>formatter</i></>, descRu: 'Форматирует и минифицирует JSON. Подсвечивает синтаксические ошибки.', descEn: 'Formats and minifies JSON. Highlights syntax errors.' },
    { id: 'regex',  num: 'TOOL 03 / 05', titleRu: <>Regex <i style={{ color: 'var(--muted)' }}>tester</i></>, titleEn: <>Regex <i style={{ color: 'var(--muted)' }}>tester</i></>, descRu: 'JavaScript-regex. Тестовая строка подсвечивается на каждом совпадении в реальном времени.', descEn: 'JavaScript regex. Every match is highlighted in real time.' },
    { id: 'base64', num: 'TOOL 04 / 05', titleRu: <>Base64 <i style={{ color: 'var(--muted)' }}>encode / decode</i></>, titleEn: <>Base64 <i style={{ color: 'var(--muted)' }}>encode / decode</i></>, descRu: 'В обе стороны. Поддерживает UTF-8.', descEn: 'Both directions. UTF-8 safe.' },
    { id: 'uuid',   num: 'TOOL 05 / 05', titleRu: <>UUID <i style={{ color: 'var(--muted)' }}>generator</i></>, titleEn: <>UUID <i style={{ color: 'var(--muted)' }}>generator</i></>, descRu: <>Генератор UUID v4 через <code>crypto.randomUUID()</code>. Массово, с копированием одним кликом.</>, descEn: <>UUID v4 via <code>crypto.randomUUID()</code>. Batch generation, one-click copy.</> },
  ]

  const navLabels: Record<string, string> = { jwt: 'JWT decoder', json: 'JSON formatter', regex: 'Regex tester', base64: 'Base64', uuid: 'UUID generator' }

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 32px 160px' }}>

      {/* ── HEADER ── */}
      <div style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', textTransform: 'uppercase' as const, marginBottom: 20 }}>
          <span style={{ width: 24, height: 1, background: 'var(--muted)', display: 'inline-block' }} />
          {isRu ? 'QA ИНСТРУМЕНТЫ · 05 УТИЛИТ · РАБОТАЕТ В БРАУЗЕРЕ' : 'QA TOOLBOX · 05 TOOLS · WORKS IN BROWSER'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(64px, 10vw, 140px)', lineHeight: .9, letterSpacing: '-.03em', margin: '0 0 24px', fontWeight: 400 }}>
          {isRu ? <>Инструменты <i style={{ color: 'var(--muted)' }}>для&nbsp;будней.</i></> : <>Tools <i style={{ color: 'var(--muted)' }}>for&nbsp;daily&nbsp;work.</i></>}
        </h1>
        <p style={{ maxWidth: '60ch', fontSize: 18, lineHeight: 1.55, color: 'var(--fg-soft)', margin: '0 0 32px' }}>
          {isRu
            ? 'Пять мини-утилит, которые я сам открываю каждый день. Всё работает прямо в браузере — никаких трекеров, никаких серверов, никакой регистрации. Данные не покидают вашу вкладку.'
            : 'Five small tools I open every single day. Everything runs in the browser — no trackers, no server, no sign-up. Your data never leaves the tab.'}
        </p>

        {/* Quick nav */}
        <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          {TOOLS.map(t => (
            <a key={t.id} href={`#${t.id}`} style={{
              padding: '8px 16px', borderRadius: 999, border: '1px solid var(--line)',
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em',
              color: 'var(--fg-soft)', transition: '.2s',
            }}>
              {navLabels[t.id]}
            </a>
          ))}
        </nav>
      </div>

      {/* ── TOOLS ── */}
      {TOOLS.map((tool, idx) => (
        <section key={tool.id} id={tool.id} style={{ padding: '56px 0', borderBottom: idx < TOOLS.length - 1 ? '1px solid var(--line)' : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 64, margin: 0, letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1 }}>
                {isRu ? tool.titleRu : tool.titleEn}
              </h2>
              <p style={{ margin: '8px 0 0', color: 'var(--fg-soft)', fontSize: 15, maxWidth: '60ch', lineHeight: 1.55 }}>
                {isRu ? tool.descRu : tool.descEn}
              </p>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', flexShrink: 0 }}>{tool.num}</span>
          </div>

          {tool.id === 'jwt'    && <JwtDecoder    isRu={isRu} />}
          {tool.id === 'json'   && <JsonFormatter  isRu={isRu} />}
          {tool.id === 'regex'  && <RegexTester    isRu={isRu} />}
          {tool.id === 'base64' && <Base64Tool     isRu={isRu} />}
          {tool.id === 'uuid'   && <UuidGenerator  isRu={isRu} />}
        </section>
      ))}

    </div>
  )
}
