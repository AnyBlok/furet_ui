import Vue from 'vue';
import VueI18n from 'vue-i18n';
import moment from 'moment';

Vue.use(VueI18n);

export const i18nConf = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      components: {
        login: {
          appbar: 'Log in',
          button: 'Log in',
        },
        logout: {
          appbar: {
            administrator: 'Administrator',
            logout: 'Log out',
            about: 'About ...',
          },
          button: 'Log out',
        },
        page: {
          list: {
            search: 'Search',
            new: 'New',
            notFound: 'No result found',
          },
        },
      },
    },
  },
};
export const i18n = new VueI18n(i18nConf);
export const updateLocales = (langs) => {
  langs.forEach((lang) => {
    i18n.setLocaleMessage(lang.locale, lang.translations);
  });
};
window.updateLocales = updateLocales;
export const updateLang = (lang) => {
  i18n.locale = lang;
  moment.locale(lang);
};
window.updateLang = updateLang;
