'use client'

import { useState, useCallback } from 'react'

interface SelectorTesterProps {
  isRu?: boolean
}

type SelectorMode = 'css' | 'xpath' | 'playwright'

function runCss(html: string, selector: string): { matches: string[]; error: string | null } {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const nodes = doc.querySelectorAll(selector)
    const matches = Array.from(nodes).map((n) => (n as Element).outerHTML)
    return { matches, error: null }
  } catch (e) {
    return { matches: [], error: String(e) }
  }
}

function runXpath(html: string, expression: string): { matches: string[]; error: string | null } {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const result = doc.evaluate(expression, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    const matches: string[] = []
    for (let i = 0; i < result.snapshotLength; i++) {
      const node = result.snapshotItem(i)
      if (node instanceof Element) matches.push(node.outerHTML)
      else if (node) matches.push(node.textContent ?? '')
    }
    return { matches, error: null }
  } catch (e) {
    return { matches: [], error: String(e) }
  }
}

function playwrightToCss(selector: string): { css: string; mode: 'css' | 'xpath' | 'text' } {
  if (selector.startsWith('text=')) return { css: '', mode: 'text' }
  if (selector.startsWith('xpath=')) return { css: selector.slice(6), mode: 'xpath' }
  if (selector.startsWith('//') || selector.startsWith('..')) return { css: selector, mode: 'xpath' }
  if (selector.includes('role=')) {
    const roleMatch = /role=(\w+)/.exec(selector)
    if (roleMatch) return { css: `[role="${roleMatch[1]}"]`, mode: 'css' }
  }
  return { css: selector, mode: 'css' }
}

function runPlaywright(html: string, selector: string): { matches: string[]; error: string | null } {
  const { css, mode } = playwrightToCss(selector)
  if (mode === 'text') {
    const textVal = selector.slice(5).replace(/^['"]|['"]$/g, '')
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html')
      const all = doc.querySelectorAll('*')
      const matches = Array.from(all)
        .filter((el) => el.textContent?.trim() === textVal)
        .map((el) => (el as Element).outerHTML)
      return { matches, error: null }
    } catch (e) {
      return { matches: [], error: String(e) }
    }
  }
  if (mode === 'xpath') return runXpath(html, css)
  return runCss(html, css)
}

const MODES: { id: SelectorMode; label: string }[] = [
  { id: 'css', label: 'CSS' },
  { id: 'xpath', label: 'XPath' },
  { id: 'playwright', label: 'Playwright' },
]

const TEXTAREA = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--bg-elev)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  color: 'var(--fg)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  lineHeight: 1.6,
  resize: 'vertical' as const,
  outline: 'none',
}

const LABEL = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted)',
  marginBottom: 6,
}

const EXAMPLE_HTML = `<div class="user-list">
  <div class="user" data-testid="user-item">
    <span class="name">Alice</span>
    <span class="role">Admin</span>
  </div>
  <div class="user" data-testid="user-item">
    <span class="name">Bob</span>
    <span class="role">User</span>
  </div>
</div>`

export function SelectorTester({ isRu }: SelectorTesterProps) {
  const [html, setHtml] = useState(EXAMPLE_HTML)
  const [selector, setSelector] = useState('[data-testid="user-item"]')
  const [mode, setMode] = useState<SelectorMode>('css')

  const run = useCallback(() => {
    if (mode === 'css') return runCss(html, selector)
    if (mode === 'xpath') return runXpath(html, selector)
    return runPlaywright(html, selector)
  }, [html, selector, mode])

  const { matches, error } = selector.trim() ? run() : { matches: [], error: null }

  const placeholders: Record<SelectorMode, string> = {
    css: '.user-item, [data-testid="btn"], #main > p',
    xpath: '//div[@class="user"]//span[@class="name"]',
    playwright: 'text=Alice, role=button, [data-testid="item"]',
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: 6 }}>
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid var(--line)',
              background: mode === m.id ? 'var(--accent)' : 'none',
              color: mode === m.id ? 'var(--accent-ink)' : 'var(--fg-soft)',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              cursor: 'pointer', transition: '.15s',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Selector input */}
      <div>
        <div style={LABEL}>{isRu ? 'Селектор' : 'Selector'}</div>
        <input
          type="text"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          placeholder={placeholders[mode]}
          style={{
            ...TEXTAREA, resize: undefined,
            padding: '10px 14px',
            borderColor: error ? 'var(--danger)' : 'var(--line)',
          }}
          spellCheck={false}
        />
        {error && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--danger)', marginTop: 6 }}>
            {error}
          </div>
        )}
      </div>

      {/* HTML input */}
      <div>
        <div style={LABEL}>HTML</div>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={8}
          style={TEXTAREA}
          spellCheck={false}
        />
      </div>

      {/* Results */}
      <div>
        <div style={{ ...LABEL, marginBottom: 12 }}>
          {isRu ? 'Совпадения' : 'Matches'}
          {' '}
          <span style={{ letterSpacing: 0, color: matches.length > 0 ? 'var(--success)' : 'var(--muted)' }}>
            {matches.length}
          </span>
        </div>
        {matches.length === 0 && selector.trim() && !error && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>
            {isRu ? 'Нет совпадений' : 'No matches'}
          </div>
        )}
        <div style={{ display: 'grid', gap: 8 }}>
          {matches.map((m, i) => (
            <div
              key={i}
              style={{
                padding: '10px 14px',
                background: 'color-mix(in oklab, var(--success) 8%, transparent)',
                border: '1px solid color-mix(in oklab, var(--success) 25%, transparent)',
                borderRadius: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--fg)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              <span style={{ color: 'var(--muted)', marginRight: 8 }}>[{i}]</span>
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
