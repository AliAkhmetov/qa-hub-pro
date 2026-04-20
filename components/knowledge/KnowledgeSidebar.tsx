'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { SidebarGroupNode, SidebarNode } from '@/config/sidebar.ru'
import {
  getKnowledgeBaseHref,
  getSidebarLeafEntries,
  getSidebarOpenTitles,
  getSidebarSections,
  isSidebarLeafNode,
  normalizeSidebarHref,
} from '@/lib/sidebar'

interface KnowledgeSidebarProps {
  locale: string
  mobileOpen?: boolean
  onClose?: () => void
}

function countLeafNodes(nodes: SidebarNode[]): number {
  return nodes.reduce((total, node) => {
    if (isSidebarLeafNode(node)) return total + 1
    return total + countLeafNodes(node.items)
  }, 0)
}

function groupContainsHref(group: SidebarGroupNode, href: string): boolean {
  return group.items.some((node) => {
    if (isSidebarLeafNode(node)) return node.href === href
    return groupContainsHref(node, href)
  })
}

export function KnowledgeSidebar({ locale, mobileOpen = false, onClose }: KnowledgeSidebarProps) {
  const pathname = normalizeSidebarHref(usePathname() ?? getKnowledgeBaseHref(locale))
  const isRu = locale === 'ru'
  const sections = useMemo(() => getSidebarSections(locale), [locale])
  const totalItems = useMemo(() => getSidebarLeafEntries(locale).length, [locale])
  const defaultOpen = useMemo(() => getSidebarOpenTitles(locale, pathname), [locale, pathname])
  const [manualOpen, setManualOpen] = useState<Set<string>>(() => new Set())
  const [manualClosed, setManualClosed] = useState<Set<string>>(() => new Set())

  const isOpen = (title: string) => {
    if (defaultOpen.has(title)) return !manualClosed.has(title)
    return manualOpen.has(title)
  }

  const toggle = (title: string) => {
    if (defaultOpen.has(title)) {
      setManualClosed((prev) => {
        const next = new Set(prev)
        next.has(title) ? next.delete(title) : next.add(title)
        return next
      })
      return
    }
    setManualOpen((prev) => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      return next
    })
  }

  function renderNodes(nodes: SidebarNode[], depth = 0): React.ReactNode {
    return nodes.map((node) => {
      if (isSidebarLeafNode(node)) {
        const isActive = pathname === node.href
        return (
          <li key={node.href}>
            <Link
              href={node.href}
              onClick={onClose}
              style={{
                display: 'block',
                width: '100%',
                padding: `6px 20px 6px ${34 + depth * 16}px`,
                background: isActive ? 'color-mix(in oklab, var(--accent) 8%, transparent)' : 'none',
                borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                lineHeight: 1.4,
                color: isActive ? 'var(--fg)' : 'var(--fg-soft)',
                textAlign: 'left',
                transition: 'color .12s, background .12s',
              }}
            >
              {node.title}
            </Link>
          </li>
        )
      }

      const groupIsOpen = isOpen(node.title)
      const isActiveGroup = groupContainsHref(node, pathname)
      const isTopLevel = depth === 0

      return (
        <li key={`${depth}-${node.title}`}>
          <button
            onClick={() => toggle(node.title)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              width: '100%',
              padding: isTopLevel ? '7px 20px' : `7px 20px 7px ${20 + depth * 16}px`,
              background: 'none',
              border: 0,
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: isTopLevel ? 10 : 11,
              letterSpacing: isTopLevel ? '.15em' : '.08em',
              textTransform: isTopLevel ? 'uppercase' : 'none',
              color: isActiveGroup ? 'var(--fg)' : 'var(--muted)',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 10,
                textAlign: 'center',
                transition: 'transform .15s',
                transform: groupIsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                fontSize: 8,
              }}
            >
              ▶
            </span>
            <span style={{ flex: 1 }}>{node.title}</span>
            <span style={{ letterSpacing: 0 }}>{countLeafNodes(node.items)}</span>
          </button>

          {groupIsOpen && (
            <ul style={{ listStyle: 'none', padding: '2px 0 6px', margin: 0 }}>
              {renderNodes(node.items, depth + 1)}
            </ul>
          )}
        </li>
      )
    })
  }

  return (
    <aside className={`knowledge-sidebar-inner${mobileOpen ? ' is-open' : ''}`}>
      {/* Mobile close button */}
      {onClose && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button
            onClick={onClose}
            aria-label="Закрыть меню"
            style={{
              padding: '6px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--muted)',
              letterSpacing: '.1em',
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div
        style={{
          padding: '12px 20px 14px',
          borderBottom: '1px solid var(--line)',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '.2em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}
      >
        {isRu ? 'База знаний' : 'Knowledge Base'}
        <span style={{ float: 'right', letterSpacing: 0 }}>{totalItems}</span>
      </div>

      <nav style={{ padding: '8px 0 40px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {renderNodes(sections)}
        </ul>
      </nav>
    </aside>
  )
}
