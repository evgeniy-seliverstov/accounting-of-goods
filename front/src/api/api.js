import { apiUrl } from "@/config.js";
const axios = require("axios");
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

export const shelfApi = {
  add(count) {
    return api.post(`/shelf`, { count });
  },
  remove(id) {
    return api.delete(`/shelf/${id}`);
  },
  change({ id, count }) {
    return api.put(`/shelf/${id}`, { count });
  },
  getByIndex(id) {
    return api.get(`/shelf/${id}`);
  },
  get() {
    return api.get("/shelf");
  }
}

export const supplierApi = {
  add({ name, address, phone }) {
    return api.post(`/supplier`, { name, address, phone });
  },
  remove(id) {
    return api.delete(`/supplier/${id}`);
  },
  change({ id, name, address, phone }) {
    return api.put(`/supplier/${id}`, { name, address, phone });
  },
  getByIndex(id) {
    return api.get(`/supplier/${id}`);
  },
  get() {
    return api.get("/supplier");
  }
}

export const typeApi = {
  add({ name, supplier_id }) {
    return api.post(`/type`, { name, supplier_id });
  },
  remove(id) {
    return api.delete(`/type/${id}`);
  },
  change({ id, name, supplier_id }) {
    return api.put(`/type/${id}`, { name, supplier_id });
  },
  getByIndex(id) {
    return api.get(`/type/${id}`);
  },
  get() {
    return api.get("/type");
  }
}

export const goodApi = {
  add({ type_id, number, shelf_id }) {
    return api.post(`/good`, { type_id, number, shelf_id });
  },
  remove(id) {
    return api.delete(`/good/${id}`);
  },
  change({ id, type_id, number, shelf_id }) {
    return api.put(`/good/${id}`, { type_id, number, shelf_id });
  },
  getByIndex(id) {
    return api.get(`/good/${id}`);
  },
  get() {
    return api.get("/good");
  }
}

export const orderApi = {
  add({ goods }) {
    return api.post(`/order`, { goods });
  },
  remove(id) {
    return api.delete(`/order/${id}`);
  },
  get() {
    return api.get("/order");
  }
}
