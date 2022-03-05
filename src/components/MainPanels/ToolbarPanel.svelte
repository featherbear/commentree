<script lang="ts">
  import { toggleFilePanel } from "../../controllers/UIController";

  import UIState from "../../stores/UIState";
  import PanelBase from "../Bases/PanelBase.svelte";

  import SaveIcon from "../../lineicons-free/save.svg";
  import LoadIcon from "../../lineicons-free/inbox.svg";
  import FilesIcon from "../../lineicons-free/radio-button.svg";
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
    <FilesIcon fill="white" />
  </div>
  <section>
    <div>
      <LoadIcon fill="white" />
    </div>
    <div
      on:click={() => {
        prompt("Exported data", "sdad");
      }}
    >
      <SaveIcon fill="white" />
    </div>
  </section>
</PanelBase>

<style lang="scss">
  div {
    height: 30px;
    cursor: pointer;
    padding: 10px;
  }
</style>
