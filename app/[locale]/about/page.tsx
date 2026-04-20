interface AboutPageProps {
  params: Promise<{ locale: string }>
}

const SKILLS = [
  { label: 'Playwright · Pytest', level: 5 },
  { label: 'API · Postman · Charles Proxy', level: 5 },
  { label: 'Управление командой QA · найм · онбординг', level: 5 },
  { label: 'JIRA · Confluence · Zephyr Scale', level: 5 },
  { label: 'CI/CD · Docker · Allure · Git · Bash', level: 4 },
  { label: 'Mobile · iOS · Android · Firebase', level: 4 },
  { label: 'SQL · MySQL · PostgreSQL', level: 4 },
  { label: 'Go · JavaScript · TypeScript', level: 3 },
]

const SKILLS_EN = [
  { label: 'Playwright · Pytest', level: 5 },
  { label: 'API · Postman · Charles Proxy', level: 5 },
  { label: 'QA team management · hiring · onboarding', level: 5 },
  { label: 'JIRA · Confluence · Zephyr Scale', level: 5 },
  { label: 'CI/CD · Docker · Allure · Git · Bash', level: 4 },
  { label: 'Mobile · iOS · Android · Firebase', level: 4 },
  { label: 'SQL · MySQL · PostgreSQL', level: 4 },
  { label: 'Go · JavaScript · TypeScript', level: 3 },
]

