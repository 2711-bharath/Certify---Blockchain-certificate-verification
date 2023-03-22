<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Mining</p>
      <button class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="far fa-times" aria-hidden="true"></i>
        </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content" v-if="block_data">
        <div class="field">
          <label class="label">Nonce</label>
          <div class="control">
            <input
              class="input"
              type="number"
              placeholder="Enter a number"
              v-model.number="nonce"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-fifth">Block Id:</div>
          <div class="column">{{ block_data.block.blockid }}</div>
        </div>
        <div class="columns">
          <div class="column is-one-fifth">Hashed Data:</div>
          <div class="column">{{ block_data.block.hashed_data || "null" }}</div>
        </div>
        <div class="columns">
          <div class="column is-one-fifth">Images Hash:</div>
          <div class="column">{{ block_data.block.image_hash || "null" }}</div>
        </div>
        <div class="columns">
          <div class="column is-one-fifth">Previous Hash:</div>
          <div class="column">
            {{ (block_data.lastBlock && block_data.lastBlock.hash) || "null" }}
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a @click.stop="$emit('close')" class="card-footer-item">Cancel</a>
      <a
        @click.stop="mineBlock"
        class="card-footer-item"
        :class="{ 'is-disbale': nonce < 0 }"
        >Submit</a
      >
    </footer>
  </div>
</template>

<script>
import apiService from "../../apis/service";

export default {
  props: {
    certificate: {
      type: Object,
    },
  },
  data() {
    return {
      block_data: null,
      nonce: 0,
    };
  },
  async created() {
    this.$root.isLoading = true;
    try {
      this.block_data = await apiService.get(
        `/certificate/getCertificateData/${this.certificate.uid}`
      );
    } catch (err) {
      console.log("🚀 ~ file: mine-block.vue:49 ~ created ~ err:", err);
    }
    this.$root.isLoading = false;
  },
  methods: {
    async mineBlock() {
      this.$root.isLoading = true;
      try {
        await apiService.post(`/certificate/mineBlock`, {
          prevBlock: this.block_data?.lastBlock?.block_id || null,
          currBlock: this.block_data?.block?.blockid,
          nonce: this.nonce,
        });
      } catch (err) {
        console.log("🚀 ~ file: mine-block.vue:70 ~ mineBlock ~ err:", err);
      }
      this.$root.isLoading = false;
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  word-break: break-all;
}
</style>