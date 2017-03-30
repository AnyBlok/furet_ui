/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import renderer from 'react-test-renderer';
import {getField} from '../../fields';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../../reducers';
import {updateGlobal} from '../../testcase';
updateGlobal();

test('getField for List', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('List', 'One2Many', 
                      {model: 'Test', field: 'name'}, 
                      ['1', '2', '3'])}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_DATA',
        'model': 'Test',
        'data': {
            '1': {
                'name': "todo 1",
            },
            '2': {
                'name': "todo 2",
            },
            '3': {
                'name': "todo 3",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('Thumbnail', 'One2Many',
                      {model: 'Test', field: 'name'}, 
                      ['1', '2', '3'])}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_DATA',
        'model': 'Test',
        'data': {
            '1': {
                'name': "todo 1",
            },
            '2': {
                'name': "todo 2",
            },
            '3': {
                'name': "todo 3",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('Thumbnail', 'One2Many',
                      {model: 'Test', field: 'name', label: 'Test'}, 
                      ['1', '2', '3'])}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_DATA',
        'model': 'Test',
        'data': {
            '1': {
                'name': "todo 1",
            },
            '2': {
                'name': "todo 2",
            },
            '3': {
                'name': "todo 3",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
