const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const {spawn} = require('child_process')
const HOST = 'http://localhost:4000'

app.commandLine.appendSwitch('log-level', 'silent')
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
        if(log === 'pass'){
            console.log('\x1b[32mCI pass\x1b[0m')
        }else{
            console.error('\x1b[31mCI not pass\x1b[0m')
            process.exit(1)
        }
        app.quit()
    })
    ipcMain.on('error', (_event, log) => {
        console.error(`\x1b[31m${log}\x1b[0m`)
    })
    try{
        await win.loadURL(HOST)
    }catch(e){
        console.error(`\x1b[31m${e.message}\x1b[0m`)
        vite?.kill()
        process.exit(1)
    }
}

let vite
app.whenReady().then(() => {
    vite = spawn('npx', ['vite', '--port', '4000', '--strictPort'])
    vite.stdout.on('data', data=>{
        if(data.toString().match(/vite.*.ready/i)){
            createWindow()
        }
    })
    vite.stderr.on('data', data=>{
        console.error(`\x1b[31m${data.toString()}\x1b[0m`)
        vite.kill()
        process.exit(1)
    })
})
app.on('window-all-closed', () => {
    app.quit()
})
app.on('before-quit',()=>{
    if(vite)
        vite.kill()
})