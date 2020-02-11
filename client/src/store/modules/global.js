/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
   Copyright (C) 2019 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/

// initial state
export const defaultState = {
  userName: '',
  authenticated: false,
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
  LOGIN(state, action) {
    state.authenticated = true;
    if (action !== undefined && action.userName !== undefined) {
      state.userName = action.userName;
    }
  },
  LOGOUT(state) {
    state.authenticated = false;
    state.userName = '';
  },
  UPDATE_GLOBAL(state, action) {
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(action)) {
      state[key] = value;
    }
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
