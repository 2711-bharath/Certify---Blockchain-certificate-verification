<template>
  <div
    class="is-flex is-justify-content-space-between has-background-white-ter m-0 p-2"
    v-if="totalRowsCount > 10"
  >
    <div class="select is-size-6 is-flex is-align-items-center">
      <div v-if="pages.length != 0" class="mr-6">
        Showing
        <span class="has-text-weight-medium">{{
          pages[currentPage].start
        }}</span>
        to
        <span class="has-text-weight-medium">{{ pages[currentPage].end }}</span>
        of
        <span class="has-text-weight-medium">{{ totalRowsCount }}</span>
        entries
      </div>
      <div class="mr-2">Rows per page</div>
      <select v-model="rowsPerPage" @change="getPages()">
        <option selected disabled :value="null">Select no of records</option>
        <option
          v-for="option in options"
          :key="option"
          :value="option"
          class="has-text-black"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <div
      class="is-size-6 is-flex is-align-items-center"
      v-if="pages.length !== 0"
    >
      <div class="px-1 is-pointer has-text-grey-light" @click="start()">
        <font-aws-icon icon="angle-double-left" />
      </div>
      <div class="px-1 is-pointer has-text-grey-light" @click="previoustPage()">
        <font-aws-icon icon="angle-left" />
      </div>
      <div v-if="currentPage !== null" class="px-1">
        <ul class="is-flex has-text-weight-medium">
          <li
            v-for="pageNum in pages.length"
            :key="pageNum"
            class="px-1 is-pointer"
            @click="jumpPage(pageNum - 1)"
          >
            <p
              :class="[
                pageNum === currentPage + 1
                  ? 'has-text-link'
                  : 'has-text-black',
              ]"
            >
              {{ pageNum }}
            </p>
          </li>
        </ul>
      </div>
      <div class="px-1 is-pointer has-text-grey-light" @click="nextPage()">
        <font-aws-icon icon="angle-right" />
      </div>
      <div class="px-1 is-pointer has-text-grey-light" @click="end()">
        <font-aws-icon icon="angle-double-right" />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Footer",
    emits: ["pagination"],
    props: {
      totalRowsCount: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        pages: [],
        currentPage: null,
        options: [10, 15, 20, 35],
        rowsPerPage: null,
      };
    },
    methods: {
      initFooter(totalRows) {
        this.totalNoOfRows = totalRows;
        this.rowsPerPage = 25;
        this.getPages();
      },
      getPages() {
        this.pages = [];
        for (let i = 1; i <= this.totalRowsCount; i += this.rowsPerPage) {
          this.pages.push({ start: i, end: i + this.rowsPerPage - 1 });
        }
        this.pages[this.pages.length - 1].end = this.size;
        this.currentPage = 0;
        this.$emit("pagination", this.pages[this.currentPage]);
      },
      jumpPage(pageNum) {
        this.currentPage = pageNum;
        this.$emit("pagination", this.pages[this.currentPage]);
      },
      nextPage() {
        if (this.currentPage < this.pages.length - 1) {
          this.currentPage += 1;
          this.$emit("pagination", this.pages[this.currentPage]);
        }
      },
      previoustPage() {
        if (this.currentPage >= 1) {
          this.currentPage -= 1;
          this.$emit("pagination", this.pages[this.currentPage]);
        }
      },
      start() {
        this.currentPage = 0;
        this.$emit("pagination", this.pages[this.currentPage]);
      },
      end() {
        this.currentPage = this.pages.length - 1;
        this.$emit("pagination", this.pages[this.currentPage]);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .is-pointer {
    cursor: pointer;
  }

  .is-size-6 {
    font-size: 14px !important;
  }
</style>
