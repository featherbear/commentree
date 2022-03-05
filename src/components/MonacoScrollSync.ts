import type MonacoType from 'monaco-editor'

let listeners: MonacoType.editor.IStandaloneCodeEditor[] = []

export default function registerMonacoScrollSync(editor: MonacoType.editor.IStandaloneCodeEditor) {
    listeners.push(editor)

    editor.onDidScrollChange((evt) => {
        listeners.filter(e => e !== editor).forEach((editor) => {
            editor.setScrollPosition(
                {
                    scrollLeft: evt.scrollLeft,
                    scrollTop: evt.scrollTop,
                },
                0
            );
        })
    });
}