import { test, expect } from '@playwright/test'

test('设置页面切换深色模式', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.locator('h2')).toHaveText('设置')

    const checkbox = page.locator('input[type=checkbox]')
    await expect(checkbox).toHaveCount(1)
    await checkbox.check()
    // 触发 watchEffect 会改变 document.body 的背景色
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    expect(bg).toBe('rgb(15, 23, 42)')
})
