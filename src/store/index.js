import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'underscore';
import moment from 'moment';

import * as actions from './actions';
import modules from './modules';
import {i18n} from '../i18n';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export const storeDef = {
  actions,
  modules,
  strict: debug,
};

export const createStore = () => new Vuex.Store(storeDef);


export const dispatchAll = (router, store, datas) => {
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
                case 'RELOAD':
                    location.reload();
                    break;
                default:
                    const type = data.type;
                    delete data.type;
                    const process = data.process || 'commit';
                    store[process](type, data);
            }
        }
    });
}

export default createStore;
