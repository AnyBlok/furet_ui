/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
export const defaultState = {
    value: {label: '', image: {type: '', value: ''}},
    values: [],
}

export const lefttmenu = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_LEFT_MENU':
            return Object.assign({}, state, value);
        case 'CLEAR_LEFT_MENU':
            return defaultState;
        default:
            return state
    }
}

export default lefttmenu;
