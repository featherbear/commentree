import { readable } from "svelte/store";
import type { Subscriber } from 'svelte/store'

import comp from 'deflate-js'

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

        let s_payload = JSON.stringify(payload)
        console.log("Original payload size is", s_payload.length);
        let uint8 = new TextEncoder().encode(s_payload)
        console.log("uint8 payload size is", uint8.length);

        let lastComp;
        for (let i = 0; i < 10; i++) {
            let v = comp.deflate(uint8, i)
            console.log('compression level', i, 'gave payload size of', v.length);
            lastComp = v
        }

        console.log(s_payload);

        let inflate = comp.inflate(lastComp)
        console.log(inflate);

        console.log(JSON.parse(new TextDecoder('utf-8').decode(new Uint8Array(inflate))))

        return s_payload
    },
    import() {

    }

}