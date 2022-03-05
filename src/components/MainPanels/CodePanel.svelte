<script lang="ts">
  import UIState from "../../stores/UIState";
  import PanelBase from "../Bases/PanelBase.svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
</script>

<PanelBase styles={{ width: "50%" }}>
  Code
  {$UIState.activeFile}
  <MonacoEditor
    options={{ readOnly: true }}
    postLoadCallback={(editor) => {
      const messageContribution = editor.getContribution(
        "editor.contrib.messageController"
      );
      const diposable = editor.onDidAttemptReadOnlyEdit(() =>
        messageContribution.dispose()
      );
    }}
  />
</PanelBase>
