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
  appLoaded: false,
  userName: "",
  userTimeZone: "Europe/Paris",
  authenticated: false,
  root_menus: [],
  user_menus: [],
  previous_route: {},
  left_menus: [],
  isOpenLeft: false,
  breadcrumb: [],
  loginPage: "password",
};

// getters
export const getters = {
  loggedIn(state) {
    return state.authenticated;
  },
  isLoaded(state) {
    return state.appLoaded;
  },
};

// actions
export const actions = {};

// mutations
export const mutations = {
  PushBreadcrumb(state, resource) {
    state.breadcrumb.push(resource);
  },
  ClearBreadcrumbFrom(state, index) {
    state.breadcrumb.splice(index, state.breadcrumb.length - index);
  },
  PopBreadcrumb(state) {
    state.breadcrumb.pop();
  },
  ClearBreadcrumb(state) {
    state.breadcrumb = [];
  },
  SET_LOGIN_PAGE(state, loginPage) {
    if (loginPage && loginPage.login_page)
      state.loginPage = loginPage.login_page;
  },
  "FURETUI LOADED"(state) {
    state.appLoaded = true;
  },
  LOGIN(state, action) {
    state.authenticated = true;
    if (action !== undefined && action.userName !== undefined) {
      state.userName = action.userName;
    }
  },
  LOGOUT(state) {
    state.authenticated = false;
    state.userName = "";
  },
  UPDATE_PREVIOUS_ROUTE(state, action) {
    state.previous_route = action.route;
  },
  UPDATE_ROOT_MENUS(state, action) {
    state.root_menus = action.menus;
  },
  UPDATE_USER_MENUS(state, action) {
    state.user_menus = action.menus;
  },
  UPDATE_GLOBAL(state, action) {
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(action)) {
      state[key] = value;
    }
  },
  OPEN_LEFT_MENU(state, value) {
    state.isOpenLeft = value;
  },
  UPDATE_CURRENT_LEFT_MENUS(state, action) {
    state.left_menus = action.menus;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
