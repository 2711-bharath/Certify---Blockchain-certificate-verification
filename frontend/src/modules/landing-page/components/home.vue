<template>
  <div class="home">
    <div class="is-flex p-5">
      <div class="img px-3">
        <img src="./assets/certification.png" alt="image" />
      </div>
      <div class="content px-3">
        <div class="content-title">CERTIFY</div>
        <div class="content-description">
          Issue and verify certificates for Universities. Secure digital
          certificate for Students to share with Companies and others. Easy way
          to share multiple certificates with easy steps.
        </div>
        <div class="is-flex is-justify-content-center" v-if="!isLoggedIn">
          <router-link
            class="button is-link px-5 mt-4 mx-3 is-medium"
            to="/sign-up"
            exact
          >
            Signup
          </router-link>
          <router-link
            class="button px-5 mt-4 mx-3 is-medium"
            to="/login"
            exact
          >
            Login
          </router-link>
        </div>
        <router-link
          v-else
          class="button is-link px-5 mt-4 is-medium"
          to="/files"
          exact
        >
          View Certificates
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>
<style lang="scss" scoped>
.home {
  margin: 24px 0;
  .is-flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    .content {
      width: 50vw;
      &-title {
        font-size: 72px;
      }

      &-description {
        font-size: 28px;
      }

      .is-link {
        background-color: #ba68c8;
      }
    }

    .img img {
      max-width: 600px;
      width: 40vw;
    }

    @media only screen and (max-width: 600px) {
      .img img {
        min-width: 280px;
        max-width: 600px;
      }
      .content {
        width: 100vw;
        &-title {
          font-size: 38px;
        }

        &-description {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
