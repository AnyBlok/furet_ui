/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducers, {dispatchAll} from '../../reducers';
import {createStore, combineReducers} from 'redux';
import translate from 'counterpart';

test('Test dispatch in reducers', () => {
    const store = createStore(combineReducers(reducers));
    dispatchAll(store.dispatch, [
        {type: 'UPDATE_SPACE', spaceId: '1', actionId: '1'},
        {type: 'UPDATE_MULTI_DATA', model: 'Model', data: [{id: '1', other: 'Test'}]},
    ]);
    const state = store.getState();
    chai.expect(state.data).to.deep.equal({'Model': {'1': {id: '1', other: 'Test'}}});
    chai.expect(state.spaces['1'].actionId).to.equal('1');
});

test('Test dispatch set locale', () => {
    const store = createStore(combineReducers(reducers));
    translate.setLocale('en');
    chai.expect(translate.getLocale()).to.not.equal('fr_FR');
    dispatchAll(store.dispatch, [
        {type: 'SET_LOCALE', locale: 'fr_FR'},
    ]);
    chai.expect(translate.getLocale()).to.equal('fr_FR');
});

test('Test dispatch translation', () => {
    const store = createStore(combineReducers(reducers));
    translate.setLocale('fr_FR');
    chai.expect(translate('furetUI.my.variable', {fallback: 'Wrong'})).to.not.equal('Right');
    dispatchAll(store.dispatch, [
        {type: 'UPDATE_LOCALES', locales: [{
            locale: 'fr_FR',
            counterpart: {my: {variable: 'Right'}},
        }]},
    ]);
    chai.expect(translate('furetUI.my.variable', {fallback: 'Wrong'})).to.equal('Right');
});
