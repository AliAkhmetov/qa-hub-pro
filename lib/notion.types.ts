export interface Article {
  id: string
  title: string
  slug: string
  category: string
  level: string[]
  status: 'Draft' | 'Published'
  language: 'ru' | 'en' | 'both'
  readTime: number
  updatedAt: string
  description: string
}

export interface RichText {
  plain_text: string
  annotations: {
    bold: boolean
    italic: boolean
    code: boolean
    strikethrough: boolean
  }
  href: string | null
}

export interface NotionBlock {
  id: string
  type: string
  [key: string]: unknown
}
