<template>
  <div class="bar">
    <div>
      <h3 class="title is-4">Dashboard</h3>
    </div>
    <div class="columns">
      <label class="switch">
        <input type="checkbox" @click="toggleCheckbox" :checked="checkbox" />
        <div class="slider round">
          <span>
            <span>
              <span v-if="checkbox">Energy</span>
              <span v-else>Revenue </span>
            </span>
          </span>
        </div>
      </label>
      <div class="aselect" :data-value="selectedOption" :data-list="list">
        <div class="selector" @click="toggle()">
          <div class="label">
            <span>{{ selectedOption.name }}</span>
            <div class="arrow" :class="{ expanded: visible }"></div>
          </div>
          <div :class="{ hidden: !visible, visible }">
            <ul>
              <li
                :class="{ current: item === selectedOption }"
                v-for="item in list"
                @click="select(item)"
                :key="item.name"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Bar",
    data() {
      return {
        checkbox: false,
        selectedOption: { name: "Monthly", value: "monthly" },
        list: [
          { name: "Monthly", value: "monthly" },
          { name: "Yearly", value: "yearly" },
          { name: "Life Time", value: "lifetime" },
        ],
        visible: false,
      };
    },
    methods: {
      toggleCheckbox() {
        this.checkbox = !this.checkbox;
      },
      toggle() {
        this.visible = !this.visible;
      },
      select(option) {
        this.selectedOption = option;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .title {
    color: #36393d;
    font-weight: 300;
  }

  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 20px;
  }

  .switch {
    position: relative;
    display: inline-block;
    min-width: 100px;
    height: 30px;
  }
  .switch input {
    display: none;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    border: 1px solid #b7b7b7;
    transition: 0.4s;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    background-color: #3ec1c7;
    transition: 0.4s;
  }

  .slider span {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slider span span {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 100%;
    padding: 0 6px;

    font-size: 1rem;
    color: #b7b7b7;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #101010;
  }
  input:checked + .slider:before {
    transform: translateX(72px);
  }

  input:checked + .slider span span {
    justify-content: flex-start;
  }
  .slider.round {
    border-radius: 34px;
  }
  .slider.round:before {
    border-radius: 50%;
  }

  .aselect {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 120px;
    margin: 0 20px;
  }
  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    border: 1px solid gainsboro;
    position: absolute;
    z-index: 1;
    background: #dddddd;
  }
  li {
    padding: 12px;
    color: #728fb2;
    background: #ffffff;
    cursor: pointer;
  }
  li:hover {
    color: white;
    background: seagreen;
  }
  .current {
    background: #eaeaea;
  }
  .hidden {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
  .aselect .selector {
    background: #dddddd;
    border-radius: 30px;
    position: relative;
    width: 100%;
    z-index: 1;
  }
  .aselect .selector .arrow {
    position: absolute;
    right: 10px;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid #888;
    transform: rotateZ(0deg) translateY(0px);
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
  }
  .aselect .selector .expanded {
    transform: rotateZ(180deg) translateY(2px);
  }
  .aselect .selector .label {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 3px 12px;
    margin: 0;
    font-size: 1rem;
    font-weight: 300;
    color: #444444;
  }
</style>
