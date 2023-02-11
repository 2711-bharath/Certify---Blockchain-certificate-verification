<template>
  <div class="column">
    <aside class="menu">
      <ul class="menu-list">
        <li>
          <router-link to="/" active-class="is-active" exact>
            <font-aws-icon icon="home" />
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/alerts" active-class="is-active" exact>
            <font-aws-icon icon="bell" />
            Alerts
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

    padding: 0.2rem 0.7rem;

    border-right: 1px solid rgba(35, 40, 45, 0.10196078431372549);
    background-color: #f5f5f5;

    & > ul > li {
      margin: 8px 0;
    }
  }

  .menu-list a {
    display: flex;
    align-items: center;
  }

  .svg-inline--fa {
    margin-right: 8px;
  }
</style>
