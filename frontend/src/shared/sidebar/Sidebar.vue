<template>
  <div class="column">
    <aside class="menu">
      <ul class="menu-list">
        <li>
          <router-link to="/files" active-class="is-active" exact>
            <i class="far fa-file-certificate"></i> My Files
          </router-link>
        </li>
        <li>
          <router-link to="/alerts" active-class="is-active" exact>
            <i class="far fa-share-alt"></i> Shared with me
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="scss" scoped>
.column {
  flex: 0 0 16rem;
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

  background-color: transparent;

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
