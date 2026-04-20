import Link from 'next/link'

interface RoadmapPageProps {
  params: Promise<{ locale: string }>
}

const LEVELS = [
  {
    num: 'LEVEL 01',
    years: '0–1 ГОД',
    yearsEn: '0–1 YEAR',
    yLabel: 'Y 0–1',
    titleRu: <><i>Junior</i></>,
    titleEn: <><i>Junior</i></>,
    descRu: 'Первая работа. Цель — научиться писать хорошие баг-репорты, понимать архитектуру приложения и быть не «помехой», а «помощью» команде.',
    descEn: 'First job. Goal: write good bug reports, understand the application architecture, and be a help, not a hindrance, to the team.',
    skillsRu: ['Чек-листы и тест-кейсы', 'Git, Jira, Confluence', 'SQL на уровне SELECT + JOIN', 'Postman: коллекции и переменные', 'Bug-report-гигиена'],
    skillsEn: ['Checklists and test cases', 'Git, Jira, Confluence', 'SQL: SELECT + JOIN level', 'Postman: collections & variables', 'Bug report hygiene'],
    salary: '300–600K ₸',
    salaryLabel: '/ МЕС',
    side: 'right' as const,
  },
  {
    num: 'LEVEL 02',
    years: '1–3 ГОДА',
    yearsEn: '1–3 YEARS',
    yLabel: 'Y 1–3',
    titleRu: <><i>Middle</i></>,
    titleEn: <><i>Middle</i></>,
    descRu: 'Самостоятельная единица. Закрывает фичу с нуля до релиза, пишет автотесты на API, разбирается в CI, начинает менторить джунов.',
    descEn: 'Independent contributor. Owns a feature end-to-end, writes API automation, understands CI, starts mentoring juniors.',
    skillsRu: ['Тест-дизайн (4+ техники уверенно)', 'Автоматизация API / UI', 'CI/CD, Docker', 'OAuth, JWT, базы HTTP', 'Менторинг джунов'],
    skillsEn: ['Test design (4+ techniques, confidently)', 'API / UI automation', 'CI/CD, Docker', 'OAuth, JWT, HTTP fundamentals', 'Mentoring juniors'],
    salary: '600K–1.2M ₸',
    salaryLabel: '/ МЕС',
    side: 'left' as const,
  },
  {
    num: 'LEVEL 03',
    years: '3–5 ЛЕТ',
    yearsEn: '3–5 YEARS',
    yLabel: 'Y 3–5',
    titleRu: <><i>Senior</i></>,
    titleEn: <><i>Senior</i></>,
    descRu: 'Архитектор тестирования. Строит фреймворки, выбирает инструменты, решает не «что тестировать», а «как тестирование устроено в команде». Отвечает за качество, а не за тесты.',
    descEn: 'Test architect. Builds frameworks, picks tools, solves "how is testing structured in this team" rather than "what to test". Owns quality, not just tests.',
    skillsRu: ['Архитектура фреймворков автотестов', 'Perf-тесты, observability', 'Security basics, OWASP Top 10', 'Работа с продуктом и архитектором', 'Эксперт для всей команды'],
    skillsEn: ['Automation framework architecture', 'Performance tests, observability', 'Security basics, OWASP Top 10', 'Works with product & system architects', 'Team-wide technical authority'],
    salary: '1.2M–2M ₸',
    salaryLabel: '/ МЕС',
    side: 'right' as const,
  },
  {
    num: 'LEVEL 04',
    years: '5+ ЛЕТ',
    yearsEn: '5+ YEARS',
    yLabel: 'Y 5+',
    titleRu: <><i>Lead</i></>,
    titleEn: <><i>Lead</i></>,
    descRu: 'Больше менеджер, чем инженер. Отвечает за людей, найм, грейды, процессы. Строит культуру качества, защищает бюджеты.',
    descEn: 'More manager than engineer. Owns people, hiring, grades, and processes. Builds a quality culture, defends budgets.',
    skillsRu: ['Найм и грейдинг', 'Стратегия QA на год+', 'Бюджеты, инструменты, поставщики', '1-on-1, performance review', 'Доклады, внешняя коммуникация'],
    skillsEn: ['Hiring and grading', 'QA strategy 1+ year horizon', 'Budgets, tools, vendors', '1-on-1s, performance reviews', 'Talks, external communication'],
    salary: '2M–3.5M ₸',
    salaryLabel: '/ МЕС',
    side: 'left' as const,
  },
]

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  return (
    <div className="page-wrap">

      {/* ── HEADER ── */}
      <div style={{ paddingTop: 64 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 28, borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em' }}>
          <span>CAREER LADDER · QA</span>
          <span>04 LEVELS · 5–7 YEARS</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(72px, 12vw, 180px)', lineHeight: .88, letterSpacing: '-.035em', margin: '56px 0 24px', fontWeight: 400 }}>
          {isRu ? <>От <i style={{ color: 'var(--muted)' }}>Junior</i><br />до <i style={{ color: 'var(--muted)' }}>Lead.</i></> : <>From <i style={{ color: 'var(--muted)' }}>Junior</i><br />to <i style={{ color: 'var(--muted)' }}>Lead.</i></>}
        </h1>
        <p style={{ maxWidth: '64ch', fontSize: 19, lineHeight: 1.55, color: 'var(--fg-soft)', margin: '0 0 64px' }}>
          {isRu
            ? 'Карьерная лестница QA-инженера так, как я её вижу изнутри банка: какие навыки закрывают каждый грейд, чем занимается человек, сколько платят и что читать прямо сейчас.'
            : 'The QA career ladder as I see it from inside a bank: what skills unlock each grade, what the role actually involves, what the salary looks like, and what to study right now.'}
        </p>
      </div>

      {/* ── ZIGZAG TIMELINE ── */}
      <div style={{ position: 'relative', padding: '32px 0 0' }}>
        {/* Center line */}
        <div className="roadmap-timeline-line" />

        {LEVELS.map((lvl) => {
          const isLeft = lvl.side === 'left'
          return (
            <div key={lvl.num} className="roadmap-item">
              {/* Left side — either card or empty */}
              {isLeft ? (
                <div className="roadmap-card-left" style={{ gridColumn: 1, marginRight: 40, textAlign: 'right' }}>
                  <LevelCard lvl={lvl} isRu={isRu} isLeft={true} />
                </div>
              ) : (
                <div className="roadmap-item-empty" style={{ gridColumn: 1 }} />
              )}

              {/* Center node */}
              <div className="roadmap-item-center" style={{ gridColumn: 2, display: 'grid', placeItems: 'center', marginTop: 8, zIndex: 1 }}>
                <div style={{ width: 16, height: 16, borderRadius: '999px', background: 'var(--bg)', border: '2px solid var(--accent)', position: 'relative', zIndex: 2 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.2em', marginTop: 8 }}>{lvl.yLabel}</span>
              </div>

              {/* Right side */}
              {!isLeft ? (
                <div className="roadmap-card-right" style={{ gridColumn: 3, marginLeft: 40 }}>
                  <LevelCard lvl={lvl} isRu={isRu} isLeft={false} />
                </div>
              ) : (
                <div className="roadmap-item-empty" style={{ gridColumn: 3 }} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── CLOSING CTA ── */}
      <div style={{ margin: '100px auto 0', maxWidth: 640, textAlign: 'center', padding: 40, border: '1px solid var(--line)', borderRadius: 20, background: 'var(--bg-elev)' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, margin: '0 0 12px', fontWeight: 400, letterSpacing: '-.02em' }}>
          {isRu ? 'Застряли между грейдами?' : 'Stuck between grades?'}
        </h3>
        <p style={{ color: 'var(--fg-soft)', fontSize: 15, lineHeight: 1.55, margin: '0 0 20px' }}>
          {isRu
            ? 'Частая история: Middle, который технически потянет Senior, но не знает, с чего начать разговор о повышении. Разберём за 90 минут.'
            : 'A common story: a Middle who could technically do Senior but doesn\'t know how to start the conversation. Let\'s work it out in 90 minutes.'}
        </p>
        <Link
          href={`/${locale}/about#services`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--accent)', color: 'var(--accent-ink)',
            padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500,
          }}
        >
          {isRu ? 'Записаться на разбор' : 'Book a session'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 19L19 5M9 5h10v10" />
          </svg>
        </Link>
      </div>

    </div>
  )
}

/* ── Level card sub-component ── */
function LevelCard({
  lvl, isRu, isLeft,
}: {
  lvl: typeof LEVELS[number]
  isRu: boolean
  isLeft: boolean
}) {
  const skills = isRu ? lvl.skillsRu : lvl.skillsEn
  return (
    <div style={{ padding: 32, border: '1px solid var(--line)', borderRadius: 20, background: 'var(--bg-elev)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', marginBottom: 20 }}>
        {lvl.num} · {isRu ? lvl.years : lvl.yearsEn}
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 64, margin: '0 0 6px', letterSpacing: '-.03em', fontWeight: 400, lineHeight: .9 }}>
        {isRu ? lvl.titleRu : lvl.titleEn}
      </h2>
      <p style={{ color: 'var(--fg-soft)', fontSize: 15, lineHeight: 1.55, margin: '0 0 20px' }}>
        {isRu ? lvl.descRu : lvl.descEn}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--fg-soft)' }}>
        {skills.map((skill) => (
          <li key={skill} style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
            {isLeft ? (
              <>{skill}<span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>←</span></>
            ) : (
              <><span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>→</span>{skill}</>
            )}
          </li>
        ))}
      </ul>
      <div style={{
        display: 'flex', justifyContent: isLeft ? 'row-reverse' : 'space-between',
        flexDirection: isLeft ? 'row-reverse' : 'row',
        paddingTop: 16, borderTop: '1px solid var(--line)',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em',
      }}>
        <span>{isRu ? 'САЛАРИ ВИЛКА' : 'SALARY RANGE'}</span>
        <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>{lvl.salary} {lvl.salaryLabel}</strong>
      </div>
    </div>
  )
}
