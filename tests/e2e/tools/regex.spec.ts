import { test, expect } from '@playwright/test'

test.describe('Regex tester', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ru/tools')
  })

  test('по умолчанию загружен email-паттерн и тестовая строка', async ({ page }) => {
    await expect(page.getByTestId('regex-pattern')).toHaveValue(/\\b\[\\w/)
    await expect(page.getByTestId('regex-text')).toHaveValue(/ali@qa-hub\.dev/)
  })

  test('email-паттерн находит 2 совпадения', async ({ page }) => {
    await expect(page.getByText('2 СОВПАДЕНИЙ')).toBeVisible()
  })

  test('подсветка совпадений отображается через <mark>', async ({ page }) => {
    const marks = page.locator('mark')
    await expect(marks.first()).toBeVisible()
    await expect(marks).toHaveCount(2)
  })

  test('невалидный regex показывает INVALID REGEX', async ({ page }) => {
    await page.getByTestId('regex-pattern').fill('[невалидный(')
    await expect(page.getByText('INVALID REGEX')).toBeVisible()
  })

  test('пустой паттерн — 0 совпадений, нет ошибок', async ({ page }) => {
    await page.getByTestId('regex-pattern').fill('')
    await expect(page.getByText('0 СОВПАДЕНИЙ')).toBeVisible()
  })

  test('флаг i (case insensitive) находит слово в разном регистре', async ({ page }) => {
    await page.getByTestId('regex-pattern').fill('hello')
    await page.getByTestId('regex-flags').fill('gi')
    await page.getByTestId('regex-text').fill('Hello World HELLO hello')
    await expect(page.getByText('3 СОВПАДЕНИЙ')).toBeVisible()
  })

  test('флаг g находит все совпадения цифр', async ({ page }) => {
    await page.getByTestId('regex-pattern').fill('\\d+')
    await page.getByTestId('regex-flags').fill('g')
    await page.getByTestId('regex-text').fill('abc 123 def 456 ghi 789')
    await expect(page.getByText('3 СОВПАДЕНИЙ')).toBeVisible()
  })

  test('счётчик обновляется в реальном времени при изменении строки', async ({ page }) => {
    await expect(page.getByText('2 СОВПАДЕНИЙ')).toBeVisible()
    await page.getByTestId('regex-text').fill('only-ali@qa-hub.dev here')
    await expect(page.getByText('1 СОВПАДЕНИЙ')).toBeVisible()
  })

  test('кнопка Пример восстанавливает дефолтный паттерн', async ({ page }) => {
    await page.getByTestId('regex-pattern').fill('test')
    // Scope к секции #regex чтобы не конфликтовать с кнопкой Пример из JWT
    await page.locator('#regex').getByRole('button', { name: 'Пример' }).click()
    await expect(page.getByTestId('regex-pattern')).toHaveValue(/\\b\[\\w/)
    await expect(page.getByText('2 СОВПАДЕНИЙ')).toBeVisible()
  })

})
