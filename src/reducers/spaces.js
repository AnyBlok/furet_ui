/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
export const defaultSpace = {
    title: '',
    left_menu: [],
    right_menu: [],
    menuId: '',
    actionId: '',
    custom_view: '',
}

export const spaces = (state = {}, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_SPACE':
            delete value.spaceId;
            const values = {};
            values[action.spaceId] = Object.assign({}, state[action.spaceId] || defaultSpace, value)
            return Object.assign({}, state, values);
        case 'CLEAR_SPACE':
            return {};
        default:
            return state
    }
}

export default spaces;
