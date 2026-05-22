import { test, expect } from '@playwright/test'

test('关于页面显示核心说明', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h2')).toHaveText('关于这个项目')
    await expect(page.locator('li', { hasText: 'Electron 主进程' })).toHaveCount(1)
})
