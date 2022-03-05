<script lang="ts">
  import UIState from "../../stores/UIState";

  import PanelBase from "../Bases/PanelBase.svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
  import registerMonacoScrollSync from "../MonacoScrollSync";
</script>

<PanelBase styles={{ flex: 1 }} options={{ resizeBar: false }}>
  <div>Comments</div>
  <MonacoEditor
    postLoadCallback={(editor) => {
      registerMonacoScrollSync(editor);
    }}
    on:loaded
  />
</PanelBase>
