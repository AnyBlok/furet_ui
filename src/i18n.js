import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18nConf = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      components: {
        spaces: {
            title: 'Space menus',
            search: 'Filter ...',
        },
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
