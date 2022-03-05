<script lang="ts">
  import UIState from "../../stores/UIState";

  import PanelBase from "../Bases/PanelBase.svelte";
</script>

<PanelBase styles={{ flex: 1 }} options={{ resizeBar: false }}>
  Notes
  {$UIState.activeFile}
</PanelBase>
