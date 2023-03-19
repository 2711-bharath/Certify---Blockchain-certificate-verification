<template>
  <div class="page-not-found">
    <div class="img mt-5">
      <img src="https://svgshare.com/i/Ye7.svg" />
    </div>
    <div class="error">
      <h5 class="mb-3">UH OH! You're lost.</h5>
      <p class="my-3">
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </p>
      <a class="button is-warning is-medium mt-3" href="/">Home</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-not-found {
  .img img {
    width: 420px;
  }

  .error {
    h5 {
      font-size: 38px;
      font-weight: 500;
    }
    p {
      font-size: 18px;
    }

    .button {
      background-color: #ffb000;
      color: #fff;
      padding: 8px 40px;
    }
  }
}
</style>
