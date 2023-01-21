<template>
  <div class="is-flex is-justify-content-end mb-2">
    <div :class="['dropdown is-right', showDropdown ? 'is-active' : '']">
      <span class="button" @click="toggleDropdown()">
        <font-aws-icon icon="ellipsis-v" />
      </span>
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <div
            class="dropdown-item is-size-6 px-2 py-0"
            v-for="option in options"
            :key="option.id"
          >
            <label
              class="checkbox is-medium p-1 is-flex is-justify-content-space-between is-align-items-center"
              @click="$emit('grid-options', option)"
            >
              <input type="checkbox" v-model="option.show" />
              {{ option.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "GridOptions",
    emits: ["grid-options"],
    data() {
      return {
        options: [
          {
            id: "equipment_name",
            name: "Equipment Name",
            show: true,
          },
          {
            id: "type",
            name: "Type",
            show: true,
          },
          {
            id: "details",
            name: "Details",
            show: true,
          },
          {
            id: "triggered_on",
            name: "Triggered On",
            show: true,
          },
          {
            id: "status",
            name: "Status",
            show: true,
          },
        ],
        showDropdown: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
    },
  };
</script>
<style lang="scss" scoped>
  input[type="checkbox"] {
    height: 1rem;
    width: 1rem;
  }
</style>
