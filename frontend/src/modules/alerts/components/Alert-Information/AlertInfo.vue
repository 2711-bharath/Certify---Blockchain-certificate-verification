<template>
  <div>
    <Header :alertDetails="alertDetails" />
    <Overview :alertDetails="alertDetails" />
  </div>
</template>
<script>
  import Header from "./Header.vue";
  import Overview from "./Overview.vue";

  export default {
    name: "AlertInfo",
    components: {
      Header,
      Overview,
    },
    data() {
      return {
        alertDetails: {
          equipment_name: "abc1",
          zone: {
            name: "Zone 11 - Phu Khang",
            location: "822300, Ton My, Hyen Tan Uyen, Binh Duong, Vietnam",
          },
          alarm_type: "Sungrow Fault",
          triggeredAt: "Feb 09, 2022 - 05:28PM (ICT)",
          lastTriggeredBefore: "13 days 7 hours 46 minutes ago",
          median_duration: "0 minutes",
          status: "NOT RESOLVED",
          overview: {
            fault_name: "Grid Power Outage [ 1 - important ]",
            description: "",
            fault_code: "",
            cause: "",
            corrective_measures: "",
          },
          timelines: [
            {
              status: "Triggered",
              triggeredAt: "Jan 22, 2022 - 06:22AM (ICT)",
            },
            { status: "Triggered", triggeredAt: "Jan 9, 2022 - 06:22AM (ICT)" },
          ],
        },
        alertId: this.$route.params.alert_id,
      };
    },
  };
</script>
