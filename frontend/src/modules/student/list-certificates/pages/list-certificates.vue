<template>
  <div class="list-certificate p-5">
    <button class="button is-link" @click="openPopup">
      Upload Certificate
    </button>
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr class="p-5">
          <th>S.no</th>
          <th>Name</th>
          <th>Description</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, i) in certificates" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ file.meta.name || "" }}</td>
          <td>{{ file.meta.description || "" }}</td>
          <td>
            <button
              class="button is-link is-light is-small"
              @click="openPreview(file)"
            >
              View File
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import FileUpload from "../../../../shared/upload/file-upload.vue";
  import WebViewer from "../../../../shared/file-viewer/fileViewer.vue";

  export default {
    data() {
      return {
        certificates: [],
      };
    },
    methods: {
      openPreview(file) {
        if (file.type.includes("image")) {
          this.$viewerApi({
            images: [file.link],
            options: {
              navbar: false,
              movable: false,
            },
          });
        } else {
          this.$buefy.modal.open({
            component: WebViewer,
            parent: this,
            props: {
              path: file.link,
            },
            width: "90vw",
          });
        }
      },
      openPopup() {
        this.$buefy.modal.open({
          component: FileUpload,
          parent: this,
          width: 650,
          events: {
            addFiles: (files) => {
              this.certificates = files;
              console.log("add files", files);
            },
          },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .table {
    font-size: 16px;
    tr {
      th {
        &:first-child,
        &:last-child {
          width: 128px;
        }
      }
      th:nth-child(2) {
        width: 450px;
      }
    }
    td {
      text-align: left;
    }
  }
</style>
