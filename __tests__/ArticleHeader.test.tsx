import { render, screen } from '@testing-library/react'
import { ArticleHeader } from '@/components/article/ArticleHeader'

const article = {
  id: '1', title: 'Техники тест-дизайна', slug: 'test-design',
  path: '/ru/test-design/test-design',
  category: 'Теория', level: ['Junior'], status: 'Published' as const,
  language: 'ru' as const, readTime: 8, updatedAt: '2025-04-12', description: '',
}

describe('ArticleHeader', () => {
  it('renders the article title', () => {
    render(
      <ArticleHeader
        article={article}
        locale="ru"
        labels={{ knowledgeBase: 'База знаний', updatedAt: 'Обновлено', readTime: 'мин' }}
      />
    )
    expect(screen.getByRole('heading', { name: 'Техники тест-дизайна' })).toBeInTheDocument()
  })

  it('renders level tag', () => {
    render(
      <ArticleHeader
        article={article}
        locale="ru"
        labels={{ knowledgeBase: 'База знаний', updatedAt: 'Обновлено', readTime: 'мин' }}
      />
    )
    expect(screen.getByText('JUNIOR')).toBeInTheDocument()
  })

  it('renders read time', () => {
    render(
      <ArticleHeader
        article={article}
        locale="ru"
        labels={{ knowledgeBase: 'База знаний', updatedAt: 'Обновлено', readTime: 'мин' }}
      />
    )
    expect(screen.getByText(/8/)).toBeInTheDocument()
  })
})
