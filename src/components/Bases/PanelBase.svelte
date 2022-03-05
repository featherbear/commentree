<script lang="ts">
  import VerticalResizeBar from "../VerticalResizeBar.svelte";
  let elem: HTMLElement;
  export let styles = {};
  export let options = {
    resizeBar: true,
  };

  function handleResize(offset) {
    styles["width"] =
      Math.max(parseInt(getComputedStyle(elem, "").width) - offset, 100) + "px";
  }
</script>

<div
  bind:this={elem}
  class:resizable={options.resizeBar}
  style={Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(" ")}
>
  <slot />
  {#if options.resizeBar}
    <VerticalResizeBar on:resize={({ detail }) => handleResize(detail)} />{/if}
</div>

<style lang="scss">
  @import "../../styles/site.scss";
  div {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: $panelBackgroundColour;
    &:not(.resizable) {
      border-right: 1px solid $panelBorderColour;
    }
  }
</style>
