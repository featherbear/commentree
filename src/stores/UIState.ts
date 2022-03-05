import { writable } from "svelte/store";

export type UIStateType = {
    filePanelVisible: boolean
    favouritesVisible: boolean
    metadataVisible: boolean
    activeFile: string
}

export default writable<UIStateType>({
    filePanelVisible: false,
    favouritesVisible: false,
    metadataVisible: false,
    activeFile: null
})