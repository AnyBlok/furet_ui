/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
jest.mock('react-dom')
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import chai from 'chai';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../../reducers';
import {updateGlobal} from '../../testcase';
import '../../fields'
import '../../views'
import {getView, getViewIcon} from '../../view';

jest.mock('material-ui/internal/Tooltip', () => {
    return () => {return null};
});
jest.mock('../../server-call')
test('getViewIcon with Form view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getViewIcon('Form', () => {})}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('Render Form view readonly', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    let component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getView('Form', '1', {model: 'Test', params: {id: '1'}})}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '1',
        'label': 'View 1',
        'creatable': true,
        'deletable': true,
        'editable': true,
        'onClose': '2',
        'template': '<div><field name="name" widget="String" label="Label"></field></div>',
        'buttons': [{
            'label': 'Make a call',
            'buttonId': '1',
        }],
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_DATA',
        'model': 'Test',
        'data': {
            '1': {
                'id': '1',
                'name': "todo 1",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('Render Form view readwrite', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    let component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getView('Form', '1', {model: 'Test', params: {id: '1', readonly: false}})}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '1',
        'label': 'View 1',
        'creatable': true,
        'deletable': true,
        'editable': true,
        'onClose': '2',
        'template': '<div><field name="name" widget="String" label="Label"></field></div>',
        'buttons': [{
            'label': 'Make a call',
            'buttonId': '1',
        }],
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_DATA',
        'model': 'Test',
        'data': {
            '1': {
                'id': '1',
                'name': "todo 1",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('Render Form view without button', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    let component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getView('Form', '1', {model: 'Test', params: {id: '1'}, creatable: false, editable: false, deletable: false})}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '1',
        'label': 'View 1',
        'creatable': false,
        'deletable': false,
        'editable': false,
        'onClose': '2',
        'template': '<div><field name="name" widget="String" label="Label"></field></div>',
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_DATA',
        'model': 'Test',
        'data': {
            '1': {
                'id': '1',
                'name': "todo 1",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
