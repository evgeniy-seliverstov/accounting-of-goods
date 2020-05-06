import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/src/locale/ru.ts';

Vue.use(Vuetify);

export default new Vuetify({
  theme: { 
    dark: true 
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
});
