<template>
  <div class="p-4">
    <div id="uppy"></div>
  </div>
</template>

<script>
  import Uppy from "@uppy/core";
  import Dashboard from "@uppy/dashboard";
  import { storage } from "../../utils/plugins/firebase";

  export default {
    name: "App",
    components: {},
    data: () => ({
      uppy: null,
    }),
    mounted() {
      this.uppy = new Uppy({
        debug: true,
        restrictions: {
          maxFileSize: null,
          minFileSize: null,
          maxTotalFileSize: null,
          maxNumberOfFiles: 10,
          minNumberOfFiles: 1,
          allowedFileTypes: ["image/*", ".jpg", ".jpeg", ".png", ".pdf"],
          requiredMetaFields: [],
        },
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
              id: "description",
              name: "Description",
              placeholder: "describe what the certificate is about",
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
        this.$emit("addFiles", promises);
        this.$emit("close");
      },
      async uploadFile(file, user) {
        const filePath = `users/${user.uid}/attachments/${file.name}`;

        const storageRef = storage.ref(filePath);

        try {
          const res = await storageRef.put(file.data);
          const url = await res.ref.getDownloadURL();
          console.log(url);
          return String(url);
        } catch (err) {
          console.log(err.message);
        }
        return "";
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
