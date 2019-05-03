/*
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
*/
import '@/store/modules';
import { defaultState, getters, mutations } from '@/store/modules/browser';

describe('store.state.browser', () => {
  let state;

  beforeEach(() => {
    state = JSON.parse(JSON.stringify(defaultState));
  });

  it('getter nextBrowserTarget 1', () => {
    expect(getters.nextBrowserTarget(state)).toBe(undefined);
  });

  it('getter nextBrowserTarget 2', () => {
    state = { list: ['some', 'thing'], offset: 0 };
    expect(getters.nextBrowserTarget(state)).toBe('thing');
  });

  it('getter nextBrowserTarget 3', () => {
    state = { list: ['some', 'thing'], offset: 1 };
    expect(getters.nextBrowserTarget(state)).toBe('some');
  });

  it('getter previousBrowserTarget 1', () => {
    expect(getters.previousBrowserTarget(state)).toBe(undefined);
  });

  it('getter previousBrowserTarget 2', () => {
    state = { list: ['some', 'thing'], offset: 0 };
    expect(getters.previousBrowserTarget(state)).toBe('thing');
  });

  it('getter previousBrowserTarget 3', () => {
    state = { list: ['some', 'thing'], offset: 1 };
    expect(getters.previousBrowserTarget(state)).toBe('some');
  });

  it('mutation CLEAR_BROWSER_LIST ', () => {
    state = { list: ['some', 'thing'], offset: 1 };
    const expected = { list: [], offset: 0 };
    mutations.CLEAR_BROWSER_LIST(state);
    expect(state).toMatchObject(expected);
  });

  it('mutation UPDATE_BROWSER_LIST ', () => {
    const action = { list: ['some', 'thing'], offset: 1 };
    const expected = { list: ['some', 'thing'], offset: 0 };
    mutations.UPDATE_BROWSER_LIST(state, action);
    expect(state).toMatchObject(expected);
  });

  it('mutation DECREASE_BROWSER_OFFSET 1', () => {
    const expected = { list: [], offset: 0 };
    mutations.DECREASE_BROWSER_OFFSET(state);
    expect(state).toMatchObject(expected);
  });

  it('mutation DECREASE_BROWSER_OFFSET 2', () => {
    state = { list: ['some', 'thing'], offset: 1 };
    const expected = { list: ['some', 'thing'], offset: 0 };
    mutations.DECREASE_BROWSER_OFFSET(state);
    expect(state).toMatchObject(expected);
  });

  it('mutation DECREASE_BROWSER_OFFSET 3', () => {
    state = { list: ['some', 'thing'], offset: 0 };
    const expected = { list: ['some', 'thing'], offset: 1 };
    mutations.DECREASE_BROWSER_OFFSET(state);
    expect(state).toMatchObject(expected);
  });

  it('mutation INCREASE_BROWSER_OFFSET 1', () => {
    const expected = { list: [], offset: 0 };
    mutations.INCREASE_BROWSER_OFFSET(state);
    expect(state).toMatchObject(expected);
  });

  it('mutation INCREASE_BROWSER_OFFSET 2', () => {
    state = { list: ['some', 'thing'], offset: 0 };
    const expected = { list: ['some', 'thing'], offset: 1 };
    mutations.INCREASE_BROWSER_OFFSET(state);
    expect(state).toMatchObject(expected);
  });

  it('mutation INCREASE_BROWSER_OFFSET 3', () => {
    state = { list: ['some', 'thing'], offset: 1 };
    const expected = { list: ['some', 'thing'], offset: 0 };
    mutations.INCREASE_BROWSER_OFFSET(state);
    expect(state).toMatchObject(expected);
  });
});
