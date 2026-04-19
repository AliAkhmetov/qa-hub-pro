interface AboutPageProps {
  params: Promise<{ locale: string }>
}

const SKILLS = [
  { label: 'API testing · Postman, RestAssured', level: 5 },
  { label: 'Автоматизация · Playwright, Selenium', level: 4 },
  { label: 'Perf · JMeter, k6', level: 4 },
  { label: 'Mobile · Appium, iOS / Android', level: 3 },
  { label: 'CI/CD · GitLab, Jenkins, ArgoCD', level: 4 },
  { label: 'SQL / Kafka / Observability', level: 4 },
  { label: 'Ведение команды, найм, грейдинг', level: 5 },
  { label: 'Security basics · OWASP, JWT, OAuth', level: 3 },
]

const EXPERIENCE = [
  { period: '2022 — NOW', role: 'QA Team Lead', company: 'ALATAU CITY BANK', descRu: '14 инженеров, мобильный банк, интернет-банк, внутренняя платформа. Перенос регрессии с Selenium на Playwright, первые нагрузочные в k6.', descEn: '14 engineers, mobile bank, internet banking, internal platform. Migrated regression from Selenium to Playwright, first k6 load tests.' },
  { period: '2019 — 2022', role: 'Senior QA Engineer', company: 'BANK №2 · ALMATY', descRu: 'Отвечал за процессинг и карточные интеграции. Построил фреймворк автотестов для card-present операций.', descEn: 'Owned payment processing and card integrations. Built an automation framework for card-present operations.' },
  { period: '2017 — 2019', role: 'QA Engineer', company: 'BANK №3 · ALMATY', descRu: 'Интернет-банк для ЮЛ. Перешёл от ручного тестирования к автоматизации API и UI.', descEn: 'Corporate internet banking. Transitioned from manual testing to API and UI automation.' },
  { period: '2016 — 2017', role: 'Junior QA', company: 'FINTECH · REMOTE', descRu: 'Первая работа. Чек-листы, регрессия, bug-report-гигиена.', descEn: 'First job. Checklists, regression cycles, bug report hygiene.' },
]

