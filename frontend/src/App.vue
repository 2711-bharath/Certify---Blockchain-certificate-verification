<template>
  <div>
    <Header />
    <div class="columns is-gapless">
      <Sidebar v-if="is_logged_in" />
      <div class="column is-size-1 has-text-centered main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "./shared/header/Header.vue";
  import Sidebar from "./shared/sidebar/Sidebar.vue";

  export default {
    name: "App",
    components: {
      Sidebar,
      Header,
    },
    computed: {
      is_logged_in() {
        return Boolean(localStorage.getItem("user"));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
  }
</style>
