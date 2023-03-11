<template>
  <div class="generic-table">
    <div v-if="data.length === 0" class="no-data">
      <div>
        <img src="../../assets/no-certificates.png" alt="" class="image" />
        No certificates are present
      </div>
    </div>
    <template v-else>
      <div class="columns">
        <div class="column is-half">Name</div>
        <div class="column">Owner</div>
        <div class="column">Last Modified</div>
        <div class="column">File size</div>
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
};
</script>

<style lang="scss" scoped>
.generic-table {
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
}
</style>