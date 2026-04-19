import Image from 'next/image'
import { CodeBlock } from '@/components/ui/CodeBlock'
import type { RichText } from '@/lib/notion.types'

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 60)
}

function renderRichText(richTexts: RichText[]): React.ReactNode[] {
  return richTexts.map((rt, i) => {
    let node: React.ReactNode = rt.plain_text
    if (rt.annotations.code) node = (
      <code key={`code-${i}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '.92em', color: 'var(--accent)', background: 'var(--bg-soft)', padding: '1px 6px', borderRadius: 4 }}>
        {node}
      </code>
    )
    if (rt.annotations.bold) node = <strong key={`bold-${i}`} style={{ fontWeight: 600, color: 'var(--fg)' }}>{node}</strong>
    if (rt.annotations.italic) node = <em key={`em-${i}`} style={{ fontStyle: 'italic' }}>{node}</em>
    if (rt.annotations.strikethrough) node = <s key={`s-${i}`}>{node}</s>
    if (rt.href) node = (
      <a key={`a-${i}`} href={rt.href} style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }} target="_blank" rel="noopener noreferrer">
        {node}
      </a>
    )
    return <span key={i}>{node}</span>
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: Record<string, any>, isFirst: boolean): React.ReactNode {
  const { type, id } = block

  switch (type) {
    case 'paragraph': {
      const text = (block.paragraph?.rich_text ?? []) as RichText[]
      if (!text.length) return <div key={id} style={{ height: 16 }} />
      return (
        <p key={id} className={isFirst ? 'drop-cap' : ''} style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--fg-soft)', margin: '0 0 20px' }}>
          {renderRichText(text)}
        </p>
      )
    }
    case 'heading_1': {
      const text = (block.heading_1?.rich_text ?? []) as RichText[]
      const plain = text.map(r => r.plain_text).join('')
      const hid = slugify(plain)
      return (
        <h2 id={hid} key={id} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 40, lineHeight: 1.05, letterSpacing: '-.02em', margin: '56px 0 20px', color: 'var(--fg)', scrollMarginTop: 80 }}>
          {renderRichText(text)}
        </h2>
      )
    }
    case 'heading_2': {
      const text = (block.heading_2?.rich_text ?? []) as RichText[]
      const plain = text.map(r => r.plain_text).join('')
      const hid = slugify(plain)
      return (
        <h3 id={hid} key={id} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 28, lineHeight: 1.1, letterSpacing: '-.01em', margin: '40px 0 14px', color: 'var(--fg)', scrollMarginTop: 80 }}>
          {renderRichText(text)}
        </h3>
      )
    }
    case 'heading_3': {
      const text = (block.heading_3?.rich_text ?? []) as RichText[]
      const plain = text.map(r => r.plain_text).join('')
      const hid = slugify(plain)
      return (
        <h4 id={hid} key={id} style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', margin: '32px 0 12px', color: 'var(--muted)', scrollMarginTop: 80 }}>
          {renderRichText(text)}
        </h4>
      )
    }
    case 'bulleted_list_item':
      return (
        <li key={id} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg-soft)', margin: '0 0 6px', paddingLeft: 4 }}>
          <span style={{ color: 'var(--accent)', marginRight: 10, fontFamily: 'var(--font-mono)' }}>→</span>
          {renderRichText(block.bulleted_list_item?.rich_text ?? [])}
        </li>
      )
    case 'numbered_list_item':
      return (
        <li key={id} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg-soft)', margin: '0 0 6px', paddingLeft: 4 }}>
          {renderRichText(block.numbered_list_item?.rich_text ?? [])}
        </li>
      )
    case 'code': {
      const codeText = (block.code?.rich_text ?? []).map((r: RichText) => r.plain_text).join('')
      return <CodeBlock key={id} code={codeText} language={block.code?.language ?? 'text'} />
    }
    case 'quote': {
      const text = (block.quote?.rich_text ?? []) as RichText[]
      return (
        <blockquote key={id} style={{
          margin: '32px 0',
          padding: '24px 28px',
          borderLeft: '3px solid var(--accent)',
          background: 'var(--bg-elev)',
          borderRadius: '0 12px 12px 0',
        }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.5, color: 'var(--fg-soft)', margin: 0, fontStyle: 'italic' }}>
            {renderRichText(text)}
          </p>
        </blockquote>
      )
    }
    case 'callout': {
      const icon = block.callout?.icon?.emoji ?? '💡'
      return (
        <div key={id} style={{ display: 'flex', gap: 16, padding: '18px 20px', margin: '24px 0', background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 12 }}>
          <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-soft)', margin: 0 }}>
            {renderRichText(block.callout?.rich_text ?? [])}
          </p>
        </div>
      )
    }
    case 'divider':
      return (
        <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '40px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', letterSpacing: '.2em' }}>· · ·</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
      )
    case 'image': {
      const src = block.image?.type === 'external'
        ? block.image.external?.url
        : block.image?.file?.url
      if (!src) return null
      const caption = (block.image?.caption ?? []).map((c: RichText) => c.plain_text).join('')
      return (
        <figure key={id} style={{ margin: '32px 0' }}>
          <Image
            src={src}
            alt={caption || 'Article image'}
            width={800}
            height={450}
            style={{ width: '100%', height: 'auto', borderRadius: 12, border: '1px solid var(--line)' }}
          />
          {caption && (
            <figcaption style={{ textAlign: 'center', fontSize: 12, marginTop: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}>
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }
    default:
      return null
  }
}

// Extract ToC items from blocks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractToc(blocks: Record<string, any>[]): { id: string; text: string; level: number }[] {
  const items: { id: string; text: string; level: number }[] = []
  for (const block of blocks) {
    const level = block.type === 'heading_1' ? 2 : block.type === 'heading_2' ? 3 : null
    if (!level) continue
    const richText = (block[block.type]?.rich_text ?? []) as RichText[]
    const text = richText.map(r => r.plain_text).join('')
    if (text) items.push({ id: slugify(text), text, level })
  }
  return items
}

interface ArticleContentProps {
  labels: { emptyContent: string; imageAlt: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: Record<string, any>[]
}

export function ArticleContent({ blocks, labels }: ArticleContentProps) {
  if (!blocks.length) {
    return (
      <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{labels.emptyContent}</p>
    )
  }

  // Group consecutive list items
  const grouped: React.ReactNode[] = []
  let i = 0
  let firstParagraphSeen = false

  while (i < blocks.length) {
    const block = blocks[i]
    if (block.type === 'bulleted_list_item') {
      const items: React.ReactNode[] = []
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(renderBlock(blocks[i], false))
        i++
      }
      grouped.push(
        <ul key={`ul-${i}`} style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
          {items}
        </ul>
      )
    } else if (block.type === 'numbered_list_item') {
      const items: React.ReactNode[] = []
      let n = 1
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(
          <li key={blocks[i].id} style={{ display: 'flex', gap: 14, fontSize: 17, lineHeight: 1.7, color: 'var(--fg-soft)', margin: '0 0 6px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', flexShrink: 0, minWidth: 20, paddingTop: 3 }}>{n++}.</span>
            <span>{renderRichText(blocks[i].numbered_list_item?.rich_text ?? [])}</span>
          </li>
        )
        i++
      }
      grouped.push(
        <ol key={`ol-${i}`} style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
          {items}
        </ol>
      )
    } else {
      const isFirst = block.type === 'paragraph' && !firstParagraphSeen
      if (isFirst && block.type === 'paragraph') firstParagraphSeen = true
      grouped.push(renderBlock(block, isFirst))
      i++
    }
  }

  return <article>{grouped}</article>
}
