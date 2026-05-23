import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: 'tests',
    timeout: 30_000,
    expect: { timeout: 5000 },
    fullyParallel: false,
    reporter: [['html', { open: 'never' }]],
    use: {
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'electron',
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
