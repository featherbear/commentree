import * as UIState from "../stores/UIState";
import { get, type Writable } from "svelte/store";
import * as fs from '../components/fs'


function generateBooleanToggleHandler(store: Writable<boolean>) {
    return function (open?: boolean) {
        store.set(open ?? !get(store))
    }
}

function generateHandler<T>(store: Writable<T>) {

    /**
     * 
     * @param value New value
     * @param forceUpdate Should the state update be forced even if the update value is the same
     */
    function fn(value: T, forceUpdate: boolean = false) {
        if (get(store) !== value || forceUpdate) store.set(value)
    }

    return fn
}

export const toggleFilePanel = generateBooleanToggleHandler(UIState.filePanelVisible)
export const toggleFavourites = generateBooleanToggleHandler(UIState.favouritesVisible)
export const toggleMetadata = generateBooleanToggleHandler(UIState.metadataVisible)

export function openFile(path: string) {
    if (openFile['lastFile'] === path) return

    UIState.activeFile.set({
        path,
        content: new Promise(async (resolve, reject) => {
            let buffer = ""
            for await (let p of fs.read_file_chunk_gen(path)) {
                buffer += p

                /**
                 * Max size = 1024 KB = 1 MB
                 */
                if (buffer.length > 1024 * 1024) {
                    buffer += "\n\n* file contracted *"
                    break
                }
            }

            resolve(buffer)            
        })
    })

    openFile['lastFile'] = path;
}