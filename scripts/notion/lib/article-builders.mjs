const TODAY = new Date().toISOString().slice(0, 10)

export function link(text, href, annotations = {}) {
  return { text, href, ...annotations }
}

export function richText(content) {
  const segments = Array.isArray(content) ? content : [content]

  return segments.map((segment) => {
    const normalized = typeof segment === 'string' ? { text: segment } : segment

    return {
      type: 'text',
      text: {
        content: normalized.text,
        link: normalized.href ? { url: normalized.href } : null,
      },
      annotations: {
        bold: normalized.bold ?? false,
        italic: normalized.italic ?? false,
        strikethrough: normalized.strikethrough ?? false,
        underline: normalized.underline ?? false,
        code: normalized.code ?? false,
        color: normalized.color ?? 'default',
      },
    }
  })
}

export function paragraph(content) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: richText(content) },
  }
}

export function heading1(content) {
  return {
    object: 'block',
    type: 'heading_1',
    heading_1: { rich_text: richText(content) },
  }
}

export function heading2(content) {
  return {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: richText(content) },
  }
}

export function callout(content, emoji = '💡') {
  return {
    object: 'block',
    type: 'callout',
    callout: {
      rich_text: richText(content),
      icon: { type: 'emoji', emoji },
      color: 'default',
    },
  }
}

export function bullets(items) {
  return items.map((item) => ({
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: richText(item) },
  }))
}

function slugFromPath(path) {
  return path.split('/').filter(Boolean).at(-1) ?? ''
}

export function article({ title, path, description, category = 'Теория', level = ['Junior'], readTime = 5, status = 'Draft', body }) {
  return {
    title,
    path,
    slug: slugFromPath(path),
    description,
    category,
    level,
    readTime,
    updatedAt: TODAY,
    status,
    language: 'ru',
    children: body,
  }
}
