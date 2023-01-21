import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueFusionCharts from "vue-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import vClickOutside from "v-click-outside";

import "buefy/dist/buefy.css";

import {
  Checkbox,
  Dialog,
  Dropdown,
  Loading,
  Modal,
  Numberinput,
  Progress,
  Radio,
  Select,
  Skeleton,
  Slider,
  Switch,
  Taginput,
  Toast,
  Tooltip,
  Upload,
  Input,
  Autocomplete,
  Sidebar,
  Steps,
  Message,
  Tag,
} from "buefy";

import App from "./App.vue";
import router from "./route/index";
import store from "./store/index";
import "./utils/styles/global.scss";

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);
Vue.use(Dropdown);
Vue.use(Modal);
Vue.use(Numberinput);
Vue.use(Loading);
Vue.use(Skeleton);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(Tooltip);
Vue.use(Upload);
Vue.use(Toast);
Vue.use(Slider);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Taginput);
Vue.use(Autocomplete);
Vue.use(Sidebar);
Vue.use(Steps);
Vue.use(Message);
Vue.use(Tag);
Vue.use(Progress);

Vue.use(vClickOutside);

library.add(fas);
Vue.component("font-aws-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
