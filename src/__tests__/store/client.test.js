/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import {defaultState, mutations} from '../../store/modules/client';

describe('store.state.client', () => {
    let state;
    beforeEach(() => {
        state = JSON.parse(JSON.stringify(defaultState));
    });
    it('update unexisting view', () => {
        const action = {viewName: 'Test', title: 'Test'};
        mutations.UPDATE_CLIENT(state, action);
        chai.expect(state).to.deep.equal({'Test': {title: 'Test'}})
    });
    it('update existing view', () => {
        state = {'Test': {title: 'Other', name: 'Test'}}
        const action = {viewName: 'Test', title: 'Test'};
        mutations.UPDATE_CLIENT(state, action);
        chai.expect(state).to.deep.equal({'Test': {title: 'Test', name: 'Test'}})
    });
    it('clear all existing', () => {
        state = {'Test': {title: 'Other', name: 'Test'}}
        const action = {};
        mutations.CLEAR_CLIENT(state, action);
        chai.expect(state).to.deep.equal({})
    });
});
