interface HomePageProps {
  params: Promise<{ locale: string }>
}

const CATEGORIES = [
  { key: 'Теория тестирования', en: 'Testing Theory', icon: '📚' },
  { key: 'API тестирование', en: 'API Testing', icon: '🔌' },
  { key: 'Автоматизация', en: 'Automation', icon: '🤖' },
  { key: 'SQL для QA', en: 'SQL for QA', icon: '🗄️' },
  { key: 'Fintech QA', en: 'Fintech QA', icon: '💳' },
  { key: 'Карьера в QA', en: 'QA Career', icon: '🚀' },
]

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const isRu = locale === 'ru'

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Greeting */}
      <h1 className="font-mono mb-2" style={{ color: 'var(--text-primary)' }}>
        {isRu
          ? 'Привет, я Ali. Это моя открытая база знаний по QA.'
          : "Hi, I'm Ali. This is my open QA knowledge base."}
      </h1>
      <p className="mb-10" style={{ color: 'var(--text-muted)' }}>
        {isRu
          ? 'QA Team Lead в Alatau City Bank. Здесь собираю всё, что помогает QA-инженерам расти.'
          : 'QA Team Lead at Alatau City Bank. Collecting everything that helps QA engineers grow.'}
      </p>

      {/* Category grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {CATEGORIES.map(({ key, en, icon }) => (
          <div
            key={key}
            className="p-4 rounded-lg cursor-pointer transition-colors"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {isRu ? key : en}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-8 mb-10">
        {[
          { value: '7', label: isRu ? 'лет опыта' : 'years experience' },
          { value: '5K+', label: isRu ? 'подписчиков' : 'subscribers' },
          { value: '24', label: isRu ? 'инженера в команде' : 'engineers on team' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-mono font-medium" style={{ color: 'var(--accent)' }}>{value}</div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href="https://t.me/tacousti"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.46 13.28l-2.974-.924c-.647-.204-.66-.647.136-.958l11.57-4.461c.537-.194 1.006.131.702.284z"/>
        </svg>
        {isRu ? 'Написать в Telegram для консультации' : 'Message on Telegram for a consultation'}
      </a>
    </div>
  )
}
