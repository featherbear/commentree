<script lang="ts">
  let elem: HTMLElement;

  import { onMount } from "svelte";
  function resize(e: MouseEvent) {
    console.log(e);
    Math.max(e.clientX, 0)
  }

  onMount(() => {
    elem.addEventListener(
      "mousedown",
      () => document.addEventListener("mousemove", resize, false),
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
  div {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 5px;

    background: red;

    cursor: col-resize;
  }
</style>
