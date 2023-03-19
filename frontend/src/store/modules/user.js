/* eslint-disable no-shadow */
import apiService from "../../apis/service";

const state = {
  userData: {},
  users: {},
  isLoggedIn: Boolean(localStorage.getItem("user")),
  width: window.innerWidth,
};

const getters = {
  user: (state) => state.userData,
  users: (state) => state.users,
  isLoggedIn: (state) => state.isLoggedIn,
  getWidth: (state) => state.width,
};

const actions = {
  async getUser({ commit }, { userId }) {
    const data = await apiService.get(`/user/${userId}`);
    commit("setUser", data.user);
    commit("setLoggedIn", true);
  },

  async getUsers({ commit }) {
    const data = await apiService.get(`/user`);
    commit("setUsers", data.users);
  },

  async updateUser({ commit }, { uid, profile }) {
    const data = await apiService.put("/user/update", {
      uid,
      profile,
    });
    commit("setUser", data.user);
  },

  // eslint-disable-next-line no-empty-pattern
  setLocalState({ commit }, { userId }) {
    localStorage.setItem("user", true);
    localStorage.setItem("user_id", userId);
    commit("setLoggedIn", true);
  },

  removeLocalState({ commit }) {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    commit("setLoggedIn", false);
  },
};

const mutations = {
  setUser: (state, user) => {
    state.userData = user;
  },
  setUsers: (state, user) => {
    state.users = user;
  },
  setLoggedIn: (state, isLoggedIn) => {
    state.isLoggedIn = isLoggedIn;
  },
  setWidth: (state, val) => {
    state.width = val;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
