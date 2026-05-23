import { test, expect } from '@playwright/test'
import { _electron as electron } from 'playwright'
import path from 'path'

let electronApp

async function getAppWindow() {
    const windows = await electronApp.windows()
    const candidate = windows.find(win => win.url().startsWith('http://localhost:5173'))
    if (candidate)
        return candidate
    return await electronApp.firstWindow()
}

test.beforeAll(async () => {
    electronApp = await electron.launch({
        args: [path.join(__dirname, '..', 'electron-main.js')],
        env: {
            ...process.env,
            NODE_ENV: 'development',
        }
    })

    // 等待 Electron 创建窗口并加载页面
    const window = await electronApp.firstWindow()
    await window.waitForLoadState('domcontentloaded', { timeout: 30000 })
})

test.afterAll(async () => {
    if (electronApp) {
        await electronApp.close()
    }
})

test('Electron 应用启动并显示主窗口', async () => {
    const window = await getAppWindow()
    expect(window).toBeTruthy()
    await window.waitForLoadState('domcontentloaded', { timeout: 30000 })
    await expect(window.locator('h2')).toContainText('欢迎来到首页')
})

test('Electron 应用中的路由导航', async () => {
    const window = await getAppWindow()
    await window.waitForLoadState('domcontentloaded', { timeout: 30000 })

    await window.locator('a[href="/about"]').click()
    await window.waitForLoadState('domcontentloaded', { timeout: 30000 })
    await expect(window.locator('h2')).toContainText('关于这个项目')
})

test('Electron 应用中的表单交互', async () => {
    const window = await getAppWindow()
    await window.waitForLoadState('domcontentloaded', { timeout: 30000 })

    await window.locator('a[href="/"]').click()
    await window.waitForLoadState('domcontentloaded', { timeout: 30000 })

    await window.locator('#username').fill('Electron 测试用户')
    await window.locator('#email').fill('electron@test.com')
    await window.locator('button:has-text("提交")').click()

    const successMsg = window.locator('.success-message')
    await expect(successMsg).toContainText('Electron 测试用户')
    await expect(successMsg).toContainText('electron@test.com')
})

test('Electron 应用中的深色模式切换', async () => {
    const window = await getAppWindow()
    await window.waitForLoadState('domcontentloaded', { timeout: 30000 })

    await window.locator('a[href="/settings"]').click()
    await window.waitForLoadState('domcontentloaded', { timeout: 30000 })

    await expect(window.locator('h2')).toContainText('设置')
    const checkbox = window.locator('input[type="checkbox"]')
    await checkbox.check()

    const bgColor = await window.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor
    })

    expect(bgColor).toContain('rgb(15, 23, 42)')
})
