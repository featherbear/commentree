<script lang="ts">
  import a from "../../stores/UIState";
  import PanelBase from "../Bases/PanelBase.svelte";
  import { favourites } from '../../stores/AppState'
  let FavouritesStore = favourites.store
</script>

<PanelBase
  styles={{
    width: "200px",
  }}
  options={{ resizeBar: false }}
>
<div>
  <span>Favourites</span>
  <div>
    {#each $FavouritesStore as path}
      <div>{path}</div>
    {/each}
  </div>
</div>
<!-- Somehow structure it -->
<div>Files</div>

<button on:click={() => {
}}>aaa</button>
</PanelBase>
