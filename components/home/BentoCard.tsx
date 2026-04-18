'use client'

import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'

interface BentoCardProps {
  href: string
  className?: string
  style?: React.CSSProperties
  children: ReactNode
}

export function BentoCard({ href, className = '', style, children }: BentoCardProps) {
  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      href={href}
      className={`bento-cat ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
    >
      {children}
    </Link>
  )
}
