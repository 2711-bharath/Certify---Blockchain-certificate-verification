<template>
  <div class="landing-page">
    <div class="page" id="home">
      <home />
    </div>
    <div class="page" id="about">
      <about />
    </div>
    <div class="page" id="services">
      <services />
    </div>
    <div class="page" id="contact">
      <contact />
    </div>
  </div>
</template>

<script>
  import Home from "../components/home.vue";
  import About from "../components/about.vue";
  import Services from "../components/services.vue";
  import Contact from "../components/contact.vue";

  export default {
    components: {
      Home,
      About,
      Services,
      Contact,
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    width: 100vw;
    padding-top: 54px;
    &:first-child {
      padding-top: 0px;
    }
  }
</style>
