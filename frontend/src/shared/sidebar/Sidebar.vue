<template>
  <div
    :class="[
      !is_mobile ? 'column' : 'sidebar',
      is_mobile ? (open_sidebar ? 'open' : 'close') : '',
    ]"
  >
    <aside class="menu">
      <ul
        class="menu-list"
        v-if="!is_mobile || open_sidebar"
        v-click-outside="() => $emit('close')"
      >
        <li>
          <router-link to="/" active-class="is-active" exact>
            <i class="far fa-browser"></i> Home
          </router-link>
        </li>
        <li>
          <router-link to="/profile" active-class="is-active" exact>
            <i class="far fa-user-circle"></i> Profile
            <sup
              class="p-1 ml-1 is-rounded has-background-danger"
              style="border-radius: 50%"
              v-if="$parent.profile_not_updated"
            >
            </sup>
          </router-link>
        </li>
        <li>
          <router-link
            to="/files"
            active-class="is-active"
            :class="{ disabled: $parent.profile_not_updated }"
            exact
          >
            <i class="far fa-file-certificate"></i> My Files
          </router-link>
        </li>
        <li>
          <router-link
            to="/shared"
            active-class="is-active"
            :class="{ disabled: $parent.profile_not_updated }"
            exact
          >
            <i class="far fa-share-alt"></i> Shared with me
          </router-link>
        </li>
        <li>
          <router-link
            to="/bin"
            active-class="is-active"
            :class="{ disabled: $parent.profile_not_updated }"
            exact
          >
            <i class="far fa-trash-alt"></i> Bin
          </router-link>
        </li>
        <li @click="removeLocalState()">
          <router-link to="" exact>
            <i class="far fa-sign-out-alt"></i> Logout
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Sidebar",
  props: {
    is_mobile: {
      type: Boolean,
    },
    open_sidebar: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions(["removeLocalState"]),
  },
};
</script>

<style lang="scss" scoped>
.column {
  flex: 0 0 16rem;
}
.disabled {
  opacity: 0.5;
}

.sidebar {
  position: absolute;
  top: 0;
  z-index: 20;
  &.open {
    .menu {
      left: 0;
    }
  }
  &.close {
    .menu {
      left: -16rem;
    }
  }
  .menu {
    background-color: white;
    transition: all 300ms ease-in-out;
  }
}

.menu {
  position: fixed;
  margin: 0;
  top: 3.25rem;
  left: 0;
  bottom: 0;

  display: block;
  overflow-y: auto;
  width: 16rem;
  box-sizing: border-box;

  padding: 0.5rem 0.75rem 0.5rem 0rem;
  border-top-right-radius: 10px;
  background-color: #fff;

  & > ul > li {
    margin: 0px;
  }
}

.menu-list a {
  display: flex;
  align-items: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  font-weight: 500;
  font-size: 13px;
  padding: 12px 16px;
  i {
    font-size: 18px;
    width: 1.75rem;
  }

  &.is-active {
    color: rgb(24, 90, 188);
    background: rgb(232, 240, 254);
    &:hover {
      background: rgb(232, 240, 254);
    }
  }

  &:hover {
    background: rgb(218, 220, 224);
  }
}
</style>
