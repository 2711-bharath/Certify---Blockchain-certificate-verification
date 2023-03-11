<template>
  <div class="my-files">
    <div class="flex is-justify-content-space-between is-align-items-center">
      <div class="my-files__header">
        <div class="my-files__header--title">My Certificates</div>
      </div>
      <div class="my-files__header--icons">
        <button
          class="button is-link is-rounded py-3"
          @click="openUploadPopup()"
        >
          <i class="far fa-plus mr-2"></i> Upload file
        </button>
      </div>
    </div>
    <Table />
  </div>
</template>

<script>
import Table from "../../../shared/table/table.vue";
import UploadPopup from "../components/upload-popup.vue";

export default {
  components: {
    Table,
  },
  methods: {
    openUploadPopup() {
      this.$buefy.modal.open({
        component: UploadPopup,
        parent: this,
        width: 500,
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
.my-files {
  padding: 12px 16px;

  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 8px;
    box-sizing: border-box;
    &--title {
      font-size: 20px;
      font-weight: 500;
    }
    &--icons {
      display: flex;
      align-items: center;
      .button {
        display: flex;
        align-items: center;
        &.is-link {
          color: rgb(24, 90, 188);
          background: rgb(232, 240, 254);
        }
      }
    }
  }
}
</style>