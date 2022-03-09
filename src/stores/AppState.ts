import { writable, type Writable } from "svelte/store";

export const favourites = writable<string[]>([])
export const files = writable<string[]>([])

export const comments: Writable<{[path: string]: string}> = writable({})
export const baseDirectory = writable("")
