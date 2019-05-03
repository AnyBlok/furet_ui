/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/
import '@/store/modules';
import { defaultState, mutations } from '@/store/modules/menus';

describe('store.state.menus', () => {
  let state;

  beforeEach(() => {
    state = JSON.parse(JSON.stringify(defaultState));
  });

  it('mutation update_menu (user)', () => {
    const action = {
      user: [
        {
          name: 'test',
          props: { foo: 'bar' },
        },
      ],
    };
    const expected = {
      spaceMenus: [],
      spaces: [],
      user: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-head-router-link',
          domProps: {},
          name: 'test',
          nativeOn: {},
          on: {},
          props: {
            foo: 'bar',
          },
          style: {},
        },
      ],
    };
    mutations.UPDATE_MENUS(state, action);
    expect(state).toMatchObject(expected);
  });

  it('mutation update_menu (spaces)', () => {
    const action = {
      spaces: [
        {
          name: 'test',
          props: { foo: 'bar' },
        },
      ],
    };
    const expected = {
      spaceMenus: [],
      spaces: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-head-router-link',
          domProps: {},
          name: 'test',
          nativeOn: {},
          on: {},
          props: {
            foo: 'bar',
          },
          style: {},
        },
      ],
      user: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-head-router-link-button',
          domProps: {},
          name: 'login',
          nativeOn: {},
          on: {},
          props: {
            to: '/login',
            label: 'Log In',
          },
          style: {},
        },
      ],
    };
    mutations.UPDATE_MENUS(state, action);
    expect(state).toMatchObject(expected);
  });

  it('mutation update_menu (spaceMenus)', () => {
    const action = {
      spaceMenus: [
        {
          name: 'test',
          props: { foo: 'bar' },
        },
      ],
    };
    const expected = {
      spaces: [],
      spaceMenus: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-foot-router-link',
          domProps: {},
          name: 'test',
          nativeOn: {},
          on: {},
          props: {
            foo: 'bar',
          },
          style: {},
        },
      ],
      user: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-head-router-link-button',
          domProps: {},
          name: 'login',
          nativeOn: {},
          on: {},
          props: {
            to: '/login',
            label: 'Log In',
          },
          style: {},
        },
      ],
    };
    mutations.UPDATE_MENUS(state, action);
    expect(state).toMatchObject(expected);
  });
});
