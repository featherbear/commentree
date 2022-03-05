
import comp from 'deflate-js'
import * as convTool from 'uint8-to-base64'
import { favourites, replaceData } from '../stores/AppState'
import type { DataType } from '../stores/AppState'

export const serialisation = {
    export(raw: boolean = false) {
        let payload: { [k in keyof DataType]: any } = {
            favourites: favourites.list(),
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

        let newData: DataType = {
            favourites: new Set(object.favourites)
        }

        console.log("Updating data", newData)

        replaceData(newData)

        return true;

    }
}

function verifyPayload(payload: { [k in keyof DataType]: any }) {
    if (typeof payload !== 'object') return null
    if (payload['application'] !== 'commentree') return null
    return payload
}