'use client'

import { useState } from 'react'

interface CurlConverterProps {
  isRu?: boolean
}

type OutputFormat = 'fetch' | 'axios' | 'python' | 'go'

interface ParsedCurl {
  method: string
  url: string
  headers: Record<string, string>
  body: string | null
}

function parseCurl(input: string): ParsedCurl | null {
  try {
    const raw = input.replace(/\\\n/g, ' ').replace(/\s+/g, ' ').trim()
    if (!raw.startsWith('curl')) return null

    const method = /\s-X\s+['"]?(\w+)['"]?/.exec(raw)?.[1]?.toUpperCase() ?? 'GET'
    const urlMatch = /curl\s+(?:-[^\s]+\s+[^\s]*\s+)*['"]?([^'">\s]+)['"]?/.exec(raw)
    const url = urlMatch?.[1] ?? ''

    const headers: Record<string, string> = {}
    const headerRe = /-H\s+['"]([^'"]+)['"]/g
    let m
    while ((m = headerRe.exec(raw)) !== null) {
      const [k, ...rest] = m[1].split(':')
      if (k) headers[k.trim()] = rest.join(':').trim()
    }

    const bodyMatch = /(?:--data(?:-raw)?|--data-urlencode|-d)\s+['"]([^'"]+)['"]/.exec(raw)
    const body = bodyMatch?.[1] ?? null

    return { method, url, headers, body }
  } catch {
    return null
  }
}

function toFetch(p: ParsedCurl): string {
  const hasBody = p.body && p.method !== 'GET'
  const lines: string[] = []
  lines.push(`const response = await fetch('${p.url}', {`)
  if (p.method !== 'GET') lines.push(`  method: '${p.method}',`)
  if (Object.keys(p.headers).length > 0) {
    lines.push('  headers: {')
    for (const [k, v] of Object.entries(p.headers)) {
      lines.push(`    '${k}': '${v}',`)
    }
    lines.push('  },')
  }
  if (hasBody) lines.push(`  body: JSON.stringify(${p.body}),`)
  lines.push('});')
  lines.push('')
  lines.push('const data = await response.json();')
  lines.push('console.log(data);')
  return lines.join('\n')
}

function toAxios(p: ParsedCurl): string {
  const lines: string[] = []
  lines.push(`const response = await axios({`)
  lines.push(`  method: '${p.method.toLowerCase()}',`)
  lines.push(`  url: '${p.url}',`)
  if (Object.keys(p.headers).length > 0) {
    lines.push('  headers: {')
    for (const [k, v] of Object.entries(p.headers)) {
      lines.push(`    '${k}': '${v}',`)
    }
    lines.push('  },')
  }
  if (p.body && p.method !== 'GET') lines.push(`  data: ${p.body},`)
  lines.push('});')
  lines.push('')
  lines.push('console.log(response.data);')
  return lines.join('\n')
}

function toPython(p: ParsedCurl): string {
  const lines: string[] = []
  lines.push('import requests')
  lines.push('')
  if (Object.keys(p.headers).length > 0) {
    lines.push('headers = {')
    for (const [k, v] of Object.entries(p.headers)) {
      lines.push(`    '${k}': '${v}',`)
    }
    lines.push('}')
    lines.push('')
  }
  const headersArg = Object.keys(p.headers).length > 0 ? ', headers=headers' : ''
  const dataArg = p.body && p.method !== 'GET' ? `, json=${p.body}` : ''
  lines.push(`response = requests.${p.method.toLowerCase()}('${p.url}'${headersArg}${dataArg})`)
  lines.push('print(response.json())')
  return lines.join('\n')
}

function toGo(p: ParsedCurl): string {
  const lines: string[] = []
  lines.push('package main')
  lines.push('')
  lines.push('import (')
  lines.push('\t"fmt"')
  lines.push('\t"net/http"')
  if (p.body && p.method !== 'GET') lines.push('\t"strings"')
  lines.push(')')
  lines.push('')
  lines.push('func main() {')
  if (p.body && p.method !== 'GET') {
    lines.push(`\tbody := strings.NewReader(\`${p.body}\`)`)
    lines.push(`\treq, _ := http.NewRequest("${p.method}", "${p.url}", body)`)
  } else {
    lines.push(`\treq, _ := http.NewRequest("${p.method}", "${p.url}", nil)`)
  }
  for (const [k, v] of Object.entries(p.headers)) {
    lines.push(`\treq.Header.Set("${k}", "${v}")`)
  }
  lines.push('\tclient := &http.Client{}')
  lines.push('\tresp, err := client.Do(req)')
  lines.push('\tif err != nil { panic(err) }')
  lines.push('\tdefer resp.Body.Close()')
  lines.push('\tfmt.Println(resp.Status)')
  lines.push('}')
  return lines.join('\n')
}

const TEXTAREA = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--bg-elev)',
  border: '1px solid var(--line)',
  borderRadius: 12,
  color: 'var(--fg)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  lineHeight: 1.6,
  resize: 'vertical' as const,
  outline: 'none',
}

const TABS: { id: OutputFormat; label: string }[] = [
  { id: 'fetch', label: 'fetch' },
  { id: 'axios', label: 'axios' },
  { id: 'python', label: 'Python requests' },
  { id: 'go', label: 'Go' },
]

export function CurlConverter({ isRu }: CurlConverterProps) {
  const [input, setInput] = useState('')
  const [tab, setTab] = useState<OutputFormat>('fetch')
  const [copied, setCopied] = useState(false)

  const parsed = input.trim() ? parseCurl(input) : null

  const output = parsed
    ? tab === 'fetch' ? toFetch(parsed)
    : tab === 'axios' ? toAxios(parsed)
    : tab === 'python' ? toPython(parsed)
    : toGo(parsed)
    : ''

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={isRu ? "Вставь cURL сюда..." : "Paste cURL here..."}
        rows={6}
        style={TEXTAREA}
        spellCheck={false}
      />

      {/* Format tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid var(--line)',
              background: tab === t.id ? 'var(--accent)' : 'none',
              color: tab === t.id ? 'var(--accent-ink)' : 'var(--fg-soft)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              cursor: 'pointer',
              transition: '.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Output */}
      <div style={{ position: 'relative' }}>
        <textarea
          readOnly
          value={parsed === null && input.trim() ? (isRu ? '// Не удалось распознать cURL' : '// Could not parse cURL') : output}
          rows={10}
          style={{ ...TEXTAREA, color: parsed === null && input.trim() ? 'var(--danger)' : 'var(--fg)' }}
          spellCheck={false}
        />
        {output && (
          <button
            onClick={copy}
            style={{
              position: 'absolute', top: 10, right: 10,
              padding: '4px 10px', borderRadius: 6,
              border: '1px solid var(--line)',
              background: 'var(--bg-elev)',
              color: copied ? 'var(--success)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)', fontSize: 11,
              cursor: 'pointer', letterSpacing: '.08em',
            }}
          >
            {copied ? '✓ COPIED' : 'COPY'}
          </button>
        )}
      </div>
    </div>
  )
}
