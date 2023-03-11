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
        <div class="column">Owner</div>
        <div class="column">Last Modified</div>
        <div class="column">File size</div>
      </div>
      <div
        class="columns reusable-table-row"
        v-for="certificate in data"
        :key="certificate.uid"
      >
        <div class="column is-half">{{ certificate.name }}</div>
        <div class="column">{{ getOwner(certificate.userUid) }}</div>
        <div class="column">
          {{ getFormattedDate(certificate.file.lastModifiedDate) }}
        </div>
        <div class="column">{{ getFileSize(certificate.file.size) }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
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
        month: "long",
        day: "numeric",
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