const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    log: (e) => ipcRenderer.send('log', e),
    error: (e) => ipcRenderer.send('error', e)
})