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
    toggle(file: string, forceState: boolean = null) {
        let nextState = forceState
        if (nextState === null) {
            nextState = !data.favourites.has(file)
        }
        if (nextState) {
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
