import {
  sidebarConfigRu,
  type SidebarConfig,
  type SidebarGroupNode,
  type SidebarLeafNode,
  type SidebarNode,
} from '@/config/sidebar.ru'

export interface SidebarLeafEntry {
  item: SidebarLeafNode
  parents: SidebarGroupNode[]
}

export interface SidebarBreadcrumb {
  title: string
  href?: string
  kind: 'group' | 'page'
}

export interface SidebarAdjacentEntries {
  previous: SidebarLeafEntry | null
  next: SidebarLeafEntry | null
}

const SIDEBAR_CONFIGS: Record<string, SidebarConfig> = {
  ru: sidebarConfigRu,
}

export function isSidebarLeafNode(node: SidebarNode): node is SidebarLeafNode {
  return 'href' in node
}

export function normalizeSidebarHref(href: string): string {
  if (!href) return '/'
  if (href === '/') return href
  return href.replace(/\/+$/, '')
}

export function getSidebarConfig(locale: string): SidebarConfig | null {
  return SIDEBAR_CONFIGS[locale] ?? null
}

export function getSidebarSections(locale: string): SidebarGroupNode[] {
  return getSidebarConfig(locale)?.sidebar ?? []
}

function collectLeafEntries(
  nodes: SidebarNode[],
  parents: SidebarGroupNode[] = []
): SidebarLeafEntry[] {
  return nodes.flatMap((node) => {
    if (isSidebarLeafNode(node)) {
      return [{ item: { ...node, href: normalizeSidebarHref(node.href) }, parents }]
    }

    return collectLeafEntries(node.items, [...parents, node])
  })
}

export function getSidebarLeafEntries(locale: string): SidebarLeafEntry[] {
  return collectLeafEntries(getSidebarSections(locale))
}

export function getSidebarLeafByHref(locale: string, href: string): SidebarLeafNode | null {
  const normalizedHref = normalizeSidebarHref(href)
  return getSidebarLeafEntries(locale).find((entry) => entry.item.href === normalizedHref)?.item ?? null
}

export function getSidebarLeafEntryByHref(locale: string, href: string): SidebarLeafEntry | null {
  const normalizedHref = normalizeSidebarHref(href)
  return getSidebarLeafEntries(locale).find((entry) => entry.item.href === normalizedHref) ?? null
}

export function getSidebarBreadcrumbs(locale: string, href: string): SidebarBreadcrumb[] {
  const entry = getSidebarLeafEntryByHref(locale, href)
  if (!entry) return []

  return [
    ...entry.parents.map((group) => ({ title: group.title, kind: 'group' as const })),
    { title: entry.item.title, href: entry.item.href, kind: 'page' as const },
  ]
}

export function getFirstSidebarLeaf(locale: string): SidebarLeafNode | null {
  return getSidebarLeafEntries(locale)[0]?.item ?? null
}

export function getAdjacentSidebarLeafEntries(
  locale: string,
  href: string
): SidebarAdjacentEntries {
  const entries = getSidebarLeafEntries(locale)
  const normalizedHref = normalizeSidebarHref(href)
  const currentIndex = entries.findIndex((entry) => entry.item.href === normalizedHref)

  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: entries[currentIndex - 1] ?? null,
    next: entries[currentIndex + 1] ?? null,
  }
}

export function isSidebarRoute(locale: string, href: string): boolean {
  return Boolean(getSidebarLeafByHref(locale, href))
}

export function getSidebarHrefFromSegments(locale: string, segments: string[]): string {
  const suffix = segments.length ? `/${segments.join('/')}` : ''
  return normalizeSidebarHref(`/${locale}${suffix}`)
}

export function getSidebarOpenTitles(locale: string, activeHref?: string): Set<string> {
  const sections = getSidebarSections(locale)
  const defaults = new Set(sections.map((section) => section.title))
  if (!activeHref) return defaults

  const entry = getSidebarLeafEntryByHref(locale, activeHref)
  if (!entry) return defaults

  for (const group of entry.parents) {
    defaults.add(group.title)
  }

  return defaults
}

export function getKnowledgeBaseHref(locale: string): string {
  return `/${locale}`
}

/** Checks recursively whether a group contains a given href */
function groupContainsHref(group: SidebarGroupNode, href: string): boolean {
  return group.items.some((node) => {
    if (isSidebarLeafNode(node)) return normalizeSidebarHref(node.href) === href
    return groupContainsHref(node, href)
  })
}

/** Returns the title of the top-level section that contains the given href, or null */
export function getSidebarActiveSectionTitle(locale: string, href: string): string | null {
  const normalizedHref = normalizeSidebarHref(href)
  for (const section of getSidebarSections(locale)) {
    if (groupContainsHref(section, normalizedHref)) return section.title
  }
  return null
}
