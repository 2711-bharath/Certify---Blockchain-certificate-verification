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
  async updateCertificate({ commit }, { body }) {
    const data = await apiService.patch(`/certificate`, body);
    if (body.isDeleted === data.certificate.isDeleted)
      commit(
        "setCertificates",
        state.certificates.filter(
          (certificate) => certificate.uid !== data.certificate.uid
        )
      );
    else
      commit("setCertificates", [
        data.certificate,
        state.certificates.filter(
          (certificate) => certificate.uid !== data.certificate.uid
        ),
      ]);
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
