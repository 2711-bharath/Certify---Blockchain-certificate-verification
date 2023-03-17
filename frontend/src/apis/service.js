import Vue from "vue";
import axiosInstance from "./api";

const handleErrors = (error) => {
  if (error?.response) {
    if (error.response?.status === 404) {
      Vue.$toast.open("Resource not found!", "", "error");
    } else if (error.response?.status === 403) {
      Vue.$toast.open(
        "You don't have the permission to perform this action. Please contact your admin for more information.",
        "",
        "error"
      );
    } else if (!window?.app?.$store?.state?.is_offline) {
      Vue.$toast.open(
        (error.response?.data?.message ||
          error.response?.data?.description ||
          error.response?.data?.title) ??
          "Server error!",
        "",
        "error"
      );
    }

    return error.response;
  }
  return error;
};

class ApiService {
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  async get(path) {
    try {
      const { data } = await this.axiosInstance.request({
        method: "GET",
        url: path,
        responseType: "json",
      });
      if (data.message)
        Vue.$toast.open({
          message: data.message,
          type: data.result ? "success" : "error",
        });
      return data;
    } catch (err) {
      throw handleErrors(err);
    }
  }

  async post(path, body = {}) {
    try {
      const { data } = await this.axiosInstance.request({
        method: "POST",
        url: path,
        responseType: "json",
        data: body,
      });
      if (data.message)
        Vue.$toast.open({
          message: data.message,
          type: data.result ? "success" : "error",
        });
      return data;
    } catch (err) {
      throw handleErrors(err);
    }
  }

  async put(path, body = {}) {
    try {
      const { data } = await this.axiosInstance.request({
        method: "PUT",
        url: path,
        responseType: "json",
        data: body,
      });
      if (data.message)
        Vue.$toast.open({
          message: data.message,
          type: data.result ? "success" : "error",
        });

      return data;
    } catch (err) {
      throw handleErrors(err);
    }
  }

  async patch(path, body = {}) {
    try {
      const { data } = await this.axiosInstance.request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: body,
      });
      if (data.message)
        Vue.$toast.open({
          message: data.message,
          type: data.result ? "success" : "error",
        });

      return data;
    } catch (err) {
      throw handleErrors(err);
    }
  }

  async delete(path, body = {}) {
    try {
      const { data } = await this.axiosInstance.request({
        method: "DELETE",
        url: path,
        responseType: "json",
        data: body,
      });
      if (data.message)
        Vue.$toast.open({
          message: data.message,
          type: data.result ? "success" : "error",
        });

      return data;
    } catch (err) {
      throw handleErrors(err);
    }
  }
}

const apiService = new ApiService();
export default apiService;
