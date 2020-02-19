import _ from 'underscore';
import moment from 'moment';

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
              break
            case 'UPDATE_ROUTE':
              if (data.name) router.push({name: data.name, params: data.params});
              else if (data.path) router.push({path: data.path});
              break;
            case 'NOTIFY':
              delete data.type;
              notify(data);
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
