import { writable } from "svelte/store";

export default writable({
    filePanelVisible: false,
    favouritesVisible: false,
    metadataVisible: false,
    activeFile: null as string
})