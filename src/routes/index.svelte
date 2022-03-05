<script>
  import CodePanel from "../components/MainPanels/CodePanel.svelte";

  import FilePanel from "../components/MainPanels/FilePanel/FilePanel.svelte";
  import NotesPanel from "../components/MainPanels/CommentsPanel.svelte";
  import Toolbar from "../components/MainPanels/ToolbarPanel.svelte";

  import uistate from "../stores/UIState";
  let loadedCounter = 0;
</script>

<svelte:head>
  <title>Commentree</title>
</svelte:head>

<main>
  <div class="loader" class:active={loadedCounter < 2} />
  <Toolbar />
  {#if $uistate.filePanelVisible} <FilePanel /> {/if}
  <CodePanel on:loaded={() => loadedCounter++} />
  <NotesPanel on:loaded={() => loadedCounter++} />
</main>

<slot />

<style lang="scss">
  @import '../styles/font.scss';
  @import '../styles/site.scss';

  :global(html),
  :global(body) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;

    user-select: none;

    color: $foregroundColour;
  }

  .loader {
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $panelBackgroundColour;
    &:not(.active) {
      display: none
    }
  }
</style>
