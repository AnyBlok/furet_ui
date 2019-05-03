/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/
import '@/store';
import { defaultState, getters, mutations } from '@/store/modules/global';

describe('store.state.global', () => {
  let state;

  beforeEach(() => {
    state = JSON.parse(JSON.stringify(defaultState));
  });

  it('mutation update_global', () => {
    const action = {
      userName: 'Admin',
    };
    const expected = {
      userName: 'Admin',
      authenticated: false,
    };
    mutations.UPDATE_GLOBAL(state, action);
    expect(state).toMatchObject(expected);
  });

  it('mutation login + getter loggedIn', () => {
    const action = {
      userName: 'Admin',
    };
    const expected = {
      userName: 'Admin',
      authenticated: true,
    };
    mutations.LOGIN(state, action);
    expect(state).toMatchObject(expected);
    expect(getters.loggedIn(state)).toBe(true);
  });
  it('mutation login + getter loggedIn (without userName)', () => {
    const action = {};
    const expected = {
      userName: '',
      authenticated: true,
    };
    mutations.LOGIN(state, action);
    expect(state).toMatchObject(expected);
    expect(getters.loggedIn(state)).toBe(true);
  });

  it('mutation logout + getter loggedIn', () => {
    state = {
      userName: 'Admin',
      authenticated: true,
    };
    expect(getters.loggedIn(state)).toBe(true);
    const expected = {
      userName: '',
      authenticated: false,
    };
    mutations.LOGOUT(state);
    expect(state).toMatchObject(expected);
    expect(getters.loggedIn(state)).toBe(false);
  });
});
