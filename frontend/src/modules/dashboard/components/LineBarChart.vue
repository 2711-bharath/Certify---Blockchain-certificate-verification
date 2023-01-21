<template>
  <div id="dualChart"></div>
</template>

<script>
  import FusionCharts from "fusioncharts";

  export default {
    name: "LineBarChart",
    data() {
      return {};
    },
    methods: {
      renderLineChart() {
        const fusionChart = new FusionCharts({
          type: "mscombidy2d",
          renderAt: "dualChart",
          width: "100%",
          height: "300",
          dataFormat: "json",
          dataSource: {
            chart: {
              caption: "Production",
              xaxisname: "Time",
              pyaxisname: "Energy (kWh)",
              syaxisname: "Performance Ratio",
              theme: "fusion",
            },
            categories: [
              {
                category: [
                  {
                    label: "Jul, 21",
                  },
                  {
                    label: "Aug, 21",
                  },
                  {
                    label: "Sep, 21",
                  },
                  {
                    label: "Oct, 21",
                  },
                  {
                    label: "Nov, 21",
                  },
                  {
                    label: "Dec, 21",
                  },
                  {
                    label: "Jan, 22",
                  },
                  {
                    label: "Feb, 22",
                  },
                ],
              },
            ],
            dataset: [
              {
                seriesName: "Energy",
                data: [
                  {
                    value: "16000",
                  },
                  {
                    value: "20000",
                  },
                  {
                    value: "18000",
                  },
                  {
                    value: "19000",
                  },
                  {
                    value: "15000",
                  },
                  {
                    value: "16000",
                  },
                  {
                    value: "16000",
                  },
                  {
                    value: "2000",
                  },
                ],
              },
              {
                seriesName: "Production Ratio",
                parentYAxis: "S",
                renderAs: "line",
                showValues: "0",
                data: [
                  {
                    value: "",
                  },
                  {
                    value: "",
                  },
                  {
                    value: "0.666",
                  },
                  {
                    value: ".705",
                  },
                  {
                    value: "0.666",
                  },
                  {
                    value: "0.7",
                  },
                  {
                    value: "0.625",
                  },
                  {
                    value: "0.5",
                  },
                ],
              },
            ],
          },
        });
        fusionChart.render();
      },
    },
    mounted() {
      this.renderLineChart();
    },
  };
</script>

<style lang="scss" scoped></style>
