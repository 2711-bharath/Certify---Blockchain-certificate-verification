<template>
  <div>
    <div class="card">
      <div class="is-size-5">QR Code</div>
      <a :href="link" target="_blank" class="qrcode">
        <div ref="qrcode"></div>
      </a>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode-generator";

export default {
  props: {
    link: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      qrcode: null,
    };
  },
  mounted() {
    this.generateQRCode(this.link);
  },
  methods: {
    generateQRCode(link) {
      this.qrcode = new QRCode(4, "L");
      this.qrcode.addData(link);
      this.qrcode.make();
      this.$refs.qrcode.innerHTML = this.qrcode.createImgTag(6, 0, 100, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  height: 300px;
  background-color: #fff;
  padding: 10px 18px;
  text-align: center;
  .qrcode {
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
