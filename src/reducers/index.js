/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';
import global from './global';
import client from './client';
import rightmenu from './right-menu';
import leftmenu from './left-menu';
import spaces from './spaces';
import {action_manager} from './action_manager';
import actions from './actions';
import views from './views';
import data from './data';
import translate from 'counterpart';
import * as moment from 'moment';
import 'moment';


export const dispatchAll = (dispatch, datas) => {
    _.each(datas, data => {
        if (data.type) {
            switch (data.type) {
                case 'UPDATE_LOCALES':
                    _.each(data.locales, d => {
                        translate.registerTranslations(d.locale, {furetUI: d.counterpart});
                    });
                    break
                case 'SET_LOCALE':
                    translate.setLocale(data.locale)
                    moment.locale(data.locale) 
                default:
                    dispatch(data);
            }
        }
    });
}

export default {
    global,
    client,
    rightmenu,
    leftmenu,
    spaces,
    action_manager,
    actions,
    views,
    data,
}
