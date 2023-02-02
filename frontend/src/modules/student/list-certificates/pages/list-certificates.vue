<template>
  <div class="list-certificate">
    <button class="button is-link" @click="openPopup">
      Upload Certificate
    </button>
    <div v-for="certificate in certificates" :key="certificate.id">
      <img :src="certificate.preview" class="uppy-Dashboard-Item-previewImg" />
    </div>
  </div>
</template>

<script>
  import FileUpload from "../../../../shared/upload/file-upload.vue";

  export default {
    data() {
      return {
        certificates: [],
      };
    },
    methods: {
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
