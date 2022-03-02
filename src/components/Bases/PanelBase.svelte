<script lang="ts">
  import VerticalResizeBar from "../VerticalResizeBar.svelte";

  export let styles = {};
  export let options = {
    resizeBar: true,
  };
</script>

<div
  style={Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(" ")}
>
  {#if options.resizeBar} <VerticalResizeBar />{/if}
  <slot />
</div>

<style lang="scss">
  @import "../../styles/site.scss";
  div {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: $panelBackgroundColour;
    border-right: 1px solid darken($panelBackgroundColour, 20%);
  }
</style>
