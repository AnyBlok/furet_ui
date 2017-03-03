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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../reducers';
import {updateGlobal} from '../testcase';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

jest.mock('../server-call')

test('Render Space with default value from redux store', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const space = require('../space'),
          Space = space.default;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Space />
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Space with default value from redux store with spaceId', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const space = require('../space'),
          Space = space.default;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Space spaceId='1'/>
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_SPACE',
        'spaceId': '1',
        'menuId': '1',
        'actionId': '1',
        'viewId': '1',
        'custom_view': '',
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Space with default value from redux store with spaceId with menu', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const space = require('../space'),
          Space = space.default;
    const component = shallow(
        <Provider store={store}>
            <MuiThemeProvider>
                <Space spaceId='1'/>
            </MuiThemeProvider>
        </Provider>
    );
    const getMenu = (label, spaceId) => {
        return [
            {
                'label': 'Menu ' + label + ' 1 : ' + spaceId,
                'image': {'type': 'font-icon', 'value': 'fa-user'},
                'actionId': '1',
                'custom_view': '',
                'id': label + '1',
                'submenus': [],
            },
            {
                'label': 'Menu ' + label + ' 2 : ' + spaceId,
                'image': {'type': '', 'value': ''},
                'actionId': '',
                'custom_view': 'Login',
                'id': label + '3',
                'submenus': [],
            },
            {
                'label': 'Menu ' + label + ' 2 : ' + spaceId,
                'image': {'type': '', 'value': ''},
                'actionId': '',
                'custom_view': '',
                'id': label + '4',
                'submenus': [
                    {
                        'label': 'Menu ' + label + ' 1 : ' + spaceId,
                        'image': {'type': 'font-icon', 'value': 'fa-user'},
                        'actionId': '2',
                        'custom_view': '',
                        'id': label + '41',
                        'submenus': [],
                    },
                ],
            },
        ]
    }
    store.dispatch({
        'type': 'UPDATE_SPACE',
        'spaceId': '1',
        'left_menu': getMenu('left', '1'),
        'menuId': '1',
        'right_menu': getMenu('right', '1'),
        'actionId': '1',
        'viewId': '1',
        'custom_view': '',
    });
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Render Space with default value from redux store with custom client', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const space = require('../space'),
          Space = space.default;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Space spaceId='1'/>
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_SPACE',
        'spaceId': '',
        'menuId': '1',
        'actionId': '',
        'viewId': '1',
        'custom_view': 'Login',
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
