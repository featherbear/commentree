import { readable } from "svelte/store";
import type { Subscriber } from 'svelte/store'

import comp from 'deflate-js'
import * as convTool from 'uint8-to-base64'

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

export const serialisation = {
    export() {
        let payload =

        {
            favourites: Array.from(data.favourites),
        };

        payload = { ...payload, ...{ application: 'commentree' } }
        payload = [payload, payload, payload, payload]
        payload = [payload, payload, payload, payload]
        payload = [payload, payload, payload, payload]
        payload = [payload, payload, payload, payload]
        payload = [payload, payload, payload, payload]

        let string_payload = JSON.stringify(payload)
        let uint_payload = new TextEncoder().encode(string_payload)
        let compressed_payload = comp.deflate(uint_payload, 9)
        let encoded_payload = convTool.encode(compressed_payload)

        return encoded_payload
    },
    import(encoded_payload: string) {
        let decoded_payload = convTool.decode(encoded_payload)
        let decompressed_payload = comp.inflate(decoded_payload)
        let uint_payload = new Uint8Array(decompressed_payload)
        let string_payload = new TextDecoder('utf-8').decode(uint_payload)
        let payload = JSON.parse(string_payload)

        return payload
    }

}

