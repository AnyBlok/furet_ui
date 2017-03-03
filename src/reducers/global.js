/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
export const defaultState = {
    title: '',
    custom_view: '',
    modal_custom_view: '',
    spaceId: '',
}

export const global = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_GLOBAL':
            const _state = Object.assign({}, defaultState);
            if (state.title) {
                delete _state.title;
                delete _state.modal_custom_view;
            }
            if (action.custom_view || action.spaceId) return Object.assign({}, state, _state, value);
            else return Object.assign({}, state, value);
        case 'CLEAR_GLOBAL':
            return defaultState;
        default:
            return state
    }
}

export default global;
