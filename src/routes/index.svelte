<script>
  import CodePanel from "../components/MainPanels/CodePanel.svelte";

  import FilePanel from "../components/MainPanels/FilePanel/FilePanel.svelte";
  import NotesPanel from "../components/MainPanels/CommentsPanel.svelte";
  import Toolbar from "../components/MainPanels/ToolbarPanel.svelte";

  import uistate from "../stores/UIState";
</script>

<svelte:head>
  <title>Commentree</title>
</svelte:head>

<main>
  <Toolbar />
  {#if $uistate.filePanelVisible} <FilePanel /> {/if}
  <CodePanel />
  <NotesPanel />
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
</style>
