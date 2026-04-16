import Image from 'next/image'
import { CodeBlock } from '@/components/ui/CodeBlock'
import type { RichText } from '@/lib/notion.types'

function renderRichText(richTexts: RichText[]): React.ReactNode[] {
  return richTexts.map((rt, i) => {
    let node: React.ReactNode = rt.plain_text

    if (rt.annotations.code) node = <code key={`code-${i}`}>{node}</code>
    if (rt.annotations.bold) node = <strong key={`bold-${i}`}>{node}</strong>
    if (rt.annotations.italic) node = <em key={`em-${i}`}>{node}</em>
    if (rt.annotations.strikethrough) node = <s key={`s-${i}`}>{node}</s>
    if (rt.href) {
      node = (
        <a key={`a-${i}`} href={rt.href} style={{ color: 'var(--accent)' }} className="underline" target="_blank" rel="noopener noreferrer">
          {node}
        </a>
      )
    }
    return <span key={i}>{node}</span>
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: Record<string, any>): React.ReactNode {
  const { type, id } = block

  switch (type) {
    case 'paragraph':
      return (
        <p key={id} className="my-3" style={{ color: 'var(--text-primary)' }}>
          {renderRichText(block.paragraph?.rich_text ?? [])}
        </p>
      )
    case 'heading_1':
      return (
        <h1 key={id} className="font-mono mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderRichText(block.heading_1?.rich_text ?? [])}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 key={id} className="font-mono mt-6 mb-3" style={{ color: 'var(--text-primary)' }}>
          {renderRichText(block.heading_2?.rich_text ?? [])}
        </h2>
      )
    case 'heading_3':
      return (
        <h3 key={id} className="font-mono mt-5 mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderRichText(block.heading_3?.rich_text ?? [])}
        </h3>
      )
    case 'bulleted_list_item':
      return (
        <li key={id} className="ml-5 my-1 list-disc" style={{ color: 'var(--text-primary)' }}>
          {renderRichText(block.bulleted_list_item?.rich_text ?? [])}
        </li>
      )
    case 'numbered_list_item':
      return (
        <li key={id} className="ml-5 my-1 list-decimal" style={{ color: 'var(--text-primary)' }}>
          {renderRichText(block.numbered_list_item?.rich_text ?? [])}
        </li>
      )
    case 'code': {
      const codeText = (block.code?.rich_text ?? []).map((r: RichText) => r.plain_text).join('')
      return <CodeBlock key={id} code={codeText} language={block.code?.language ?? 'text'} />
    }
    case 'callout':
      return (
        <div
          key={id}
          className="my-4 flex gap-3 p-4 rounded-lg"
          style={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)' }}
        >
          <span className="shrink-0 text-xl">{block.callout?.icon?.emoji ?? '💡'}</span>
          <p style={{ color: 'var(--text-primary)' }}>
            {renderRichText(block.callout?.rich_text ?? [])}
          </p>
        </div>
      )
    case 'divider':
      return <hr key={id} className="my-6" style={{ borderColor: 'var(--border)' }} />
    case 'image': {
      const src = block.image?.type === 'external'
        ? block.image.external?.url
        : block.image?.file?.url
      if (!src) return null
      const caption = (block.image?.caption ?? []).map((c: RichText) => c.plain_text).join('')
      return (
        <figure key={id} className="my-6">
          <Image
            src={src}
            alt={caption || 'Article image'}
            width={800}
            height={450}
            className="rounded-lg w-full h-auto"
            style={{ border: '1px solid var(--border)' }}
          />
          {caption && (
            <figcaption className="text-center text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
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

interface ArticleContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: Record<string, any>[]
}

export function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <article>
      {blocks.map((block) => renderBlock(block))}
    </article>
  )
}
