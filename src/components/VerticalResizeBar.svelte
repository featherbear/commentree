<script lang="ts">
  let elem: HTMLElement;

  const dispatch = createEventDispatcher();

  import { createEventDispatcher, onMount } from "svelte";

  onMount(() => {
    let pos;

    function resize(e: MouseEvent) {
      let changeX = pos - e.x
      pos = e.x

      dispatch("resize", changeX)      
    }

    elem.addEventListener(
      "mousedown",
      (e) => {
        pos = e.x;
        document.addEventListener("mousemove", resize, false)
      },
      false
    );

    document.addEventListener(
      "mouseup",
      () => document.removeEventListener("mousemove", resize, false),
      false
    );
  });
</script>

<div bind:this={elem}>
  <!-- Add some drag handle -->
</div>

<style lang="scss">
  @import "../styles/site.scss";
  div {
    position: absolute;
    top: 0;
    right: 0;

    height: 100%;
    width: 5px;

    background: $panelBorderColour;
    &:not(:hover) {
      transition: background-color 250ms;
    }
    &:hover, &:active {
      background: lighten($panelBorderColour, 20%);
    }
    cursor: col-resize;
  }
</style>
