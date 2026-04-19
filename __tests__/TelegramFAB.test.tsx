import { render, screen } from '@testing-library/react'
import { TelegramFAB } from '@/components/layout/TelegramFAB'

describe('TelegramFAB', () => {
  it('renders a link to the Telegram channel', () => {
    render(<TelegramFAB />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://t.me/tacousti')
  })

  it('shows consultation text', () => {
    render(<TelegramFAB />)
    expect(screen.getByText(/consultation/i)).toBeInTheDocument()
  })
})
