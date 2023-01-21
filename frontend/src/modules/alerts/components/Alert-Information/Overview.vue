<template>
  <div>
    <ul class="is-flex has-background-grey-dark has-text-white is-size-6">
      <li class="px-4 py-3 is-active">Overview</li>
    </ul>
    <div class="columns p-3 mx-2">
      <div class="column is-two-thirds has-text-left is-size-6">
        <div
          :class="[
            'has-text-weight-bold',
            alertDetails.overview.fault_name === '' ? 'pb-5' : 'my-2',
          ]"
        >
          Fault Name
        </div>
        <div class="my-3">
          {{ alertDetails.overview.fault_name }}
        </div>
        <div
          :class="[
            'has-text-weight-bold',
            alertDetails.overview.description === '' ? 'pb-5' : 'my-2',
          ]"
        >
          Description
        </div>
        <div class="my-3">
          {{ alertDetails.overview.description }}
        </div>
        <div
          :class="[
            'has-text-weight-bold',
            alertDetails.overview.fault_code === '' ? 'pb-5' : 'my-2',
          ]"
        >
          Fault Code
        </div>
        <div class="my-3">
          {{ alertDetails.overview.fault_code }}
        </div>
        <div
          :class="[
            'has-text-weight-bold',
            alertDetails.overview.cause === '' ? 'pb-5' : 'my-2',
          ]"
        >
          Cause
        </div>
        <div class="my-3">
          {{ alertDetails.overview.cause }}
        </div>
        <div
          :class="[
            'has-text-weight-bold',
            alertDetails.overview.corrective_measures === '' ? 'pb-5' : 'my-2',
          ]"
        >
          Corrective Measures
        </div>
        <div class="my-3">
          {{ alertDetails.overview.corrective_measures }}
        </div>

        <router-link
          class="button px-4 py-2 mt-2 has-background-grey-lighter is-size-7"
          to="/alerts"
          >BACK</router-link
        >
      </div>
      <div class="column">
        <Timeline :timelines="alertDetails.timelines" />
      </div>
    </div>
  </div>
</template>
<script>
  import Timeline from "./Timeline.vue";

  export default {
    name: "Overview",
    props: {
      alertDetails: {
        type: Object,
        required: true,
      },
    },
    components: {
      Timeline,
    },
  };
</script>
<style lang="scss" scoped>
  .is-active {
    border-bottom: 2px solid whitesmoke;
  }
</style>
