/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducer, {defaultState} from '../../reducers/change';

test('get init value', () => {
    chai.expect(reducer(defaultState, {type: 'UNKNOWN_FOR_TEST'})).to.deep.equal(defaultState);
});
test('multi action 1', () => {
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': {title: 'Test'}}}});
    chai.expect(reducer(
        defaultState, 
        {type: 'ON_CHANGE', model: 'Model', dataId: '1', fieldname: 'title', newValue: 'Test'}
    )).to.deep.equal(expected);
});
test('multi action 2', () => {
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': {title: 'Test', other: 'Test'}}}});
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}}),
        {type: 'ON_CHANGE', model: 'Model', dataId: '1', fieldname: 'title', newValue: 'Test'}
    )).to.deep.equal(expected);
});
test('get clear all', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}}),
        {type: 'CLEAR_CHANGE'}
    )).to.deep.equal(defaultState);
});
