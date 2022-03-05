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

function generateSetState(name: keyof UIStateType) {
    return function (value: any) {
        UIState.update(v => {
            return {
                ...v,
                [name]: value
            }
        })
    }
}

export const toggleFilePanel = generateToggleBooleanState('filePanelVisible')
export const toggleFavourites = generateToggleBooleanState('favouritesVisible')
export const toggleMetadata = generateToggleBooleanState('metadataVisible')
export const setActiveFile = generateSetState('activeFile')