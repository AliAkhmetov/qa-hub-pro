interface ToolsPageProps {
  params: Promise<{ locale: string }>
}

const TOOLS = [
  {
    id: 'jwt',
    nameRu: 'JWT Decoder',
    nameEn: 'JWT Decoder',
    descRu: 'Декодируй и инспектируй заголовок, payload и подпись JWT-токена прямо в браузере — без отправки данных на сервер.',
    descEn: 'Decode and inspect the header, payload and signature of any JWT token — entirely in-browser, nothing leaves your machine.',
  },
  {
    id: 'json',
    nameRu: 'JSON Formatter',
    nameEn: 'JSON Formatter',
    descRu: 'Форматируй, минифицируй и валидируй JSON. Подсветка синтаксиса, подсказки об ошибках, копирование одной кнопкой.',
    descEn: 'Format, minify and validate JSON. Syntax highlighting, inline error hints, one-click copy.',
  },
  {
    id: 'regex',
    nameRu: 'Regex Tester',
    nameEn: 'Regex Tester',
    descRu: 'Тестируй регулярные выражения в реальном времени. Показывает совпадения, группы и именованные захваты с подсветкой.',
    descEn: 'Test regular expressions in real time. Highlights matches, capture groups and named captures inline.',
  },
  {
    id: 'base64',
    nameRu: 'Base64 Encoder / Decoder',
    nameEn: 'Base64 Encoder / Decoder',
    descRu: 'Кодируй и декодируй строки в Base64 и обратно. Поддерживает URL-safe вариант и бинарный ввод.',
    descEn: 'Encode and decode strings to and from Base64. Supports URL-safe variant and binary input.',
  },
  {
    id: 'uuid',
    nameRu: 'UUID Generator',
    nameEn: 'UUID Generator',
    descRu: 'Генерируй UUID v4 пачками или по одному. Копируй в буфер, выбирай формат: с дефисами, без, в верхнем регистре.',
    descEn: 'Generate UUID v4 in bulk or one at a time. Copy to clipboard, choose format: hyphenated, compact, uppercase.',
  },
]

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 32px' }}>
      <section style={{ paddingTop: 56 }}>

        {/* ── KICKER BAR ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBottom: 28,
          borderBottom: '1px solid var(--line)',
          marginBottom: 56,
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '.2em',
            textTransform: 'uppercase' as const,
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--muted)', display: 'inline-block' }} />
            {isRu ? 'QA ИНСТРУМЕНТЫ' : 'QA TOOLBOX'}
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '.2em',
          }}>
            5 TOOLS · {isRu ? 'СКОРО' : 'COMING SOON'}
          </span>
        </div>

        {/* ── BIG HEADING ── */}
        <div style={{ marginBottom: 80 }}>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: 'clamp(56px, 8vw, 120px)',
            lineHeight: 0.9,
            letterSpacing: '-.035em',
            margin: '0 0 24px',
            color: 'var(--fg)',
          }}>
            {isRu ? (
              <>
                <span style={{ display: 'block' }}>Инструменты</span>
                <span style={{ display: 'block', color: 'var(--muted)', fontStyle: 'italic' }}>/ Tools</span>
              </>
            ) : (
              <>
                <span style={{ display: 'block' }}>Tools</span>
                <span style={{ display: 'block', color: 'var(--muted)', fontStyle: 'italic' }}>/ Инструменты</span>
              </>
            )}
          </h1>
          <p style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--fg-soft)',
            maxWidth: '52ch',
            margin: 0,
          }}>
            {isRu
              ? 'Пять утилит, которые открываешь каждый день. Работают прямо в браузере — без трекеров, без регистрации. Интерактивные версии в разработке.'
              : 'Five utilities you open every day. Run entirely in the browser — no tracking, no signup. Interactive versions are in development.'}
          </p>
        </div>

        {/* ── TOOLS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          marginBottom: 120,
        }}>
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              id={tool.id}
              style={{
                padding: 28,
                border: '1px solid var(--line)',
                borderRadius: 20,
                background: 'var(--bg-elev)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {/* Tool anchor label */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: 'var(--muted)',
                letterSpacing: '.2em',
                textTransform: 'uppercase' as const,
              }}>
                #{tool.id}
              </div>

              {/* Tool name */}
              <h3 style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: 32,
                lineHeight: 1.05,
                letterSpacing: '-.02em',
                margin: 0,
                color: 'var(--fg)',
              }}>
                {isRu ? tool.nameRu : tool.nameEn}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                lineHeight: 1.65,
                color: 'var(--fg-soft)',
                margin: 0,
                flex: 1,
              }}>
                {isRu ? tool.descRu : tool.descEn}
              </p>

              {/* Coming soon badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                paddingTop: 16,
                borderTop: '1px solid var(--line)',
              }}>
                <span style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--muted)',
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase' as const,
                }}>
                  {isRu ? 'Скоро' : 'Coming soon'} —
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '.1em',
                }}>
                  {isRu ? 'интерактивная версия в разработке' : 'interactive version in development'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  )
}
