<script lang="ts">
  import a from "../../stores/UIState";
  import PanelBase from "../Bases/PanelBase.svelte";
  import { favourites } from "../../stores/AppState";
  let FavouritesStore = favourites.store;
</script>

<PanelBase
  styles={{
    width: "200px",
  }}
  options={{ resizeBar: false }}
>
  <div>
    {#if $FavouritesStore.length > 0}
      <section title="Favourites">
        {#each $FavouritesStore as path}
          <div>{path}</div>
        {/each}
      </section>
    {/if}
  </div>
  <section title="Files">File tree goes here</section>

  <button
    on:click={() => {
      favourites.set(Math.random());
    }}>aaa</button
  >
</PanelBase>

<style lang="scss">
  section {
    &::before {
      content: attr(title);
    }
  }
</style>
