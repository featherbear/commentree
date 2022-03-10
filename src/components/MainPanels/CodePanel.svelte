<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { activeFile } from "../../stores/UIState";
  import { baseDirectory } from "../../controllers/AppController";
  import PanelBase from "../Bases/PanelBase.svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
  import registerMonacoLayoutTrigger from "../MonacoLayoutTrigger";
  import registerMonacoLineSync from "../MonacoLineSync";
  import registerMonacoScrollSync from "../MonacoScrollSync";
</script>

<PanelBase styles={{ width: "50%" }}>
  <div>File: <span>{$activeFile?.path ?? ""}</span></div>
  <MonacoEditor
    options={{
      readOnly: true,
      scrollbar: {
        vertical: "hidden",
      },
      overviewRulerLanes: 0,
    }}
    postLoadCallback={(editor) => {
      const messageContribution = editor.getContribution(
        "editor.contrib.messageController"
      );
      editor.onDidAttemptReadOnlyEdit(() => messageContribution.dispose());

      registerMonacoScrollSync(editor);
      registerMonacoLineSync(editor);
      registerMonacoLayoutTrigger(editor);

      activeFile.subscribe((file) => {
        if (!file) return;
        file.content.then((data) => {
          editor.setValue(data);
        });
      });
    }}
    on:loaded
  />
</PanelBase>
