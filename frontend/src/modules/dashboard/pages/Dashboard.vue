<template>
  <div style="display: flex">
    <Cards />
    <Alerts />
  </div>
</template>

<script>
  import Cards from "../components/Cards.vue";
  import Alerts from "../components/Alerts.vue";

  export default {
    name: "DashBoard",
    data() {
      return {
        title: "Dashboard",
        subTitle: "Dashboard",
        iconName: "bell",
      };
    },
    components: {
      Cards,
      Alerts,
    },
  };
</script>
