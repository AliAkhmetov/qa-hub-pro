import { test, expect } from '@playwright/test'

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

test.describe('UUID generator', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ru/tools')
  })

  test('генерирует 5 UUID по умолчанию', async ({ page }) => {
    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    const items = page.getByTestId('uuid-item')
    await expect(items).toHaveCount(5)
  })

  test('все UUID соответствуют формату v4', async ({ page }) => {
    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    const items = page.getByTestId('uuid-item')
    const count = await items.count()
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent() ?? ''
      const uuid = text.replace(/COPY|СКОПИРОВАНО ✓/g, '').trim()
      expect(uuid).toMatch(UUID_V4)
    }
  })

  test('все 5 UUID уникальны', async ({ page }) => {
    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    const items = page.getByTestId('uuid-item')
    const texts = await items.allTextContents()
    const uuids = texts.map(t => t.replace(/COPY|СКОПИРОВАНО ✓/g, '').trim())
    const unique = new Set(uuids)
    expect(unique.size).toBe(5)
  })

  test('повторная генерация даёт другой набор UUID', async ({ page }) => {
    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    const first = await page.getByTestId('uuid-item').allTextContents()

    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    const second = await page.getByTestId('uuid-item').allTextContents()

    expect(first).not.toEqual(second)
  })

  test('генерирует 1 UUID при count=1', async ({ page }) => {
    await page.locator('input[type="number"]').fill('1')
    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    await expect(page.getByTestId('uuid-item')).toHaveCount(1)
  })

  test('генерирует 10 UUID при count=10', async ({ page }) => {
    await page.locator('input[type="number"]').fill('10')
    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    await expect(page.getByTestId('uuid-item')).toHaveCount(10)
  })

  test('кнопка КОПИРОВАТЬ ВСЕ появляется при >1 UUID', async ({ page }) => {
    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    await expect(page.getByRole('button', { name: /КОПИРОВАТЬ ВСЕ/i })).toBeVisible()
  })

  test('кнопка COPY у первого UUID кликабельна', async ({ page }) => {
    await page.getByRole('button', { name: 'Сгенерировать' }).click()
    const firstCopy = page.getByTestId('uuid-item').first().getByRole('button')
    await firstCopy.click()
    // После клика надпись меняется на СКОПИРОВАНО ✓
    await expect(firstCopy).toContainText(/СКОПИРОВАНО|COPIED/i)
  })

})
