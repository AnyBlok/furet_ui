/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
export const defaultState = {};
import _ from 'underscore';

export const actions = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_ACTION_SELECT_VIEW':
            delete value.actionId;
            const values = {};
            values[action.actionId] = Object.assign({}, state[action.actionId], value);
            return Object.assign({}, state, values);
        case 'UPDATE_NEW_ID':
            const newState = Object.assign({}, state)
            _.each(action.data || [], toChange => {
                _.each(_.keys(state), actionId => {
                    const action = newState[actionId];
                    if (action && action.params && action.params.id == toChange.oldId) {
                        action.params.id = toChange.newId;
                        newState[actionId] = Object.assign({}, action);
                        if (action.params.readonly != undefined) delete action.params.readonly;
                        if (action.params.new != undefined) action.params.new = false;
                    }
                });
            });
            return newState;
        case 'CLEAR_ACTION':
            return defaultState;
        default:
            return state
    }
}

export default actions;
