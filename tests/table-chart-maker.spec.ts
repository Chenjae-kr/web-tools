import { test, expect } from '@playwright/test'

test('can navigate to table-chart-maker route', async ({ page }) => {
  await page.goto('./#/table-chart-maker')
  await expect(page.getByRole('heading', { name: 'Table/JSON → Chart Image (초안)' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'BAR' })).toBeVisible()
})

test('table-chart-maker has legend and watermark controls', async ({ page }) => {
  await page.goto('./#/table-chart-maker')
  await expect(page.getByText('Legend / Label')).toBeVisible()
  await expect(page.getByText('Watermark')).toBeVisible()
  await expect(page.getByRole('button', { name: 'TEXT' })).toBeVisible()
})
