/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';
export const defaultState = {}

// getters
export const getters = {
};

// actions
export const actions = {
};

// mutations
export const mutations = {
    'UPDATE_CLIENT'(state, action) {
        const value = Object.assign({}, action);
        delete value.viewName;
        const values = Object.assign({}, state[action.viewName]);
        Object.assign(values, value);
        state[action.viewName] = values;
    },
    'CLEAR_CLIENT'(state, action) {
        _.each(_.keys(state), k => delete state[k]);
    },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
