'use client'

import { useState, useMemo } from 'react'

interface HttpStatusCodesProps {
  isRu?: boolean
}

interface StatusCode {
  code: number
  name: string
  nameRu: string
  desc: string
  descRu: string
  causes: string
  causesRu: string
  group: '1xx' | '2xx' | '3xx' | '4xx' | '5xx'
}

const CODES: StatusCode[] = [
  // 1xx
  { code: 100, group: '1xx', name: 'Continue', nameRu: 'Продолжить', desc: 'Server received headers, client should proceed.', descRu: 'Сервер получил заголовки, клиент может продолжать.', causes: 'Used in large file uploads.', causesRu: 'Применяется при загрузке больших файлов.' },
  { code: 101, group: '1xx', name: 'Switching Protocols', nameRu: 'Смена протокола', desc: 'Server switching protocols per request.', descRu: 'Сервер переключается на протокол из запроса.', causes: 'WebSocket handshake upgrade.', causesRu: 'WebSocket-рукопожатие.' },

  // 2xx
  { code: 200, group: '2xx', name: 'OK', nameRu: 'OK', desc: 'Standard successful response.', descRu: 'Стандартный успешный ответ.', causes: 'GET, PUT, PATCH, DELETE.', causesRu: 'GET, PUT, PATCH, DELETE.' },
  { code: 201, group: '2xx', name: 'Created', nameRu: 'Создано', desc: 'Resource successfully created.', descRu: 'Ресурс успешно создан.', causes: 'POST requests creating new resources.', causesRu: 'POST при создании нового ресурса.' },
  { code: 204, group: '2xx', name: 'No Content', nameRu: 'Нет содержимого', desc: 'Success, no response body.', descRu: 'Успешно, тело ответа отсутствует.', causes: 'DELETE, or PUT with no body needed.', causesRu: 'DELETE или PUT когда тело не нужно.' },
  { code: 206, group: '2xx', name: 'Partial Content', nameRu: 'Частичное содержимое', desc: 'Partial response for range requests.', descRu: 'Частичный ответ на Range-запрос.', causes: 'Video streaming, resumable downloads.', causesRu: 'Стриминг видео, возобновляемые загрузки.' },

  // 3xx
  { code: 301, group: '3xx', name: 'Moved Permanently', nameRu: 'Перемещён постоянно', desc: 'Resource permanently at new URL.', descRu: 'Ресурс навсегда переехал на новый URL.', causes: 'SEO-redirects, domain changes.', causesRu: 'SEO-редиректы, смена домена.' },
  { code: 302, group: '3xx', name: 'Found', nameRu: 'Найдено', desc: 'Temporary redirect.', descRu: 'Временный редирект.', causes: 'Auth flows, maintenance pages.', causesRu: 'Авторизация, страницы обслуживания.' },
  { code: 304, group: '3xx', name: 'Not Modified', nameRu: 'Не изменено', desc: 'Cached version is still valid.', descRu: 'Кэшированная версия актуальна.', causes: 'ETag / If-Modified-Since cache.', causesRu: 'ETag / If-Modified-Since кэширование.' },
  { code: 307, group: '3xx', name: 'Temporary Redirect', nameRu: 'Временный редирект', desc: 'Temporary redirect, method preserved.', descRu: 'Временный редирект, метод сохраняется.', causes: 'Same as 302 but method must not change.', causesRu: 'Как 302, но метод запроса не меняется.' },
  { code: 308, group: '3xx', name: 'Permanent Redirect', nameRu: 'Постоянный редирект', desc: 'Permanent redirect, method preserved.', descRu: 'Постоянный редирект, метод сохраняется.', causes: 'Like 301 but method must not change.', causesRu: 'Как 301, но метод не меняется.' },

  // 4xx
  { code: 400, group: '4xx', name: 'Bad Request', nameRu: 'Плохой запрос', desc: 'Server cannot process the request due to client error.', descRu: 'Сервер не может обработать запрос из-за ошибки клиента.', causes: 'Invalid JSON, missing required fields, wrong types.', causesRu: 'Невалидный JSON, отсутствуют обязательные поля, неверные типы.' },
  { code: 401, group: '4xx', name: 'Unauthorized', nameRu: 'Не авторизован', desc: 'Authentication required or failed.', descRu: 'Требуется аутентификация или она провалилась.', causes: 'Missing/expired token, wrong credentials.', causesRu: 'Токен отсутствует или устарел, неверные данные.' },
  { code: 403, group: '4xx', name: 'Forbidden', nameRu: 'Запрещено', desc: 'Authenticated but no permission.', descRu: 'Аутентифицирован, но нет прав доступа.', causes: 'RBAC, ownership check, IP whitelist.', causesRu: 'Проверка ролей, владелец ресурса, IP-фильтр.' },
  { code: 404, group: '4xx', name: 'Not Found', nameRu: 'Не найдено', desc: 'Resource not found.', descRu: 'Ресурс не найден.', causes: 'Wrong URL, deleted resource, typo in ID.', causesRu: 'Неверный URL, удалённый ресурс, опечатка в ID.' },
  { code: 405, group: '4xx', name: 'Method Not Allowed', nameRu: 'Метод не разрешён', desc: 'HTTP method not supported for this endpoint.', descRu: 'Метод не поддерживается этим endpoint-ом.', causes: 'POST instead of GET, or vice versa.', causesRu: 'POST вместо GET или наоборот.' },
  { code: 409, group: '4xx', name: 'Conflict', nameRu: 'Конфликт', desc: 'Resource state conflict.', descRu: 'Конфликт состояния ресурса.', causes: 'Duplicate email, optimistic locking.', causesRu: 'Дублирующийся email, оптимистическая блокировка.' },
  { code: 410, group: '4xx', name: 'Gone', nameRu: 'Удалено', desc: 'Resource permanently deleted.', descRu: 'Ресурс удалён навсегда.', causes: 'Deleted content with no redirect.', causesRu: 'Контент удалён без редиректа.' },
  { code: 422, group: '4xx', name: 'Unprocessable Entity', nameRu: 'Необрабатываемый объект', desc: 'Request well-formed but semantically invalid.', descRu: 'Запрос корректен, но семантически неверен.', causes: 'Validation errors, business rule violations.', causesRu: 'Ошибки валидации, нарушение бизнес-правил.' },
  { code: 429, group: '4xx', name: 'Too Many Requests', nameRu: 'Слишком много запросов', desc: 'Rate limit exceeded.', descRu: 'Превышен лимит запросов.', causes: 'Rate limiting, DDoS protection, API quota.', causesRu: 'Rate limiting, защита от DDoS, квота API.' },

  // 5xx
  { code: 500, group: '5xx', name: 'Internal Server Error', nameRu: 'Внутренняя ошибка сервера', desc: 'Unexpected server condition.', descRu: 'Непредвиденная ошибка сервера.', causes: 'Unhandled exception, null pointer, DB error.', causesRu: 'Необработанное исключение, NPE, ошибка БД.' },
  { code: 501, group: '5xx', name: 'Not Implemented', nameRu: 'Не реализовано', desc: 'Server lacks the ability to fulfill the request.', descRu: 'Сервер не умеет выполнить этот запрос.', causes: 'Unsupported HTTP method.', causesRu: 'Неподдерживаемый HTTP-метод.' },
  { code: 502, group: '5xx', name: 'Bad Gateway', nameRu: 'Плохой шлюз', desc: 'Upstream server returned invalid response.', descRu: 'Вышестоящий сервер вернул некорректный ответ.', causes: 'Nginx/proxy forwarding issue, service crashed.', causesRu: 'Проблема проксирования Nginx, сервис упал.' },
  { code: 503, group: '5xx', name: 'Service Unavailable', nameRu: 'Сервис недоступен', desc: 'Server temporarily unavailable.', descRu: 'Сервер временно недоступен.', causes: 'Maintenance, overload, deployment in progress.', causesRu: 'Обслуживание, перегрузка, деплой.' },
  { code: 504, group: '5xx', name: 'Gateway Timeout', nameRu: 'Тайм-аут шлюза', desc: 'Upstream server did not respond in time.', descRu: 'Вышестоящий сервер не ответил вовремя.', causes: 'Slow DB query, third-party API timeout.', causesRu: 'Медленный запрос к БД, тайм-аут стороннего API.' },
  { code: 507, group: '5xx', name: 'Insufficient Storage', nameRu: 'Недостаточно места', desc: 'Cannot store the representation.', descRu: 'Не хватает места для хранения.', causes: 'Disk full on the server.', causesRu: 'Диск переполнен на сервере.' },
]

