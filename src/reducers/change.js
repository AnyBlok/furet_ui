/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';
export const defaultState = {
    current: {},
    toSync: [],
    computed: {},
}

export const current2Sync = (current, toSync, uuid, model, dataId, newData) => {
    const newSync = {
        uuid,
        state: 'toSend',
        data: [],
    }
    // Add main data in first
    try {
        newSync.data.push({
            model,
            dataId,
            newData,
            data: current[model][dataId],
        });
    } catch (e) {};
    // Add other data
    _.each(_.keys(current), modelName => {
        _.each(_.keys(current[modelName]), id => {
            if (modelName == model && dataId == id) {
                // do nothing, because already done
            } else {
                newSync.data.push({
                    model: modelName,
                    dataId: id,
                    newData: typeof id == 'object',
                    data: current[modelName][id],
                });
            }
        });
    });
    if (newSync.data.length > 0) {
        toSync.push(newSync);
    }
}

export const toSync2computed = (toSync, computed) => {
    _.each(toSync, ts => {
        _.each(ts.data, data => {
            if (computed[data.model] == undefined) computed[data.model] = {};
            if (computed[data.model][data.dataId] == undefined) computed[data.model][data.dataId] = {};
            Object.assign(computed[data.model][data.dataId], data.data);
        });
    });
}

export const change = (state = defaultState, action) => {
    const current = Object.assign({}, state.current),
          toSync = state.toSync.slice(0),
          computed = {};
    switch (action.type) {
        case 'ON_CHANGE':
            if (current[action.model] == undefined) current[action.model] = {};
            else current[action.model] = Object.assign({}, current[action.model]);
            if (current[action.model][action.dataId] == undefined) current[action.model][action.dataId] = {};
            else current[action.model][action.dataId] = Object.assign({}, current[action.model][action.dataId]);
            current[action.model][action.dataId][action.fieldname] = action.newValue;
            return Object.assign({}, state, {current});
        case 'CLEAR_CHANGE':
            return Object.assign({}, state, {current: {}});
        case 'ON_SAVE':
            current2Sync(current, toSync, action.uuid, action.model, action.dataId, action.newData);
            toSync2computed(toSync, computed)
            return Object.assign({}, state, {current: {}, toSync, computed});
        default:
            return state
    }
}

export default change;
