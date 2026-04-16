jest.mock('@notionhq/client', () => ({
  Client: jest.fn().mockImplementation(() => ({})),
}))

import { extractPlainText, transformArticle } from '@/lib/notion'

describe('extractPlainText', () => {
  it('joins rich text array into plain string', () => {
    const richTexts = [
      { plain_text: 'Hello ', annotations: { bold: false, italic: false, code: false, strikethrough: false }, href: null },
      { plain_text: 'World', annotations: { bold: true, italic: false, code: false, strikethrough: false }, href: null },
    ]
    expect(extractPlainText(richTexts)).toBe('Hello World')
  })

  it('returns empty string for empty array', () => {
    expect(extractPlainText([])).toBe('')
  })
})

describe('transformArticle', () => {
  const mockPage = {
    id: 'abc-123',
    properties: {
      Title: { title: [{ plain_text: 'Test Article', annotations: { bold: false, italic: false, code: false, strikethrough: false }, href: null }] },
      Slug: { rich_text: [{ plain_text: 'test-article', annotations: { bold: false, italic: false, code: false, strikethrough: false }, href: null }] },
      Category: { select: { name: 'Теория' } },
      Level: { multi_select: [{ name: 'Junior' }] },
      Status: { select: { name: 'Published' } },
      Language: { select: { name: 'ru' } },
      ReadTime: { number: 5 },
      UpdatedAt: { date: { start: '2025-04-12' } },
      Description: { rich_text: [{ plain_text: 'A test article', annotations: { bold: false, italic: false, code: false, strikethrough: false }, href: null }] },
    },
  }

  it('transforms a Notion page to Article shape', () => {
    const result = transformArticle(mockPage as never)
    expect(result).toEqual({
      id: 'abc-123',
      title: 'Test Article',
      slug: 'test-article',
      category: 'Теория',
      level: ['Junior'],
      status: 'Published',
      language: 'ru',
      readTime: 5,
      updatedAt: '2025-04-12',
      description: 'A test article',
    })
  })
})
