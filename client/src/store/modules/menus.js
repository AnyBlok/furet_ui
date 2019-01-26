/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/

const defaultUserMenu = {
  name: undefined,
  component: 'furet-ui-appbar-user-menu-router-link',
  class: {},
  style: {},
  attrs: {},
  props: {},
  domProps: {},
  on: {},
  nativeOn: {},
};

export const defaultState = {
  user: [
    Object.assign({}, defaultUserMenu, { name: 'login', props: { to: '/login', label: 'Log In' } }),
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
    if (action.user !== undefined) {
      const menus = [];
      action.user.forEach((menu) => {
        menus.push(Object.assign({}, defaultUserMenu, menu));
      });
      state.user = menus;
    }
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
