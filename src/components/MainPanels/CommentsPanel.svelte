<script lang="ts">
  import UIState from "../../stores/UIState";

  import PanelBase from "../Bases/PanelBase.svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
  import registerMonacoLayoutTrigger from "../MonacoLayoutTrigger";
  import registerMonacoScrollSync from "../MonacoScrollSync";
</script>

<PanelBase styles={{ flex: 1, "min-width": '100px' }} options={{ resizeBar: false }}>
  <div>Comments</div>
  <MonacoEditor
    options={{
      lineNumbers: "off",
    }}
    postLoadCallback={(editor) => {
      registerMonacoScrollSync(editor);
      registerMonacoLayoutTrigger(editor);
    }}
  />
</PanelBase>
