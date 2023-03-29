<template>
  <div class="card m-5">
    <header class="card-header">
      <p class="card-header-title">
        {{ certificate.name }}
      </p>
      <button class="card-header-icon" aria-label="more options">
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
                @click.stop="$parent.mineCertificate(certificate)"
              >
                <i class="far fa-badge-check"></i> Mine
              </a>
              <a
                class="dropdown-item"
                @click.stop="$parent.viewCertificate(certificate)"
              >
                <i class="far fa-eye"></i> View
              </a>
              <a
                class="dropdown-item btn"
                v-if="$route.name !== 'deleted'"
                v-clipboard:copy="
                  `${$parent.baseUrl}/certificate/${certificate.uid}`
                "
                v-clipboard:success="
                  () =>
                    $toast.open({
                      message: `Link copied to clipboard`,
                      type: 'success',
                    })
                "
                v-clipboard:error="
                  () =>
                    $toast.open({
                      message: `Failed to copy link copied to clipboard`,
                      type: 'error',
                    })
                "
              >
                <i class="far fa-clone"></i> Copy link
              </a>
              <a
                class="dropdown-item"
                @click.stop="$parent.downloadFile(certificate)"
              >
                <i class="far fa-download"></i> Download
              </a>
              <a
                class="dropdown-item"
                v-if="$route.name !== 'deleted'"
                @click.stop="$parent.openSharePopup(certificate)"
              >
                <i class="far fa-share-alt"></i> Share
              </a>
              <a
                class="dropdown-item"
                v-if="$route.name !== 'deleted'"
                @click.stop="$parent.openQRPopup(certificate)"
              >
                <i class="far fa-qrcode"></i> QR Code
              </a>
              <a
                class="dropdown-item"
                v-if="$route.name === 'files'"
                @click.stop="$parent.certificateStatus(certificate, true)"
              >
                <i class="far fa-trash"></i> Delete
              </a>
              <a
                class="dropdown-item"
                v-if="$route.name === 'deleted'"
                @click.stop="$parent.certificateStatus(certificate, false)"
              >
                <i class="far fa-undo"></i> Restore
              </a>
            </div>
          </div>
        </div>
      </button>
    </header>
    <div class="card-image">
      <object
        style="border: 1px solid lightgray"
        :data="certificate.URL + '#toolbar=0'"
        :type="certificate.file.type"
        width="320px"
        height="240px"
      >
        <embed :src="certificate.URL" :type="certificate.file.type" />
      </object>
    </div>
    <div class="card-content">
      <div class="content">
        {{ certificate.description.slice(0, 35) }}
        {{ certificate.description.length > 35 ? "..." : "" }}
        <br />
        Owner
        <span class="has-text-weight-semibold">
          {{ $parent.getOwner(certificate.userUid) }}
        </span>
        <br />
        Last updated on
        <span class="has-text-weight-semibold">
          {{ $parent.getFormattedDate(certificate.file.lastModifiedDate) }}
        </span>
        <br />
        File size
        <span class="has-text-weight-semibold">
          {{ $parent.getFileSize(certificate.file.size) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    certificate: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      show_menu: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  min-width: 10rem;
}
.dropdown-item {
  padding-right: 1rem !important;
  text-align: left;
  .far {
    width: 1.25rem;
  }
}
.is-menu-btn {
  cursor: pointer;
  background-color: transparent;
  border: 0;
}
</style>