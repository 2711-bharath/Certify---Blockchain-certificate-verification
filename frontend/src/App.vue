<template>
  <div>
    <Header />
    <div class="columns is-gapless">
      <!-- <Sidebar v-if="is_logged_in" /> -->
      <div class="column is-size-1 has-text-centered main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./shared/header/Header.vue";
// import Sidebar from "./shared/sidebar/Sidebar.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  computed: mapGetters(["isLoggedIn", "user"]),
  async created() {
    if (Object.values(this.user).length === 0)
      await this.getUser({ userId: localStorage.getItem("user_id") });
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