const SERVICES = [
  {
    num: 'SESSION / 01',
    titleRu: <>Разбор <i style={{ color: 'var(--muted)' }}>резюме</i><br />и карьеры</>,
    titleEn: <>CV review<br />& <i style={{ color: 'var(--muted)' }}>career</i></>,
    price: '25 000',
    unit: '₸ / 45 МИН',
    itemsRu: ['Разбираю CV построчно', 'Подсвечиваю дыры в навыках', 'Даю план на 3 месяца', 'Запись разговора остаётся у вас'],
    itemsEn: ['Line-by-line CV review', 'Identify skill gaps', 'A 3-month growth plan', 'Recording is yours to keep'],
    featured: false,
  },
  {
    num: 'SESSION / 02 — MOST BOOKED',
    titleRu: <>Разбор <i>проекта</i> или процесса</>,
    titleEn: <>Process or project<br /><i>deep-dive</i></>,
    price: '45 000',
    unit: '₸ / 90 МИН',
    itemsRu: ['Смотрим ваш текущий процесс QA', 'Находим узкие места', 'План миграции на автоматизацию', 'Шаблоны документации и чек-листов'],
    itemsEn: ['Audit your current QA process', 'Find the bottlenecks', 'Automation migration plan', 'Documentation & checklist templates'],
    featured: true,
  },
  {
    num: 'SESSION / 03',
    titleRu: <>Наставничество<br />на <i style={{ color: 'var(--muted)' }}>месяц</i></>,
    titleEn: <>One-month<br /><i style={{ color: 'var(--muted)' }}>mentorship</i></>,
    price: '120 000',
    unit: '₸ / 4 НЕД',
    itemsRu: ['Еженедельные созвоны по 60 мин', 'Домашки с разбором', 'Чат в Telegram 24/7', 'Для тех, кто идёт на собес Middle/Senior'],
    itemsEn: ['Weekly 60-min calls', 'Homework with review', 'Telegram chat 24/7', 'Aimed at Middle/Senior interview prep'],
    featured: false,
  },
]

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 32px 160px' }}>

      {/* ── HEADER ── */}
      <section style={{ paddingTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'end' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 24, height: 1, background: 'var(--muted)', display: 'inline-block' }} />
            ALI AKHMETOV · ALMATY
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(64px, 10vw, 140px)', lineHeight: .88, letterSpacing: '-.03em', margin: 0, fontWeight: 400 }}>
            {isRu ? (
              <>Веду <i style={{ color: 'var(--muted)' }}>QA-команду</i><br />в банке.<br />Пишу <i style={{ color: 'var(--muted)' }}>о&nbsp;ремесле.</i></>
            ) : (
              <>Lead a <i style={{ color: 'var(--muted)' }}>QA team</i><br />at a bank.<br />Write <i style={{ color: 'var(--muted)' }}>about&nbsp;craft.</i></>
            )}
          </h1>
        </div>

        {/* Portrait placeholder */}
        <div style={{
          aspectRatio: '4/5', borderRadius: 20, position: 'relative', overflow: 'hidden',
          background: 'radial-gradient(circle at 30% 25%, #d8bb84 0%, #a88545 35%, transparent 60%), radial-gradient(circle at 75% 75%, #2a241c 0%, #0b0b0c 60%)',
          boxShadow: 'inset 0 0 0 1px var(--line)',
        }}>
          <span style={{ position: 'absolute', left: 20, top: 20, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(245,243,238,.6)', letterSpacing: '.25em' }}>ALI AKHMETOV · 2026</span>
          <span style={{ position: 'absolute', left: 20, bottom: 18, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(245,243,238,.45)', letterSpacing: '.2em' }}>PORTRAIT · PLACEHOLDER</span>
        </div>
      </section>

      {/* ── BIO ── */}
      <section style={{ paddingTop: 80, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', paddingTop: 8 }}>BIO · RU EN</span>
        <div style={{ fontSize: 20, lineHeight: 1.55, color: 'var(--fg-soft)' }}>
          {isRu ? (
            <>
              <p style={{ margin: '0 0 18px' }}>
                Меня зовут <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Ali Akhmetov</strong>. Я работаю QA Team Lead в <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Alatau City Bank</strong> (Алматы) — веду команду из 14 инженеров, отвечаю за мобильный банк, интернет-банк и внутреннюю платформу.
              </p>
              <p style={{ margin: '0 0 18px' }}>
                QA Hub — мой личный проект. Я начал его, потому что устал отсылать джунов к случайным статьям в интернете и понял: <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>нормальной русскоязычной базы по тестированию нет</strong>. Есть курсы за деньги, есть обрывки в телеграме, но нет одного места, где можно сесть, почитать, и через полгода уметь что-то новое.
              </p>
              <p style={{ margin: 0 }}>
                Здесь нет рекламы, нет продающих лендингов, нет «войди в айти за три месяца». Просто статьи, практика и инструменты.
              </p>
            </>
          ) : (
            <>
              <p style={{ margin: '0 0 18px' }}>
                My name is <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Ali Akhmetov</strong>. I work as QA Team Lead at <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Alatau City Bank</strong> in Almaty — leading a team of 14 engineers across mobile banking, internet banking, and an internal platform.
              </p>
              <p style={{ margin: '0 0 18px' }}>
                QA Hub is my personal project. I started it because I was tired of pointing juniors to random articles and realised: <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>there is no decent Russian-language QA knowledge base</strong>. There are paid courses, there are Telegram fragments, but no single place to sit, read, and actually learn something over six months.
              </p>
              <p style={{ margin: 0 }}>
                No ads, no sales pages, no "become a tester in three months." Just articles, practice, and tools.
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── FACTS ── */}
      <div style={{ marginTop: 96, paddingTop: 32, borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
        {[
          { n: '10', suffix: isRu ? 'лет' : 'yr', l: isRu ? 'в тестировании' : 'in testing' },
          { n: '14', suffix: '', l: isRu ? 'человек в команде' : 'engineers led' },
          { n: '4', suffix: '', l: isRu ? 'банка за карьеру' : 'banks in career' },
          { n: '142', suffix: '', l: isRu ? 'опубликованных статей' : 'published articles' },
        ].map(({ n, suffix, l }) => (
          <div key={l}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 80, lineHeight: .9, letterSpacing: '-.02em' }}>
              {n}
              {suffix && <em style={{ fontSize: 22, color: 'var(--muted)', fontFamily: 'var(--font-sans)', letterSpacing: '.1em', marginLeft: 4, fontStyle: 'normal' }}>{suffix}</em>}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em', marginTop: 10, textTransform: 'uppercase' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── SKILLS ── */}
      <section style={{ marginTop: 120, paddingTop: 40, borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', paddingTop: 8 }}>STACK &amp; SKILLS</span>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, margin: '0 0 28px', letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1 }}>
            {isRu ? <>Чем <i style={{ color: 'var(--muted)' }}>пользуюсь</i> каждый день</> : <>What I use <i style={{ color: 'var(--muted)' }}>every day</i></>}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {SKILLS.map(({ label, level }) => (
              <div key={label} style={{ padding: '18px 22px', border: '1px solid var(--line)', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 15 }}>{label}</span>
                <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ width: 20, height: 4, borderRadius: 999, display: 'block', background: i <= level ? 'var(--accent)' : 'var(--line-strong)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section style={{ marginTop: 120, paddingTop: 40, borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', paddingTop: 8 }}>EXPERIENCE</span>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, margin: '0 0 28px', letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1 }}>
            {isRu ? <>Где <i style={{ color: 'var(--muted)' }}>работал</i></> : <>Where I <i style={{ color: 'var(--muted)' }}>worked</i></>}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={exp.period} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 24, padding: '24px 0', borderBottom: i < EXPERIENCE.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em', paddingTop: 8 }}>{exp.period}</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, margin: '0 0 4px', letterSpacing: '-.01em', fontWeight: 400 }}>{exp.role}</h4>
                  <p style={{ margin: 0, color: 'var(--fg-soft)', fontSize: 14, lineHeight: 1.55 }}>{isRu ? exp.descRu : exp.descEn}</p>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', paddingTop: 8 }}>{exp.company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ marginTop: 160, padding: '56px 0 64px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'end', marginBottom: 48 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em' }}>SERVICES · DELICATELY</span>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 72, margin: 0, letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1 }}>
              {isRu ? <>Личные <i style={{ color: 'var(--muted)' }}>консультации</i></> : <>Personal <i style={{ color: 'var(--muted)' }}>consulting</i></>}
            </h2>
            <p style={{ color: 'var(--fg-soft)', fontSize: 17, lineHeight: 1.55, maxWidth: '60ch', margin: '20px 0 0' }}>
              {isRu
                ? 'Если хотите поговорить один на один — я провожу консультации в Telegram. Это единственная платная услуга на сайте. Не курс, не подписка: час разговора с QA Lead\'ом, который работает в банке и ведёт живых людей.'
                : 'If you want to talk one-on-one, I run consultations on Telegram. This is the only paid service on the site. Not a course, not a subscription: an hour with a QA Lead who works at a bank and manages real people.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {SERVICES.map((svc) => (
            <div
              key={svc.num}
              style={{
                padding: 32, border: svc.featured ? 'none' : '1px solid var(--line)',
                borderRadius: 20,
                background: svc.featured ? 'var(--accent)' : 'var(--bg-elev)',
                color: svc.featured ? 'var(--accent-ink)' : 'var(--fg)',
                display: 'flex', flexDirection: 'column', gap: 20, minHeight: 420,
                transition: '.25s',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em', color: svc.featured ? 'rgba(11,11,12,.55)' : 'var(--muted)' }}>
                {svc.num}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, margin: 0, letterSpacing: '-.02em', lineHeight: 1, fontWeight: 400 }}>
                {isRu ? svc.titleRu : svc.titleEn}
              </h3>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 56, lineHeight: .9, letterSpacing: '-.02em' }}>
                {svc.price}
                <em style={{ fontSize: 14, color: svc.featured ? 'rgba(11,11,12,.55)' : 'var(--muted)', fontStyle: 'normal', fontFamily: 'var(--font-mono)', letterSpacing: '.15em', marginLeft: 6, verticalAlign: 'middle' }}>
                  {svc.unit}
                </em>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: svc.featured ? 'rgba(11,11,12,.78)' : 'var(--fg-soft)' }}>
                {(isRu ? svc.itemsRu : svc.itemsEn).map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: svc.featured ? 'rgba(11,11,12,.6)' : 'var(--accent)', marginTop: 2, flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto' }}>
                <a
                  href="https://t.me/tacousti"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px', borderRadius: 999,
                    border: svc.featured ? 'none' : '1px solid currentColor',
                    fontSize: 13, opacity: .9, textDecoration: 'none', color: 'inherit',
                    background: svc.featured ? '#0b0b0c' : 'transparent',
                    ...(svc.featured ? { color: '#e6cfa7' } : {}),
                  }}
                >
                  {isRu ? 'Записаться в Telegram →' : 'Book on Telegram →'}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 32, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: '.1em', textAlign: 'center' }}>
          {isRu
            ? 'БЕЗ ПРЕДОПЛАТЫ · ОПЛАТА ПО ИТОГАМ ВСТРЕЧИ · МОЖНО БЕСПЛАТНО ПОЗНАКОМИТЬСЯ НА 15 МИНУТ'
            : 'NO DEPOSIT · PAY AFTER THE SESSION · FREE 15-MIN INTRO CALL AVAILABLE'}
        </p>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ marginTop: 160, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 80, margin: 0, letterSpacing: '-.03em', fontWeight: 400, lineHeight: .9 }}>
          {isRu ? <>Написать<br /><i style={{ color: 'var(--muted)' }}>лично.</i></> : <>Get in<br /><i style={{ color: 'var(--muted)' }}>touch.</i></>}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Telegram', meta: '@ALIAKHMETOV →', href: 'https://t.me/tacousti' },
            { label: 'Email', meta: 'ALI@QA-HUB.DEV →', href: 'mailto:ali@qa-hub.dev' },
            { label: 'LinkedIn', meta: '/IN/ALIAKHMETOV →', href: 'https://linkedin.com/in/aliakhmetov' },
          ].map(({ label, meta, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '20px 24px', border: '1px solid var(--line)', borderRadius: 14,
              fontSize: 16, transition: '.25s', color: 'inherit',
            }}>
              <span>{label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em' }}>{meta}</span>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
