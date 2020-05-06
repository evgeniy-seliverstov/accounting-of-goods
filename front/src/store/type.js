import Vue from "vue";
import router from "@/router";
const typeApi = require("@/api/api.js").typeApi;

export const state = {
  types: []
};

export const getters = {

};

export const mutations = {
  setTypes(state, types) {
    types.forEach((val, index) => {
      Object.assign(val, { number: index + 1, supplier: !val.supplier_phone ? val.supplier_name : `${val.supplier_name} (${val.supplier_phone})` })
    });
    state.types = types;
  },
  addType(state, type) {
    Object.assign(type, { number: state.types.length + 1, supplier: !type.supplier_phone ? type.supplier_name : `${type.supplier_name} (${type.supplier_phone})` })
    state.types.push(type);
  },
  removeType(state, id) {
    state.types = state.types.filter(val => val.id != id);
    state.types.forEach((val, index) => {
      Object.assign(val, { number: index + 1 })
    });
  },
  changeType(state, type) {
    state.types.map(val => val.id == type.id ? type : val);
  }
};

export const actions = {
  addType({ commit }, params) {
    typeApi.add(params)
      .then(({data}) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("addType", { id: data.id, ...params });
          router.push("/type");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  removeType({ commit }, id) {
    typeApi.remove(id)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("removeType", id);
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  changeType({ commit }, type) {
    typeApi.change(type)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("changeType", type);
          router.push("/type");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  }
};