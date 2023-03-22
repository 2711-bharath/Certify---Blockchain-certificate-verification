<template>
  <div class="file-viewer">
    <div class="file-viewer--header">
      <div class="is-size-3 name__header">
        <div>
          <span class="is-size-5" v-if="certificate.mined">
            <b-tooltip label="verified" type="is-dark" position="is-bottom">
              <i class="far fa-badge-check has-text-success mr-1"></i>
            </b-tooltip>
          </span>
          {{ certificate.name }}
        </div>
      </div>
      <div class="mt-1" @click="$emit('close')" style="cursor: pointer">
        <i class="far fa-times is-size-5"></i>
      </div>
    </div>
    <div class="columns px-3 py-4">
      <div class="column is-three-fifths">
        <object
          style="border: 1px solid lightgray"
          :data="certificate.URL"
          :type="certificate.file.type"
          width="100%"
          height="620px"
        >
          <embed :src="certificate.URL" :type="certificate.file.type" />
        </object>
      </div>
      <div class="column has-text-left">
        <div class="is-size-4 has-text-centered mb-3">Certificate Details</div>
        <div
          class="is-size-6 mb-3 has-text-success"
          :class="[certificate.mined ? 'has-text-success' : 'has-text-danger']"
        >
          <template v-if="certificate.mined">
            <i class="far fa-badge-check mr-1 ga-lg"></i> Verified
          </template>
          <template v-else>
            <i class="far fa-times-circle mr-1 fa-lg"></i> Not Verified
          </template>
        </div>
        <div class="is-size-6 has-text-grey mb-1">Name</div>
        <div class="is-size-5 has-text-weight-semibold mb-3">
          {{ certificate.name }}
        </div>
        <div class="is-size-6 has-text-grey mb-1">Description</div>
        <div class="is-size-5 mb-3">
          {{ certificate.description }}
        </div>
        <div class="is-size-6 has-text-grey mb-1">Owner</div>
        <div class="is-size-5 mb-3">
          {{ users[certificate.userUid].name }}
        </div>
        <div class="is-size-6 has-text-grey mb-1">Issued by</div>
        <div class="is-size-5 mb-3">
          {{ certificate.issuedBy }}
        </div>
        <div class="is-size-6 has-text-grey mb-1">Credential Id</div>
        <div class="is-size-5 mb-3">
          {{ certificate.credentialId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    certificate: {
      type: Object,
    },
  },
  data() {
    return {
      pdfUrl: "",
    };
  },
  computed: {
    ...mapGetters(["users", "user"]),
  },
};
</script>

<style lang="scss" scoped>
.modal-close {
  display: none;
}
.file-viewer {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-x: hidden;
  &--header {
    position: sticky;
    top: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0.125em 0.25em rgba(10, 10, 10, 0.1);
    padding: 8px 22px;
    .name__header {
      display: flex;
      align-items: center;
    }
  }
}
</style>