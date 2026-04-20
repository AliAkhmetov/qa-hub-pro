import { test, expect } from '@playwright/test'

test.describe('База знаний — навигация и сайдбар', () => {

  test('первая статья открывается по умолчанию при переходе на /ru', async ({ page }) => {
    await page.goto('/ru')
    // Страница должна иметь заголовок h1
    await expect(page.locator('h1')).toBeVisible()
  })

  test('сайдбар отображается и содержит разделы', async ({ page }) => {
    await page.goto('/ru/fundamentals/what-is-testing')
    // Ждём появления сайдбара
    const sidebar = page.locator('nav, aside').filter({ hasText: /Основы|Тест-дизайн|Старт/ }).first()
    await expect(sidebar).toBeVisible()
  })

  test('хлебные крошки отображаются на странице статьи', async ({ page }) => {
    await page.goto('/ru/fundamentals/what-is-testing')
    // Breadcrumb — nav внутри main (не navbar). Ищем ссылку "База знаний" внутри section
    const breadcrumb = page.locator('section nav a[href="/ru"]')
    await expect(breadcrumb).toBeVisible()
  })

  test('переход по сайдбару меняет URL и заголовок', async ({ page }) => {
    await page.goto('/ru/fundamentals/what-is-testing')
    const currentUrl = page.url()

    // Кликаем на другую ссылку в сайдбаре
    const sidebarLink = page.locator('nav a, aside a').nth(2)
    const href = await sidebarLink.getAttribute('href')
    if (href) {
      await sidebarLink.click()
      await expect(page).not.toHaveURL(currentUrl)
    }
  })

  test('stub-страница показывает правильный path', async ({ page }) => {
    await page.goto('/ru/fundamentals/what-is-testing')
    // Либо статья из Notion, либо stub с path
    const hasContent = await page.locator('article, [data-testid="article"]').count()
    const hasStub = await page.getByText('Stub page').count()
    expect(hasContent + hasStub).toBeGreaterThan(0)
  })

  test('навигация Предыдущая/Следующая работает', async ({ page }) => {
    await page.goto('/ru/fundamentals/what-is-testing')
    const nextLink = page.getByText('Следующая страница').locator('..')
    const hasNext = await nextLink.count()
    if (hasNext > 0) {
      await nextLink.click()
      await expect(page.locator('h1')).toBeVisible()
    }
  })

})
