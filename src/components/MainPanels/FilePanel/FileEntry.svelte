<script lang="ts">
  import StarIcon from "../../../lineicons-free/star.svg";
  import StarFilledIcon from "../../../lineicons-free/star-filled.svg";

  import { openFile } from "../../../controllers/UIController";
  import {
    favourites,
    baseDirectory,
  } from "../../../controllers/AppController";
  import {
    favourites as FavouritesStore,
    baseDirectory as BaseDirectoryStore,
  } from "../../../stores/AppState";

  import { join } from "path-browserify";

  export let path;
</script>

<div
  on:click={() => {
    openFile(join(baseDirectory.get(), path));
  }}
>
  <span
    on:click|stopPropagation={() => {
      favourites.toggle(path);
    }}
  >
    <svelte:component
      this={$FavouritesStore.includes(path) ? StarFilledIcon : StarIcon}
      fill="var(--fill-colour)"
    />
  </span>
  {path}
</div>

<style lang="scss">
  div {
    padding: 5px 0;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    > span {
      // Favourite icon
      line-height: 0;
      margin: 0 5px;
      min-width: 0.8em;
      width: 0.8em;

      $starredColour: #f8b714;
      --fill-colour: #{lighten($starredColour, 20%)};

      &:hover {
        --fill-colour: #{$starredColour};
      }
    }
  }
</style>
