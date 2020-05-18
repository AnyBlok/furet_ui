/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
   Copyright (C) 2019 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/
import Vue from 'vue';

// initial state
export const defaultState = {
};

// getters
export const getters = {
};

// actions
export const actions = {
};

// mutations
export const mutations = {
  UPDATE_RESOURCES(state, action) {
    action.definitions.forEach(definition => {
      Vue.set(state, String(definition.id), definition)
    });
  },
  UPDATE_RESOURCE_TOGGLE_HIDDEN_COLUMN(state, action) {
    state[action.id].headers.forEach(header => {
      if (header.name == action.field) {
        header['hidden-column'] = ! header['hidden-column']
        Vue.set(state, action.id, Object.assign({}, state[action.id]))
      }
    });
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
