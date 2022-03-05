<script lang="ts">
  import UIState from "../../stores/UIState";

  import PanelBase from "../Bases/PanelBase.svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
</script>

<PanelBase styles={{ flex: 1 }} options={{ resizeBar: false }}>
  Notes
  {$UIState.activeFile}
  <MonacoEditor />
</PanelBase>
