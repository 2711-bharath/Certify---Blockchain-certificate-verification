<template>
  <div>
    <Header :show_sidebar="show_sidebar" />
    <div class="columns is-gapless">
      <Sidebar v-if="show_sidebar" />
      <div class="column is-size-1 has-text-centered main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./shared/header/Header.vue";
import Sidebar from "./shared/sidebar/Sidebar.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      show_sidebar: false,
    };
  },
  watch: {
    $route() {
      this.show_sidebar = this.$route.meta().show_sidebar;
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  async created() {
    if (Object.values(this.user).length === 0)
      await this.getUser({ userId: localStorage.getItem("user_id") });
    this.show_sidebar = this.$route.meta().show_sidebar;
  },
  methods: {
    ...mapActions(["getUser"]),
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
}
</style>
