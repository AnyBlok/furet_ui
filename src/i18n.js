import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18nConf = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      error: 'Error',
      components: {
        login: {
          appbar: 'Log in',
          button: 'Log in',
          username: 'User name',
          password: 'Password',
        },
        logout: {
          button: 'Log out',
        },
        header: {
          search: 'Search',
          new: 'New',
          edit: 'Edit',
          cancel: 'Cancel',
          save: 'Save',
          apply: 'Apply',
          delete: 'Delete',
          notFound: 'No result found',
          return: 'Return',
          previous: 'Previous',
          next: 'Next',
          browse: 'Browse',
          total: 'Total',
          created: 'Created',
          updated: 'Updated',
          deleted: 'Deleted',
          linked: 'Linked',
          unlinked: 'Unlinked',
        },
        fields: {
          common: {
            required: 'This is a required field',
          },
          yesno: {
            yes: 'Yes',
            no: 'No',
          },
          json: {
            invalid: 'Json is invalid',
          },
          relationship: {
            no_more: 'No more datas found.',
            not_found: 'No data found with current filter.',
          },
        },
      },
    },
  },
};

export const i18n = new VueI18n(i18nConf);
