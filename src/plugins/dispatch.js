import _ from 'underscore';
import moment from 'moment';
import { DialogProgrammatic as Dialog } from 'buefy';

export default {
  install(Vue, options) {
    Vue.prototype.$dispatchAll = (datas) => {
      const router = options.router;
      const store = options.store;
      const i18n = options.i18n;
      const notify = Vue.prototype.$notify;

      let type;
      let process;
      _.each(datas, data => {
        if (data.type) {
          switch (data.type) {
            case 'UPDATE_LOCALES':
              _.each(data.locales, locale => {
                  i18n.setLocaleMessage(locale.locale, locale.messages)
              });
              break
            case 'SET_LOCALE':
              i18n.locale = data.locale;
              moment.locale(data.locale);
              if (data.timezone) {
                store.commit('UPDATE_GLOBAL', {userTimeZone: data.timezone})
              }
              break
            case 'UPDATE_ROUTE':
              if (data.name) router.push({name: data.name, params: data.params, query: data.query});
              else if (data.path) router.push({path: data.path});
              break;
            case 'EXPIRED_SESSION':
              if (router.currentRoute.name === 'login') break;
              router.push({path: '/login', query:{redirect: router.currentRoute.fullPath}});
              Dialog.alert({
                title: 'Expired session',
                message: 'The session is expired, login again',
                type: 'is-danger',
                iconPack: 'fa',
                ariaRole: 'alertdialog',
                ariaModal: true,
              })
              break;
            case 'NOTIFY':
              delete data.type;
              notify(data);
              break;
            case 'USER_ERROR':
              Dialog.alert({
                title: data.title,
                message: data.message,
                type: 'is-danger',
                iconPack: 'fa',
                ariaRole: 'alertdialog',
                ariaModal: true,
                onConfirm: () => Vue.prototype.$dispatchAll(data.datas || []),
              })
              break;
            case 'RELOAD':
              location.reload();
              break;
            default:
              type = data.type;
              delete data.type;
              process = data.process || 'commit';
              store[process](type, data);
          }
        }
      });
    }
  }
}
