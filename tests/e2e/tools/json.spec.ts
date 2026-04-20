import { test, expect } from '@playwright/test'

const VALID_JSON = '{"name":"ali","skills":["qa","api"],"level":3}'
const INVALID_JSON = '{"name": "ali", skills: ["qa"]}'

test.describe('JSON formatter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ru/tools')
  })

  test('предустановленный JSON уже в инпуте при загрузке', async ({ page }) => {
    const input = page.getByTestId('json-input')
    await expect(input).toHaveValue('{"name":"ali","skills":["qa","api"]}')
  })

  test('форматирование: минифицированный JSON → pretty-print', async ({ page }) => {
    await page.getByTestId('json-input').fill(VALID_JSON)
    await page.getByRole('button', { name: 'Форматировать' }).click()
    const output = page.getByTestId('json-output')
    const val = await output.inputValue()
    expect(val).toContain('"name"')
    expect(val).toContain('"skills"')
    expect(val).toContain('\n')  // pretty — многострочный
  })

  test('статус "OK · ВАЛИДНЫЙ JSON" после успешного форматирования', async ({ page }) => {
    await page.getByTestId('json-input').fill(VALID_JSON)
    await page.getByRole('button', { name: 'Форматировать' }).click()
    await expect(page.getByText(/OK.*ВАЛИДНЫЙ JSON/i)).toBeVisible()
  })

  test('минификация: pretty JSON → одна строка без пробелов', async ({ page }) => {
    const pretty = '{\n  "name": "ali",\n  "level": 3\n}'
    await page.getByTestId('json-input').fill(pretty)
    await page.getByRole('button', { name: 'Минифицировать' }).click()
    const val = await page.getByTestId('json-output').inputValue()
    expect(val).not.toContain('\n')
    expect(val).toContain('"name"')
    await expect(page.getByText(/OK.*МИНИФИЦИРОВАН/i)).toBeVisible()
  })

  test('невалидный JSON показывает ERR', async ({ page }) => {
    await page.getByTestId('json-input').fill(INVALID_JSON)
    await page.getByRole('button', { name: 'Форматировать' }).click()
    await expect(page.getByText(/ERR/)).toBeVisible()
  })

  test('пустой инпут — тихий сброс без ошибки', async ({ page }) => {
    await page.getByTestId('json-input').fill('')
    await page.getByRole('button', { name: 'Форматировать' }).click()
    await expect(page.getByText(/OK.*ВАЛИДНЫЙ/i)).not.toBeVisible()
    await expect(page.getByText(/ERR/)).not.toBeVisible()
  })

  test('вложенный JSON форматируется корректно', async ({ page }) => {
    const nested = '{"user":{"name":"ali","skills":["qa","api"]},"active":true}'
    await page.getByTestId('json-input').fill(nested)
    await page.getByRole('button', { name: 'Форматировать' }).click()
    const val = await page.getByTestId('json-output').inputValue()
    expect(val).toContain('"user"')
    expect(val).toContain('"active"')
  })

  test('массив в корне форматируется без ошибок', async ({ page }) => {
    await page.getByTestId('json-input').fill('[{"id":1},{"id":2}]')
    await page.getByRole('button', { name: 'Форматировать' }).click()
    await expect(page.getByText(/OK.*ВАЛИДНЫЙ JSON/i)).toBeVisible()
  })

  test('кнопка Копировать доступна после форматирования', async ({ page }) => {
    await page.getByTestId('json-input').fill(VALID_JSON)
    await page.getByRole('button', { name: 'Форматировать' }).click()
    // Scope к секции #json чтобы не конфликтовать с "Копировать payload" из JWT
    await expect(page.locator('#json').getByRole('button', { name: 'Копировать' })).toBeVisible()
  })

})
