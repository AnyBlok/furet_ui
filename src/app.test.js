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
import reducers from './reducers';
import {updateGlobal} from './testcase';

jest.mock('./server-call');

test('Render App with default value from redux store', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const App = require('./app').default;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render App with default value from redux store with title', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const App = require('./app').default;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_GLOBAL',
        'title': 'Title',
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render App with default value from redux store with spaceId', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const App = require('./app').default;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_GLOBAL',
        'spaceId': '1',
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render App with default value from redux store with custome_view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const App = require('./app').default;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_GLOBAL',
        'custom_view': 'Login',
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test.skip('Render App with default value from redux store with modal_custome_view', () => {
});
