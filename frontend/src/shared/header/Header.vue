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
        class="navbar-burger"
        data-target="navbarToggle"
        @click="dropdown_active = !dropdown_active"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div
      id="navbarToggle"
      class="navbar-menu"
      :class="{ 'd-block': dropdown_active }"
      @click="dropdown_active = false"
    >
      <template v-if="isLoggedIn">
        <a class="navbar-item" href="/"> Home </a>
        <a class="navbar-item" href="/#about"> About </a>
        <a class="navbar-item" href="/#services"> Services </a>
        <a class="navbar-item" href="/#contact"> Contact us </a>
      </template>
      <!-- <template v-else>
        <router-link class="navbar-item" to="/dashboard" exact>
          Dashboard
        </router-link>
        <router-link class="navbar-item" to="/list-certificates" exact>
          Certificates
        </router-link>
      </template> -->
    </div>
    <div class="navbar-end">
      <!-- <div
        v-if="isLoggedIn"
        class="navbar-item has-dropdown mr-5"
        :class="{ 'is-active': user_dropdown_active }"
        v-click-outside="() => (user_dropdown_active = false)"
      >
        <div
          class="navbar-link"
          @click="user_dropdown_active = !user_dropdown_active"
        >
          <i class="far fa-user-circle fa-xl mr-2"></i>
          {{ user.username || "" }}
        </div>

        <div class="navbar-dropdown is-right" v-if="user_dropdown_active">
          <router-link
            class="navbar-item"
            to="/profile"
            @click.native="user_dropdown_active = false"
            exact
          >
            <i class="far fa-user fa-xl mr-2"></i> Profile
          </router-link>
          <router-link
            class="navbar-item"
            to="/profile"
            @click.native="user_dropdown_active = false"
            exact
          >
            <i class="far fa-user-cog fa-xl mr-2"></i> Change Password
          </router-link>
          <hr class="navbar-divider" />
          <router-link
            class="navbar-item"
            to="/"
            @click.native="
              user_dropdown_active = false;
              removeLocalState();
            "
            exact
          >
            <i class="far fa-sign-out fa-xl mr-2"></i> Logout
          </router-link>
        </div>
      </div> -->
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    show_sidebar: {
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
  methods: {
    ...mapActions(["removeLocalState"]),
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
