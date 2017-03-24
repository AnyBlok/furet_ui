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
    const values = Object.assign({}, state);
    switch (action.type) {
        case 'UPDATE_DATA':
            if (values[action.model] == undefined) values[action.model] = {};
            else values[action.model] = Object.assign({}, values[action.model]);
            Object.assign(values[action.model], action.data);
            return values;
        case 'DELETE_DATA':
            _.each(_.keys(values), model => {
                if (action.data[model] != undefined) {
                    values[model] = Object.assign({}, values[model]);
                    _.each(action.data[model], dataId => {
                        if (values[model][dataId] != undefined) delete values[model][dataId];
                        if (_.keys(values[model]).length == 0) delete values[model];
                    });
                }
            });
            return values;
        case 'CLEAR_DATA':
            return defaultState;
        default:
            return state
    }
}

export default data;
