<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    v-click-outside="() => (dropdown_active = false)"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          alt="Bulma: a modern CSS framework based on Flexbox"
          width="112"
          height="28"
        />
      </a>
      <div
        class="navbar-burger"
        data-target="navbarToggle"
        @click="dropdown_active = true"
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
      <a class="navbar-item" href="/"> Home </a>
      <a class="navbar-item" href="#about"> About </a>
      <a class="navbar-item" href="#services"> Services </a>
      <a class="navbar-item" href="#contact"> Contact us </a>
    </div>
    <div class="navbar-end">
      <div
        v-if="is_logged_in"
        class="navbar-item has-dropdown mr-5"
        :class="{ 'is-active': dropdown_active }"
        v-click-outside="() => (dropdown_active = false)"
      >
        <a class="navbar-link" @click="dropdown_active = !dropdown_active">
          <i class="far fa-user-circle fa-xl mr-2"></i> Username
        </a>

        <div class="navbar-dropdown is-right">
          <a class="navbar-item">
            <i class="far fa-user fa-xl mr-2"></i> Profile
          </a>
          <a class="navbar-item">
            <i class="far fa-user-cog fa-xl mr-2"></i> Change Password
          </a>
          <hr class="navbar-divider" />
          <a class="navbar-item">
            <i class="far fa-sign-out fa-xl mr-2"></i> Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        dropdown_active: false,
      };
    },
    computed: {
      is_logged_in() {
        return Boolean(localStorage.getItem("user"));
      },
    },
    created() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          });
        });
      });
    },
  };
</script>

<style lang="scss" scoped>
  .navbar {
    position: sticky;
    top: 0;

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
  }
</style>
