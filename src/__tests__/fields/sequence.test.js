/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import renderer from 'react-test-renderer';
import {getField} from '../../fields';

test('getField for List', () => {
    const component = renderer.create(getField('List', 'Sequence', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Thumbnail', () => {
    const component = renderer.create(getField('Thumbnail', 'Sequence', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form', () => {
    const component = renderer.create(getField('Form', 'Sequence', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
