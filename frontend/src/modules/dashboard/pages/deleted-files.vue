<template>
  <div class="my-files">
    <div class="flex is-justify-content-space-between is-align-items-center">
      <div class="my-files__header">
        <div class="my-files__header--title">Bin</div>
      </div>
    </div>
    <Table :data="certificates" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Table from "../../../shared/table/table.vue";

export default {
  components: {
    Table,
  },
  async created() {
    this.$root.isLoading = true;
    await this.getCertificates({
      userId: localStorage.getItem("user_id"),
      status: "deleted",
    });
    this.$root.isLoading = false;
  },
  computed: mapGetters(["certificates"]),
  methods: {
    ...mapActions(["getCertificates"]),
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