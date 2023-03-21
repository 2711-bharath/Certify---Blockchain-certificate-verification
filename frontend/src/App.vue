<template>
  <div>
    <Header
      :show_sidebar="show_sidebar"
      :is_mobile="is_mobile"
      @toggleSidebar="open_sidebar = !open_sidebar"
    />
    <div class="columns is-gapless">
      <Sidebar
        v-if="show_sidebar"
        :is_mobile="is_mobile"
        :open_sidebar="open_sidebar"
        @close="open_sidebar = false"
      />
      <div class="column is-size-1 has-text-centered main">
        <router-view />
      </div>
    </div>
    <b-loading
      :is-full-page="true"
      :active="$root.isLoading"
      :can-cancel="false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Header from "./shared/header/Header.vue";
import Sidebar from "./shared/sidebar/Sidebar.vue";
import apiService from "./apis/service";
import FileViewer from "./shared/table/file-viewer.vue";

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
    async $route(to) {
      if (to) {
        await this.init(to);
      }
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
    is_mobile() {
      return this.windowWidth < 1015;
    },
    profile_not_updated() {
      return this.isLoggedIn && !Object.values(this.user.profile).length;
    },
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
    this.$root.isLoading = true;
    if (
      Object.values(this.user).length === 0 &&
      localStorage.getItem("user_id")
    )
      await this.getUser({ userId: localStorage.getItem("user_id") });
    await this.getUsers();
    await this.init(this.$route);
  },
  methods: {
    ...mapMutations(["setWidth"]),
    ...mapActions(["getUser", "getUsers"]),
    onResize() {
      this.windowWidth = window.innerWidth;
      this.setWidth(this.windowWidth);
    },
    checkProfileStatus() {
      if (this.profile_not_updated)
        if (this.$route.name !== "home") this.$router.push({ name: "profile" });
    },
    async init(route) {
      this.$root.isLoading = false;
      document.title = route.meta().title || "Certify";
      this.checkProfileStatus();
      this.open_sidebar = false;
      this.show_sidebar = route.meta().show_sidebar || this.is_mobile;
      if (route.name === "certificate") {
        const { certificate } = await apiService.get(
          `/certificate/${route.params.uid}`
        );
        if (certificate)
          this.$buefy.modal.open({
            component: FileViewer,
            props: {
              certificate,
            },
            fullScreen: true,
            customClass: "no-close-btn",
            parent: this,
            width: "100vw",
            events: {
              close: () => {
                this.$router.push({ name: "home" });
              },
            },
          });
      }
      this.$root.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
}
.columns {
  margin: 0px;
}
</style>
