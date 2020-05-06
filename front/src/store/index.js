import Vue from 'vue'
import Vuex from 'vuex'
import { supplierApi } from '../api/api';

const shelf = require("@/store/shelf.js");
const supplier = require("@/store/supplier.js");
const type = require("@/store/type.js");
const good = require("@/store/good.js");
const order = require("@/store/order.js");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: [
      { title: "Полки", route: "/shelf" },
      { title: "Список поставщиков", route: "/supplier" },
      { title: "Вид товара", route: "/type" },
      { title: "Список товаров", route: "/good" },
      { title: "Список заказов", route: "/order" },
    ],
    ...shelf.state,
    ...supplier.state,
    ...type.state,
    ...good.state,
    ...order.state
  },
  getters: {
    ...shelf.getters,
    ...supplier.getters,
    ...type.getters,
    ...good.getters,
    ...order.getters
  },
  mutations: {
    ...shelf.mutations,
    ...supplier.mutations,
    ...type.mutations,
    ...good.mutations,
    ...order.mutations
  },
  actions: {
    ...shelf.actions,
    ...supplier.actions,
    ...type.actions,
    ...good.actions,
    ...order.actions
  }
})
