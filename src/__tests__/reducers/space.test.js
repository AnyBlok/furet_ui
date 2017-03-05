/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducer, {defaultState, defaultSpace} from '../../reducers/spaces';

test('get init value', () => {
    chai.expect(reducer(defaultState, {type: 'UNKNOWN_FOR_TEST'})).to.deep.equal(defaultState);
});

test('update action 1', () => {
    const expected = Object.assign({}, defaultState, {'1': Object.assign({}, defaultSpace, {actionId: '1'})});
    chai.expect(reducer(
        defaultState, 
        {type: 'UPDATE_SPACE', spaceId: '1', actionId: '1'}
    )).to.deep.equal(expected);
});

test('update action 2', () => {
    const expected = Object.assign({}, defaultState, {'1': Object.assign({}, defaultSpace, {actionId: '1'})});
    chai.expect(reducer(
        Object.assign({}, defaultState, {'1': Object.assign({}, defaultSpace, {actionId: '2'})}),
        {type: 'UPDATE_SPACE', spaceId: '1', actionId: '1'}
    )).to.deep.equal(expected);
});

test('get clear all', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {title: 'Test'}),
        {type: 'CLEAR_SPACE'}
    )).to.deep.equal(defaultState);
});
