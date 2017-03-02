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
import reducers from '../../reducers';
import {updateGlobal} from '../testcase';
import {Unknown, getClientView, getViewIcon, getView} from '../../views';
import plugin from '../../plugin';

test('Render Unknown View with viewName', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Unknown viewName="Test"/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Unknown View with viewType', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Unknown viewType="Test"/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Unknown View is in the plugin', () => {
    const _Unknown = plugin.get(['views', 'Unknown']);
    chai.expect(_Unknown).to.equal(Unknown);
});

test('getClientView with unknown view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getClientView('Unknown')}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getClientView with Login view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getClientView('Login')}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Unknown Icon for standard view is in the plugin', () => {
    const UnknownIcon = plugin.get(['views', 'icon', 'Unknown']);
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <UnknownIcon />
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getViewIcon with unknown view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getViewIcon('Unknown', () => {})}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getViewIcon with List view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    let clicked = false;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getViewIcon('List', () => {clicked=true;})}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    chai.expect(clicked).to.equal(false);
    tree.props.onClick();
    chai.expect(clicked).to.equal(true);
});

test('getView with Unknown view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    let clicked = false;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                {getView('Unknown', '1', {})}
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
