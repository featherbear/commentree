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
    export(raw: boolean = false) {
        let payload = {
            favourites: Array.from(data.favourites),
        };

        payload = { ...payload, ...{ application: 'commentree' } }

        let string_payload = JSON.stringify(payload)
        if (raw) return string_payload

        let uint_payload = new TextEncoder().encode(string_payload)
        let compressed_payload = comp.deflate(uint_payload, 9)
        let encoded_payload = convTool.encode(compressed_payload)

        return encoded_payload
    },
    parse(encoded_payload: string) {
        let payload;
        try {
            try {
                payload = JSON.parse(encoded_payload)
            } catch {
                let decoded_payload = convTool.decode(encoded_payload)
                let decompressed_payload = comp.inflate(decoded_payload)
                let uint_payload = new Uint8Array(decompressed_payload)
                let string_payload = new TextDecoder('utf-8').decode(uint_payload)
                payload = JSON.parse(string_payload)
            }

            return verifyPayload(payload)
        } catch {
            return null
        }
    },
    import(payload: string) {
        let object = serialisation.parse(payload)
        if (!object) return false
        
        console.log("Loaded data", object);
        // TODO: PARSE

        return true;

    }
}

function verifyPayload(payload: object) {
    if (typeof payload !== 'object') return null
    if (payload['application'] !== 'commentree') return null
    return payload
}