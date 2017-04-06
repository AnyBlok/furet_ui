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

test('getViewIcon with Thumbnail view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getViewIcon('Thumbnail', () => {})}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Thumbnail view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    let component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getView('Thumbnail', '1', {model: 'Todo', ids: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']})}
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
        'onSelect': '2',
        'search': [{
            'key': 'name',
            'label': 'Label',
            "default": 'test',
        }],
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
        'model': 'Todo',
        'data': {
            '1': {
                'id': '1',
                'name': "todo 1",
            },
            '2': {
                'id': '2',
                'name': "todo 2",
            },
            '3': {
                'id': '3',
                'name': "todo 3",
            },
            '4': {
                'id': '4',
                'name': "todo 4",
            },
            '5': {
                'id': '5',
                'name': "todo 5",
            },
            '6': {
                'id': '6',
                'name': "todo 6",
            },
            '7': {
                'id': '7',
                'name': "todo 7",
            },
            '8': {
                'id': '8',
                'name': "todo 8",
            },
            '9': {
                'id': '9',
                'name': "todo 9",
            },
            '10': {
                'id': '10',
                'name': "todo 10",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Thumbnail view without button', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    let component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getView('Thumbnail', '1', {model: 'Todo', 
                                            ids: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                                            creatable: false,
                                            })}
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
        'onSelect': '2',
        'template': '<div><field name="name" widget="String" label="Label"></field></div>',
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_DATA',
        'model': 'Todo',
        'data': {
            '1': {
                'id': '1',
                'name': "todo 1",
            },
            '2': {
                'id': '2',
                'name': "todo 2",
            },
            '3': {
                'id': '3',
                'name': "todo 3",
            },
            '4': {
                'id': '4',
                'name': "todo 4",
            },
            '5': {
                'id': '5',
                'name': "todo 5",
            },
            '6': {
                'id': '6',
                'name': "todo 6",
            },
            '7': {
                'id': '7',
                'name': "todo 7",
            },
            '8': {
                'id': '8',
                'name': "todo 8",
            },
            '9': {
                'id': '9',
                'name': "todo 9",
            },
            '10': {
                'id': '10',
                'name': "todo 10",
            },
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
