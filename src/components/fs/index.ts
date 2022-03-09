import * as Tauri from './tauri'

const isTauriInstance = () => window?.__TAURI_IPC__
const withTauri = (fn: Function) => isTauriInstance() ? fn() : alert("Function only available in a Tauri instance")

export function listDir() {
    withTauri(() => {
        Tauri.listDir()
    })
}
