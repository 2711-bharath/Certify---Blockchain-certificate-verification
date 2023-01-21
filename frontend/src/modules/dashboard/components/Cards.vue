<template>
  <div class="main-card">
    <Bar />
    <div class="cards">
      <Card
        v-for="data in cardsData"
        :key="data.key"
        :type="data.type"
        :title="data.title"
        :subTitle="data.subTitle"
        :iconName="data.iconName"
      />
    </div>
    <LineChart />
    <LineBarChart />
  </div>
</template>

<script>
  import Card from "./Card.vue";
  import Bar from "./Bar.vue";
  import LineChart from "./LineChart.vue";
  import LineBarChart from "./LineBarChart.vue";

  export default {
    name: "Cards",
    data() {
      return {
        cardsData: [
          {
            key: 1,
            type: "1",
            title: "4,242,280.50",
            subTitle: "Revenue Generated MDT",
            iconName: "bolt",
          },
          {
            key: 2,
            type: "2",
            title: "6,312,272.32",
            subTitle: "Revenue Generated MDT",
            iconName: "bolt",
          },
          {
            key: 3,
            type: "3",
            title: "0",
            subTitle: "Revenue Generated MDT",
            iconName: "bolt",
          },
        ],
      };
    },
    components: {
      Card,
      Bar,
      LineChart,
      LineBarChart,
    },
  };
</script>

<style lang="scss" scoped>
  .cards {
    display: flex;
    width: 100%;
    margin: 0 20px;
  }

  .main-card {
    flex: 1;
  }

  @media (max-width: 1500px) {
    .cards {
      flex-direction: column;
    }
  }
</style>
