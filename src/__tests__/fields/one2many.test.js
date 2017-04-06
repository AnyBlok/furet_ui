/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import renderer from 'react-test-renderer';
import '../../views'
import '../../fields'
import {getField} from '../../field';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../../reducers';
import {updateGlobal} from '../../testcase';
updateGlobal();


jest.mock('material-ui/internal/Tooltip', () => {
    return () => {return null};
});
jest.mock('material-ui/internal/EnhancedSwitch', () => {
    return () => {return <div />};
});
jest.mock('../../server-call')

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
test('getField for Form', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getField('Form', 'One2Many', {model: 'Test', field: 'name', actionId: '1', currentModel: 'Todo'}, ['1', '3'])}
            </MuiThemeProvider>
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        'actionId': '1',
        'label': 'Action : 1',
        'viewId': '1',
        'views': [
            {
                'viewId': '1',
                'type': 'List',
            },
            {
                'viewId': '2',
                'type': 'Form',
            },
        ],
        'model': 'Test',
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '1',
        'label': 'View 1',
        'creatable': false,
        'deletable': false,
        'selectable': false,
        'onSelect': '2',
        'headers': [{
            'name': 'name',
            'type': 'String',
            'label': 'Label',
        }],
    });
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '2',
        'label': 'View 2',
        'creatable': true,
        'deletable': true,
        'editable': true,
        'onClose': '2',
        'template': '<div><field name="name" widget="String" label="Label"></field></div>',
        'buttons': [],
    });
    tree = component.toJSON();
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
            '4': {
                'name': "todo 4",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form empty', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getField('Form', 'One2Many', {model: 'Test', field: 'name', actionId: '1', currentModel: 'Todo'}, [])}
            </MuiThemeProvider>
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        'actionId': '1',
        'label': 'Action : 1',
        'viewId': '1',
        'views': [
            {
                'viewId': '1',
                'type': 'List',
            },
            {
                'viewId': '2',
                'type': 'Form',
            },
        ],
        'model': 'Test',
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '1',
        'label': 'View 1',
        'creatable': false,
        'deletable': false,
        'selectable': false,
        'onSelect': '2',
        'headers': [{
            'name': 'name',
            'type': 'String',
            'label': 'Label',
        }],
    });
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '2',
        'label': 'View 2',
        'creatable': true,
        'deletable': true,
        'editable': true,
        'onClose': '2',
        'template': '<div><field name="name" widget="String" label="Label"></field></div>',
        'buttons': [],
    });
    tree = component.toJSON();
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
            '4': {
                'name': "todo 4",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form readonly', () => {
    const store = createStore(combineReducers(reducers));
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getField('Form', 'One2Many', {model: 'Test', field: 'name', actionId: '1', currentModel: 'Todo', readonly: true}, ['1', '3'])}
            </MuiThemeProvider>
        </Provider>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        'actionId': '1',
        'label': 'Action : 1',
        'viewId': '1',
        'views': [
            {
                'viewId': '1',
                'type': 'List',
            },
            {
                'viewId': '2',
                'type': 'Form',
            },
        ],
        'model': 'Test',
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '1',
        'label': 'View 1',
        'creatable': false,
        'deletable': false,
        'selectable': false,
        'onSelect': '2',
        'headers': [{
            'name': 'name',
            'type': 'String',
            'label': 'Label',
        }],
    });
    store.dispatch({
        'type': 'UPDATE_VIEW',
        'viewId': '2',
        'label': 'View 2',
        'creatable': true,
        'deletable': true,
        'editable': true,
        'onClose': '2',
        'template': '<div><field name="name" widget="String" label="Label"></field></div>',
        'buttons': [],
    });
    tree = component.toJSON();
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
            '4': {
                'name': "todo 4",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
