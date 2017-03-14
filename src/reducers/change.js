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

export const change = (state = defaultState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'ON_CHANGE':
            if (newState.current[action.model] == undefined) newState.current[action.model] = {};
            if (newState.current[action.model][action.dataId] == undefined) newState.current[action.model][action.dataId] = {};
            newState.current[action.model][action.dataId][action.fieldname] = action.newValue;
            return newState;
        case 'CLEAR_CHANGE':
            return Object.assign({}, state, {current: {}});
        default:
            return state
    }
}

export default change;
