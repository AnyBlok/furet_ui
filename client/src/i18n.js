import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18nConf = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
    },
  },
};
export const i18n = new VueI18n(i18nConf);
