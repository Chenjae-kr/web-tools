import { test, expect } from '@playwright/test'

test('can navigate to data-converter route and convert json to csv', async ({ page }) => {
  await page.goto('./#/data-converter')
  await expect(page.getByRole('heading', { name: 'Data Converter (초안)' })).toBeVisible()
  await page.getByRole('button', { name: '변환 실행' }).click()
  await expect(page.locator('textarea').nth(1)).toContainText('name,score')
})
