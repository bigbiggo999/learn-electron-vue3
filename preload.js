const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getAppPath: () => ipcRenderer.invoke('app/get-app-path')
})
