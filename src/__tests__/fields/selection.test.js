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
import {updateGlobal} from '../../testcase';
import '../../fields'
import {getField} from '../../field';

const selections = '[["Test", "New"]]'

test('getField for List', () => {
    const component = renderer.create(getField('List', 'Selection', {selections}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Thumbnail', () => {
    updateGlobal();
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Thumbnail', 'Selection', {selections}, 'Test')}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form', () => {
    updateGlobal();
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Selection', {selections}, 'Test')}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form readonly', () => {
    updateGlobal();
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Selection', {readonly: true, label: 'Test', selections}, 'Test')}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('getField for Form required', () => {
    updateGlobal();
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Selection', {required: '1', label: 'Test', selections}, 'Test')}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form required with empty value', () => {
    updateGlobal();
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Selection', {required: '1', label: 'Test', selections}, '')}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
