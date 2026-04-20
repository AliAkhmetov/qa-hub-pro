'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { SidebarGroupNode, SidebarNode } from '@/config/sidebar.ru'
import {
  getKnowledgeBaseHref,
  getSidebarActiveSectionTitle,
  getSidebarLeafEntries,
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
  return nodes.reduce((acc, node) => {
    if (isSidebarLeafNode(node)) return acc + 1
    return acc + countLeafNodes(node.items)
  }, 0)
}

function groupContainsPath(group: SidebarGroupNode, href: string): boolean {
  return group.items.some((node) => {
    if (isSidebarLeafNode(node)) return normalizeSidebarHref(node.href) === href
    return groupContainsPath(node, href)
  })
}

export function KnowledgeSidebar({ locale, mobileOpen = false, onClose }: KnowledgeSidebarProps) {
  const pathname = normalizeSidebarHref(usePathname() ?? getKnowledgeBaseHref(locale))
  const sections = useMemo(() => getSidebarSections(locale), [locale])
  const totalItems = useMemo(() => getSidebarLeafEntries(locale).length, [locale])

  // Which top-level section contains the active page?
  const activeSectionTitle = useMemo(
    () => getSidebarActiveSectionTitle(locale, pathname) ?? sections[0]?.title ?? null,
    [locale, pathname, sections]
  )

  // Accordion: single open section at a time
  // Initial: active section, fallback to first
  const [openSection, setOpenSection] = useState<string | null>(activeSectionTitle)

  // When navigating to a page in a different section — auto-open it
  useEffect(() => {
    if (activeSectionTitle) setOpenSection(activeSectionTitle)
  }, [activeSectionTitle])

  const toggle = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title))
  }

  // Scroll active item into center of sidebar
  const activeLiRef = useRef<HTMLLIElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!activeLiRef.current) return
    activeLiRef.current.scrollIntoView({
      block: 'center',
      behavior: isFirstRender.current ? 'auto' : 'smooth',
    })
    isFirstRender.current = false
  }, [pathname])

  function renderNodes(nodes: SidebarNode[], depth = 0): React.ReactNode {
    return nodes.map((node) => {
      if (isSidebarLeafNode(node)) {
        const isActive = pathname === normalizeSidebarHref(node.href)
        return (
          <li key={node.href} ref={isActive ? activeLiRef : undefined}>
            <Link
              href={node.href}
              onClick={onClose}
              style={{
                display: 'block',
                width: '100%',
                padding: `6px 20px 6px ${34 + depth * 16}px`,
                background: isActive
                  ? 'color-mix(in oklab, var(--accent) 10%, transparent)'
                  : 'none',
                borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                lineHeight: 1.4,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--fg)' : 'var(--fg-soft)',
                textAlign: 'left',
                textDecoration: 'none',
                transition: 'color .12s, background .12s',
              }}
            >
              {node.title}
            </Link>
          </li>
        )
      }

      // Group node
      const isTopLevel = depth === 0
      // Top-level: accordion; nested: always open when parent is open
      const groupIsOpen = isTopLevel ? openSection === node.title : true
      const isActiveGroup = groupContainsPath(node, pathname)

      return (
        <li key={`${depth}-${node.title}`}>
          <button
            onClick={isTopLevel ? () => toggle(node.title) : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              width: '100%',
              padding: isTopLevel ? '7px 20px' : `5px 20px 5px ${20 + depth * 16}px`,
              background: 'none',
              border: 0,
              cursor: isTopLevel ? 'pointer' : 'default',
              fontFamily: 'var(--font-mono)',
              fontSize: isTopLevel ? 10 : 11,
              letterSpacing: isTopLevel ? '.15em' : '.06em',
              textTransform: isTopLevel ? 'uppercase' : 'none',
              color: isActiveGroup ? 'var(--fg)' : 'var(--muted)',
              textAlign: 'left',
            }}
          >
            {isTopLevel && (
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  textAlign: 'center',
                  transition: 'transform .2s',
                  transform: groupIsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  fontSize: 8,
                  flexShrink: 0,
                }}
              >
                ▶
              </span>
            )}
            <span style={{ flex: 1 }}>{node.title}</span>
            {isTopLevel && (
              <span style={{ letterSpacing: 0, color: 'var(--muted)', fontSize: 10 }}>
                {countLeafNodes(node.items)}
              </span>
            )}
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

  const isRu = locale === 'ru'

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
              background: 'none',
              border: 0,
              cursor: 'pointer',
              letterSpacing: '.1em',
            }}
          >
            ✕ ЗАКРЫТЬ
          </button>
        </div>
      )}

      {/* Header */}
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
