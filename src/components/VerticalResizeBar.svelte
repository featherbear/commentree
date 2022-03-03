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
  div {
    position: absolute;
    top: 0;
    right: 0;

    height: 100%;
    width: 5px;

    background: red;

    cursor: col-resize;
  }
</style>
