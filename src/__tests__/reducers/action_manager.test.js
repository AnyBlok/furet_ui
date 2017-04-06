/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducer, {defaultState} from '../../reducers/action_manager';

test('get init value', () => {
    chai.expect(reducer(defaultState, {type: 'UNKNOWN_FOR_TEST'})).to.deep.equal(defaultState);
});

test('get add action 1', () => {
    const expected = Object.assign({}, defaultState, {actions: ['1']});
    chai.expect(reducer(
        defaultState, 
        {type: 'UPDATE_ACTION_MANAGER_ADD_ACTION', actionId: '1'}
    )).to.deep.equal(expected);
});

test('get add action 2', () => {
    const expected = Object.assign({}, defaultState, {actions: ['1', '2']});
    chai.expect(reducer(
        Object.assign({}, defaultState, {actions: ['1']}),
        {type: 'UPDATE_ACTION_MANAGER_ADD_ACTION', actionId: '2'}
    )).to.deep.equal(expected);
});

test('add data', () => {
    const expected = Object.assign({}, defaultState, {action_data: {'1': {label: 'Test'}}});
    chai.expect(reducer(
        defaultState,
        {type: 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA', actionId: '1', label: 'Test'}
    )).to.deep.equal(expected);
});

test('replace data', () => {
    const expected = Object.assign({}, defaultState, {action_data: {'1': {label: 'Test'}}});
    chai.expect(reducer(
        Object.assign({}, defaultState, {action_data: {'1': {label: 'Other'}}}),
        {type: 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA', actionId: '1', label: 'Test'}
    )).to.deep.equal(expected);
});

test('get clear actions', () => {
    const expected = Object.assign({}, defaultState, {action_data: 'test'});
    chai.expect(reducer(
        Object.assign({}, defaultState, {actions: ['1'], action_data: 'test'}),
        {type: 'RESET_ACTION_MANAGER'}
    )).to.deep.equal(expected);
});

test('get clear all', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {title: 'Test', spaceId: '1'}),
        {type: 'CLEAR_ACTION_MANAGER'}
    )).to.deep.equal(defaultState);
});

test('remove action 1', () => {
    const actions = [1],
          action_data = {},
          action = {type: 'UPDATE_ACTION_MANAGER_REMOVE_FROM_ACTION', actionId: 1},
          expected = {actions: [], action_data};
    const result = reducer({actions, action_data}, action)
    chai.expect(result).to.deep.equal(expected);
});
test('remove action 2', () => {
    const actions = [1, 2, 3],
          action_data = {},
          action = {type: 'UPDATE_ACTION_MANAGER_REMOVE_FROM_ACTION', actionId: 3},
          expected = {actions: [1, 2], action_data};
    const result = reducer({actions, action_data}, action)
    chai.expect(result).to.deep.equal(expected);
});
test('remove action 3', () => {
    const actions = [1, 2, 3],
          action_data = {},
          action = {type: 'UPDATE_ACTION_MANAGER_REMOVE_FROM_ACTION', actionId: 2},
          expected = {actions: [1], action_data};
    const result = reducer({actions, action_data}, action)
    chai.expect(result).to.deep.equal(expected);
});
test('remove action 4', () => {
    const actions = [1, 2, 3],
          action_data = {},
          action = {type: 'UPDATE_ACTION_MANAGER_REMOVE_FROM_ACTION', actionId: 1},
          expected = {actions: [], action_data};
    const result = reducer({actions, action_data}, action)
    chai.expect(result).to.deep.equal(expected);
});
