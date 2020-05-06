import Vue from "vue";
import router from "@/router";
const supplierApi = require("@/api/api.js").supplierApi;

export const state = {
  suppliers: []
};

export const getters = {

};

export const mutations = {
  setSuppliers(state, suppliers) {
    suppliers.forEach((val, index) => {
      Object.assign(val, { number: index + 1 })
    });
    state.suppliers = suppliers;
  },
  addSupplier(state, supplier) {
    Object.assign(supplier, { number: state.suppliers.length + 1 })
    state.suppliers.push(supplier);
  },
  removeSupplier(state, id) {
    state.suppliers = state.suppliers.filter(val => val.id != id);
    state.suppliers.forEach((val, index) => {
      Object.assign(val, { number: index + 1 })
    });
  },
  changeSupplier(state, supplier) {
    state.suppliers.map(val => val.id == supplier.id ? supplier : val);
  }
};

export const actions = {
  addSupplier({ commit }, params) {
    supplierApi.add(params)
      .then(({data}) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("addSupplier", { id: data.id, ...params });
          router.push("/supplier");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  removeSupplier({ commit }, id) {
    supplierApi.remove(id)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("removeSupplier", id);
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  changeSupplier({ commit }, supplier) {
    supplierApi.change(supplier)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("changeSupplier", supplier);
          router.push("/supplier");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  }
};