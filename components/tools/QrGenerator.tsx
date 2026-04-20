'use client'

import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'

interface QrGeneratorProps {
  isRu?: boolean
}

export function QrGenerator({ isRu }: QrGeneratorProps) {
  const [text, setText] = useState('https://qahub.pro')
  const [size, setSize] = useState(280)
  const [fgColor, setFgColor] = useState('#0b0b0c')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!text.trim() || !canvasRef.current) return
    setError(null)
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      color: { dark: fgColor, light: bgColor },
      errorCorrectionLevel: 'M',
      margin: 2,
    }).catch((e) => setError(String(e)))
  }, [text, size, fgColor, bgColor])

  const download = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const FIELD = {
    padding: '10px 14px',
    background: 'var(--bg-elev)',
    border: '1px solid var(--line)',
    borderRadius: 10,
    color: 'var(--fg)',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    outline: 'none',
    width: '100%',
  }

  const LABEL = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '.14em',
    textTransform: 'uppercase' as const,
    color: 'var(--muted)',
    marginBottom: 6,
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start' }}>
      {/* Controls */}
      <div style={{ display: 'grid', gap: 16 }}>
        <div>
          <div style={LABEL}>{isRu ? 'Текст или URL' : 'Text or URL'}</div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://..."
            rows={4}
            style={{ ...FIELD, resize: 'vertical', lineHeight: 1.6 }}
            spellCheck={false}
          />
        </div>

        <div>
          <div style={LABEL}>{isRu ? 'Размер (px)' : 'Size (px)'}</div>
          <input
            type="range"
            min={128}
            max={512}
            step={8}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{size}×{size}px</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={LABEL}>{isRu ? 'Цвет QR' : 'QR color'}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ width: 40, height: 36, borderRadius: 8, border: '1px solid var(--line)', cursor: 'pointer' }} />
              <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ ...FIELD, flex: 1 }} spellCheck={false} />
            </div>
          </div>
          <div>
            <div style={LABEL}>{isRu ? 'Фон' : 'Background'}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: 40, height: 36, borderRadius: 8, border: '1px solid var(--line)', cursor: 'pointer' }} />
              <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ ...FIELD, flex: 1 }} spellCheck={false} />
            </div>
          </div>
        </div>

        <button
          onClick={download}
          disabled={!text.trim() || !!error}
          style={{
            padding: '10px 20px', borderRadius: 10,
            background: 'var(--accent)', color: 'var(--accent-ink)',
            border: 0, fontFamily: 'var(--font-mono)', fontSize: 12,
            cursor: text.trim() && !error ? 'pointer' : 'not-allowed',
            opacity: text.trim() && !error ? 1 : 0.5,
            letterSpacing: '.08em',
          }}
        >
          ↓ {isRu ? 'СКАЧАТЬ PNG' : 'DOWNLOAD PNG'}
        </button>

        {error && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--danger)' }}>{error}</div>
        )}
      </div>

      {/* Canvas */}
      <div style={{ position: 'sticky', top: 24 }}>
        <canvas
          ref={canvasRef}
          style={{ borderRadius: 12, border: '1px solid var(--line)', display: 'block' }}
        />
      </div>
    </div>
  )
}
