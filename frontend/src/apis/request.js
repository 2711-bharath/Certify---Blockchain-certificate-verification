import axiosInstance from "./api";

export default class Axios {
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  get(path) {
    return this.axiosInstance.request({
      method: "GET",
      url: path,
      responseType: "json",
    });
  }

  post(path, data = {}) {
    return this.axiosInstance.request({
      method: "POST",
      url: path,
      responseType: "json",
      data,
    });
  }

  put(path, data = {}) {
    return this.service.request({
      method: "PUT",
      url: path,
      responseType: "json",
      data,
    });
  }

  delete(path, data = {}) {
    return this.axiosInstance.request({
      method: "DELETE",
      url: path,
      responseType: "json",
      data,
    });
  }
}
