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
    class:active={$UIState.filePanelVisible}
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
  @import '../../styles/site.scss';

  div {
    height: 30px;
    cursor: pointer;
    padding: 10px;
    position: relative;

    & {
      opacity: 0.6;
      &:hover,
      &.active {
        opacity: 1;
      }
    }
    & {
      // Active panel bar
      &.active::before {
        border-left-width: 3px;
      }
      &::before {
        border-style: solid;
        border-color: $accentColour;
        border-width: 0;
        transition: border-width 100ms ease;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        content: "";
      }
    }
  }

  section {
    border-top: 1px solid $panelSectionBorderColour;
  }
</style>
