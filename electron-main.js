const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    // Load Vite dev server when running `npm run dev` or when NODE_ENV is development
    const isDev = process.env.NODE_ENV === 'development' || process.env.npm_lifecycle_event === 'dev'
    if (isDev) {
        win.loadURL('http://localhost:5173')
        // 打开开发者工具，便于调试渲染进程问题
        win.webContents.openDevTools({ mode: 'detach' })
    } else {
        win.loadFile(path.join(__dirname, 'dist', 'index.html'))
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.handle('app/get-app-path', () => app.getPath('userData'))
