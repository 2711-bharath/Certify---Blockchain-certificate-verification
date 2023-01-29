<template>
  <div class="about">
    <div>About</div>
    <p class="description px-3">
      We use blockchain to store and secure certificates which are more easier
      to share and issue as well as and it's cost-effective.
    </p>
    <div class="is-flex mt-5 px-3">
      <div class="item-icon">
        <div>
          <i class="fal fa-flag"></i>
        </div>
        <h5 class="objectives my-3">Objectives</h5>
      </div>
      <div>
        <p v-for="(objective, i) in objectives" :key="i" class="item p-3">
          <i class="far fa-check-square fa-lg mr-3"></i> {{ objective }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      objectives() {
        return [
          "To maintain a trustworthy way of storing certificates data",
          "To provide better and easy way of managing certificates",
          "To prevent tampering of the certificates.",
          "To provide a way for employers to verify certificates quicker.",
          "To potentially develop a new currency CertiCoin.",
        ];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .about {
    .description {
      font-size: 20px;
      margin: 0 auto;
      text-align: center;
      min-width: 388px;
      max-width: 450px;
    }
    .objectives {
      font-size: 28px;
      font-weight: 500;
    }
    .item-icon .fal {
      font-size: 110px;
      color: rgb(26, 218, 183);
    }
    .is-flex {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
    }
    .item {
      min-width: 350px;
      font-size: 19px;
      text-align: left;
      display: flex;
      align-items: center;
      .far {
        color: rgb(26, 218, 183);
      }
    }
  }
</style>
