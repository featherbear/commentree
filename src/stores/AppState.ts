import { readable } from "svelte/store";
import type { Subscriber } from 'svelte/store'

let data = {
    favourites: new Set<string>()
}

let _updateStore: Subscriber<string[]>;

export const favourites = {
    list() {
        return Array.from(data.favourites)
    },
    set(file: string, add: boolean = true) {
        if (add) {
            data.favourites.add(file)
        } else {
            data.favourites.delete(file)
        }

        _updateStore(favourites.list())
    },
    store: readable<string[]>([], (update) => {
        _updateStore = update
    })
}
