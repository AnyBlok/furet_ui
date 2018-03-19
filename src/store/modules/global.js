/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';
import uuid from 'uuid/v1';

// initial state
export const defaultState = {
    title: '',
    modal_custom_view: '',
    breadscrumbs: [],
    notifications: [],
    previous_path: '',
};
export const defaultNotif = {
    title: '',
    message: '',
    has_icon: false,
}

// getters
export const getters = {
};

// actions
export const actions = {
    'ADD_NOTIFICATION'({commit}, payload) {
        const id = uuid();
        const notif = Object.assign({}, defaultNotif, payload, {id});
        delete notif.process;
        commit('ADD_NOTIFICATION', notif);
        if (notif.duration) {
            setTimeout(() => {commit('REMOVE_NOTIFICATION', {id})}, notif.duration);
        }
    },
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
    'ADD_NOTIFICATION'(state, action) {
        const notifications = state.notifications.slice(0);
        notifications.push(action);
        state.notifications = notifications;
    },
    'REMOVE_NOTIFICATION'(state, action) {
        const notifications = state.notifications.slice(0);
        state.notifications = _.filter(notifications, n => n.id != action.id);
    },
    'UPDATE_PREVIOUS_PATH'(state, action) {
        if (action.route.name != 'menu') {
            state.previous_path = action.route.path;
        }
    },
    'CLEAR_GLOBAL'(state, action) {
        state.title = '';
        state.modal_custom_view = '';
        state.breadscrumbs = [];
        state.notifications = [];
    },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
