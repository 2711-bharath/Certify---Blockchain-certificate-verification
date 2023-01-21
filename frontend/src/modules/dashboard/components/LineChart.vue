<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
  import FusionCharts from "fusioncharts";
  import data from "./data/LineChart.json";

  export default {
    name: "LineChart",
    data() {
      return {};
    },
    methods: {
      renderLineChart() {
        const fusionChart = new FusionCharts({
          type: "msline",
          renderAt: "chart",
          width: "100%",
          height: "300",
          dataFormat: "json",
          dataSource: data,
        });
        fusionChart.render();
      },
    },
    mounted() {
      this.renderLineChart();
    },
    // created() {
    //   this.renderLineChart();
    // },
  };
</script>

<style lang="scss" scoped>
  #chart {
    margin: 40px 0 40px 40px;
  }
</style>
