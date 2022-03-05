import UIState from "../stores/UIState";
import type { UIStateType } from '../stores/UIState'

function generateToggleBooleanState(name: keyof UIStateType) {
    return function (open?: boolean) {
        UIState.update(v => {
            let newState = (typeof open === 'undefined') ? !v[name] : !!open
            return {
                ...v,
                [name]: newState
            }
        })
    }
}

export const toggleFilePanel = generateToggleBooleanState('filePanelVisible')
export const toggleFavourites = generateToggleBooleanState('favouritesVisible')
export const toggleMetadata = generateToggleBooleanState('metadataVisible')