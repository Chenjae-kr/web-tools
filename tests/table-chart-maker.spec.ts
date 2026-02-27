import { test, expect } from '@playwright/test'

test('can navigate to table-chart-maker route', async ({ page }) => {
  await page.goto('./#/table-chart-maker')
  await expect(page.getByRole('heading', { name: 'Table/JSON → Chart Image (초안)' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'BAR' })).toBeVisible()
})
