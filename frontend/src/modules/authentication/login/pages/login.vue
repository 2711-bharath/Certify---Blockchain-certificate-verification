<template>
  <div class="login px-3">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h5 class="my-3">Login</h5>
          <label class="label user-type">User type</label>
          <div class="tabs my-3">
            <div
              class="tab"
              :class="{ active: user_type === 'university' }"
              @click="user_type = 'university'"
            >
              <i class="fal fa-university"></i>
              <span class="text"> University </span>
            </div>
            <div
              class="tab"
              :class="{ active: user_type === 'student' }"
              @click="user_type = 'student'"
            >
              <i class="fal fa-graduation-cap"></i>
              <span class="text"> Student </span>
            </div>
            <div
              class="tab"
              :class="{ active: user_type === 'company' }"
              @click="user_type = 'company'"
            >
              <i class="fal fa-building"></i>
              <span class="text"> Company </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="username"
                placeholder="Username"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="login-footer">
            <router-link
              class="button is-danger is-light mx-2"
              to="/sign-up"
              exact
            >
              Create a new account
            </router-link>
            <button class="button is-link is-light">
              Login as {{ user_type }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user_type: "university",
        username: "",
        password: "",
      };
    },
  };
</script>

<style lang="scss" scoped>
  $primary: #485fc7;
  $secondary: #f5c095;

  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    .text-primary {
      color: $primary;
    }
    .card {
      width: re39m;
      margin: 8rem 0;
      .tabs {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        .tab {
          width: 11rem;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px dashed $secondary;
          padding: 0 8px;
          margin: 8px;
          .text,
          .fal {
            cursor: pointer !important;
          }

          .fal {
            font-size: 20px;
            padding: 0 8px;
          }

          &.active {
            color: $primary;
            border: 2px dashed $primary;
          }
        }
      }
      .field {
        text-align: start;
        margin: 10px;
      }
      .label {
        text-align: start;
        &.user-type {
          margin: 8px;
        }
      }
    }
    &-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 1rem;
      .button {
        margin: 10px;
      }
    }
  }
</style>
