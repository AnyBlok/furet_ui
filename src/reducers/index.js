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
import change from './change';
import translate from 'counterpart';
import * as moment from 'moment';
import 'moment';
import {json_post} from '../server-call';


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

export const send2ServerCall = store => {
    const {getState, dispatch} = store;
    let toSync = getState().change.toSync;

    const _send2ServerCall = () => {
        toSync = getState().change.toSync[0];
        if (!toSync) return;
        if (toSync.state != 'toSend') return
        dispatch({type: 'SYNC', uuid: toSync.uuid});
        json_post('/data/update', {data: toSync.data}, {
            onSuccess: (results) => {
                dispatch({type: 'SYNCED', uuid: toSync.uuid});
                dispatchAll(dispatch, results);
                _send2ServerCall();
            },
            onError: (err, resp) => {
                dispatch({type: 'UNSYNC', uuid: toSync.uuid});
                setTimeout(_send2ServerCall, 60000);  // wait 1 mn and try again
            },
        })
    }

    if (toSync.length == 1 && toSync[0].state == 'toSend') {
        _send2ServerCall();
        return true;
    }
    return false;
}

export const send2Server = store => next => action => {
    if (action.type == 'TO_SEND') {
        send2ServerCall(store)
    }
    return next(action);
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
    change,
}
