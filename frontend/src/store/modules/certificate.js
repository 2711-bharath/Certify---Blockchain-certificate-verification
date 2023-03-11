/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import apiService from "../../apis/service";

const state = {
  certificates: [],
};

const getters = {
  certificates: (state) => state.certificates,
};
const actions = {
  async getCertificates({ commit }, { userId, shared }) {
    const data = await apiService.get(`/certificate/${userId}/${shared}`);
    commit("setCertificates", data.certificates);
  },
};
const mutations = {
  setCertificates: (state, certificates) => {
    state.certificates = certificates;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
