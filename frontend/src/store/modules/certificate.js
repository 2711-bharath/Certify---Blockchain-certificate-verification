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
  async getCertificates({ commit }, { userId, status }) {
    const data = await apiService.get(`/certificate/${userId}/${status}`);
    commit("setCertificates", data.certificates);
  },
  async updateCertificate({ commit }, { body, certificates }) {
    await apiService.patch(`/certificate`, body);
    commit("setCertificates", certificates);
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
