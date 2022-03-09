import * as Tauri from './tauri'

const isTauriInstance = () => window?.__TAURI_IPC__

function withTauri<T = any>(fn: () => T): ReturnType<typeof fn> {
    if (!isTauriInstance()) {
        alert("Function only available in a Tauri instance")
    } else {
        return fn()
    }
}

export function select_dir() {
    return withTauri(() => Tauri.select_dir())
}

export function list_dir(dir: string) {
    return withTauri(() => Tauri.list_dir(dir))
}

export function read_file(path: string) {
    return withTauri(() => Tauri.read_file(path))
}
