import Vue from "vue";
import router from "@/router";
const shelfApi = require("@/api/api.js").shelfApi;

export const state = {
  shelfs: []
};

export const getters = {

};

export const mutations = {
  setShelfs(state, shelfs) {
    state.shelfs = shelfs;
  },
  addShelf(state, shelf) {
    state.shelfs.push(shelf);
  },
  removeShelf(state, id) {
    state.shelfs = state.shelfs.filter(val => val.id != id);
  },
  changeShelf(state, shelf) {
    state.shelfs.map(val => val.id == shelf.id ? shelf : val);
  }
};

export const actions = {
  addShelf({ commit }, count) {
    shelfApi.add(count)
      .then(({data}) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("addShelf", { id: data.id, count });
          router.push("/shelf");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  removeShelf({ commit }, id) {
    shelfApi.remove(id)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("removeShelf", id);
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  changeShelf({ commit }, shelf) {
    shelfApi.change(shelf)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("changeShelf", shelf);
          router.push("/shelf");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  }
};