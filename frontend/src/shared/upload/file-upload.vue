<template>
  <div class="p-4">
    <div id="uppy"></div>
  </div>
</template>

<script>
  import Uppy from "@uppy/core";
  import Dashboard from "@uppy/dashboard";
  import { storage } from "../../utils/plugins/firebase";

  import("@uppy/core/dist/style.css");
  import("@uppy/dashboard/dist/style.css");

  export default {
    name: "App",
    components: {},
    data: () => ({
      uppy: null,
    }),
    mounted() {
      this.uppy = new Uppy({
        debug: true,
      })
        .use(Dashboard, {
          trigger: ".UppyModalOpenerBtn",
          inline: true,
          target: "#uppy",
          replaceTargetContent: true,
          showProgressDetails: true,
          height: 470,
          metaFields: [
            { id: "name", name: "Name", placeholder: "file name" },
            {
              id: "caption",
              name: "Caption",
              placeholder: "describe what the image is about",
            },
          ],
          browserBackButtonClose: true,
        })
        .on("upload", async () => {
          await this.uploadFiles(this.uppy.getFiles());
        })
        .on("complete", (result) => {
          console.log("successful files:", result.successful);
          console.log("failed files:", result.failed);
        });
    },
    methods: {
      updateEndpoint() {
        console.log("Updating endpoint");
      },
      async uploadFiles(files) {
        this.uppy.setState({
          totalProgress: 0,
        });
        const promises = await Promise.all(
          files.map(async (file) => {
            this.uppy.setFileState(file.id, {
              progress: {
                bytesUploaded: 0,
                uploadStarted: true,
                percentage: 0,
                bytesTotal: file.size,
              },
            });

            const link = await this.uploadFile(file, { uid: "bharathuid" });

            this.uppy.setFileState(file.id, {
              progress: {
                bytesUploaded: file.size,
                uploadComplete: true,
                percentage: 100,
                bytesTotal: file.size,
              },
            });

            return {
              ...file,
              link,
            };
          })
        );
        console.log(promises);
        this.uppy.setState({
          totalProgress: 100,
        });
        this.$emit("close", promises);
      },
      async uploadFile(file, user) {
        let fileLink = "";
        const filePath = `users/${user.uid}/attachments/${Date.now()}-${
          file.name
        }`;

        try {
          const storageRef = storage.ref(filePath);
          const res = await storageRef.put(file);
          fileLink = await res.ref.getDownloadURL();
        } catch (err) {
          console.log(err.message);
        }
        return fileLink;
      },
    },
    beforeDestroy() {
      console.log("Main Vue destroyed");
    },
  };
</script>

<style lang="scss">
  .uppy-Dashboard-AddFiles-info {
    opacity: 0;
  }
  .uppy-size--md .uppy-Dashboard-Item-action--remove {
    top: -30px;
  }
</style>
