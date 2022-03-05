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
  {#if options.resizeBar}
    <section>
      <slot />
    </section>
    <VerticalResizeBar
      on:resize={({ detail }) => handleResize(detail)}
      on:resize
    />
  {:else}
    <slot />
  {/if}
</div>

<style lang="scss">
  @import "../../styles/site.scss";
  div {
    position: relative;
    display: flex;
    background-color: $panelBackgroundColour;

    &.resizable {
      flex-direction: row;
      > section {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
      }
    }
    &:not(.resizable) {
      flex-direction: column;
      border-right: 1px solid $panelBorderColour;
    }
  }
</style>
