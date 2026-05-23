import { test, expect } from '@playwright/test'

test('首页内容与获取 appPath 按钮', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h2')).toHaveText('欢迎来到首页')

    // 点击按钮后应显示 Electron API 未就绪 的提示（在浏览器环境中）
    await page.click('button:has-text("获取应用数据目录")')
    await expect(page.locator('p:has-text("Electron API 未就绪")')).toContainText('Electron API 未就绪')
})

test('表单输入与提交功能', async ({ page }) => {
    await page.goto('/')
    
    // 验证表单标题存在
    await expect(page.locator('h3')).toHaveText('用户信息表单')
    
    // 填写用户名
    const usernameInput = page.locator('#username')
    await usernameInput.fill('测试用户')
    await expect(usernameInput).toHaveValue('测试用户')
    
    // 填写邮箱
    const emailInput = page.locator('#email')
    await emailInput.fill('test@example.com')
    await expect(emailInput).toHaveValue('test@example.com')
    
    // 提交表单
    await page.click('button:has-text("提交")')
    
    // 验证提交成功提示
    const successMsg = page.locator('.success-message')
    await expect(successMsg).toContainText('表单已提交')
    await expect(successMsg).toContainText('测试用户')
    await expect(successMsg).toContainText('test@example.com')
})
