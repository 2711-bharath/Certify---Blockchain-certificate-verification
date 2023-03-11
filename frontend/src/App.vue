<template>
  <div>
    <Header
      :show_sidebar="show_sidebar"
      @toggleSidebar="open_sidebar = !open_sidebar"
    />
    <div class="columns is-gapless">
      <Sidebar
        v-if="show_sidebar"
        :windowWidth="windowWidth"
        :open_sidebar="open_sidebar"
        @close="open_sidebar = false"
      />
      <div class="column is-size-1 has-text-centered main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
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
      windowWidth: window.innerWidth,
      open_sidebar: false,
    };
  },
  watch: {
    $route() {
      this.open_sidebar = false;
      this.show_sidebar = this.$route.meta().show_sidebar;
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  async created() {
    if (Object.values(this.user).length === 0)
      await this.getUser({ userId: localStorage.getItem("user_id") });
    this.show_sidebar = this.$route.meta().show_sidebar;
  },
  methods: {
    ...mapMutations(["setWidth"]),
    ...mapActions(["getUser"]),
    onResize() {
      this.windowWidth = window.innerWidth;
      this.setWidth(this.windowWidth);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
}
</style>
