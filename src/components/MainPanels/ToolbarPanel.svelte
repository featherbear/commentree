<script lang="ts">
  import { toggleFilePanel } from "../../controllers/UIController";

  import UIState from "../../stores/UIState";
  import PanelBase from "../Bases/PanelBase.svelte";
</script>

<PanelBase
  styles={{
    width: "50px",
  }}
  options={{
    resizeBar: false,
  }}
>
  <div
    on:click={() => {
      toggleFilePanel();
    }}
  >
    Files
  </div>
  <div>Export</div>
  <div on:click={() => {
    prompt("Exported data", 'sdad');

  }}>Import</div>
</PanelBase>

<style lang="scss">
  div {
    height: 30px;
    cursor: pointer;
    padding: 10px;
  }
</style>
