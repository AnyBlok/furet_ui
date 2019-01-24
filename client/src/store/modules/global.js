/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/

// initial state
export const defaultState = {
  title: 'Furet UI',
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
  CLEAR_GLOBAL(state) {
    state.title = '';
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
