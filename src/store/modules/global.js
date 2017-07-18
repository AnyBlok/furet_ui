/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';

// initial state
export const defaultState = {
    title: '',
    modal_custom_view: '',
    breadscrumbs: [],
};

// getters
export const getters = {
};

// actions
export const actions = {
};

// mutations
export const mutations = {
    'UPDATE_GLOBAL'(state, action) {
        if (action.title) state.title = action.title;
        if (action.modal_custom_view) state.modal_custom_view = action.modal_custom_view;
    },
    'ADD_IN_BREADSCRUMB'(state, action) {
        const breadscrumbs = state.breadscrumbs.slice(0);
        breadscrumbs.push({
            path: action.path,
            label: action.label,
            changes: action.changes,
            position: breadscrumbs.length,
        });
        state.breadscrumbs = breadscrumbs;
    },
    'REMOVE_FROM_BREADSCRUMB'(state, action) {
        const breadscrumbs = _.filter(state.breadscrumbs.slice(0), a => a.position < action.position);
        state.breadscrumbs = _.sortBy(breadscrumbs, a => a.position);
    },
    'CLEAR_BREADSCRUMB'(state, action) {
        state.breadscrumbs = [];
    },
    'CLEAR_GLOBAL'(state, action) {
        state.title = '';
        state.modal_custom_view = '';
        state.breadscrumbs = [];
    },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
