import Vue from "vue";
import router from "@/router";
const orderApi = require("@/api/api.js").orderApi;

export const state = {
  orders: []
};

export const getters = {

};

export const mutations = {
  setOrders(state, orders) {
    orders.forEach((val, index) => {
      Object.assign(val, { number: index + 1 })
    });
    state.orders = orders;
  },
  addOrder(state, supplier) {
    Object.assign(supplier, { number: state.orders.length + 1 })
    state.orders.push(supplier);
  },
  removeOrder(state, id) {
    state.orders = state.orders.filter(val => val.id != id);
    state.orders.forEach((val, index) => {
      Object.assign(val, { number: index + 1 })
    });
  }
};

export const actions = {
  addOrder({ commit }, params) {
    orderApi.add(params)
      .then(({data}) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("addOrder", { id: data.id, ...params });
          router.push("/order");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  removeOrder({ commit }, id) {
    orderApi.remove(id)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("removeOrder", id);
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  }
};