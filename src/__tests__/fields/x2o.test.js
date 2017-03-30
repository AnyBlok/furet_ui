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

jest.mock('react-select', () => {
    return () => {return <div>Select component</div>}
})

test('getField for List', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('List', 'Many2One', {}, 'Test')}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('Thumbnail', 'Many2One', {}, 'Test')}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('Thumbnail', 'Many2One', {label: 'Test'}, 'Test')}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('Form', 'Many2One', {}, 'Test')}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form readonly', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('Form', 'Many2One', {readonly: true, label: 'Test'}, 'Test')}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form required', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('Form', 'Many2One', {required: '1', label: 'Test'}, 'Test')}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form required with empty value', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            {getField('Form', 'Many2One', {required: '1', label: 'Test'}, '')}
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
