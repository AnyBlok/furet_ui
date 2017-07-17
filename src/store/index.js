/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import modules from './modules';
import {i18n} from '../i18n';
import {router} from '../routes';
import moment from 'moment';

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export const storeDef = {
    actions,
    getters,
    modules,
    strict: debug,
};

export const store = new Vuex.Store(storeDef);

export const dispatchAll = (datas) => {
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
                default:
                    const type = data.type;
                    delete data.type;
                    const process = data.process || 'commit';
                    store[process](type, data);
            }
        }
    });
}

export default store;
