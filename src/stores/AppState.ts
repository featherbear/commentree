import { readable } from "svelte/store";
import type { Subscriber } from 'svelte/store'

let data = {
    favourites: new Set<string>()
}

export type DataType = typeof data

export function replaceData(newData: typeof data) {
    data = newData
    
    _updateFavouritesStore(favourites.list())
}


let _updateFavouritesStore: Subscriber<string[]>;

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

        _updateFavouritesStore(favourites.list())
    },
    store: readable<string[]>([], (update) => {
        _updateFavouritesStore = update
    })
}