const EXPERIENCE = [
  {
    period: '2024 — NOW',
    role: 'Team Lead QA',
    company: 'JUSAN BANK · ALMATY',
    descRu: '22 инженера в команде, нанял и провёл онбординг 8 новых. Внедрил Zephyr Scale, настроил метрики и дашборды дефектов. Сократил продакшн-баги на 25% и хотфиксы на 40%. Запустил автоматизацию API-тестов на Pytest с CI/CD и отчётностью в Allure.',
    descEn: 'Led a QA team of 22 engineers; hired and onboarded 8 new members. Rolled out Zephyr Scale as TMS, set up defect metrics and dashboards. Reduced production bugs by 25% and hotfixes by 40%. Launched API test automation with Pytest, CI/CD and Allure reporting.',
  },
  {
    period: '2022 — 2024',
    role: 'Tech Lead QA',
    company: 'JUSAN BANK · ALMATY',
    descRu: 'Разработал регламенты и понятные инструкции для отдела QA по Postman, Charles, Grafana, Xcode, TestRail и другим инструментам. Проектировал и выполнял скрипты автоматизации с использованием TestRail, Playwright и Newman.',
    descEn: 'Authored QA department guidelines and clear how-tos for Postman, Charles, Grafana, Xcode, TestRail and more. Designed and executed automation scripts using TestRail, Playwright and Newman.',
  },
  {
    period: '2021 — 2022',
    role: 'QA Automation Engineer',
    company: 'STAROFSERVICE · PARIS',
    descRu: 'Написал автотесты на Detox для мобильного приложения — покрытие выросло с 0 до 90%. Покрыл веб-версию тестами на Robot Framework и Cypress, API — коллекциями Postman.',
    descEn: 'Wrote Detox autotests for the mobile app, growing coverage from 0 to 90%. Covered the web version with Robot Framework and Cypress tests, and API with Postman collections.',
  },
  {
    period: '2018 — 2020',
    role: 'Head of Technical Support',
    company: 'AMOCRM · MOSCOW',
    descRu: 'Сократил число багов в бэклоге с 1800 до 150. Писал регламенты, инструкции и документацию для пользователей. Нанимал менеджеров техподдержки и разработчиков, интегрировал их в команду разработки.',
    descEn: 'Reduced the backlog bug count from 1800 to 150. Wrote regulations, user documentation and onboarding materials. Hired support managers and developers, integrated them with the dev team.',
  },
]

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'
  const skills = isRu ? SKILLS : SKILLS_EN

  return (
    <div className="page-wrap">

      {/* ── HEADER ── */}
      <section className="about-header-grid">
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
            letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 20,
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--muted)', display: 'inline-block' }} />
            ALI AKHMETOV · ALMATY
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.05, letterSpacing: '-.03em', margin: '0 0 20px', fontWeight: 400,
          }}>
            {isRu ? 'Team Lead QA. Пишу о ремесле.' : 'Team Lead QA. Writing about craft.'}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-soft)', margin: 0, maxWidth: '48ch' }}>
            {isRu
              ? 'Веду команду из 22 инженеров в Jusan Bank. QA Hub — личный проект: одно место, где можно учиться тестированию без курсов и рекламы.'
              : 'Leading a team of 22 engineers at Jusan Bank. QA Hub is my personal project — one place to learn QA without courses or ads.'}
          </p>
        </div>
      </section>

      {/* ── BIO ── */}
      <section className="about-sidebar-row" style={{ paddingTop: 80 }}>
        <span className="about-sidebar-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', paddingTop: 8 }}>BIO</span>
        <div style={{ fontSize: 20, lineHeight: 1.55, color: 'var(--fg-soft)' }}>
          {isRu ? (
            <>
              <p style={{ margin: '0 0 18px' }}>
                Меня зовут <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Али Ахметов</strong>. Я работаю Team Lead QA в <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Jusan Bank</strong> (Алматы) — веду команду из 22 инженеров, отвечаю за кредитный продукт JBCredits. 7+ лет в тестировании: от Head of Technical Support в amoCRM до QA Automation Engineer в StarOfService (Париж) и двух ролей в Jusan Bank.
              </p>
              <p style={{ margin: '0 0 18px' }}>
                QA Hub — мой личный проект. Я начал его, потому что устал отсылать джунов к случайным статьям и понял: <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>нормальной русскоязычной базы по тестированию нет</strong>. Есть курсы за деньги, есть обрывки в телеграме, но нет одного места, где можно сесть, почитать, и через полгода уметь что-то новое.
              </p>
              <p style={{ margin: 0 }}>
                Здесь нет рекламы, нет продающих лендингов, нет «войди в айти за три месяца». Просто статьи, практика и инструменты.
              </p>
            </>
          ) : (
            <>
              <p style={{ margin: '0 0 18px' }}>
                My name is <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Ali Akhmetov</strong>. I work as Team Lead QA at <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>Jusan Bank</strong> in Almaty — leading a team of 22 engineers on the JBCredits product. 7+ years in QA: from Head of Technical Support at amoCRM to QA Automation Engineer at StarOfService (Paris) and two roles at Jusan Bank.
              </p>
              <p style={{ margin: '0 0 18px' }}>
                QA Hub is my personal project. I started it because I was tired of pointing juniors to random articles and realised: <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>there is no decent Russian-language QA knowledge base</strong>. There are paid courses, there are Telegram fragments, but no single place to sit, read, and actually learn something over six months.
              </p>
              <p style={{ margin: 0 }}>
                No ads, no sales pages, no &quot;become a tester in three months.&quot; Just articles, practice, and tools.
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── FACTS ── */}
      <div className="facts-grid">
        {[
          { n: '7', suffix: '+', l: isRu ? 'лет в QA' : 'years in QA' },
          { n: '22', suffix: '', l: isRu ? 'инженера в команде' : 'engineers led' },
          { n: '−25', suffix: '%', l: isRu ? 'продакшн-багов' : 'production bugs' },
          { n: '90', suffix: '%', l: isRu ? 'покрытие моб. приложения' : 'mobile app coverage' },
        ].map(({ n, suffix, l }) => (
          <div key={l}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 80, lineHeight: .9, letterSpacing: '-.02em' }}>
              {n}
              {suffix && (
                <em style={{ fontSize: 24, color: 'var(--muted)', fontFamily: 'var(--font-sans)', letterSpacing: '.05em', marginLeft: 2, fontStyle: 'normal' }}>
                  {suffix}
                </em>
              )}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em', marginTop: 10, textTransform: 'uppercase' }}>
              {l}
            </div>
          </div>
        ))}
      </div>

      {/* ── SKILLS ── */}
      <section className="about-sidebar-row" style={{ marginTop: 120, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
        <span className="about-sidebar-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', paddingTop: 8 }}>
          STACK &amp; SKILLS
        </span>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, margin: '0 0 28px', letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1 }}>
            {isRu
              ? <>Чем <i style={{ color: 'var(--muted)' }}>пользуюсь</i> каждый день</>
              : <>What I use <i style={{ color: 'var(--muted)' }}>every day</i></>}
          </h2>
          <div className="skills-inner-grid">
            {skills.map(({ label, level }) => (
              <div key={label} style={{ padding: '18px 22px', border: '1px solid var(--line)', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 14, lineHeight: 1.35 }}>{label}</span>
                <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ width: 18, height: 4, borderRadius: 999, display: 'block', background: i <= level ? 'var(--accent)' : 'var(--line-strong)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBSERVABILITY & ANALYTICS ── */}
      <section className="about-sidebar-row" style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
        <span className="about-sidebar-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', paddingTop: 8 }}>
          OBSERVABILITY
        </span>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, margin: '0 0 28px', letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1 }}>
            {isRu
              ? <>Мониторинг <i style={{ color: 'var(--muted)' }}>и аналитика</i></>
              : <>Monitoring <i style={{ color: 'var(--muted)' }}>&amp; analytics</i></>}
          </h2>
          <div className="skills-inner-grid">
            {[
              { label: isRu ? 'Grafana · дашборды дефектов и метрик QA' : 'Grafana · defect & QA metrics dashboards', level: 5 },
              { label: isRu ? 'Firebase · Crashlytics · аналитика мобильных' : 'Firebase · Crashlytics · mobile analytics', level: 4 },
              { label: isRu ? 'Amplitude · продуктовая аналитика событий' : 'Amplitude · product event analytics', level: 4 },
              { label: isRu ? 'Pandas · анализ данных тестирования' : 'Pandas · test data analysis', level: 3 },
              { label: isRu ? 'Allure · отчётность по авто-тестам' : 'Allure · automation test reporting', level: 5 },
              { label: isRu ? 'Kibana · ELK · анализ логов' : 'Kibana · ELK · log analysis', level: 3 },
            ].map(({ label, level }) => (
              <div key={label} style={{ padding: '18px 22px', border: '1px solid var(--line)', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 14, lineHeight: 1.35 }}>{label}</span>
                <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ width: 18, height: 4, borderRadius: 999, display: 'block', background: i <= level ? 'var(--accent)' : 'var(--line-strong)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="about-sidebar-row" style={{ marginTop: 120, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
        <span className="about-sidebar-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.2em', paddingTop: 8 }}>
          EXPERIENCE
        </span>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, margin: '0 0 28px', letterSpacing: '-.02em', fontWeight: 400, lineHeight: 1 }}>
            {isRu
              ? <>Где <i style={{ color: 'var(--muted)' }}>работал</i></>
              : <>Where I <i style={{ color: 'var(--muted)' }}>worked</i></>}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {EXPERIENCE.map((exp, i) => (
              <div
                key={exp.period}
                className="exp-row"
                style={{ borderBottom: i < EXPERIENCE.length - 1 ? '1px solid var(--line)' : 'none' }}
              >
                <span className="exp-row-period" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.15em', paddingTop: 6 }}>
                  {exp.period}
                </span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '0 0 6px', letterSpacing: '-.01em', fontWeight: 400 }}>
                    {exp.role}
                  </h4>
                  <p style={{ margin: 0, color: 'var(--fg-soft)', fontSize: 14, lineHeight: 1.6 }}>
                    {isRu ? exp.descRu : exp.descEn}
                  </p>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', paddingTop: 6, lineHeight: 1.6 }}>
                  {exp.company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact-grid">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 80, margin: 0, letterSpacing: '-.03em', fontWeight: 400, lineHeight: .9 }}>
          {isRu
            ? <>Написать<br /><i style={{ color: 'var(--muted)' }}>лично.</i></>
            : <>Get in<br /><i style={{ color: 'var(--muted)' }}>touch.</i></>}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Telegram', meta: '@TACOUSTI →', href: 'https://t.me/tacousti' },
            { label: 'Email', meta: 'ALI.AKHMETOV.AMO@GMAIL.COM →', href: 'mailto:ali.akhmetov.amo@gmail.com' },
            { label: 'LinkedIn', meta: '/IN/ALI-AKHMETOV →', href: 'https://linkedin.com/in/ali-akhmetov' },
            { label: 'GitHub', meta: '/ALIAKHMETOV →', href: 'https://github.com/AliAkhmetov' },
          ].map(({ label, meta, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 24px', border: '1px solid var(--line)', borderRadius: 14,
                fontSize: 16, transition: 'border-color .2s, background .2s',
                color: 'inherit', textDecoration: 'none',
              }}
            >
              <span>{label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em' }}>
                {meta}
              </span>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
