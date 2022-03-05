<script lang="ts">
  import UIState from "../../../stores/UIState";
  import { toggleFavourites } from "../../../controllers/UIController";

  import PanelBase from "../../Bases/PanelBase.svelte";
  import FileEntry from "./FileEntry.svelte";

  import ChevronIcon from "../../../lineicons-free/chevron-down.svg";
  import { favourites } from "../../../stores/AppState";
  let FavouritesStore = favourites.store;

  import { slide } from "svelte/transition";
</script>

<PanelBase
  styles={{
    width: "200px",
  }}
  options={{ resizeBar: false }}
>
  {#if $FavouritesStore.length > 0}
    <section
      transition:slide
      type="favourites"
      class:is-open={$UIState.favouritesVisible}
    >
      <header
        on:click={() => {
          toggleFavourites();
        }}
      >
        <span><ChevronIcon fill="white" /></span>Favourites
      </header>
      {#if $UIState.favouritesVisible}
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
    <FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} /><FileEntry path={"abc"} />
    <FileEntry path={"abc"} />
  </section>
  <div spacer style="flex: 1" />
  <section title="Metadata">File metadata goes here</section>

  <button
    on:click={() => {
      favourites.toggle(Math.random());
    }}>aaa</button
  >
</PanelBase>

<style lang="scss">
  @import "../../../styles/site.scss";
  section {
    position: relative;

    header {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 20px;
      background-color: darken($panelBackgroundColour, 5%);
      content: attr(title);
      padding: 5px 0;
    }

    &:not(:first-child) {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  section[type="favourites"] {
    > header {
      display: flex;
      align-items: center;
      cursor: pointer;

      > span {
        width: 12px;
        margin: 0 5px;
      }
    }
    &.is-open > header > span {
      transform: rotate(-90deg);
    }
  }
</style>
