/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/

export const defaultState = {
  user: [
    {
      name: 'login',
      component: 'furet-ui-appbar-user-menu-login',
    },
  ],
  spaces: [],
  spaceMenus: [],
};

// getters
export const getters = {
};

// actions
export const actions = {
};

// mutations
export const mutations = {
  UPDATE_MENUS(state, action) {
    if (action.user !== undefined) state.user = action.user;
    if (action.spaces !== undefined) state.spaces = action.spaces;
    if (action.spaceMenus !== undefined) state.spaceMenus = action.spaceMenus;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
