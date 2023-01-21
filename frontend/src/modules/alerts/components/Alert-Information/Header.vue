<template>
  <div class="columns is-flex-wrap-wrap mb-0">
    <div class="column is-one-quarter pb-0">
      <figure class="image">
        <img src="https://bulma.io/images/placeholders/480x320.png" />
      </figure>
    </div>
    <div class="column mt-4 mx-1 has-text-left pb-0">
      <h3 class="is-size-5 pb-4">{{ alertDetails.equipment_name }}</h3>
      <div class="is-size-7 pb-4">
        <span class="has-text-weight-bold"
          >{{ alertDetails.zone.name }} -
        </span>
        {{ alertDetails.zone.location }}
      </div>
      <div>
        <div class="is-size-7 mt-3">Alarm Type</div>
        <div class="is-size-6 has-text-weight-bold">
          {{ alertDetails.alarm_type }}
        </div>
      </div>
    </div>
    <div class="column is-size-6 mt-4 mx-2 has-text-right pb-0t">
      <div
        class="is-flex is-justify-content-flex-end is-align-items-center is-wrap-wrap"
      >
        <p>
          <font-aws-icon icon="history" /> {{ alertDetails.triggeredAt }}
          <span class="is-size-7 ml-1"
            >({{ alertDetails.lastTriggeredBefore }})</span
          >
        </p>
      </div>
      <div class="my-3">
        <button class="button is-small m-1">
          Median Duration:
          <span class="has-text-weight-bold ml-1">
            {{ alertDetails.median_duration }}
          </span>
        </button>
        <button class="button is-danger m-1 mr-0 is-small">
          {{ alertDetails.status }}
        </button>
      </div>
    </div>
    <div class="column is-one-fifth pb-0"></div>
  </div>
</template>
<script>
  export default {
    name: "Header",
    props: {
      alertDetails: {
        type: Object,
        required: true,
      },
    },
  };
</script>
<style lang="scss" scoped></style>
