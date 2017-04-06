/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducer, {defaultState} from '../../reducers/actions';

test('get init value', () => {
    chai.expect(reducer(defaultState, {type: 'UNKNOWN_FOR_TEST'})).to.deep.equal(defaultState);
});
test('update action 1', () => {
    const expected = Object.assign({}, defaultState, {'1': {title: 'Test'}});
    chai.expect(reducer(
        defaultState, 
        {type: 'UPDATE_ACTION_SELECT_VIEW', actionId: '1', title: 'Test'}
    )).to.deep.equal(expected);
});
test('update action 2', () => {
    const expected = Object.assign({}, defaultState, {'1': {title: 'Test'}});
    chai.expect(reducer(
        Object.assign({}, defaultState, {'1': {title: 'Other'}}),
        {type: 'UPDATE_ACTION_SELECT_VIEW', actionId: '1', title: 'Test'}
    )).to.deep.equal(expected);
});
test('update new id 1', () => {
    const state = {
        '1': {
            params: {
                id: 'id2change',
            },
        },
    };
    const expected = {
        '1': {
            params: {
                id: 'newId',
            },
        },
    };
    const action = {
        type: 'UPDATE_NEW_ID',
        data: [
            {
                oldId: 'id2change',
                newId: 'newId',
            },
        ],
    };
    const result = reducer(state, action);
    chai.expect(result).to.deep.equal(expected);
});
test('update new id 2', () => {
    const state = {
        '1': {
            params: {
                id: 'id2change',
            },
        },
        '2': {
            params: {
                id: 'id2change',
            },
        },
        '3': {
            params: {
                id: 'other id',
            },
        },
    };
    const expected = {
        '1': {
            params: {
                id: 'newId',
            },
        },
        '2': {
            params: {
                id: 'newId',
            },
        },
        '3': {
            params: {
                id: 'other id',
            },
        },
    };
    const action = {
        type: 'UPDATE_NEW_ID',
        data: [
            {
                oldId: 'id2change',
                newId: 'newId',
            },
        ],
    };
    const result = reducer(state, action);
    chai.expect(result).to.deep.equal(expected);
});
test('update new id 2', () => {
    const state = {
        '1': {
            params: {
                id: 'id2change1',
            },
        },
        '2': {
            params: {
                id: 'id2change2',
            },
        },
        '3': {
            params: {
                id: 'other id',
            },
        },
    };
    const expected = {
        '1': {
            params: {
                id: 'newId1',
            },
        },
        '2': {
            params: {
                id: 'newId2',
            },
        },
        '3': {
            params: {
                id: 'other id',
            },
        },
    };
    const action = {
        type: 'UPDATE_NEW_ID',
        data: [
            {
                oldId: 'id2change1',
                newId: 'newId1',
            },
            {
                oldId: 'id2change2',
                newId: 'newId2',
            },
        ],
    };
    const result = reducer(state, action);
    chai.expect(result).to.deep.equal(expected);
});
test('get clear all', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {title: 'Test'}),
        {type: 'CLEAR_ACTION'}
    )).to.deep.equal(defaultState);
});
