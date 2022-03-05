import type MonacoType from 'monaco-editor'

let listeners: MonacoType.editor.IStandaloneCodeEditor[] = []

export default function registerMonacoLineSync(editor: MonacoType.editor.IStandaloneCodeEditor) {
    listeners.push(editor)

    editor.onDidChangeCursorPosition((evt) => {
        let newLine = evt.position.lineNumber
        listeners.filter(e => e !== editor).forEach((editor) => {
            let currentPosition = editor.getPosition()
            if (currentPosition.lineNumber == newLine) return
            editor.setPosition({ lineNumber: newLine, column: 0 })
        })
    });
}