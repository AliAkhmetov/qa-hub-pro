interface ToolShellProps {
  num: number
  total: number
  title: string
  description: string
  children: React.ReactNode
}

export function ToolShell({ num, total, title, description, children }: ToolShellProps) {
  const numStr = String(num).padStart(2, '0')
  const totalStr = String(total).padStart(2, '0')

  return (
    <section style={{ paddingTop: 52 }}>
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          TOOL {numStr} / {totalStr} · WORKS IN BROWSER
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-.03em',
            margin: '0 0 12px',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--fg-soft)',
            margin: 0,
            maxWidth: '56ch',
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--line)',
          paddingTop: 32,
        }}
      >
        {children}
      </div>
    </section>
  )
}
