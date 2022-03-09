import { readable } from "svelte/store";

let data = {
    favourites: new Set<string>(),
    files: new Set<string>()
}

export type DataType = typeof data

export function replaceData(newData: typeof data) {
    data = newData

    Object.keys(notifiers).forEach((key) => {
        if (!newData[key]) return
        notifiers[key]()
    })
}

let notifiers: { [key in keyof typeof data]?: Function } = {}

function generateSetHandler(key: keyof typeof data) {

    function list() {
        return Array.from(data[key])
    }

    function toggle(file: string, forceState: boolean = null) {
        let nextState = forceState
        if (nextState === null) {
            nextState = !data[key].has(file)
        }
        if (nextState) {
            data[key].add(file)
        } else {
            data[key].delete(file)
        }

        notifiers[key]?.()
    }

    function set(files: string[]) {
        data[key] = new Set(files)
        notifiers[key]?.()
    }

    const store = readable<string[]>([], (update) => {
        notifiers[key] = () => update(list())
        notifiers[key]()
    })

    return {
        list,
        toggle,
        set,
        store
    }
}


export const favourites = generateSetHandler('favourites')
export const files = generateSetHandler('files')