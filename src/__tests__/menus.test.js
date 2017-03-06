/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import chai from 'chai';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../reducers';
import {updateGlobal} from '../testcase';

jest.mock('../server-call')

test('Render Left Menu with default value from redux store', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const menus = require('../menus'),
          LeftMenu = menus.LeftMenu;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <LeftMenu/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Left Menu with value from redux store', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const menus = require('../menus'),
          LeftMenu = menus.LeftMenu;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <LeftMenu/>
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_LEFT_MENU',
        'value': {
            'label': 'Login',
            'image': {'type': 'font-icon', 'value': 'fa-user'},
        },
        'values': [
            {
                'label': 'Login',
                'image': {'type': 'svg-icon', 'value': 'ActionAndroid'},
                'id': 'login',
                'values': [
                    {
                        'label': 'Login',
                        'description': 'Log in to use the application',
                        'image': {'type': 'font-icon', 'value': 'fa-user'},
                        'type': 'client',
                        'id': 'Login',
                    },
                    {
                        'label': '',
                        'description': '',
                        'image': {'type': 'font-icon', 'value': 'fa-user'},
                        'type': 'client',
                        'id': 'Login',
                    },
                ],
            },
        ],
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
