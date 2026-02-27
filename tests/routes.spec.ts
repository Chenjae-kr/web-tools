import { test, expect } from '@playwright/test'

test('can navigate to thumbnail-maker route', async ({ page }) => {
  await page.goto('./#/thumbnail-maker')
  await expect(page.getByRole('heading', { name: 'Thumbnail Maker (Parity 확장 중)' })).toBeVisible()
  await expect(page.getByRole('button', { name: '썸네일 다운로드' })).toBeVisible()
})
