declare global {
    interface Window {
        electron: {
            log: (e: any) => void
            error: (e: any) => void
        }
    }
}

window.electron.log('pass')

let a = {}
export {a}