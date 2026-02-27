import { test, expect } from '@playwright/test'

test('thumbnail maker preset switch updates summary', async ({ page }) => {
  await page.goto('./#/thumbnail-maker')
  await page.getByRole('button', { name: 'blog' }).click()
  await expect(page.locator('pre').last()).toContainText('"preset": "blog"')
  await expect(page.locator('pre').last()).toContainText('"ratio": "4:3"')
})

test('thumbnail maker overlay switch updates summary', async ({ page }) => {
  await page.goto('./#/thumbnail-maker')
  await page.getByRole('button', { name: 'vignette' }).click()
  await expect(page.locator('pre').last()).toContainText('"overlayMode": "vignette"')
})
