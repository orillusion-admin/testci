declare global {
    interface Window {
        electron: {
            log: (e: any) => void
            error: (e: any) => void
        }
    }
}

let a:string = 'test'
try{
    a = {d:1}
    a.slice(1)
    window.electron.log('pass')
}catch(e){
    window.electron.error(e.stack)
    window.electron.log('notpass')
}

export {a}