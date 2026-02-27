import { test, expect } from '@playwright/test'

test('landing renders migration info', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'web-tools (dev-tools-next)' })).toBeVisible()
  await expect(page.getByText('GitHub Pages 기반 점진 마이그레이션 프로젝트')).toBeVisible()
  await expect(page.getByRole('link', { name: 'dev-tools-next-migration-plan.md 열기' })).toBeVisible()
})
