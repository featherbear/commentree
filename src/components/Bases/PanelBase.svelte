<script lang="ts">
  import VerticalResizeBar from "../VerticalResizeBar.svelte";
  let elem: HTMLElement
  export let styles = {};
  export let options = {
    resizeBar: true,
  };

  function handleResize(offset) {
    console.log('resizes', offset);
    styles['width'] = Math.max(parseInt(getComputedStyle(elem, '').width) - offset, 50) + "px";
  }
</script>

<div bind:this={elem}
  style={Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(" ")}
>
{JSON.stringify(styles)}
<slot />
{#if options.resizeBar} <VerticalResizeBar on:resize={({detail}) => handleResize(detail)} />{/if}
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
