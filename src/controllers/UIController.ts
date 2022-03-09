import UIState from "../stores/UIState";
import type { UIStateType } from '../stores/UIState'
import { get } from "svelte/store";

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

function generateSetState<T extends any>(name: keyof UIStateType) {

    /**
     * 
     * @param value New value
     * @param forceUpdate Should the state update be forced even if the update value is the same
     */
    function fn(value: T, forceUpdate: boolean = false) {
        if (get(UIState)[name] !== value || forceUpdate)
            UIState.update(v => {
                return {
                    ...v,
                    [name]: value
                }
            })
    }

    return fn
}

export const toggleFilePanel = generateToggleBooleanState('filePanelVisible')
export const toggleFavourites = generateToggleBooleanState('favouritesVisible')
export const toggleMetadata = generateToggleBooleanState('metadataVisible')
export const setActiveFile = generateSetState('activeFile')