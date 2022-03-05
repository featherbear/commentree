<script lang="ts">
  import type MonacoType from "monaco-editor";
  import { createEventDispatcher, onMount } from "svelte";

  let monacoElem;
  let editor: MonacoType.editor.IStandaloneCodeEditor;
  export let options: MonacoType.editor.IStandaloneEditorConstructionOptions =
    {};
  export let postLoadCallback: (
    editor: MonacoType.editor.IStandaloneCodeEditor
  ) => void = () => {};

  const dispatch = createEventDispatcher();

  onMount(async () => {
    let Monaco = await import("monaco-editor");
    console.log(Monaco);
    editor = Monaco.editor.create(monacoElem, {
      automaticLayout: true,
      value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
        "\n"
      ),
      minimap: {
        enabled: false,
      },
      ...options,
    });
    console.log(editor);
    setTimeout(() => postLoadCallback?.(editor), 0);

    dispatch("loaded");

    return () => {
      editor.dispose();
    };
  });
</script>

<div class="editor" bind:this={monacoElem} />

<style lang="scss">
  .editor {
    // min-height: 100%;
    height: 100%;
  }
</style>
