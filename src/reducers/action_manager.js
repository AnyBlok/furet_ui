/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
export const defaultState = {
    actions: [],
    action_data: {},
}

export const action_manager = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_ACTION_MANAGER_ADD_ACTION':
            const actions = state.actions.slice(0);
            actions.push(action.actionId);
            return Object.assign({}, state, {actions});
        case 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA':
            delete value.actionId;
            const action_data = Object.assign({}, state.action_data);
            action_data[action.actionId] = value;
            return Object.assign({}, state, {action_data});
        case 'RESET_ACTION_MANAGER':
            return Object.assign({}, state, {actions: []});
        case 'CLEAR_ACTION_MANAGER':
            return defaultState;
        default:
            return state
    }
}

export default action_manager;
