<template>
  <div
    class="is-flex is-justify-content-space-around is-align-items-center has-background-light p-3 is-size-5 has-text-left"
  >
    <div class="is-flex-grow-5 has-text-weight-medium">Alarms</div>
    <div class="is-flex-grow-1">
      <div class="field mr-5">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            v-model="equipmentName"
            placeholder="Search"
            @input="$emit('filter-grid', equipmentName, currentStatus)"
          />
          <span class="icon is-left">
            <font-aws-icon icon="search" />
          </span>
        </div>
      </div>
    </div>
    <div class="is-flex-grow-1 px-4">
      <div
        class="tabs is-toggle is-centered is-toggle-rounded is-small is-fullwidth"
      >
        <ul>
          <li
            v-for="status in options"
            :key="status"
            :class="[status === currentStatus ? 'is-active' : '']"
            @click="filterStatus(status)"
          >
            <a>{{ status.toUpperCase() }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    emits: ["filter-grid"],
    data() {
      return {
        equipmentName: "",
        options: ["Not Resolved", "Resolved", "All"],
        currentStatus: "All",
      };
    },
    methods: {
      filterStatus(status) {
        this.currentStatus = status;
        this.$emit("filter-grid", this.equipmentName, status);
      },
      resetValues() {
        this.currentStatus = "All";
        this.equipmentName = "";
      },
    },
  };
</script>
