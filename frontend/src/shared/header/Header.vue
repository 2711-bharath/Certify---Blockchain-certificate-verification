<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    v-click-outside="() => (dropdown_active = false)"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="../../assets/logo.png"
          alt="Bulma: a modern CSS framework based on Flexbox"
        />
      </router-link>
      <div
        v-if="is_mobile"
        class="navbar-burger is-flex is-align-items-center is-justify-content-center"
        data-target="navbarToggle"
        @click="
          show_sidebar
            ? $emit('toggleSidebar')
            : (dropdown_active = !dropdown_active)
        "
      >
        <i class="far fa-bars is-size-5"></i>
      </div>
    </div>

    <div
      id="navbarToggle"
      class="navbar-menu"
      :class="{ 'd-block': dropdown_active }"
      @click="dropdown_active = false"
    >
      <template v-if="!show_sidebar">
        <a class="navbar-item" href="/"> Home </a>
        <a class="navbar-item" href="/#about"> About </a>
        <a class="navbar-item" href="/#services"> Services </a>
        <a class="navbar-item" href="/#contact"> Contact us </a>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    show_sidebar: {
      type: Boolean,
    },
    is_mobile: {
      type: Boolean,
    },
  },
  data() {
    return {
      dropdown_active: false,
      user_dropdown_active: false,
    };
  },
  computed: mapGetters(["isLoggedIn", "user"]),
  watch: {
    isLoggedIn() {
      this.dropdown_active = false;
      this.user_dropdown_active = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  .navbar-item img {
    max-height: 2.25rem;
  }
  .navbar-menu {
    &.d-block {
      display: block !important;
    }
    .navbar-item {
      font-size: 14px;
      font-weight: 500;
      .is-mobile {
        font-size: 16px;
      }
    }
  }

  &-link,
  .nav-item {
    display: flex;
    align-items: center;
  }

  .far {
    width: 1.5rem;
  }

  .navbar-link:not(.is-arrowless)::after {
    margin-top: -0.475rem;
  }
}
</style>
