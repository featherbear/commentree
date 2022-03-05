<script lang="ts">
  import UIState from "../../stores/UIState";
  import PanelBase from "../Bases/PanelBase.svelte";
</script>

<PanelBase styles={{ width: "50%" }}>
  Code
  {$UIState.activeFile}
</PanelBase>
