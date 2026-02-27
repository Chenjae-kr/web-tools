import { test, expect } from '@playwright/test'

test('home renders legacy as-is iframe', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'AS-IS Home (Legacy index.html)' })).toBeVisible()
  await expect(page.getByTitle('legacy-home')).toBeVisible()
  await expect(page.getByRole('link', { name: '새 탭으로 열기' })).toBeVisible()
})
