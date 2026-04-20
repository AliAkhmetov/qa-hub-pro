import { test, expect } from '@playwright/test'

const VALID_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaSBBa2htZXRvdiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxOTk5OTk5OTk5fQ.' +
  'J4kZU5s3t4G0fK2I9Y6p-B6Xp8wLpZ00-v7Z8xY9qEk'

test.describe('JWT decoder', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ru/tools')
  })

  test('кнопка Пример подставляет токен и декодирует', async ({ page }) => {
    await page.getByRole('button', { name: 'Пример' }).first().click()
    const output = page.getByTestId('jwt-output')
    await expect(output).toContainText('HEADER')
    await expect(output).toContainText('PAYLOAD')
    await expect(output).toContainText('HS256')
    await expect(output).toContainText('Ali Akhmetov')
  })

  test('декодирует вручную введённый валидный JWT', async ({ page }) => {
    await page.getByTestId('jwt-input').fill(VALID_JWT)
    const output = page.getByTestId('jwt-output')
    await expect(output).toContainText('HS256')
    await expect(output).toContainText('Ali Akhmetov')
  })

  test('невалидный JWT показывает ошибку ERR', async ({ page }) => {
    await page.getByTestId('jwt-input').fill('this.is.not.a.jwt')
    await expect(page.getByTestId('jwt-output')).toContainText('ERR')
  })

  test('JWT с двумя частями вместо трёх показывает ошибку', async ({ page }) => {
    await page.getByTestId('jwt-input').fill('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0')
    await expect(page.getByTestId('jwt-output')).toContainText('ERR')
  })

  test('пустой инпут не вызывает crash — показывает заглушку', async ({ page }) => {
    // Начальное состояние пустое — должен быть placeholder текст
    await expect(page.getByTestId('jwt-output')).toContainText('Вставьте JWT выше')
  })

  test('кнопка Очистить сбрасывает инпут и вывод', async ({ page }) => {
    await page.getByRole('button', { name: 'Пример' }).first().click()
    await expect(page.getByTestId('jwt-output')).toContainText('HS256')
    await page.getByRole('button', { name: 'Очистить' }).click()
    await expect(page.getByTestId('jwt-output')).toContainText('Вставьте JWT выше')
  })

  test('кнопка "Копировать payload" видна после декодирования', async ({ page }) => {
    await page.getByRole('button', { name: 'Пример' }).first().click()
    await expect(page.getByRole('button', { name: /Копировать payload/i })).toBeVisible()
  })

})
