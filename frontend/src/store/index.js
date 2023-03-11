import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import certificate from "./modules/certificate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    users: user,
    certificate,
  },
});

export default store;
