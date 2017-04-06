/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import renderer from 'react-test-renderer';
import '../../fields'
import {getField} from '../../field';

test('getField for List', () => {
    const component = renderer.create(getField('List', 'String', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Thumbnail', () => {
    const component = renderer.create(getField('Thumbnail', 'String', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form', () => {
    const component = renderer.create(getField('Form', 'String', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form readonly', () => {
    const component = renderer.create(getField('Form', 'String', {readonly: true, label: 'Test'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form required', () => {
    const component = renderer.create(getField('Form', 'String', {required: '1', label: 'Test'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form required with empty value', () => {
    const component = renderer.create(getField('Form', 'String', {required: '1', label: 'Test'}, ''));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
