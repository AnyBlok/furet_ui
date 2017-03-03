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
import reducers from '../../reducers';
import {updateGlobal} from '../../testcase';
jest.mock('../../server-call')
import DropDown from '../../views/dropdown';

test('Render drop down button for view empty view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <DropDown label="The label"/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.testHandleTouchTap();
    expect(tree).toMatchSnapshot();
    tree.props.testHandleRequestClose();
    expect(tree).toMatchSnapshot();
});

test('Render drop down button for view empty view', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const menus = [
        {
            buttonId: '1',
            label: 'Menu 1',
        },
        {
            buttonId: '2',
            label: 'Menu 2',
        },
        {
            buttonId: '2',
            label: 'Menu 2',
        },
    ];
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <DropDown label="The label"/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.testHandleTouchTap();
    expect(tree).toMatchSnapshot();
    tree.props.testHandleRequestClose();
    expect(tree).toMatchSnapshot();
});
