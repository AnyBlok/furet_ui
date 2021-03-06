/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/

export const defaultHeadMenu = {
  name: undefined,
  label: undefined,
  component: 'furet-ui-appbar-head-router-link',
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
    Object.assign({}, defaultHeadMenu, {
      name: 'login',
      component: 'furet-ui-appbar-head-router-link-button',
      props: { to: '/login', label: 'Log In' },
    }),
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
        if (menu.props && menu.props.to && menu.props.to.query && menu.props.to.query.filters && typeof menu.props.to.query.filters !== 'string') {
          // eslint-disable-next-line
          menu.props.to.query.filters = JSON.stringify(menu.props.to.query.filters);
        }
        menus.push(Object.assign({}, defaultHeadMenu, menu));
      });
      state.user = menus;
    }
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
