<template>
  <div ref="alerts">
    <Header ref="header" @filter-grid="filterGrid" />
    <div class="m-2">
      <GridOptions @grid-options="toggleColumn" />
      <div ref="grid" class="dhx-container--grid"></div>
      <Footer ref="footer" @pagination="pagination" :totalRowsCount="size" />
    </div>
  </div>
</template>
<script>
  import GridOptions from "./GridOptions.vue";
  import Footer from "./Footer.vue";
  import Header from "./Header.vue";
  import AlertService from "../../../../apis/alerts";
  // import AlertService from "@/apis/alerts";

  export default {
    name: "Grid",
    components: {
      Header,
      GridOptions,
      Footer,
    },
    data() {
      return {
        grid: null,
        size: 0,
        data: [],
      };
    },
    methods: {
      initGrid() {
        const gridWidth = this.$refs.grid.clientWidth;
        // eslint-disable-next-line no-undef
        this.grid = new dhx.Grid(this.$refs.grid, {
          columns: [
            {
              width: Math.floor(gridWidth / 4),
              id: "equipment_name",
              header: [{ text: "Equipment Name" }],
              mark: () => "has-text-weight-bold is-link",
            },
            {
              width: Math.floor(gridWidth / 6),
              id: "type",
              header: [{ text: "Type" }],
            },
            {
              width: Math.floor(gridWidth / 4),
              id: "details",
              header: [{ text: "Details" }],
              mark: () => "has-text-danger",
            },
            {
              width: Math.floor(gridWidth / 6),
              id: "triggered_on",
              header: [{ text: "Triggered On" }],
            },
            {
              width: Math.floor(gridWidth / 6) - 20,
              id: "status",
              header: [{ text: "Status" }],
              editable: true,
              editorType: "combobox",
              options: ["Not Resolved", "Resolved"],
              mark: (cell) =>
                cell === "Not Resolved"
                  ? "has-text-danger"
                  : "has-text-success",
            },
          ],
          height: 450,
          headerRowHeight: 50,
          rowHeight: 50,
          resize: false,
          editable: true,
          autoHeight: true,
          selection: "cell",
        });
        this.grid.events.on("cellClick", (row, e) => {
          if (e.id === "equipment_name")
            this.$router.push(`/alerts/${row.equipment_name}`);
        });
      },
      toggleColumn(column) {
        if (column.show) {
          this.grid.hideColumn(column.id);
        } else {
          this.grid.showColumn(column.id);
        }
      },
      filterGrid(equipmentName, status) {
        this.grid.data.filter((data) => {
          if (
            equipmentName !== "" &&
            !RegExp(equipmentName, "i").exec(data.equipment_name)
          ) {
            return false;
          }
          if (status === "All" || status === data.status) {
            return true;
          }
          return false;
        });
      },
      pagination(page) {
        if (page) {
          this.grid.data.removeAll();
          this.grid.data.add(this.data.slice(page.start - 1, page.end));
          this.$refs.header.resetValues();
        }
      },
    },
    mounted() {
      this.initGrid();
    },
    created() {
      new AlertService().get("./datadump.json").then((res) => {
        this.data = res.data;
        this.grid.data.add(this.data);
        this.size = res.data.length;
      });
    },
  };
</script>
<style lang="scss">
  .dhx_grid-footer-cell:not(.dhx_cell_first),
  .dhx_grid-header-cell:not(.dhx_cell_first) {
    border-left: none !important;
  }
  .dhx_grid-header-cell--sortable:hover:after,
  .dhx_grid-header-cell--sorted:after,
  .dhx_grid-header-cell {
    background: #fff;
  }
  .dhx_grid-cell {
    border-top: 0px;
    border-left: 0px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.85);
  }
  .dhx_grid-row {
    border-bottom: 1px solid lightgrey;
    &:hover {
      background: #e6e6e662;

      .is-link {
        color: #3979f7;
        cursor: pointer;
      }
    }
  }
</style>
