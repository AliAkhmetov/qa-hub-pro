import Link from 'next/link'
import { getArticles } from '@/lib/notion'
import { BentoCard } from '@/components/home/BentoCard'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

const BENTO_CATS = [
  {
    id: 'theory',
    num: '01 / THEORY',
    titleRu: <>QA <i style={{ color: 'var(--muted)' }}>теория</i></>,
    titleEn: <>QA <i style={{ color: 'var(--muted)' }}>theory</i></>,
    descRu: 'Классификация тестов, тест-дизайн, чек-листы и тест-кейсы, техники граничных значений и эквивалентности. Фундамент, на котором стоит всё остальное.',
    descEn: 'Test classification, test design, checklists & test cases, boundary values, equivalence classes. The foundation everything else stands on.',
    count: '42',
    countLabelRu: 'статьи',
    countLabelEn: 'articles',
    cls: 'c-theory',
    bigTitle: true,
  },
  {
    id: 'api',
    num: '02 / API',
    titleRu: <>API <i style={{ color: 'var(--muted)' }}>testing</i></>,
    titleEn: <>API <i style={{ color: 'var(--muted)' }}>testing</i></>,
    descRu: 'REST, GraphQL, контрактное тестирование, Postman, схемы OpenAPI.',
    descEn: 'REST, GraphQL, contract testing, Postman, OpenAPI schemas.',
    count: '31',
    countLabelRu: 'статья',
    countLabelEn: 'articles',
    cls: 'c-api',
    bigTitle: false,
  },
  {
    id: 'mobile',
    num: '03 / MOBILE',
    titleRu: <>Mobile</>,
    titleEn: <>Mobile</>,
    descRu: 'iOS, Android, Appium, чек-листы для мобильных приложений.',
    descEn: 'iOS, Android, Appium, mobile testing checklists.',
    count: '22',
    countLabelRu: '',
    countLabelEn: '',
    cls: 'c-mobile',
    bigTitle: false,
  },
  {
    id: 'perf',
    num: '04 / PERF',
    titleRu: <>Performance</>,
    titleEn: <>Performance</>,
    descRu: 'JMeter, k6, Gatling. Нагрузочные профили и анализ узких мест.',
    descEn: 'JMeter, k6, Gatling. Load profiles and bottleneck analysis.',
    count: '18',
    countLabelRu: '',
    countLabelEn: '',
    cls: 'c-perf',
    bigTitle: false,
  },
  {
    id: 'auto',
    num: '05 / AUTO',
    titleRu: <>Automation</>,
    titleEn: <>Automation</>,
    descRu: 'Playwright, Selenium, архитектура фреймворков, CI/CD и отчёты.',
    descEn: 'Playwright, Selenium, framework architecture, CI/CD and reports.',
    count: '29',
    countLabelRu: '',
    countLabelEn: '',
    cls: 'c-auto',
    bigTitle: false,
  },
]

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  // Fetch latest articles from Notion (up to 6, then slice to 3)
  let latestArticles: Array<{ id: string; title: string; slug: string; category: string; readTime: number; updatedAt: string }> = []
  try {
    const all = await getArticles(locale as 'ru' | 'en')
    latestArticles = all.slice(0, 3)
  } catch {
    // graceful degradation — show placeholder cards
  }

  const today = new Date()
  const dayNames = isRu
    ? ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const monthNames = isRu
    ? ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
    : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const dayLabel = `${dayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 32px' }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 56, position: 'relative', overflow: 'hidden' }}>

        {/* Kicker bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          paddingBottom: 28, borderBottom: '1px solid var(--line)', marginBottom: 48,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em' }}>
            ALMATY · {dayLabel}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em' }}>
            {isRu ? 'БАЗА ЗНАНИЙ ДЛЯ QA' : 'KNOWLEDGE BASE FOR QA'}
          </span>
        </div>

        {/* Hero grid: display heading + author card */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'end' }}>
          {/* Kinetic heading */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(72px, 11vw, 176px)',
            lineHeight: .88,
            letterSpacing: '-.035em',
            margin: 0,
          }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'inline-block', animation: 'riseIn .9s cubic-bezier(.2,.7,.2,1) both' }}>
                {isRu ? 'Ремесло' : 'The craft'}
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'inline-block', animation: 'riseIn .9s .08s cubic-bezier(.2,.7,.2,1) both' }}>
                {isRu ? 'тестирования' : 'of software'}
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'inline-block', animation: 'riseIn .9s .16s cubic-bezier(.2,.7,.2,1) both' }}>
                <i style={{ fontStyle: 'italic', color: 'var(--muted)' }}>
                  {isRu ? 'без\u00A0шума.' : 'without\u00A0noise.'}
                </i>
              </span>
            </span>
          </h1>

          {/* Author card */}
          <aside style={{
            padding: '22px 24px', border: '1px solid var(--line)', borderRadius: 18,
            background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Avatar */}
              <div style={{
                width: 56, height: 56, borderRadius: '999px', flexShrink: 0,
                background: 'radial-gradient(circle at 30% 30%, #d8bb84, transparent 55%), radial-gradient(circle at 70% 70%, #7a6a4a, transparent 60%), #3a3226',
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-serif)', fontSize: 22, fontStyle: 'italic', color: '#0b0b0c',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)',
              }}>
                AA
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, lineHeight: 1 }}>Ali Akhmetov</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', marginTop: 4 }}>
                  QA TEAM LEAD · ALATAU CITY BANK
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--fg-soft)', margin: 0 }}>
              {isRu
                ? 'Я веду эту базу знаний для русскоязычных QA-инженеров — собираю то, что сам учил десять лет, чтобы вам не пришлось заново.'
                : "I curate this base for Russian-speaking QA engineers — collecting what I've learned over a decade, so you don't have to relearn it."}
            </p>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
              paddingTop: 12, borderTop: '1px solid var(--line)',
            }}>
              <span>ALMATY, KZ</span>
              <span>10Y EXP.</span>
              <span>@aliakhmetov</span>
            </div>
          </aside>
        </div>

        {/* Sub-hero: lede + stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 32,
          marginTop: 80, paddingTop: 32, borderTop: '1px solid var(--line)',
        }}>
          <p style={{
            gridColumn: '1 / 3', fontSize: 20, lineHeight: 1.5,
            color: 'var(--fg-soft)', margin: 0,
          }}>
            {isRu ? (
              <>База знаний для QA-инженеров уровня <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Junior, Middle и Senior</strong>. Статьи, roadmap, инструменты и живая практика — без воды, без продающих курсов.</>
            ) : (
              <>A knowledge base for <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Junior, Middle and Senior</strong> QA engineers. Articles, a roadmap, tools and hands-on practice — no fluff, no courses.</>
            )}
          </p>
          {[
            { n: '142', l: isRu ? 'Статьи' : 'Articles' },
            { n: '38', l: isRu ? 'Недели работы' : 'Weeks live' },
            { n: '5.2k', l: isRu ? 'Читателей / мес' : 'Readers / month' },
          ].map(({ n, l }) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 54, lineHeight: 1, letterSpacing: '-.02em' }}>{n}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em', textTransform: 'uppercase' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* ── BENTO GRID ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '120px 0 28px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, letterSpacing: '-.02em', lineHeight: 1, fontWeight: 400 }}>
            {isRu ? <>Разделы <i style={{ color: 'var(--muted)' }}>базы</i></> : <>The <i style={{ color: 'var(--muted)' }}>sections</i></>}
          </h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em' }}>
            05 CATEGORIES · 142 ARTICLES
          </span>
        </div>

        <div className="bento">
          {BENTO_CATS.map((cat) => (
            <BentoCard key={cat.id} href={`/${locale}/articles?cat=${cat.id}`} className={cat.cls}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em' }}>{cat.num}</div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 400,
                  fontSize: cat.bigTitle ? 88 : 40,
                  marginTop: cat.bigTitle ? 24 : 0,
                  lineHeight: 1, letterSpacing: '-.02em', margin: '10px 0 0',
                }}>
                  {isRu ? cat.titleRu : cat.titleEn}
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--fg-soft)', margin: '6px 0 0', maxWidth: '32ch' }}>
                  {isRu ? cat.descRu : cat.descEn}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
                <span>
                  {cat.count}
                  {(isRu ? cat.countLabelRu : cat.countLabelEn) && (
                    <> {isRu ? cat.countLabelRu : cat.countLabelEn}</>
                  )}
                </span>
                <span className="cat-arrow">↗</span>
              </div>
            </BentoCard>
          ))}

          {/* Featured: Roadmap */}
          <BentoCard href={`/${locale}/roadmap`} className="c-featured">
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(11,11,12,.7)', letterSpacing: '.15em' }}>FEATURED</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 40, lineHeight: 1, letterSpacing: '-.02em', margin: '10px 0 0' }}>
                {isRu ? <>Карьерный<br /><i style={{ color: 'rgba(11,11,12,.55)' }}>roadmap</i></> : <>Career<br /><i style={{ color: 'rgba(11,11,12,.55)' }}>roadmap</i></>}
              </h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'rgba(11,11,12,.7)', margin: '6px 0 0', maxWidth: '32ch' }}>
                {isRu
                  ? 'Путь Junior → Middle → Senior → Lead. Навыки, собеседования, зарплаты, грейды.'
                  : 'Junior → Middle → Senior → Lead path. Skills, interviews, salaries, grades.'}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(11,11,12,.7)' }}>
              <span>{isRu ? 'ОТКРЫТЬ ROADMAP' : 'OPEN THE ROADMAP'}</span>
              <span>↗</span>
            </div>
          </BentoCard>

          {/* Mini stats */}
          <div className="mini-stats">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em' }}>
              {isRu ? 'ВРЕМЯ НА ЧТЕНИЕ' : 'READING TIME'}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 64, lineHeight: .9, letterSpacing: '-.02em' }}>
              ~ 6 <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--muted)', letterSpacing: '.15em', verticalAlign: 'middle' }}>
                {isRu ? 'МИН' : 'MIN'}
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em' }}>
              {isRu ? 'СРЕДНЯЯ СТАТЬЯ' : 'AVG ARTICLE'}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bento-cat c-newsletter" style={{ justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em' }}>NEWSLETTER</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 40, lineHeight: 1, letterSpacing: '-.02em', margin: '10px 0 0' }}>
                {isRu ? <>Письмо <i style={{ color: 'var(--muted)' }}>по&nbsp;пятницам</i></> : <>A letter on <i style={{ color: 'var(--muted)' }}>Fridays</i></>}
              </h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--fg-soft)', margin: '6px 0 0' }}>
                {isRu
                  ? 'Одно письмо в неделю: 3 статьи, 1 инструмент, 1 мысль. Никакого спама.'
                  : 'One email a week: 3 articles, 1 tool, 1 thought. No spam.'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 16 }}>
              <input
                type="email"
                placeholder="you@work.com"
                style={{
                  flex: 1, background: 'transparent', border: '1px solid var(--line-strong)',
                  borderRadius: 999, padding: '10px 16px', color: 'var(--fg)',
                  fontFamily: 'inherit', fontSize: 13, outline: 'none',
                }}
              />
              <button
                type="button"
                style={{
                  padding: '10px 18px', borderRadius: 999, background: 'var(--fg)',
                  color: 'var(--bg)', fontWeight: 500, fontSize: 13, cursor: 'pointer',
                  border: 0, whiteSpace: 'nowrap',
                }}
              >
                {isRu ? 'Подписаться' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        {/* ── MARQUEE STRIP ── */}
        <div style={{ margin: '120px 0 0', padding: '28px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="marquee">
            <div className="marquee-track" style={{ fontFamily: 'var(--font-serif)', fontSize: 48, letterSpacing: '-.02em', lineHeight: 1 }}>
              {[...Array(2)].map((_, i) => (
                <span key={i} style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
                  <span><i>Test</i> <b style={{ fontWeight: 400, color: 'var(--accent)', fontStyle: 'italic' }}>like a craftsman.</b></span>
                  <span style={{ color: 'var(--muted)' }}>— тестируйте как ремесленник —</span>
                  <span><i>Automate</i> <b style={{ fontWeight: 400, color: 'var(--accent)', fontStyle: 'italic' }}>what hurts twice.</b></span>
                  <span style={{ color: 'var(--muted)' }}>— автоматизируйте то, что болит дважды —</span>
                  <span><i>Write</i> <b style={{ fontWeight: 400, color: 'var(--accent)', fontStyle: 'italic' }}>fewer, better cases.</b></span>
                  <span style={{ color: 'var(--muted)' }}>— пишите меньше, но лучше —</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── LATEST ARTICLES ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '140px 0 32px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, letterSpacing: '-.02em', lineHeight: 1, fontWeight: 400 }}>
            {isRu ? <>Свежие <i style={{ color: 'var(--muted)' }}>материалы</i></> : <>Recent <i style={{ color: 'var(--muted)' }}>writing</i></>}
          </h2>
          <Link href={`/${locale}/articles`} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--muted)' }}>
            {isRu ? 'ВСЯ БАЗА →' : 'FULL ARCHIVE →'}
          </Link>
        </div>

        <div className="latest-grid">
          {latestArticles.length > 0 ? latestArticles.map((art, idx) => (
            <Link
              key={art.id}
              href={`/${locale}/articles/${art.slug}`}
              className={idx === 0 ? 'art-feature' : ''}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, color: 'inherit' }}
            >
              <div className="art-ph">
                <span className="art-ph-label">FIGURE {String(idx + 1).padStart(2, '0')}{idx === 0 ? ' · FEATURED ARTICLE' : ''}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.15em', textTransform: 'uppercase' }}>
                {art.category}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: idx === 0 ? 48 : 30, lineHeight: 1.05, letterSpacing: '-.02em', margin: 0 }}>
                {art.title}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', display: 'flex', gap: 14, alignItems: 'center' }}>
                {art.readTime > 0 && <span>{art.readTime} {isRu ? 'мин чтения' : 'min read'}</span>}
                {art.readTime > 0 && art.updatedAt && <span>·</span>}
                {art.updatedAt && <span>{art.updatedAt.slice(0, 10)}</span>}
              </div>
            </Link>
          )) : (
            // Placeholder cards when no articles
            [
              { fig: '01', label: isRu ? 'FEATURED ARTICLE' : 'FEATURED ARTICLE', cat: isRu ? 'QA Теория' : 'QA Theory', title: isRu ? 'Тест-дизайн: от чек-листа к техникам сеньоров' : 'Test design: from checklist to senior techniques', min: '12', date: '14 апр 2026', big: true },
              { fig: '02', label: '', cat: 'API', title: isRu ? 'Контрактное тестирование: минимум для бэка' : 'Contract testing: the bare minimum', min: '8', date: '10 апр', big: false },
              { fig: '03', label: '', cat: 'Automation', title: isRu ? 'Playwright: уход от Selenium за две недели' : 'Playwright: moving off Selenium in two weeks', min: '14', date: '07 апр', big: false },
            ].map((item, idx) => (
              <div key={idx} className={item.big ? 'art-feature' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="art-ph">
                  <span className="art-ph-label">FIGURE {item.fig}{item.label ? ` · ${item.label}` : ''}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.15em', textTransform: 'uppercase' }}>{item.cat}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: item.big ? 48 : 30, lineHeight: 1.05, letterSpacing: '-.02em', margin: 0 }}>{item.title}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span>{item.min} {isRu ? 'мин' : 'min'}</span><span>·</span><span>{item.date}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── PRINCIPLES ── */}
        <div className="principles-grid" style={{ marginTop: 120 }}>
          {[
            {
              n: '01 / PRINCIPLE',
              titleRu: 'Боль → процесс → автоматизация',
              titleEn: 'Pain → process → automation',
              descRu: 'Автоматизация без устоявшегося процесса только ускоряет хаос. Сначала стабильный ручной прогон — потом код.',
              descEn: 'Automating without a stable process only speeds up chaos. Stabilise the manual run first, automate second.',
            },
            {
              n: '02 / PRINCIPLE',
              titleRu: 'Меньше кейсов, больше покрытия',
              titleEn: 'Fewer cases, more coverage',
              descRu: 'Один хороший кейс на граничных значениях стоит десяти «проверим всё подряд». Думайте, а не перечисляйте.',
              descEn: "One good boundary-value case is worth ten «let's-check-everything» ones. Think; don't enumerate.",
            },
            {
              n: '03 / PRINCIPLE',
              titleRu: 'Баги живут между командами',
              titleEn: 'Bugs live between teams',
              descRu: 'Самые дорогие дефекты — на стыках. QA Lead отвечает не за галочки, а за разговоры между бэкендом, мобилкой и продуктом.',
              descEn: 'The most expensive defects live at seams. A QA Lead owns the conversation between backend, mobile and product — not the checkmarks.',
            },
          ].map((p) => (
            <div key={p.n} className="principle-item">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', marginBottom: 18 }}>{p.n}</div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, margin: '0 0 10px', letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1.05 }}>
                {isRu ? p.titleRu : p.titleEn}
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-soft)', margin: 0 }}>
                {isRu ? p.descRu : p.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* ── TOOLS TEASER ── */}
        <section className="tools-teaser" style={{ marginTop: 120, marginBottom: 0 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', textTransform: 'uppercase' as const }}>
              <span style={{ width: 24, height: 1, background: 'var(--muted)', display: 'inline-block' }} />
              {isRu ? 'QA ИНСТРУМЕНТЫ' : 'QA TOOLBOX'}
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, margin: '16px 0 0', letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1 }}>
              {isRu ? <>Мини-утилиты <i style={{ color: 'var(--muted)' }}>для&nbsp;будней.</i></> : <>Small utilities <i style={{ color: 'var(--muted)' }}>for&nbsp;daily&nbsp;work.</i></>}
            </h2>
            <p style={{ color: 'var(--fg-soft)', maxWidth: '46ch', fontSize: 15, lineHeight: 1.55, marginTop: 16 }}>
              {isRu
                ? 'Пять инструментов, которые я сам открываю каждый день. Работают прямо в браузере, без трекеров и регистрации.'
                : 'Five tools I open every day myself. Run in the browser — no tracking, no signup.'}
            </p>
            <Link
              href={`/${locale}/tools`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--accent)', color: 'var(--accent-ink)',
                padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                marginTop: 24, transition: '.2s',
              }}
            >
              {isRu ? 'Открыть все' : 'Open all tools'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 19L19 5M9 5h10v10"/>
              </svg>
            </Link>
          </div>
          <div className="tools-list">
            {[
              { id: 'jwt', label: 'JWT decoder' },
              { id: 'json', label: 'JSON formatter' },
              { id: 'regex', label: 'Regex tester' },
              { id: 'base64', label: 'Base64' },
              { id: 'uuid', label: 'UUID generator' },
            ].map((tool) => (
              <Link key={tool.id} href={`/${locale}/tools#${tool.id}`} className="tool-item">
                <span>{tool.label}</span>
                <span style={{ color: 'var(--muted)' }}>→</span>
              </Link>
            ))}
            <div className="tool-item" style={{ cursor: 'default' }}>
              <span style={{ color: 'var(--muted)' }}>{isRu ? 'больше скоро' : 'more soon'}</span>
              <span style={{ color: 'var(--muted)' }}>+</span>
            </div>
          </div>
        </section>

      </section>
    </div>
  )
}