const GROUP_COLORS: Record<string, string> = {
  '1xx': '#6366f1',
  '2xx': '#22c55e',
  '3xx': '#f59e0b',
  '4xx': '#ef4444',
  '5xx': '#f97316',
}

const GROUPS = ['1xx', '2xx', '3xx', '4xx', '5xx']

export function HttpStatusCodes({ isRu }: HttpStatusCodesProps) {
  const [query, setQuery] = useState('')
  const [groupFilter, setGroupFilter] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = useMemo(() => {
    return CODES.filter((c) => {
      const matchGroup = !groupFilter || c.group === groupFilter
      const q = query.trim().toLowerCase()
      if (!q) return matchGroup
      return matchGroup && (
        String(c.code).includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.nameRu.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.descRu.toLowerCase().includes(q)
      )
    })
  }, [query, groupFilter])

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* Search */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={isRu ? 'Поиск по коду или названию (429, timeout, forbidden...)' : 'Search by code or name (429, timeout, forbidden...)'}
        style={{
          width: '100%', padding: '10px 14px',
          background: 'var(--bg-elev)', border: '1px solid var(--line)',
          borderRadius: 10, color: 'var(--fg)',
          fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none',
        }}
        spellCheck={false}
      />

      {/* Group filter */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button
          onClick={() => setGroupFilter(null)}
          style={{
            padding: '5px 12px', borderRadius: 999, border: '1px solid var(--line)',
            background: !groupFilter ? 'var(--accent)' : 'none',
            color: !groupFilter ? 'var(--accent-ink)' : 'var(--fg-soft)',
            fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
          }}
        >
          {isRu ? 'Все' : 'All'}
        </button>
        {GROUPS.map((g) => (
          <button
            key={g}
            onClick={() => setGroupFilter(g === groupFilter ? null : g)}
            style={{
              padding: '5px 12px', borderRadius: 999, border: `1px solid ${GROUP_COLORS[g]}44`,
              background: groupFilter === g ? GROUP_COLORS[g] : 'none',
              color: groupFilter === g ? '#fff' : GROUP_COLORS[g],
              fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
            }}
          >
            {g}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
        {filtered.length === 0 && (
          <div style={{ padding: '20px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)' }}>
            {isRu ? 'Ничего не найдено' : 'No results'}
          </div>
        )}
        {filtered.map((c, i) => (
          <div key={c.code}>
            <button
              onClick={() => setExpanded(expanded === c.code ? null : c.code)}
              style={{
                width: '100%', display: 'grid',
                gridTemplateColumns: '60px 1fr auto',
                gap: 16, padding: '12px 16px', alignItems: 'center',
                background: 'none', border: 'none',
                borderBottom: expanded !== c.code && i < filtered.length - 1 ? '1px solid var(--line)' : 'none',
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600,
                color: GROUP_COLORS[c.group],
              }}>
                {c.code}
              </span>
              <span style={{ fontSize: 14, color: 'var(--fg)' }}>
                {isRu ? c.nameRu : c.name}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
                {expanded === c.code ? '▲' : '▼'}
              </span>
            </button>
            {expanded === c.code && (
              <div style={{
                padding: '0 16px 16px 92px',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <p style={{ margin: '0 0 8px', fontSize: 14, color: 'var(--fg-soft)', lineHeight: 1.6 }}>
                  {isRu ? c.descRu : c.desc}
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
                  {isRu ? '↳ ' + c.causesRu : '↳ ' + c.causes}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
