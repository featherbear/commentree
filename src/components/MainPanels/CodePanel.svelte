<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import UIState from "../../stores/UIState";
  import PanelBase from "../Bases/PanelBase.svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
  import registerMonacoScrollSync from "../MonacoScrollSync";
</script>

<PanelBase styles={{ width: "50%" }}>
  <div>File: <span>{$UIState.activeFile ?? ""}</span></div>
  <MonacoEditor
    options={{
      readOnly: true,
      scrollbar: {
        vertical: "hidden",
      },
    }}
    postLoadCallback={(editor) => {
      const messageContribution = editor.getContribution(
        "editor.contrib.messageController"
      );
      const diposable = editor.onDidAttemptReadOnlyEdit(() => {
        messageContribution.dispose();
      });

      registerMonacoScrollSync(editor);
    }}
    on:loaded
  />
</PanelBase>
