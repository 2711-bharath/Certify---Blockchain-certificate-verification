<template>
  <div class="is-size-6 has-text-left">
    <p class="py-3 mb-5">
      <font-aws-icon icon="history" class="has-text-color-grey" />
      <span class="has-text-weight-bold ml-2">History</span>
    </p>
    <div class="timeline mt-3">
      <div
        class="timeline-item"
        v-for="(timeline, index) in timelines"
        :key="index"
      >
        <p
          class="circle"
          @click="showInfo(index)"
          :class="[
            'circle',
            show === index
              ? 'has-background-danger'
              : 'has-background-grey-light',
          ]"
        ></p>
        <div class="timeline-container ml-2 mr-4">
          <div class="timeline-content px-2 py-1" v-if="show === index">
            <p class="has-text-danger">{{ timeline.status }}</p>
            <p class="mb-1">{{ timeline.triggeredAt }}</p>
          </div>
          <p
            v-if="
              index !== timelines.length - 1 &&
              calDiffDate(
                timeline.triggeredAt,
                timelines[index + 1].triggeredAt
              )
            "
            :class="[
              'lastly-used mx-4 has-text-weight-light',
              show !== index ? 'my-6 pb-2' : '',
            ]"
          >
            {{ lastTriggeredAt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Timeline",
    props: {
      timelines: {
        type: Array,
      },
    },
    data() {
      return {
        show: 0,
        lastTriggeredAt: "",
      };
    },
    methods: {
      showInfo(index) {
        this.show = index;
      },
      calDiffDate(date1, date2) {
        const d1 = new Date(date1.split("-")[0]);
        const d2 = new Date(date2.split("-")[0]);
        const diffTime = Math.abs(d1 - d2);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.lastTriggeredAt = `${String(diffDays)} days ago`;
        return 1;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .timeline {
    min-height: 200px;
    border-left: 2px solid lightgray;
    padding: 0 1rem;
  }

  .timeline-content {
    border: 1px solid lightgray;
    border-radius: 4px;
    margin: -2.25rem 0 3rem 0;

    &:before {
      content: "";
      width: 12px;
      height: 12px;
      display: block;
      position: absolute;

      margin-top: 16px;
      margin-left: -15px;
      background: #fff;
      border-left: 1px solid lightgray;
      border-bottom: 1px solid lightgray;
      transform: rotate(45deg);
    }
  }

  .circle {
    display: flex;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    margin-left: -25px;
    z-index: 2;
    cursor: pointer;
  }

  .lastly-used {
    margin-bottom: 4.5rem;
  }
</style>
