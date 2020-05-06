import Vue from "vue";
import router from "@/router";
const goodApi = require("@/api/api.js").goodApi;

export const state = {
  goods: []
};

export const getters = {
  fill: state => {
    return state.goods.filter(val => val.number == 0);
  },
  stock: state => {
    return state.goods.filter(val => val.number > 0);
  },
  supplier: state => id => {
    return state.goods.filter(val => val.type_supplier_id == id);
  }
};

export const mutations = {
  setGoods(state, goods) {
    goods.forEach((val, index) => {
      Object.assign(val, { n: index + 1 });
    });
    state.goods = goods;
  },
  addGood(state, good) {
    Object.assign(good, { n: state.goods.length + 1 })
    state.goods.push(good);
  },
  removeGood(state, id) {
    state.goods = state.goods.filter(val => val.id != id);
    state.goods.forEach((val, index) => {
      Object.assign(val, { n: index + 1 })
    });
  },
  changeGood(state, good) {
    state.goods.map(val => val.id == good.id ? good : val);
  }
};

export const actions = {
  addGood({ commit }, params) {
    goodApi.add(params)
      .then(({data}) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("addGood", { id: data.id, ...params });
          router.push("/good");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  removeGood({ commit }, id) {
    goodApi.remove(id)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("removeGood", id);
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  },
  changeGood({ commit }, good) {
    goodApi.change(good)
      .then(({ data }) => {
        if (data.success) {
          Vue.noty.success(data.message);
          commit("changeGood", good);
          router.push("/good");
        }
      })
      .catch(error => {
        if (error.response.data.error) Vue.noty.error(error.response.data.error);
        else console.error(error);
      });
  }
};