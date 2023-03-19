<template>
  <div class="reusable-table">
    <div v-if="data.length === 0" class="no-data">
      <div>
        <img src="../../assets/no-certificates.png" alt="" class="image" />
        No certificates are present
      </div>
    </div>
    <template v-else>
      <div class="columns mt-3 reusable-table-header">
        <div class="column is-half">Name</div>
        <div class="column" v-if="getWidth > 770">Owner</div>
        <div class="column" v-if="getWidth > 770">Last Modified</div>
        <div class="column" v-if="getWidth > 770">File size</div>
        <div class="column is-menu" v-if="getWidth > 770"></div>
      </div>
      <div
        class="columns reusable-table-row"
        v-for="certificate in data"
        :key="certificate.uid"
      >
        <div class="column is-half">
          <i
            class="fal is-size-5 mr-1 mt-1"
            :class="[
              certificate.file.type.includes('pdf')
                ? 'fa-file-pdf has-text-danger'
                : 'fa-file-image has-text-info',
            ]"
          ></i>
          {{ certificate.name }}
        </div>
        <div class="column" v-if="getWidth > 770">
          {{ getOwner(certificate.userUid) }}
        </div>
        <div class="column" v-if="getWidth > 770">
          {{ getFormattedDate(certificate.file.lastModifiedDate) }}
        </div>
        <div class="column" v-if="getWidth > 770">
          {{ getFileSize(certificate.file.size) }}
        </div>
        <div class="column is-menu" v-if="getWidth > 770">
          <div
            class="dropdown is-right"
            :class="{ 'is-active': show_menu === certificate.uid }"
          >
            <div class="dropdown-trigger">
              <button
                class="is-menu-btn"
                aria-haspopup="true"
                @click="show_menu = certificate.uid"
              >
                <i class="far fa-ellipsis-v"></i>
              </button>
            </div>
            <div
              class="dropdown-menu"
              role="menu"
              v-if="show_menu === certificate.uid"
              v-click-outside="() => (show_menu = '')"
            >
              <div class="dropdown-content">
                <a class="dropdown-item"><i class="far fa-eye"></i> View</a>
                <a :href="certificate.URL" class="dropdown-item">
                  <i class="far fa-download"></i> Download
                </a>
                <a class="dropdown-item">
                  <i class="far fa-share-alt"></i> Share
                </a>
                <a
                  class="dropdown-item"
                  v-if="$route.name === 'files'"
                  @click.stop="certificateStatus(certificate, true)"
                >
                  <i class="far fa-trash"></i> Delete
                </a>
                <a
                  class="dropdown-item"
                  v-if="$route.name === 'deleted'"
                  @click.stop="certificateStatus(certificate, false)"
                >
                  <i class="far fa-undo"></i> Restore
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show_menu: "",
    };
  },
  computed: {
    ...mapGetters(["getWidth"]),
  },
  methods: {
    ...mapActions(["updateCertificate"]),
    getFileSize(size) {
      const fSExt = ["Bytes", "KB", "MB", "GB"];
      let i = 0;
      // eslint-disable-next-line no-underscore-dangle
      let _size = size;
      while (_size > 900) {
        _size /= 1024;
        // eslint-disable-next-line no-plusplus
        i++;
      }
      const exactSize = `${Math.round(_size * 100) / 100} ${fSExt[i]}`;
      return exactSize;
    },
    getOwner(uid) {
      if (uid === localStorage.getItem("user_id")) return "me";
      return "-";
    },
    getFormattedDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    async certificateStatus(certificate, deleted = true) {
      const body = certificate;
      try {
        body.isDeleted = deleted;
        body.file.lastModifiedDate = new Date();
        await this.updateCertificate({ body });
      } catch (err) {
        console.log("🚀 ~ file: my-files.vue:62 ~ delete ~ err:", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reusable-table {
  text-align: start;
  font-size: 14px;
  padding-top: 10px;
  margin: 0 0.75rem;

  .columns {
    border-bottom: 1px solid #dadce0;
    .column {
      padding: 0.5rem;
      &.is-menu {
        flex: 0 0 2.5rem;
        .dropdown-menu {
          min-width: 10rem;
        }
        .dropdown-item {
          padding-right: 1rem !important;
          .far {
            width: 1.25rem;
          }
        }
        .is-menu-btn {
          cursor: pointer;
          background-color: transparent;
          border: 0;
        }
      }
    }
  }
  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 400px;
    font-size: 18px;
    .image {
      width: 320px;
      height: 320px;
    }
  }
  &-header {
    font-weight: 500;
  }
  &-row {
    cursor: pointer;
    &:hover {
      background-color: #dadce0;
    }
  }
}
</style>