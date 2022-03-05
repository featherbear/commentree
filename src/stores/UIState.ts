import { writable } from "svelte/store";

export default writable({
    filePanelVisible: false,
    favouritesVisible: false,
    activeFile: null as string
})