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
    a = a.slice(1)
    window.electron?.log('pass')
}catch(e:any){
    window.electron?.error(e.stack)
    window.electron?.log('notpass')
}

export {a}
