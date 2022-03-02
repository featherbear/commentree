import UIState from "../stores/UIState";

export function toggleFilePanel(open?: boolean) {
    UIState.update(v => {
        let newState = (typeof open === 'undefined') ? !v.filePanelVisible : !!open
        return {
            ...v,
            filePanelVisible: newState
        }
    })
}