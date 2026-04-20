export interface ToolDef {
  id: string
  slug: string
  href: string
  title: string
  description: string
  category: string
}

export interface ToolCategory {
  title: string
  items: ToolDef[]
}

function tool(slug: string, title: string, description: string, category: string): ToolDef {
  return {
    id: slug,
    slug,
    href: `/ru/tools/${slug}`,
    title,
    description,
    category,
  }
}

export const TOOLS_CONFIG: ToolCategory[] = [
  {
    title: 'API & NETWORK',
    items: [
      tool('curl-converter', 'cURL → код', 'Парсер cURL из DevTools → готовый fetch / axios / Python requests.', 'API & NETWORK'),
      tool('url-parser', 'URL parser', 'Разбираем URL на части, редактируем query-параметры, собираем обратно.', 'API & NETWORK'),
      tool('jwt', 'JWT decoder', 'Декодирует JWT: header, payload и подпись. Проверка подписи — на бэке.', 'API & NETWORK'),
      tool('http-status', 'HTTP коды', 'Справочник по HTTP-кодам: 1xx–5xx с описанием и типовыми причинами.', 'API & NETWORK'),
    ],
  },
  {
    title: 'DATA GENERATORS',
    items: [
      tool('fake-data', 'Fake data', 'ФИО, email, телефон, адрес, документы. Пресеты KZ / USA / EU.', 'DATA GENERATORS'),
      tool('test-cards', 'Тестовые карты', 'Visa / MC / Amex / 3DS / declined — готовые тест-номера для платёжных сценариев.', 'DATA GENERATORS'),
      tool('uuid', 'UUID generator', 'UUID v4 через crypto.randomUUID(). Массовая генерация, копирование одним кликом.', 'DATA GENERATORS'),
    ],
  },
  {
    title: 'ENCODE & HASH',
    items: [
      tool('base64', 'Base64', 'Encode / decode в обе стороны. UTF-8 safe.', 'ENCODE & HASH'),
      tool('hash', 'Hash calculator', 'MD5 / SHA-1 / SHA-256 / SHA-512 + HMAC. Всё в браузере.', 'ENCODE & HASH'),
    ],
  },
  {
    title: 'TEXT & JSON',
    items: [
      tool('json', 'JSON formatter', 'Форматирование и минификация JSON с подсветкой ошибок.', 'TEXT & JSON'),
      tool('json-diff', 'Text / JSON diff', 'Два блока рядом, подсветка изменений. Хорошо для сравнения API-ответов.', 'TEXT & JSON'),
      tool('regex', 'Regex tester', 'JavaScript regex. Матчи подсвечиваются в реальном времени.', 'TEXT & JSON'),
    ],
  },
  {
    title: 'TIME',
    items: [
      tool('timestamp', 'Unix timestamp', 'Unix ↔ ISO ↔ human с учётом таймзон.', 'TIME'),
      tool('cron', 'Cron parser', 'Cron-выражение → человекочитаемое описание и следующие запуски.', 'TIME'),
    ],
  },
  {
    title: 'TESTING HELPERS',
    items: [
      tool('selector', 'CSS / XPath tester', 'HTML + селектор → matches. CSS, XPath, text= / role= для Playwright.', 'TESTING HELPERS'),
      tool('qr', 'QR generator', 'Текст или URL → QR-код. Для проверки deep-link и мобильных сценариев.', 'TESTING HELPERS'),
    ],
  },
]

export const ALL_TOOLS: ToolDef[] = TOOLS_CONFIG.flatMap((c) => c.items)

export function findToolBySlug(slug: string): ToolDef | null {
  return ALL_TOOLS.find((t) => t.slug === slug) ?? null
}

export const FIRST_TOOL = ALL_TOOLS[0]
