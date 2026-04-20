import { test, expect } from '@playwright/test'

test.describe('Base64 encode / decode', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ru/tools')
  })

  test('предустановленные значения: Ali Akhmetov / QWxpIEFraG1ldG92', async ({ page }) => {
    await expect(page.getByTestId('base64-plain')).toHaveValue('Ali Akhmetov')
    await expect(page.getByTestId('base64-encoded')).toHaveValue('QWxpIEFraG1ldG92')
  })

  test('encode ASCII строки: Hello QA! → SGVsbG8gUUEh', async ({ page }) => {
    await page.getByTestId('base64-plain').fill('Hello QA!')
    await page.getByRole('button', { name: '→ ENCODE' }).click()
    await expect(page.getByTestId('base64-encoded')).toHaveValue('SGVsbG8gUUEh')
  })

  test('decode обратно: SGVsbG8gUUEh → Hello QA!', async ({ page }) => {
    await page.getByTestId('base64-encoded').fill('SGVsbG8gUUEh')
    await page.getByRole('button', { name: '← DECODE' }).click()
    await expect(page.getByTestId('base64-plain')).toHaveValue('Hello QA!')
  })

  test('encode кириллицы (UTF-8) — результат не пустой и в base64', async ({ page }) => {
    await page.getByTestId('base64-plain').fill('Привет')
    await page.getByRole('button', { name: '→ ENCODE' }).click()
    const val = await page.getByTestId('base64-encoded').inputValue()
    expect(val).not.toBe('')
    expect(val).toMatch(/^[A-Za-z0-9+/]+=*$/)
  })

  test('encode+decode кириллицы даёт исходную строку', async ({ page }) => {
    await page.getByTestId('base64-plain').fill('Привет QA!')
    await page.getByRole('button', { name: '→ ENCODE' }).click()
    // теперь декодируем обратно
    await page.getByTestId('base64-plain').fill('')
    await page.getByRole('button', { name: '← DECODE' }).click()
    await expect(page.getByTestId('base64-plain')).toHaveValue('Привет QA!')
  })

  test('невалидный base64 показывает ошибку ERR', async ({ page }) => {
    await page.getByTestId('base64-encoded').fill('not-valid!!!')
    await page.getByRole('button', { name: '← DECODE' }).click()
    await expect(page.getByTestId('base64-error')).toBeVisible()
  })

  test('encode пустой строки → пустой результат', async ({ page }) => {
    await page.getByTestId('base64-plain').fill('')
    await page.getByRole('button', { name: '→ ENCODE' }).click()
    await expect(page.getByTestId('base64-encoded')).toHaveValue('')
  })

  test('encode строки с emoji — результат не пустой', async ({ page }) => {
    await page.getByTestId('base64-plain').fill('QA 🚀')
    await page.getByRole('button', { name: '→ ENCODE' }).click()
    const val = await page.getByTestId('base64-encoded').inputValue()
    expect(val).not.toBe('')
  })

})
