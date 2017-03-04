/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
export const defaultState = {}

export const views = (state = defaultState, view) => {
    const value = Object.assign({}, view);
    delete value.type;
    switch (view.type) {
        case 'UPDATE_VIEW':
            delete value.viewId;
            const values = {};
            values[view.viewId] = Object.assign({}, state[view.viewId], value);
            return Object.assign({}, state, values);
        case 'CLEAR_ACTION':
            return defaultState;
        default:
            return state
    }
}

export default views;
