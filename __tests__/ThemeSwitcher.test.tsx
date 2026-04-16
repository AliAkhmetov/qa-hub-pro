import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({ theme: 'dark', setTheme: jest.fn() })),
}))

describe('ThemeSwitcher', () => {
  it('renders a button', () => {
    render(<ThemeSwitcher />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls setTheme with light when currently dark', () => {
    const setTheme = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useTheme } = require('next-themes')
    useTheme.mockReturnValue({ theme: 'dark', setTheme })
    render(<ThemeSwitcher />)
    fireEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('calls setTheme with dark when currently light', () => {
    const setTheme = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useTheme } = require('next-themes')
    useTheme.mockReturnValue({ theme: 'light', setTheme })
    render(<ThemeSwitcher />)
    fireEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
