/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../../reducers';
import {updateGlobal} from '../../testcase';
import BaseView, {renderSafeEval} from '../../views/base';
import chai from 'chai';

jest.mock('../../server-call')

test('Render Base View', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <BaseView/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Check renderSafeEval undefined', () => {
    chai.expect(renderSafeEval(undefined, {})).to.equal(false);
});
test('Check renderSafeEval true', () => {
    chai.expect(renderSafeEval('true', {})).to.equal(true);
});
test('Check renderSafeEval 1', () => {
    chai.expect(renderSafeEval('1', {})).to.equal(true);
});
test('Check renderSafeEval fields.b == 1', () => {
    chai.expect(renderSafeEval('fields.b == 1', {b: 1})).to.equal(true);
});
test('Check renderSafeEval fields.b != 1', () => {
    chai.expect(renderSafeEval('fields.b != 1', {b: 1})).to.equal(false);
});
test('Check renderSafeEval toDate(fields.b) != now', () => {
    chai.expect(renderSafeEval('toDate(fields.b) != now', {b: '2017-05-09T07:04:49'})).to.equal(true);
});
