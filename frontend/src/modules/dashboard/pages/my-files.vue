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
    <div class="tabs is-toggle is-small mt-3 mb-0">
      <ul>
        <li :class="{ 'is-active': view === 'list' }" @click="view = 'list'">
          <a>
            <span class="icon is-small">
              <i class="far fa-list-ul"></i>
            </span>
            <p>List View</p>
          </a>
        </li>
        <li :class="{ 'is-active': view === 'card' }" @click="view = 'card'">
          <a>
            <span class="icon is-small">
              <i class="far fa-th-large"></i>
            </span>
            <p>Card View</p>
          </a>
        </li>
      </ul>
    </div>
    <Table :data="certificates" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Table from "../../../shared/table/table.vue";
import UploadPopup from "../components/upload-popup.vue";

export default {
  components: {
    Table,
  },
  async created() {
    this.$root.isLoading = true;
    await this.getCertificates({
      userId: localStorage.getItem("user_id"),
      status: "none",
    });
    this.$root.isLoading = false;
  },
  data() {
    return {
      view: "list",
    };
  },
  computed: mapGetters(["certificates"]),
  methods: {
    ...mapActions(["getCertificates"]),
    ...mapMutations(["setCertificates"]),
    openUploadPopup() {
      this.$buefy.modal.open({
        component: UploadPopup,
        parent: this,
        width: 500,
        events: {
          addCertificate: (file) => {
            this.setCertificates([...this.certificates, file]);
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