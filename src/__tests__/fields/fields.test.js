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
import plugin from '../../plugin';

test('Render Unknown field', () => {
    const Unknown = plugin.get(['field', 'Unknown']);
    const component = renderer.create(<Unknown value="Test"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField with unknown view', () => {
    const component = renderer.create(getField('Unknown', 'String', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField with unknown field', () => {
    const component = renderer.create(getField('List', 'Unknown', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
