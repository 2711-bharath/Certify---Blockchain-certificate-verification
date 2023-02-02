<template>
  <div class="file-viewer">
    <div id="webviewer" ref="viewer"></div>
  </div>
</template>

<script>
  import WebViewer from "@pdftron/webviewer";

  export default {
    name: "FileViewer",
    props: { path: { type: String } },
    mounted() {
      WebViewer({ path: this.path }, this.$refs.viewer).then((instance) => {
        instance.UI.enableElements([
          "bookmarksPanel",
          "bookmarksPanelButton",
          "richTextPopup",
        ]);
        instance.UI.enableFeatures([instance.UI.Feature.Measurement]);
        const {
          setHeaderItems,
          enableElements,
          enableFeatures,
          setTheme,
          Feature,
        } = instance.UI;
        setHeaderItems((header) => {
          const items = header.getItems();
          const copiedItems = items.splice(2, 18);
          copiedItems.reverse();
          header.update(
            [].concat(items.slice(0, 2), copiedItems, items.slice(2))
          );
        });
        enableElements([]);

        enableFeatures([
          Feature.Ribbons,
          Feature.TextSelection,
          Feature.Annotations,
        ]);
        setTheme("light");
      });
    },
  };
</script>

<style>
  /* .file-viewer {
    width: 100vh;
    height: 100vw;
  } */
  #webviewer {
    height: 90vh;
    width: 90vw;
  }
</style>
