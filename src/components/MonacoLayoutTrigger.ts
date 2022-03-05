import type MonacoType from 'monaco-editor'

let listeners: MonacoType.editor.IStandaloneCodeEditor[] = []

export default function registerMonacoLayoutTrigger(editor: MonacoType.editor.IStandaloneCodeEditor) {
    listeners.push(editor)

    editor.onDidScrollChange((evt) => {
        if (!evt.scrollTopChanged) return
        listeners.filter(e => e !== editor).forEach((editor) => editor.setScrollTop(evt.scrollTop))
    });
}

export function triggerMonacoLayoutRefresh() {
    listeners.forEach(editor => {
        editor.layout()
    })
}