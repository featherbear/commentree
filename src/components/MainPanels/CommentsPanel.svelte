<script lang="ts">
  import { activeFile, type activeFileType } from "../../stores/UIState";
  import { comments } from "../../controllers/AppController";

  import PanelBase from "../Bases/PanelBase.svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
  import registerMonacoLayoutTrigger from "../MonacoLayoutTrigger";
  import registerMonacoLineSync from "../MonacoLineSync";
  import registerMonacoScrollSync from "../MonacoScrollSync";

  import type monaco from "monaco-editor";

  let lastFile: activeFileType;

  function doSave(editor: monaco.editor.IStandaloneCodeEditor) {
    if (!lastFile?.path) return;
    comments.set(lastFile.path, editor.getValue().trimEnd());
  }
</script>

<PanelBase
  styles={{ flex: 1, "min-width": "100px" }}
  options={{ resizeBar: false }}
>
  <div>Comments</div>
  <MonacoEditor
    options={{
      lineNumbers: "off",
    }}
    postLoadCallback={(editor) => {
      registerMonacoScrollSync(editor);
      registerMonacoLineSync(editor);
      registerMonacoLayoutTrigger(editor);

      activeFile.subscribe((file) => {
        doSave(editor);

        if (!file) return
        let data = comments.get(file.path)
        
        file.content.then(c => {

          let currentLength = data.split("\n").length
          let expectedLength = c.split("\n").length

          while (currentLength < expectedLength) {
            data += '\n'
            currentLength++
          }

          editor.setValue(data)

          lastFile = file
        })
      });
    }}
    on:loaded
  />
</PanelBase>
