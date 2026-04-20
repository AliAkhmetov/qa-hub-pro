import { test, expect } from '@playwright/test'

test.describe('Smoke — основные страницы', () => {

  test('главная /ru загружается и показывает заголовок', async ({ page }) => {
    await page.goto('/ru')
    await expect(page).toHaveTitle(/QA Hub/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('navbar содержит все 4 ссылки', async ({ page }) => {
    await page.goto('/ru')
    await expect(page.locator('nav a[href="/ru"]').first()).toBeVisible()
    await expect(page.locator('nav a[href="/ru/roadmap"]')).toBeVisible()
    await expect(page.locator('nav a[href="/ru/tools"]')).toBeVisible()
    await expect(page.locator('nav a[href="/ru/about"]')).toBeVisible()
  })

  test('страница /ru/tools загружается со всеми 5 инструментами', async ({ page }) => {
    await page.goto('/ru/tools')
    await expect(page).toHaveTitle(/QA Hub/)
    // Каждый инструмент помечен TOOL 0x / 05
    await expect(page.getByText('TOOL 01 / 05')).toBeVisible()
    await expect(page.getByText('TOOL 05 / 05')).toBeVisible()
  })

  test('несуществующая страница отдаёт 404', async ({ page }) => {
    const response = await page.goto('/ru/this-page-does-not-exist-xyz')
    expect(response?.status()).toBe(404)
  })

  test('переход по navbar: База знаний → Инструменты', async ({ page }) => {
    await page.goto('/ru')
    await page.locator('nav a[href="/ru/tools"]').click()
    await expect(page).toHaveURL(/\/ru\/tools/)
    await expect(page).toHaveTitle(/QA Hub/)
  })

  test('переключатель тёмной темы присутствует и кликабелен', async ({ page }) => {
    await page.goto('/ru')
    // ThemeSwitcher — единственная кнопка без текста в navbar
    const themeBtn = page.locator('nav button').first()
    await expect(themeBtn).toBeVisible()
    await themeBtn.click()
    // После клика страница не падает
    await expect(page.locator('h1').first()).toBeVisible()
  })

})
