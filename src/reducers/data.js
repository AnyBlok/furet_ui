/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';
export const defaultState = {}

export const data = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    const values = Object.assign({}, state);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_DATA':
            delete value.model;
            if (values[action.model] == undefined) values[action.model] = {};
            if (values[action.model][action.id] == undefined) values[action.model][action.id] = {};
            Object.assign(values[action.model][action.id], value);
            return values;
        case 'UPDATE_MULTI_DATA':
            if (values[action.model] == undefined) values[action.model] = {};
            _.each(action.data, data => {
                if (values[action.model][data.id] == undefined) values[action.model][data.id] = {};
                Object.assign(values[action.model][data.id], data);
            });
            return values;
        case 'CLEAR_DATA':
            return defaultState;
        default:
            return state
    }
}

export default data;

