/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/
import _ from 'underscore';
import uuid from 'uuid/v1';

// initial state
export const defaultState = {
  title: 'Furet UI',
  notifications: [],
  authenticated: false,
};

export const defaultNotif = {
  title: '',
  message: '',
  has_icon: false,
};

// getters
export const getters = {
  loggedIn(state) {
    return state.authenticated;
  },
};

// actions
export const actions = {
  ADD_NOTIFICATION({ commit }, payload) {
    const id = uuid();
    const notif = Object.assign({}, defaultNotif, payload, { id });
    delete notif.process;
    commit('ADD_NOTIFICATION', notif);
    if (notif.duration) {
      setTimeout(() => {
        commit('REMOVE_NOTIFICATION', { id });
      }, notif.duration);
    }
  },
};

// mutations
export const mutations = {
  UPDATE_GLOBAL(state, action) {
    if (action.title) state.title = action.title;
  },
  LOGIN(state) {
    state.authenticated = true;
  },
  LOGOUT(state) {
    state.authenticated = false;
  },
  ADD_NOTIFICATION(state, action) {
    const notifications = state.notifications.slice(0);
    notifications.push(action);
    state.notifications = notifications;
  },
  REMOVE_NOTIFICATION(state, action) {
    const notifications = state.notifications.slice(0);
    state.notifications = _.filter(notifications, n => n.id !== action.id);
  },
  CLEAR_GLOBAL(state) {
    state.title = '';
    state.notifications = [];
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
