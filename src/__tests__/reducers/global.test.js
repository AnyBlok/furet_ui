/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducer, {defaultState} from '../../reducers/global';

test('get init value', () => {
    chai.expect(reducer(defaultState, {type: 'UNKNOWN_FOR_TEST'})).to.deep.equal(defaultState);
});

test('get update value ', () => {
    const expected = Object.assign({}, defaultState, {custom_view: '1'});
    chai.expect(reducer(
        defaultState, 
        {type: 'UPDATE_GLOBAL', custom_view: '1'}
    )).to.deep.equal(expected);
});

test('get update value 1', () => {
    const expected = Object.assign({}, defaultState, {custom_view: '1'});
    chai.expect(reducer(
        defaultState, 
        {type: 'UPDATE_GLOBAL', custom_view: '1'}
    )).to.deep.equal(expected);
});

test('get update value 2', () => {
    const expected = Object.assign({}, defaultState, {title: 'Test', custom_view: '1'});
    chai.expect(reducer(
        Object.assign({}, defaultState, {title: 'Test', spaceId: '1'}),
        {type: 'UPDATE_GLOBAL', custom_view: '1'}
    )).to.deep.equal(expected);
});

test('get update value 2', () => {
    const expected = Object.assign({}, defaultState, {title: 'Test', spaceId: '1', modal_custom_view: '1'});
    chai.expect(reducer(
        Object.assign({}, defaultState, {title: 'Test', spaceId: '1'}),
        {type: 'UPDATE_GLOBAL', modal_custom_view: '1'}
    )).to.deep.equal(expected);
});

test('get clear value', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {title: 'Test', spaceId: '1'}),
        {type: 'CLEAR_GLOBAL'}
    )).to.deep.equal(defaultState);
});
