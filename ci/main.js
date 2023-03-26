const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const {spawn} = require('child_process')

const HOST = 'http://localhost:4000'

const createWindow = async ()=>{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // show: false,
        // frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeintegrationinsubframes: true,
            webviewTag: true
        }
    })
    ipcMain.on('log', (_event, log) => {
        console.log(log)
        
        if(log === 'pass')
            console.log('\x1b[32mCI pass\x1b[0m')
        else
            console.error('\x1b[31mCI not pass\x1b[0m')
 
        app.quit()
    })
    ipcMain.on('error', (_event, log) => {
        console.error(log)
    })

    await win.loadURL(HOST + '/new_test/?auto')
}

let vite
app.whenReady().then(() => {
    vite = spawn('npx', ['vite', '--port', '4000', '--strictPort'])
    vite.stdout.on('data', data=>{
        if(data.toString().match(/vite.*.ready/i)){
            createWindow()
        }
    })
    // createWindow()
})
app.on('window-all-closed', () => {
    app.quit()
})
app.on('before-quit',()=>{
    if(vite)
        vite.kill()
})