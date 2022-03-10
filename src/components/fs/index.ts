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

export function read_file_chunk(path: string, chunk: number = 0) {
    return withTauri(() => Tauri.read_file_chunk(path, 0))
}

export function read_file_chunk_gen(path: string, startingChunk: number = 0) {
    return withTauri(async function* (){
        let data: string;
        while (data = await Tauri.read_file_chunk(path, startingChunk++)) {
            yield data
        }
    })
}

read_file_chunk