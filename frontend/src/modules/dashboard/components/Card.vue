<template>
  <div
    class="card"
    :style="
      type === '2'
        ? 'background: linear-gradient(0.25turn, #6612fe, #180a63)'
        : 'background: linear-gradient(0.25turn, #19ADE3, #180D64)'
    "
  >
    <div>
      <h3 class="title is-4">
        $ <span style="color: #333333">{{ title }}</span>
      </h3>
      <h5 class="title is-6">{{ subTitle }}</h5>
    </div>
    <font-aws-icon :icon="iconName" />
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      type: String,
      title: String,
      subTitle: String,
      iconName: String,
    },
  };
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 24px;
    margin: 0 10px;
    color: #fff;

    box-shadow: none;
    border-radius: 16px;

    .title {
      margin: 0;
      text-align: start;
      color: #fff;
    }
    .title.is-6 {
      font-size: 0.8rem;
      padding-top: 8px;
      font-weight: 300;
    }
  }
  @media (max-width: 1500px) {
    .card {
      width: 100%;
      margin: 5px 0;
    }
  }
</style>
