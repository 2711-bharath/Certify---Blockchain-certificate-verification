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
        <template v-if="certificate.file">
          <div class="column is-half" @click="viewCertificate(certificate)">
            <i
              class="fal is-size-5 mr-1"
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
                  <a
                    class="dropdown-item"
                    v-if="user.type === 'university' && !certificate.mined"
                    @click.stop="mineCertificate(certificate)"
                  >
                    <i class="far fa-badge-check"></i> Mine
                  </a>
                  <a
                    class="dropdown-item"
                    @click.stop="viewCertificate(certificate)"
                  >
                    <i class="far fa-eye"></i> View
                  </a>
                  <a
                    class="dropdown-item"
                    @click.stop="downloadFile(certificate)"
                  >
                    <i class="far fa-download"></i> Download
                  </a>
                  <a
                    class="dropdown-item"
                    v-if="$route.name !== 'deleted'"
                    @click.stop="openSharePopup(certificate)"
                  >
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
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import FileViewer from "./file-viewer.vue";
import SharePopup from "./share-popup.vue";
import MineBlock from "./mine-block.vue";

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
    ...mapGetters(["getWidth", "users", "user"]),
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
      if (this.users[uid]) return this.users[uid].name;
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
      this.$root.isLoading = true;

      const body = certificate;
      try {
        body.isDeleted = deleted;
        body.file.lastModifiedDate = new Date();
        const certificates = this.data.filter(
          (val) => val.uid !== certificate.uid
        );
        await this.updateCertificate({ body, certificates });
      } catch (err) {
        console.log("🚀 ~ file: my-files.vue:62 ~ delete ~ err:", err);
      }
      this.$root.isLoading = false;
    },
    viewCertificate(certificate) {
      this.$buefy.modal.open({
        component: FileViewer,
        props: {
          certificate,
        },
        fullScreen: true,
        customClass: "no-close-btn",
        parent: this,
        width: "100vw",
      });
    },
    openSharePopup(certificate) {
      this.$buefy.modal.open({
        component: SharePopup,
        props: {
          certificate,
        },
        parent: this,
        width: "480px",
        events: {
          share: async (userIds) => {
            this.$root.isLoading = true;

            const body = certificate;
            try {
              body.sharedWith = userIds;
              body.file.lastModifiedDate = new Date();
              const certificates = [
                body,
                ...this.data.filter((val) => val.uid !== certificate.uid),
              ];

              await this.updateCertificate({ body, certificates });
            } catch (err) {
              console.log("🚀 ~ file: table.vue:195 ~ share: ~ err:", err);
            }
            this.$root.isLoading = false;
          },
        },
      });
    },
    async downloadFile(certificate) {
      this.$root.isLoading = true;
      try {
        const response = await axios.get(certificate.URL, {
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${certificate.name}.${certificate.file.type.split("/")[1]}`
        );
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error(error);
      }
      this.$root.isLoading = false;
    },
    mineCertificate(certificate) {
      this.$buefy.modal.open({
        component: MineBlock,
        props: {
          certificate,
        },
        parent: this,
        width: "480px",
      });
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
<style lang="scss">
::v-deep {
  .no-close-btn {
    .is-large.modal-close {
      opacity: 0;
    }
  }
}
</style>