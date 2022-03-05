<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import UIState from "../../stores/UIState";
  import PanelBase from "../Bases/PanelBase.svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
  import registerMonacoLayoutTrigger from "../MonacoLayoutTrigger";
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
      overviewRulerLanes: 0,
    }}
    postLoadCallback={(editor) => {
      const messageContribution = editor.getContribution(
        "editor.contrib.messageController"
      );
      editor.onDidAttemptReadOnlyEdit(() => messageContribution.dispose());

      registerMonacoScrollSync(editor);
      registerMonacoLayoutTrigger(editor);
    }}
  />
</PanelBase>
