import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css';

Vue.use(VueNoty, {
  timeout: 2000,
  progressBar: true,
  theme: "bootstrap-v4"
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


// todo товары у полки
// товары у поставщика
// главная страница