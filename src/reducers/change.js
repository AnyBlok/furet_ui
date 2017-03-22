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
            type: newData ? 'CREATE' : 'UPDATE',
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
                    type: (new RegExp('^new-.*')).test(id) ? 'CREATE' : 'UPDATE',
                    data: current[modelName][id],
                });
            }
        });
    });
    if (newSync.data.length > 0) {
        toSync.push(newSync);
    }
}

export const remove2Sync = (toSync, uuid, model, dataIds) => {
    if (dataIds.length == 0) return;
    toSync.push({
        uuid,
        state: 'toSend',
        data: [
            {
                model,
                dataIds,
                type: 'DELETE',
            }
        ],
    });
}

export const toSync2computed = (toSync, computed) => {
    _.each(toSync, ts => {
        _.each(ts.data, data => {
            if (computed[data.model] == undefined) computed[data.model] = {};
            switch (data.type) {
                case 'CREATE':
                case 'UPDATE':
                    if (computed[data.model][data.dataId] == undefined) computed[data.model][data.dataId] = {};
                    Object.assign(computed[data.model][data.dataId], data.data);
                    break;
                case 'DELETE':
                    _.each(data.dataIds, dId => {
                        computed[data.model][dId] = 'DELETED';
                    });
                    break;
            }
        });
    });
}

export const removeUuid = (toSync, uuid) => {
    return _.filter(toSync, s => s.uuid != uuid);
}

export const changeState = (toSync, uuid, state) => {
    return _.map(toSync, s => {
        const val = Object.assign({}, s)
        if (uuid == s.uuid) {
            val.state = state;
        }
        return val;
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
        case 'ON_DELETE':
            remove2Sync(toSync, action.uuid, action.model, action.dataIds);
            toSync2computed(toSync, computed)
            return Object.assign({}, state, {current: {}, toSync, computed});
        case 'SYNC':
            return Object.assign({}, state, {toSync: changeState(toSync, action.uuid, 'Sent')});
        case 'UNSYNC':
            return Object.assign({}, state, {toSync: changeState(toSync, action.uuid, 'toSend')});
        case 'SYNCED':
            let _toSync = removeUuid(toSync, action.uuid);
            toSync2computed(_toSync, computed)
            return Object.assign({}, state, {toSync: _toSync, computed});
        default:
            return state
    }
}

export default change;
