import { writable } from "svelte/store";

export type UIStateType = {
    filePanelVisible: boolean
    favouritesVisible: boolean
    metadataVisible: boolean
    activeFile: string
}

// TODO: Make each state its own store
export default writable<UIStateType>({
    filePanelVisible: false,
    favouritesVisible: false,
    metadataVisible: false,
    activeFile: null
})

export const activeFileContent = writable<string>("")
