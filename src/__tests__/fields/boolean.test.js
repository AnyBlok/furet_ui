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
import {getField} from '../../fields';

jest.mock('material-ui/internal/EnhancedSwitch', () => {
    return () => {return <div />};
});

test('getField for List', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('List', 'Boolean', {}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Thumbnail', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Thumbnail', 'Boolean', {}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form readonly', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {readonly: true, label: 'Test'}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form labelPosition left', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {labelPosition: 'left', label: 'Test'}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon favorite', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'favorite', label: 'Test'}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon visibility', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'visibility', label: 'Test'}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon location', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'location', label: 'Test'}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon mic', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'mic', label: 'Test'}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon star', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'star', label: 'Test'}, true)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for List with false', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('List', 'Boolean', {}, false)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Thumbnail with false', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Thumbnail', 'Boolean', {}, false)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form with false', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {}, false)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon favorite with false', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'favorite', label: 'Test'}, false)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon visibility with false', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'visibility', label: 'Test'}, false)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon location with false', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'location', label: 'Test'}, false)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon mic with false', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'mic', label: 'Test'}, false)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form icon star with false', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            {getField('Form', 'Boolean', {icon: 'star', label: 'Test'}, false)}
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
