import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: 'tests',
    timeout: 30_000,
    expect: { timeout: 5000 },
    fullyParallel: false,  // 改为顺序执行，便于查看
    reporter: [['html', { open: 'never' }]],
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        headless: false,  // 显示浏览器窗口
        navigationTimeout: 30_000,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ],
    webServer: {
        command: 'npm run dev:vite',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
        timeout: 60_000,
    }
})
