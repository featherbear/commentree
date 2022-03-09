<script lang="ts">
  import { favouritesVisible, metadataVisible } from "../../../stores/UIState";
  import {
    favourites as FavouritesStore,
    files as FilesStore,
  } from "../../../stores/AppState";
  import { favourites } from "../../../controllers/AppController";

  import {
    toggleFavourites,
    toggleMetadata,
  } from "../../../controllers/UIController";

  import PanelBase from "../../Bases/PanelBase.svelte";
  import FileEntry from "./FileEntry.svelte";

  import ChevronIcon from "../../../lineicons-free/chevron-down.svg";

  import { slide } from "svelte/transition";
</script>

<PanelBase
  styles={{
    width: "200px",
    "min-width": "150px",
  }}
>
  <main>
    {#if $FavouritesStore.length > 0}
      <section
        transition:slide
        type="collapsible"
        class:is-open={$favouritesVisible}
      >
        <header
          on:click={() => {
            toggleFavourites();
          }}
        >
          <span><ChevronIcon fill="white" /></span>Favourites
        </header>
        {#if $favouritesVisible}
          <div transition:slide>
            {#each $FavouritesStore as path}
              <FileEntry {path} />
            {/each}
          </div>
        {/if}
      </section>
    {/if}
    <section>
      <header>Files</header>
      {#each $FilesStore as path}
        <FileEntry {path} />
      {/each}
    </section>
  </main>

  <section type="collapsible" class:is-open={$metadataVisible}>
    <header
      on:click={() => {
        toggleMetadata();
      }}
    >
      <span><ChevronIcon fill="white" /></span>Metadata
    </header>
    {#if $metadataVisible}
      <div transition:slide>metadata</div>
    {/if}
  </section>

  <button
    on:click={() => {
      favourites.toggle(Math.random());
    }}>aaa</button
  >
</PanelBase>

<style lang="scss">
  @import "../../../styles/site.scss";
  main {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  section {
    position: relative;

    header {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 20px;
      background-color: darken($panelBackgroundColour, 5%);
      padding: 5px 0;
    }

    &:not(:first-child) {
      border-top: 1px solid $panelBorderColour;
    }

    &[type="collapsible"] {
      > header {
        display: flex;
        align-items: center;
        cursor: pointer;

        > span {
          width: 12px;
          margin: 0 5px;
        }
      }
      &:not(.is-open) > header > span {
        transform: rotate(-90deg);
      }
    }
  }
</style>
