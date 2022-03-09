import { writable } from "svelte/store";

export const filePanelVisible = writable(false)
export const favouritesVisible = writable(false)
export const metadataVisible = writable(false)

export type activeFileType = { path: string, content: Promise<string> }
export const activeFile = writable<activeFileType>()
