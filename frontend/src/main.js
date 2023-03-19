import "vue-toast-notification/dist/theme-sugar.css";
import Vue from "vue";
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

import VueToast from "vue-toast-notification";
import VueViewer from "v-viewer";
import App from "./App.vue";
import router from "./route/index";
import store from "./store/index";
import "./utils/styles/global.scss";
// eslint-disable-next-line import/no-extraneous-dependencies
import "viewerjs/dist/viewer.css";

// Global is loading variable
Vue.mixin({
  data() {
    return {
      isLoading: false,
    };
  },
});
Vue.use(VueViewer);
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
Vue.use(VueToast, {
  position: "top",
  duration: 4500,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
